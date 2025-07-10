import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import ButtonComp from "@/components/utils/Button";
import InputTag from "@/components/utils/FormElements/InputTag";
import TextArea from "@/components/utils/FormElements/TextArea";
import Toggle from "@/components/utils/FormElements/Toggle";
import Paragraph from "@/components/utils/Headings/Paragraph";
import Subheading from "@/components/utils/Headings/Subheading";
import { ArrowLeft, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  mode?: string;
  id?: string;
  tab?: string;
}

const RoleCrud = ({ mode = "create", id = "0" }: Props) => {
  const router = useRouter();
  const [obj, setObj] = useState({
    Id: 0,
    Name: "",
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
      id != "0" ? `for ${obj.Name}` : ""
    }`;
  }

  function handleChange(n: string, v: string | boolean | number) {
    setObj({ ...obj, [n]: v });
  }
  function HandleSubmit() {}

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h4 className="text-3xl font-bold tracking-tight">
              <Subheading text={GetHeading()} />
            </h4>
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
                value={obj.Name}
                setter={handleChange}
                name="Name"
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
              />
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RoleCrud;
