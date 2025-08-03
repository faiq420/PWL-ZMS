"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ButtonComp from "@/components/utils/Button";
import SearchTag from "@/components/utils/FormElements/SearchTag";
import CardIntro from "@/components/utils/Headings/CardIntro";
import Subheading from "@/components/utils/Headings/Subheading";
import { mockAnimals } from "@/data/animals";
import { changeDateFormat } from "@/Helper/DateFormats";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock,
  MapPinnedIcon,
  Plus,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import MaintenanceModal from "./components/MaintenanceModal";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [obj, setObj] = useState({
    Id: Number(id),
    Name: "Elephant Savannah",
    Zoo: "Lahore Zoo",
    Location: "Elephant Savannah Enclosure",
    Capacity: 4,
    Status: "Operational",
    Type: "Open",
    Description:
      "A large open-air exhibit mimicking the African savanna with mixed species habitation.",
    Temperature: "Ambient",
    Humidity: "Natural",
    Lighting: "Natural with night lighting",
    WaterFeatures: "Watering hole and stream",
  });
  const [openMaintenanceModal, setOpenMaintenanceModal] = useState(false);
  const [maintenanceTasks, setMaintenanceTasks] = useState([
    {
      Id: 1,
      Title: "Habitat Cleaning",
      Description: "Complete cleaning of the habitat area",

      Priority: "high",
      AssignedTo: "Abdul Bari",
      CompletedAt: "2023-04-15T10:30:00Z",
      DueDate: "2023-04-15T09:00:00Z",
    },
    {
      Id: 2,
      Title: "Water System Maintenance",
      Description: "Check and clean water filtration system",

      Priority: "medium",
      AssignedTo: "Hadi Sheikh",
      CompletedAt: null,
      DueDate: "2023-05-20T14:00:00Z",
    },
    {
      Id: 3,
      Title: "Vegetation Replacement",
      Description: "Replace damaged vegetation with new plants",

      Priority: "low",
      AssignedTo: "Michael Brown",
      CompletedAt: null,
      DueDate: "2023-05-10T11:00:00Z",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const enclosureAnimals = mockAnimals.filter(
    (animal) => Number(animal.enclosureId) === obj.Id
  );

  const filteredAnimals = enclosureAnimals.filter(
    (animal) =>
      animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.species.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <MaintenanceModal
        isOpen={openMaintenanceModal}
        onClose={() => {
          setOpenMaintenanceModal(false);
        }}
        onSubmit={() => {}}
      />
      <div className="flex-1 space-y-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <Subheading text={obj.Name} />
            <div className="text-muted-foreground text-sm flex space-x-2 items-center">
              <MapPinnedIcon size={14} />
              <span>
                {obj.Zoo}, {obj.Location}
              </span>
            </div>
          </div>
        </div>
        <Tabs defaultValue="details" className="space-y-4">
          <TabsList className="w-full">
            <TabsTrigger value="details" className="flex-1">
              Details
            </TabsTrigger>
            <TabsTrigger value="animals" className="flex-1">
              Animals
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="flex-1">
              Maintenance
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <div className="grid gap-3 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardIntro
                    title="Basic Information"
                    description="General details about the enclosure"
                  />
                </CardHeader>
                <CardContent className="space-y-4 mt-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Type
                      </h4>
                      <p className="">{obj.Type}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Capacity
                      </h4>
                      <p className="">{obj.Capacity} animals</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Description
                    </h4>
                    <p className="text-sm">{obj.Description}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardIntro
                    title="Environmental Controls"
                    description="Environmental settings for the enclosure"
                  />
                </CardHeader>
                <CardContent className="space-y-2 mt-3">
                  <div className="">
                    <h4 className="text-sm font-medium capitalize">
                      Temperature
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {obj.Temperature}
                    </p>
                  </div>
                  <div className="">
                    <h4 className="text-sm font-medium capitalize">Humidity</h4>
                    <p className="text-sm text-muted-foreground">
                      {obj.Humidity}
                    </p>
                  </div>
                  <div className="">
                    <h4 className="text-sm font-medium capitalize">Lighting</h4>
                    <p className="text-sm text-muted-foreground">
                      {obj.Lighting}
                    </p>
                  </div>
                  <div className="">
                    <h4 className="text-sm font-medium capitalize">
                      Water Features
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {obj.WaterFeatures}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="animals">
            <Card>
              <CardHeader>
                <CardIntro
                  title="Animals in this Enclosure"
                  description={`${enclosureAnimals.length} animals currently housed in this
                enclosure`}
                />

                <div className="relative mt-3">
                  <SearchTag
                    value={searchQuery}
                    setter={setSearchQuery}
                    placeHolder="Search animals..."
                  />
                </div>
              </CardHeader>
              <CardContent>
                {filteredAnimals.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-3">
                    {filteredAnimals.map((animal) => (
                      // <Link
                      //   key={animal.id}
                      //   href={`/home/animal-directory/${animal.slug}`}
                      //   className="group"
                      // >
                      <div
                        key={animal.id}
                        className="group overflow-hidden rounded-lg border transition-colors group-hover:border-primary"
                      >
                        <div className="relative h-48 w-full">
                          <Image
                            src={
                              animal.imageUrl ||
                              `/placeholder.svg?height=192&width=384`
                            }
                            alt={animal.name}
                            fill
                            className="object-cover"
                          />
                          <p className="text-[10px] absolute top-3 right-3 font-poppins font-medium bg-white py-1 px-2 rounded-full shadow">
                            {animal.healthStatus}
                          </p>
                        </div>
                        <div className="p-4 font-poppins">
                          <h3 className="font-medium text-sm group-hover:text-primary">
                            {animal.name}
                          </h3>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">
                              {animal.species}
                            </p>
                          </div>
                        </div>
                      </div>
                      // </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed">
                    <p className="text-center text-muted-foreground">
                      {enclosureAnimals.length === 0
                        ? "No animals in this enclosure yet"
                        : "No animals match your search"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="maintenance">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-end">
                  <CardIntro
                    title="Maintenance Schedules"
                    description={`View & Manage maintenance schedules.`}
                  />
                  <div className="w-fit">
                    <ButtonComp
                      text="Add Schedule"
                      clickEvent={() => {
                        setOpenMaintenanceModal(true);
                      }}
                      beforeIcon={<Plus size={16} />}
                      type={"dark"}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 mt-3 font-roboto">
                {maintenanceTasks.map((task) => (
                  <Card key={task.Id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base font-medium">
                            {task.Title}
                          </CardTitle>
                          <CardDescription>{task.Description}</CardDescription>
                        </div>
                        <Badge
                          variant={
                            task.CompletedAt !== null ? "default" : "outline"
                          }
                          className="capitalize"
                        >
                          {task.CompletedAt == null ? "Scheduled" : "Completed"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2 font-syne">
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Due: {changeDateFormat(task.DueDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Wrench className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm capitalize">
                            Priority: {task.Priority}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {task.CompletedAt
                              ? `Completed: ${changeDateFormat(
                                  task.CompletedAt
                                )}`
                              : "Not completed"}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <Separator />
                    <CardFooter className="flex justify-between pt-4">
                      <div className="text-sm text-muted-foreground font-syne">
                        Assigned to: {task.AssignedTo}
                      </div>
                      {task.CompletedAt == null && (
                        <Button variant="outline" size="sm">
                          <Check className="mr-2 h-4 w-4" />
                          Mark Complete
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Page;
