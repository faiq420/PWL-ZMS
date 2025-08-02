"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import ButtonComp from "@/components/utils/Button";
import Dropdown from "@/components/utils/FormElements/Dropdown";
import InputTag from "@/components/utils/FormElements/InputTag";
import TextArea from "@/components/utils/FormElements/TextArea";
import Subheading from "@/components/utils/Headings/Subheading";
import { enclosureTypes, servicesStatus } from "@/data";
import { zoos } from "@/data/users";
import useHelper from "@/Helper/helper";
import { OPTION } from "@/types/utils";
import { ArrowLeft, Save, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const helper = useHelper();
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const [zooList, setZooList] = useState<OPTION[]>(
    zoos.map((z: any) => {
      return {
        value: z.value,
        label: z.label,
      };
    })
  );
  const [locations, setLocations] = useState<OPTION[]>([]);
  const [types, setTypes] = useState<OPTION[]>(enclosureTypes);
  const [statuses, setStatuses] = useState<OPTION[]>(servicesStatus);
  const [obj, setObj] = useState({
    Id: 0,
    Name: "",
    ZooId: 0,
    LocationId: 0,
    Capacity: 0,
    Status: 0,
    TypeId: 0,
    Description: "",
  });

  useEffect(() => {
    if (slug) {
      if (slug != "new" && isNaN(Number(slug))) {
        router.push("/home/enclosure-management");
      }
    }
  }, [slug]);

  const capitalize = (value: string, space = " ") => {
    const words = String(value).split(space);
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  };

  function GetHeading() {
    return `${capitalize(slug == "new" ? "create" : "edit")} - ${capitalize(
      "Enclosure"
    )} ${slug != "new" ? `for ${obj.Name}` : ""}`;
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
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 gap-y-3">
            <InputTag
              value={obj.Name}
              name="Name"
              setter={handleChange}
              label="Enclosure Name"
            />
            <Dropdown
              activeId={obj.ZooId}
              name="ZooId"
              options={zooList}
              handleDropdownChange={handleChange}
              label="Zoo"
            />
            <Dropdown
              activeId={obj.LocationId}
              name="LocationId"
              options={locations}
              handleDropdownChange={handleChange}
              label="Location"
            />
            <Dropdown
              activeId={obj.TypeId}
              name="TypeId"
              options={types}
              handleDropdownChange={handleChange}
              label="Type"
            />
            <Dropdown
              activeId={obj.Status}
              name="Status"
              options={statuses}
              handleDropdownChange={handleChange}
              label="Status"
            />
            <InputTag
              type="number"
              value={obj.Capacity}
              name="Capacity"
              setter={handleChange}
              label="Capacity"
            />
            <div className="col-span-1 md:col-span-2">
              <TextArea
                value={obj.Description}
                name="Description"
                setter={handleChange}
                label="Description"
                placeHolder="Write description here..."
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
                text={slug !== "new" ? "Save" : "Create"}
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

export default Page;
