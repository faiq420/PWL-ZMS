import React, { useEffect, useState } from "react";
import { Button } from "../../../../../components/ui/button";
import {
  Activity,
  ArrowLeft,
  Calendar1Icon,
  CalendarIcon,
  Edit,
  MapPin,
  Phone,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../components/ui/avatar";
import { Calendar } from "../../../../../components/ui/calendar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../../components/ui/tabs";
import { Separator } from "../../../../../components/ui/separator";
import { UserPermissions } from "../../../../../components/user-management/user-permissions";
import { UserActivityLog } from "../../../../../components/user-management/user-activity-log";
import type { User } from "@/types/user";
import { DeleteConfirmationDialog } from "../../../../../components/user-management/delete-confirmation-dialog";
import { UserModal } from "../../../../../components/user-management/user-modal";
import useHelper from "@/Helper/helper";
import { Badge } from "@/components/ui/badge";
import {
  changeDateFormat,
  changeDateFormatWithTime,
} from "@/Helper/DateFormats";
import ButtonComp from "@/components/utils/Button";

interface Props {
  mode?: string;
  id?: string;
}

const UserView = ({ mode = "create", id = "0" }: Props) => {
  const router = useRouter();
  const helper = useHelper();
  const [user, setUser] = useState<User>({
    Id: 0,
    email: "",
    firstName: "",
    lastName: "",
    role: "admin",
    status: "active",
    createdAt: "",
    ImagePath: ""
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  function GetUserById() {
    helper.xhr
      .Get(
        "/Users/GetUserById",
        helper.GetURLParamString({ userId: id }).toString()
      )
      .then((response) => {
        setUser({
          Id: response.user.UserId,
          email: response.user.UserEmail,
          firstName: response.user.UserName.split(" ")[0],
          lastName: response.user.UserName.includes(" ")
            ? response.user.UserName.split(" ")[1]
            : "",
          role: response.user.RoleName,
          status: response.user.IsActive === true ? "active" : "inactive",
          createdAt: response.user.CreatedAt,
          lastLogin: response.user.LastLogin,
          permissions: response.permissions,
          phone: response.user.UserPhone,
          ImagePath: `/user/${response.user.UserId}${response.user.Extension}?v=${Date.now()}` || "",
          activityLog: response.logs,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    console.log("Fetching user with ID:", id);
    GetUserById();
    // const foundUser = mockUsers.find((u) => u.id === params.id);
    // setUser(foundUser || null);
  }, [id]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "zoo_incharge":
        return "bg-blue-100 text-blue-800";
      case "veterinary_doctor":
        return "bg-green-100 text-green-800";
      case "citizen":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatRole = (role: string) => {
    return role
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleEditUser = (userData: Partial<User>) => {
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          {/* <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div> */}
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-fit">
            <ButtonComp
              text="Edit"
              type={"white"}
              clickEvent={() => {
                router.push(`/home/user-management?mode=edit&id=${user.Id}`);
              }}
              beforeIcon={<Edit className="h-4 w-4 mr-2" />}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card className="sticky top-0">
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-2-background">
                <AvatarImage src={user.ImagePath !== undefined ? helper.GetDocument(user.ImagePath) : "/placeholder.svg"} />
                <AvatarFallback className="text-lg">
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">
                {user.firstName} {user.lastName}
              </CardTitle>
              <CardDescription>{user.email}</CardDescription>
              <div className="flex justify-center space-x-2 mt-4">
                <Badge className={getRoleColor(user.role)}>
                  {formatRole(user.role)}
                </Badge>
                <Badge className={getStatusColor(user.status)}>
                  {user.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 mt-4">
              {user.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.phone}</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Joined {changeDateFormat(user.createdAt)}
                </span>
              </div>
              {user.lastLogin && (
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Last login {changeDateFormatWithTime(user.lastLogin)}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="permissions" className="space-y-4">
            <TabsList>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="activity">Activity Log</TabsTrigger>
            </TabsList>

            <TabsContent value="permissions">
              <UserPermissions user={user} />
            </TabsContent>

            <TabsContent value="activity">
              <UserActivityLog user={user} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserView;
