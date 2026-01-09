"use client";

import { useEffect, useState } from "react";
import { Shield, Users, Menu, Save, View, Delete } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccessMatrix } from "@/components/access-control/access-matrix";
import SectionIntro from "@/components/utils/Headings/SectionIntro";
import MetricPresentationCard from "@/components/utils/Cards/MetricPresentationCard";
import useHelper from "@/Helper/helper";
import { OPTION } from "@/types/utils";
import ButtonComp from "@/components/utils/Button";
import { useToast } from "@/components/ui/use-toast";
import { RoleMenuMapping } from "@/components/access-control/role-menu-mapping";
import { BulkPermissions } from "@/components/access-control/bulk-permissions";

export interface MenuProps {
  MenuId?: number;
  View?: boolean;
  Create?: boolean;
  Edit?: boolean;
  Delete?: boolean;
}

export interface RoleProps {
  RoleId: number;
  RoleName: string;
  Menus: Array<MenuProps>;
}

export default function AccessControlPage() {
  const helper = useHelper();
  const pageData = helper.GetPageData();
  const [roles, setRoles] = useState<RoleProps[]>([]);
  const [menuItems, setMenuItems] = useState<OPTION[]>([]);
  const [isCruding, setIsCruding] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSavePermissions = () => {
    setIsCruding(true);
    Promise.allSettled(
      roles
        .filter((role) => role.Menus.length > 0)
        .map((role: RoleProps) => {
          return helper.xhr.Post(
            "/Mapping/CreateMapping",
            helper.ConvertToFormData({
              MenuId: role.Menus,
              RoleId: role.RoleId,
            })
          );
        })
    )
      .then((response) => {
        console.log(response);
        toast({
          title: "Permissions Updated Successfully",
          description:
            "Role-based menu access permissions have been saved successfully.",
          variant: "success",
        });
      })
      .catch((error) => {
        toast({
          title: "Permissions Not Updated",
          description: error.message,
          variant: "success",
        });
      })
      .finally(() => {
        setIsCruding(false);
      });
  };

  const handleUpdateRoleAccess = (
    roleId: number,
    menuAccess: MenuProps[] | []
  ) => {
    setRoles(
      roles.map((role) =>
        role.RoleId === roleId ? { ...role, Menus: menuAccess } : role
      )
    );
  };

  // const handleAllMenuAccess = (
  //   roleId: number,
  //   menuId: number,
  //   checked: boolean
  // ) => {
  //   const role = roles.find((role) => role.RoleId === roleId);
  //   const menu = role?.Menus.map((menu) =>
  //     menu.MenuId === menuId
  //       ? { MenuId: menuId, View: true, Edit: true, Create: true, Delete: true }
  //       : menu
  //   );

  //   console.log(menu);
  //   // setRoles(
  //   //   roles.map((role) =>
  //   //     role.RoleId === roleId &&
  //   //     role.Menus.find((menu) => menu.MenuId === menuId)
  //   //       ? { ...role, Menus: [...role.Menus, menu] }
  //   //       : role
  //   //   )
  //   // );
  // };

  function GetRoleMenuMapping() {
    helper.xhr
      .Get("/Mapping/GetAllMenus")
      .then((response) => {
        setMenuItems(
          response.allMenus.map((menu: any) => ({
            label: menu.MenuName,
            value: menu.MenuId,
          }))
        );
        setRoles(response.mapping);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    GetRoleMenuMapping();
  }, []);

  return (
    <div className="flex-1 space-y-4 w-full md:w-min-[83vw] md:w-max-[95vw] xl:w-min-[85vw]">
      <div className="flex items-center justify-between">
        <SectionIntro
          title={pageData?.MenuName}
          description={pageData?.Description}
        />
        <div className="grid place-content-center">
          <ButtonComp
            clickEvent={handleSavePermissions}
            text="Save Changes"
            beforeIcon={<Save className="mr-2 h-4 w-4" />}
            type={"dark"}
            isCruding={isCruding}
          />
        </div>
        {/* <Button onClick={handleSavePermissions}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button> */}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            Title: "Total Roles",
            icon: <Users className="h-4 w-4 text-muted-foreground" />,
            Count: roles.length,
            Description: "Active system roles",
          },
          {
            Title: "Menu Items",
            icon: <Menu className="h-4 w-4 text-muted-foreground" />,
            Count: menuItems.length,
            Description: "Available menu items",
          },
          {
            Title: "Permissions",
            icon: <Shield className="h-4 w-4 text-muted-foreground" />,
            Count: roles.reduce((acc, role) => acc + role.Menus.length, 0),
            Description: "Total access rules",
          },
        ].map((card) => (
          <MetricPresentationCard
            key={card.Title}
            Title={card.Title}
            icon={card.icon}
            Count={card.Count}
            Description={card.Description}
          />
        ))}
      </div>

      <Tabs defaultValue="mapping" className="space-y-4 w-full flex flex-col">
        <TabsList className="w-full flex-1">
          {/* <TabsTrigger className="flex-1" value="matrix">
            Access Matrix
          </TabsTrigger> */}
          <TabsTrigger className="flex-1" value="mapping">
            Role Mapping
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="bulk">
            Bulk Operations
          </TabsTrigger>
        </TabsList>

        {/* <TabsContent value="matrix" className="space-y-4 overflow-x-auto w-full">
          <Card>
            <CardHeader>
              <CardTitle>Permission Matrix</CardTitle>
              <CardDescription>
                View and manage permissions for all roles and menu items in a
                matrix format
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full overflow-x-auto">
              <AccessMatrix
                roles={roles}
                menuItems={menuItems}
                onUpdateAccess={handleUpdateRoleAccess}
              />
            </CardContent>
          </Card>
        </TabsContent> */}

        <TabsContent value="mapping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Role-Menu Mapping</CardTitle>
              <CardDescription>
                Configure detailed menu access permissions for each role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RoleMenuMapping
                roles={roles}
                menuItems={menuItems}
                onUpdateAccess={handleUpdateRoleAccess}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Permission Operations</CardTitle>
              <CardDescription>
                Perform bulk operations on role permissions and menu access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BulkPermissions
                roles={roles}
                menuItems={menuItems}
                onUpdateRoles={setRoles}
                onCopyRoles={handleUpdateRoleAccess}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
