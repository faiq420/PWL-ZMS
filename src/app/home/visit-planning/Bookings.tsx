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
import Paragraph from "@/components/utils/Headings/Paragraph";
import Subheading from "@/components/utils/Headings/Subheading";
import { zoos } from "@/data/users";
import { formatISOStringDate } from "@/Helper/DateFormats";
import { ArrowLeft, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

interface Props {
  mode?: string;
  id?: string;
  tab?: string;
}

const Bookings = ({ mode = "create", id = "0", tab }: Props) => {
  const router = useRouter();
  const [prices, setPrices] = useState({
    adult: 200,
    child: 100,
    senior: 150,
    familyPack: 500,
  });
  const [visitType, setVisitType] = useState([
    { label: "Zoo Visit", value: "casual" },
    { label: "Event Visit", value: "event" },
  ]);
  const [events, setEvents] = useState([
    { label: "Event1 (10:00 AM - 12:00 PM)", value: "event1" },
    { label: "Event2 (10:00 AM - 12:00 PM)", value: "event2" },
    { label: "Event3 (12:00 PM - 02:00 PM)", value: "event3" },
    { label: "Event4 (01:00 PM - 03:00 PM)", value: "event4" },
    { label: "Event5 (04:00 PM - 06:00 PM)", value: "event5" },
    { label: "Event6 (05:00 PM - 05:30 PM)", value: "event6" },
  ]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<number[]>([]);
  const [obj, setObj] = useState({
    id: 0,
    visitorName: "",
    email: "",
    phone: "",
    zoo: "",
    date: "",
    adults: 0,
    children: 0,
    seniors: 0,
    familyPacks: 0,
    total: 0,
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
      id != "0" ? `for ${obj.visitorName}` : ""
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

  const calculateTotal = () => {
    const adults = typeof obj.adults === "number" ? obj.adults : 0;
    const children = typeof obj.children === "number" ? obj.children : 0;
    const seniors = typeof obj.seniors === "number" ? obj.seniors : 0;
    const familyPacks =
      typeof obj.familyPacks === "number" ? obj.familyPacks : 0;

    const total =
      adults * prices.adult +
      children * prices.child +
      seniors * prices.senior +
      familyPacks * prices.familyPack;

    setObj((prev) => ({
      ...prev,
      total,
    }));
  };

  useEffect(() => {
    calculateTotal();
  }, [obj.adults, obj.children, obj.seniors, obj.familyPacks]);

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
              text="Visitor's Information"
              className="tracking-normal"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 gap-y-3">
              <InputTag
                name="visitorName"
                value={obj.visitorName}
                setter={handleChange}
                label="Visitor Name"
                placeHolder="Visitor's Name"
              />
              <DateTimePicker
                value={obj.date}
                setter={handleChange}
                name="date"
                label="Visit Date & Time"
              />
              <InputTag
                name="phone"
                value={obj.phone}
                setter={handleChange}
                label="Contact Number"
                placeHolder="03xxxxxxxxx"
                type="phone"
              />
              <InputTag
                name="email"
                value={obj.email}
                setter={handleChange}
                label="Email Address"
                placeHolder="xyz@org.com"
                type="email"
              />
              <Dropdown
                activeId={obj.zoo}
                options={zoos}
                handleDropdownChange={handleChange}
                name="zoo"
                label="Zoo"
              />
              <Dropdown
                activeId={selectedType}
                options={visitType}
                handleDropdownChange={(n, v) => {
                  setSelectedType(String(v));
                }}
                name="type"
                label="Booking For"
              />
            </div>
            {selectedType == "event" && (
              <MultiSelectDropdown
                selectedIds={selectedEvents}
                handleDropdownChange={(n, v) => {
                  setSelectedEvents(v);
                }}
                key={"value"}
                options={events}
                name=""
                label="Events"
              />
            )}
          </div>
          <div className="space-y-2">
            <Paragraph text="Ticket Types" className="tracking-normal" />
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2">
              <div className="flex items-center justify-between border rounded-md p-3">
                <div>
                  <div className="font-medium text-sm">Child</div>
                  <div className="text-xs text-muted-foreground">Ages 3-17</div>
                </div>
                <div className="flex items-center">
                  <div className="font-medium mr-4 text-sm">
                    {prices.child} PKR
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        handleNumberChange(
                          "children",
                          Math.max(0, obj.children - 1).toString()
                        )
                      }
                      disabled={obj.children <= 0}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center text-sm">
                      {obj.children.toString().padStart(2, "0")}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        handleNumberChange(
                          "children",
                          (obj.children + 1).toString()
                        )
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between border rounded-md p-3">
                <div>
                  <div className="font-medium text-sm">Adult</div>
                  <div className="text-xs text-muted-foreground">Ages 18+</div>
                </div>
                <div className="flex items-center">
                  <div className="font-medium mr-4 text-sm">
                    {prices.adult} PKR
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        handleNumberChange(
                          "adults",
                          Math.max(0, obj.adults - 1).toString()
                        )
                      }
                      disabled={obj.adults <= 0}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center text-sm">
                      {obj.adults.toString().padStart(2, "0")}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        handleNumberChange(
                          "adults",
                          (obj.adults + 1).toString()
                        )
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between border rounded-md p-3">
                <div>
                  <div className="font-medium text-sm">Senior</div>
                  <div className="text-xs text-muted-foreground">Ages 50+</div>
                </div>
                <div className="flex items-center">
                  <div className="font-medium mr-4 text-sm">
                    {prices.senior} PKR
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        handleNumberChange(
                          "seniors",
                          Math.max(0, obj.seniors - 1).toString()
                        )
                      }
                      disabled={obj.seniors <= 0}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center text-sm">
                      {obj.seniors.toString().padStart(2, "0")}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        handleNumberChange(
                          "seniors",
                          (obj.seniors + 1).toString()
                        )
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between border rounded-md p-3">
                <div>
                  <div className="font-medium text-sm">Family Pack</div>
                  <div className="text-xs text-muted-foreground">
                    2 Adults + 2 Children
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="font-medium mr-4 text-sm">
                    {prices.familyPack} PKR
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        handleNumberChange(
                          "familyPacks",
                          Math.max(0, obj.familyPacks - 1).toString()
                        )
                      }
                      disabled={obj.familyPacks <= 0}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center text-sm">
                      {obj.familyPacks.toString().padStart(2, "0")}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        handleNumberChange(
                          "familyPacks",
                          (obj.familyPacks + 1).toString()
                        )
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t pt-4 w-full flex justify-end">
            <div className="w-full md:w-1/4">
              <div className="font-medium text-sm font-poppins">
                Total:{" "}
                <span className="text-muted-foreground">{obj.total} PKR</span>
              </div>
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

export default Bookings;
