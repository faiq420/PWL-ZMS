'use client'

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import ButtonComp from "@/components/utils/Button";
import DateTimePicker from "@/components/utils/FormElements/DateTimePicker";
import Dropdown from "@/components/utils/FormElements/Dropdown";
import InputTag from "@/components/utils/FormElements/InputTag";
import NumberInputTag from "@/components/utils/FormElements/NumberInputTag";
import TextArea from "@/components/utils/FormElements/TextArea";
import Paragraph from "@/components/utils/Headings/Paragraph";
import Subheading from "@/components/utils/Headings/Subheading";
import { zoos } from "@/data/users";
import { ArrowLeft, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";

interface Props {
  mode?: string;
  id?: string;
  tab?: string;
}

const Group = ({ mode = "create", id = "0", tab }: Props) => {
  const router = useRouter();
  const [paymentStatus, setPaymentStatus] = useState([
    {
      value: 1,
      label: "Pending",
    },
    {
      value: 2,
      label: "Confirmed",
    },
    {
      value: 3,
      label: "Cancelled",
    },
  ]);
  const [types, setTypes] = useState([
    { value: 1, label: "Education" },
    { value: 2, label: "Corporate" },
    { value: 3, label: "Birthday" },
    { value: 4, label: "Community" },
    { value: 5, label: "Other" },
  ]);
  const [obj, setObj] = useState({
    id: 0,
    name: "",
    date: "",
    groupSize: 1,
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    specialRequirements: "",
    zoo: 0,
  });
  const capitalize = (value: string, space = " ") => {
    const words = String(value).split(space);
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  };

  function GetHeading() {
    return `${capitalize(mode)} - ${capitalize(String(tab), "-")} ${
      id != "0" ? `for ${obj.name}` : ""
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
        <CardContent className="space-y-10">
          <Paragraph text="Group Visit's Detail" className="tracking-normal" />
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 gap-y-3">
            <InputTag
              name="name"
              value={obj.name}
              setter={handleChange}
              label="Group Name"
              placeHolder="Group's Name"
            />
            <DateTimePicker
              value={obj.date}
              setter={handleChange}
              name="date"
              label="Visit Date & Time"
            />
            <NumberInputTag
              name="groupSize"
              value={obj.groupSize}
              setter={handleChange}
              label="Group Size"
              placeHolder="1"
            />
            <InputTag
              name="contactPerson"
              value={obj.contactPerson}
              setter={handleChange}
              label="Contact Person"
              placeHolder="Contact Person's Name"
            />
            <InputTag
              name="contactPhone"
              value={obj.contactPhone}
              setter={handleChange}
              label="Contact Number"
              placeHolder="03xxxxxxxxx"
            />
            <InputTag
              name="contactEmail"
              value={obj.contactEmail}
              setter={handleChange}
              label="Email Address"
              placeHolder="xyz@org.com"
            />

            <Dropdown
              activeId={obj.zoo}
              handleDropdownChange={handleChange}
              name="zoo"
              options={zoos}
              label="Zoo"
            />
            <div className="col-span-1 md:col-span-2">
              <TextArea
                name="specialRequirements"
                value={obj.specialRequirements}
                setter={handleChange}
                label="Special Requirements"
                placeHolder="Special requirements for the trip if any..."
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

export default Group;
