"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import ButtonComp from "@/components/utils/Button";
import DateInputTag from "@/components/utils/FormElements/DateInputTag";
import DateTimePicker from "@/components/utils/FormElements/DateTimePicker";
import Dropdown from "@/components/utils/FormElements/Dropdown";
import InputTag from "@/components/utils/FormElements/InputTag";
import MultiSelectDropdown from "@/components/utils/FormElements/MultiSelectDropdown";
import TextArea from "@/components/utils/FormElements/TextArea";
import Toggle from "@/components/utils/FormElements/Toggle";
import Paragraph from "@/components/utils/Headings/Paragraph";
import Subheading from "@/components/utils/Headings/Subheading";
import { zoos } from "@/data/users";
import { formatISOStringDate } from "@/Helper/DateFormats";
import { OPTION } from "@/types/utils";
import { ArrowLeft, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

interface Props {
  mode?: string;
  id?: string;
  tab?: string;
}

const DigitalGuide = ({ mode = "create", id = "0", tab }: Props) => {
  const router = useRouter();
  const [obj, setObj] = useState({
    Id: 0,
    Time: "",
    Title: "",
    ZooId: 0,
    LocationId: 0,
    Description: "",
    IsActive: true,
  });
  const [zooList, setZooList] = useState(
    zoos.map((z, i) => {
      return { value: z.value, label: z.label };
    })
  );
  const [locations, setLocations] = useState<OPTION[]>([]);
  const capitalize = (value: string, space = " ") => {
    const words = String(value).split(space);
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  };

  function GetHeading() {
    return `${capitalize(mode)} - ${capitalize(String(tab), "-")} ${
      id != "0" ? `for ${obj.Title}` : ""
    }`;
  }

  function handleChange(n: string, v: string | boolean | number) {
    setObj({ ...obj, [n]: v });
  }

  const handleNumberChange = (name: string, value: string) => {
    const numValue = Number.parseInt(value) || 0;
    setObj((prev) => ({
      ...prev,
      [name]: numValue,
    }));
  };

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
            <Paragraph
              text="Schedules Information"
              className="tracking-normal"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 gap-y-3">
              <Dropdown
                options={zooList}
                activeId={obj.ZooId}
                name="ZooId"
                handleDropdownChange={handleChange}
                label="Zoo"
              />
              <Dropdown
                options={locations}
                activeId={obj.LocationId}
                name="LocationId"
                handleDropdownChange={handleChange}
                label="Location"
              />

              <InputTag
                value={obj.Title}
                name="Title"
                setter={handleChange}
                label="Title"
              />
              <TextArea
                value={obj.Description}
                name="Description"
                setter={handleChange}
                label="Description"
              />
              <InputTag
                value={obj.Time}
                name="Time"
                setter={handleChange}
                label="Time"
                type="time"
              />
              <Toggle
                value={obj.IsActive}
                name="IsActive"
                setter={handleChange}
                label="Is Active"
              />
            </div>
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

export default DigitalGuide;
