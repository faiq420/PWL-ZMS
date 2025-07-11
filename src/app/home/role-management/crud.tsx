import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import ButtonComp from "@/components/utils/Button";
import InputTag from "@/components/utils/FormElements/InputTag";
import TextArea from "@/components/utils/FormElements/TextArea";
import Toggle from "@/components/utils/FormElements/Toggle";
import Subheading from "@/components/utils/Headings/Subheading";
import useHelper from "@/Helper/helper";
import { ArrowLeft, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  mode?: string;
  id?: string;
  tab?: string;
}

const RoleCrud = ({ mode = "create", id = "0" }: Props) => {
  const router = useRouter();
  const helper = useHelper();
  const toast = useToast();
  const [isCruding, setIsCruding] = useState<boolean>(false);
  const [obj, setObj] = useState({
    RoleId: 0,
    RoleName: "",
    Description: "",
    IsActive: true,
  });
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
    helper.xhr
      .Post(
        `/Roles/${mode === "create" ? "CreateRole" : "UpdateRole"}`,
        helper.ConvertToFormData({ obj: obj })
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsCruding(false);
        toast.toast({
          title: "Operation Successful",
          description: `Role ${
            mode === "create" ? "Created" : "Updated"
          } Successfully`,
        });
      });
  }

  useEffect(() => {
    if (id !== "0") {
      GetRoleById();
    }
  }, [id]);

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
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 gap-y-3">
              <InputTag
                label="Role Name"
                value={obj.RoleName}
                setter={handleChange}
                name="RoleName"
                placeHolder="Enter Role Name"
              />
              <div className="flex items-end h-full">
                <Toggle
                  label="Is Active"
                  value={obj.IsActive}
                  setter={handleChange}
                  name="IsActive"
                />
              </div>
            </div>
            <TextArea
              label="Description"
              value={obj.Description}
              setter={handleChange}
              name="Description"
              placeHolder="Enter Role Description"
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

export default RoleCrud;
