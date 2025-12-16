import PermissionsComp from "@/components/role-management/permissions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import ButtonComp from "@/components/utils/Button";
import Dropdown from "@/components/utils/FormElements/Dropdown";
import InputTag from "@/components/utils/FormElements/InputTag";
import RadioButton from "@/components/utils/FormElements/RadioButton";
import TextArea from "@/components/utils/FormElements/TextArea";
import Toggle from "@/components/utils/FormElements/Toggle";
import Subheading from "@/components/utils/Headings/Subheading";
import useHelper from "@/Helper/helper";
import { OPTION } from "@/types/utils";
import { ArrowLeft, Delete, Edit, Save, View, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MenuProps } from "../access-control/page";

interface Props {
  mode?: string;
  id?: string;
  tab?: string;
}

export interface MenuExtendedProps extends MenuProps {
  MenuName: string;
}

const RoleCrud = ({ mode = "create", id = "0" }: Props) => {
  const router = useRouter();
  const helper = useHelper();
  const { toast } = useToast();
  const [isCruding, setIsCruding] = useState<boolean>(false);
  const [obj, setObj] = useState({
    RoleId: 0,
    RoleName: "",
    Description: "",
    IsActive: true,
  });
  const [isReplictionChecked, setIsReplicationChecked] =
    useState<boolean>(true);
  const [roles, setRoles] = useState<OPTION[]>([]);
  const data = [
    { label: "Manual Configuration", value: "manual" },
    { label: "Replication", value: "replication" },
  ];
  const [selectedRole, setSelectedRole] = useState<number>(0);
  const [allMenus, setAllMenus] = useState<MenuExtendedProps[]>([]);

  const capitalize = (value: string, space = " ") => {
    const words = String(value).split(space);
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  };

  function GetHeading() {
    return `${capitalize(mode || "")} - ${capitalize(String("Role"), "-")} ${
      id != "0" ? `for ${obj.RoleName}` : ""
    }`;
  }

  function handleChange(n: string, v: string | boolean | number) {
    setObj({ ...obj, [n]: v });
  }

  function HandleSubmit() {
    setIsCruding(true);
    const createObj = {
      obj: obj,
      RoleId: isReplictionChecked ? selectedRole : 0,
      Menus: !isReplictionChecked
        ? allMenus.map((menu) => ({
            MenuId: menu.MenuId,
            View: menu.View,
            Create: menu.Create,
            Edit: menu.Edit,
            Delete: menu.Delete,
          }))
        : [],
    };
    helper.xhr
      .Post(
        `/Roles/${mode === "create" ? "CreateRole" : "UpdateRole"}`,
        helper.ConvertToFormData(mode === "create" ? createObj : obj)
      )
      .then((response) => {
        toast({
          title: `Role ${mode === "edit" ? "updated" : "created"} successfully`,
          description: `Role \"${obj.RoleName}\" ${
            mode === "create" ? "Created" : "Updated"
          } successfully`,
          variant: "success",
        });
        setIsCruding(false);
        setTimeout(() => {
          router.back();
        }, 3000);
      })
      .catch((error) => {
        toast({
          title: `Role Not ${
            mode === "edit" ? "Updated" : "Created"
          } Successfully`,
          description: error.message,
          variant: "success",
        });
        setIsCruding(false);
      });
  }

  useEffect(() => {
    if (id !== "0") {
      GetRoleById();
    }
    GetAllRoles();
    GetAllMenus();
  }, [id]);

  function GetAllRoles() {
    helper.xhr
      .Get("/Roles/GetAllRoles")
      .then((response) => {
        setRoles(
          response.roles.map((role: any) => ({
            label: role.RoleName,
            value: role.RoleId,
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function GetAllMenus() {
    helper.xhr
      .Get("/Menu/GetAllMenus")
      .then((response) => {
        setAllMenus(
          response.menus.map((menu: any) => ({
            MenuId: menu.MenuId,
            MenuName: menu.MenuName,
            View: false,
            Edit: false,
            Create: false,
            Delete: false,
          }))
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function GetRoleById() {
    helper.xhr
      .Get(
        "/Roles/GetRoleById",
        helper.GetURLParamString({ RoleId: Number(id) }).toString()
      )
      .then((response) => {
        setObj(response.role);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleUpdateRoleAccess = (menuAccess: MenuExtendedProps[]) => {
    setAllMenus(menuAccess);
  };

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <Subheading text={GetHeading()} />
          </div>
        </div>
      </div>
      <Card>
        <CardHeader></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-4 gap-2 gap-y-3">
              <InputTag
                label="Role Name"
                value={obj.RoleName}
                setter={handleChange}
                name="RoleName"
                placeHolder="Enter Role Name"
              />
              <div className="col-span-2">
                <InputTag
                  label="Description"
                  value={obj.Description}
                  setter={handleChange}
                  name="Description"
                  placeHolder="Enter Role Description"
                />
              </div>
              <div className="flex items-end h-full">
                <Toggle
                  label="Is Active"
                  value={obj.IsActive}
                  setter={handleChange}
                  name="IsActive"
                />
              </div>
            </div>
          </div>
          {mode !== "edit" && (
            <div className="my-3 space-y-2">
              <span className="text-sm">Access Control</span>
              <RadioButton data={data} setradio={setIsReplicationChecked} />
              {isReplictionChecked ? (
                <div className="grid grid-cols-3">
                  <Dropdown
                    name="Menus"
                    options={roles}
                    activeId={selectedRole}
                    handleDropdownChange={(n, v) => setSelectedRole(Number(v))}
                    label="Roles"
                  />
                </div>
              ) : (
                <PermissionsComp
                  allMenus={allMenus}
                  onUpdateAccess={handleUpdateRoleAccess}
                />
              )}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <div className="w-full flex justify-end">
            <div className="w-full md:w-fit flex space-x-2">
              <ButtonComp
                text={"Cancel"}
                type={"white"}
                clickEvent={() => router.back()}
                beforeIcon={<X className="h-4 w-4" />}
              />
              <ButtonComp
                text={mode == "edit" ? "Save" : "Create"}
                clickEvent={HandleSubmit}
                beforeIcon={<Save className="h-4 w-4" />}
                isCruding={isCruding}
              />
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RoleCrud;
