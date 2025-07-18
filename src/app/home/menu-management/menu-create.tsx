import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import ButtonComp from "@/components/utils/Button";
import Dropdown from "@/components/utils/FormElements/Dropdown";
import InputTag from "@/components/utils/FormElements/InputTag";
import TextArea from "@/components/utils/FormElements/TextArea";
import Toggle from "@/components/utils/FormElements/Toggle";
import Subheading from "@/components/utils/Headings/Subheading";
import { mockMenuItems } from "@/data/menus";
import { iconOptions } from "@/data/zoos";
import useHelper from "@/Helper/helper";
import { OPTION } from "@/types/utils";
import { ArrowLeft, CodeSquare, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  mode?: string;
  id?: string;
}

type MenuItemProps = {
  MenuId: number;
  MenuName: string;
  Path: string;
  IsParent: boolean;
  ParentId: number | null;
  SortingOrder: number;
  IsActive: boolean;
  Icon: string;
  Description: string;
};

const MenuCreate = ({ mode = "create", id = "0" }: Props) => {
  const router = useRouter();
  const helper = useHelper();
  const { toast } = useToast();
  const [menus, setMenus] = useState<OPTION[]>([]);
  const [icons, setIcons] = useState<OPTION[]>([]);
  const [isCruding, setIsCruding] = useState<boolean>(false);
  const [obj, setObj] = useState<MenuItemProps>({
    MenuId: 0,
    MenuName: "",
    Path: "/home/",
    IsParent: false,
    ParentId: null,
    SortingOrder: 0,
    IsActive: true,
    Icon: "",
    Description: "",
  });

  function GetAllMenus() {
    helper.xhr
      .Get("/Menu/GetMenus")
      .then((response) => {
        setMenus(
          response.menus.map((menu: any) => ({
            label: menu.MenuName,
            value: menu.MenuId,
          }))
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function GetAllIcons() {
    try {
      setIcons(
        iconOptions.map((icon: string) => ({
          label: icon,
          value: icon,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    GetAllMenus();
    GetAllIcons();
  }, []);

  useEffect(() => {
    if (id !== "0") {
      GetMenuById();
    }
  }, [id]);

  function GetMenuById() {
    helper.xhr
      .Get(
        "/Menu/GetMenuById",
        helper.GetURLParamString({ MenuId: Number(id) }).toString()
      )
      .then((response) => {
        setObj(response.menu);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const capitalize = (value: string, space = " ") => {
    const words = String(value).split(space);
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  };

  function GetHeading() {
    return `${capitalize(mode)} - ${capitalize(String("Menu"), "-")} ${
      id != "0" ? `for ${obj.MenuName}` : ""
    }`;
  }

  function handleChange(name: string, value: string | number) {
    console.log(value);
    if (
      name === "SortingOrder" &&
      (String(value).includes("-") || Number(value) < 0)
    )
      return;
    setObj((prev: any) => ({ ...prev, [name]: value }));
  }

  function HandleSubmit() {
    setIsCruding(true);
    helper.xhr
      .Post(
        `/Menu/${mode === "create" ? "CreateMenu" : "UpdateMenu"}`,
        helper.ConvertToFormData({ obj: obj })
      )
      .then((response) => {
        console.log(response);
        toast({
          title: `Menu ${mode === "edit" ? "Updated" : "Created"} Successfully`,
          description: `Menu \"${obj.MenuName}\" ${
            mode === "create" ? "Created" : "Updated"
          } Successfully`,
          variant: "success"
        });
      })
      .catch((error) => {
        toast({
          title: `Menu Not ${mode === "edit" ? "Updated" : "Created"} Successfully`,
          description: error.message,
          variant: "danger"
        });
      })
      .finally(() => {
        setIsCruding(false);
        router.back();
      });
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center justify-around">
            <Subheading text={GetHeading()} />
          </div>
        </div>
      </div>
      <Card>
        <CardHeader></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 gap-y-3 items-center">
              <InputTag
                name="MenuName"
                value={obj.MenuName}
                setter={handleChange}
                label="Menu Name"
                placeHolder="Menu Name"
              />
              <InputTag
                name="Path"
                value={obj.Path}
                setter={handleChange}
                label="Menu Path"
                placeHolder="/home/------"
              />
              <Dropdown
                name="ParentId"
                options={menus}
                activeId={obj.ParentId}
                handleDropdownChange={handleChange}
                label="Parent Menu"
              />
              <InputTag
                name="SortingOrder"
                value={obj.SortingOrder}
                setter={handleChange}
                label="Sorting Order"
                type="number"
              />
              <Dropdown
                name="Icon"
                options={icons}
                activeId={obj.Icon}
                handleDropdownChange={handleChange}
                label="Menu Icon"
              />
              <div className="flex h-full items-end">
                <Toggle
                  name="IsActive"
                  value={obj.IsActive}
                  setter={handleChange}
                  label="Is Active"
                />
              </div>
            </div>
            <TextArea
              name="Description"
              value={!!obj.Description ? obj.Description : "" }
              setter={handleChange}
              label="Description"
            />
          </div>
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

export default MenuCreate;
