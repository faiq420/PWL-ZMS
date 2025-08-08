"use client";
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
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  ChevronLeft,
  ClipboardList,
  Download,
  Droplets,
  Edit,
  GlassWaterIcon,
  HousePlug,
  Info,
  List,
  Plus,
  ThermometerIcon,
  PenToolIcon as Tool,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import useHelper from "@/Helper/helper";
import { useRouter, useSearchParams } from "next/navigation";
import CardIntro from "@/components/utils/Headings/CardIntro";
import Subheading from "@/components/utils/Headings/Subheading";
import ButtonComp from "@/components/utils/Button";
import { changeDateFormat } from "@/Helper/DateFormats";
import { useState } from "react";
import InspectionDetailCard from "./components/InspectionDetailCard";
import EnvironmentControls from "./components/EnvironmentControls";

export default function EnclosureDetailsPage() {
  const helper = useHelper();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [enclosureInspections, setEnclosureInspections] = useState([
    {
      Id: "ENCINS-2023-001",
      Date: "2023-04-15",
      Inspector: "Dr. Sarah Johnson",
      Findings: "All systems functioning optimally. No issues detected.",
      Status: "excellent",
    },
    {
      Id: "ENCINS-2023-001",
      Date: "2023-01-20",
      Inspector: "Dr. Michael Chen",
      Findings:
        "Heating system required minor adjustments. Water filtration working well.",
      Status: "good",
    },
    {
      Id: "ENCINS-2022-048",
      Date: "2022-10-05",
      Inspector: "Dr. Emily Rodriguez",
      Findings:
        "Enrichment structures showing wear. Scheduled for replacement.",
      Status: "fair",
    },
    {
      Id: "ENCINS-2022-032",
      Date: "2022-07-12",
      Inspector: "Dr. Sarah Johnson",
      Findings: "Routine inspection. All parameters within acceptable ranges.",
      Status: "good",
    },
  ]);
  const [animals, setAnimals] = useState([
    {
      Name: "Zara",
      Species: "African Elephant",
      Id: "ANI-001",
      Slug: "ani-001-zara-african-elephant",
    },
    {
      Name: "Dumbo",
      Species: "African Elephant",
      Id: "ANI-007",
      Slug: "ani-007-dumbo-african-elephant",
    },
    {
      Name: "Tembo",
      Species: "African Elephant",
      Id: "ANI-012",
      Slug: "ani-012-tembo-african-elephant",
    },
  ]);
  const [environmentalControls, setEnvironmentalControls] = useState({
    Temperature: "30-35°C",
    Humidity: "60-80%",
    Lighting: "Natural",
    WaterFeatures: "Watering hole",
  });
  const [features, setFeatures] = useState([
    "Watering hole (8m diameter)",
    "Mud wallow area",
    "4 feeding stations",
    "Heated indoor area (150 sq m)",
    "Enrichment structures",
    "Visitor viewing platform",
    "Keeper access points (3)",
  ]);
  const [images, setImages] = useState([
    "/placeholder.svg?height=200&width=200",
    "/placeholder.svg?height=200&width=200",
    "/placeholder.svg?height=200&width=200",
  ]);
  const [enclosure, setEnclosure] = useState({
    Id: "ENC-001",
    Slug: id,
    Name: "Elephant Habitat",
    LastInspection: "2023-04-15",
    NextInspectionDue: "2023-07-15",
    Description:
      "Spacious habitat designed to mimic the African savanna ecosystem. Features a large watering hole, mud wallow, multiple feeding stations, and a heated indoor area for cold weather.",
    EnvironmentalParameters: {
      Temperature: {
        Indoor: "24°C",
        Outdoor: "Ambient",
        Recommended: "18-26°C",
      },
      Humidity: {
        Indoor: "65%",
        Outdoor: "Ambient",
        Recommended: "40-70%",
      },
      Lighting: {
        Type: "Natural + Supplemental",
        Schedule: "0600-1800 supplemental",
        Intensity: "300-500 lux",
      },
      WaterQuality: {
        Ph: "7.2",
        TestFrequency: "Weekly",
        LastTested: "2023-04-10",
      },
    },
    RecentMaintenance: [
      {
        id: "MAINT-2023-005",
        type: "Routine",
        date: "2023-03-22",
        description: "Quarterly substrate replacement and disinfection",
        technician: "James Wilson",
      },
      {
        id: "MAINT-2023-002",
        type: "Repair",
        date: "2023-02-15",
        description: "Fixed water filtration system in main pool",
        technician: "Maria Rodriguez",
      },
      {
        id: "MAINT-2022-045",
        type: "Renovation",
        date: "2022-11-10",
        description: "Added additional shade structures",
        technician: "David Chen",
      },
    ],
    pendingMaintenance: [
      {
        id: "MAINT-REQ-2023-008",
        priority: "medium",
        requestedDate: "2023-04-05",
        description: "Replace worn enrichment structures",
        requestedBy: "Dr. Sarah Johnson",
        scheduledDate: "2023-05-10",
      },
    ],
  });

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/home/veterinary-inspection">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Enclosures
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <Subheading text={enclosure.Name} />
          {/* <p className="text-muted-foreground text-sm">{enclosure.Id}</p> */}
        </div>
        <div className="w-fit">
          <ButtonComp
            text="New Inspection"
            clickEvent={() => {
              router.push(`/home/veterinary-inspection/enclosure-inspection`);
            }}
            type={"white"}
            beforeIcon={<ClipboardList className="h-4 w-4 mr-2" />}
          />
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="environment">Environment</TabsTrigger>
          <TabsTrigger value="animals">Animals</TabsTrigger>
          {/* <TabsTrigger value="maintenance">Maintenance</TabsTrigger> */}
          <TabsTrigger value="inspections">Inspection History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardIntro
                  title="Enclosure Details"
                  description="Basic information about the enclosure"
                />
              </CardHeader>
              <CardContent className="space-y-4 mt-3">
                <div className="">
                  <h3 className="font-medium">Description</h3>
                  <p className="text-muted-foreground text-sm">
                    {enclosure.Description}
                  </p>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium ">Last Inspection</h3>
                    <div className="text-muted-foreground text-sm flex items-center space-x-1 ">
                      <Calendar size={14} />{" "}
                      <span>{changeDateFormat(enclosure.LastInspection)}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium">Next Inspection Due</h3>
                    <p className="text-muted-foreground text-sm flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>
                        {changeDateFormat(enclosure.NextInspectionDue)}
                      </span>
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium">Features</h3>
                  <ul className="mt-2 space-y-1 list-disc pl-5 text-sm">
                    {features.map((feature, index) => (
                      <li key={index} className="text-muted-foreground">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardIntro title="Images" description="Enclosure photographs" />
              </CardHeader>
              <CardContent className="space-y-3 mt-3">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div className="relative h-40 w-full">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Enclosure image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="animals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardIntro
                title="Housed Animals"
                description="Animals currently in this enclosure"
              />
            </CardHeader>
            <CardContent className="mt-3">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {animals.map((animal, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative h-40">
                      <Image
                        src="/placeholder.svg?height=200&width=200"
                        alt={animal.Name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start font-poppins">
                        <div>
                          <CardTitle className="font-medium text-xl">
                            {animal.Name}
                          </CardTitle>
                          <CardDescription className="text-xs">
                            {animal.Species}
                          </CardDescription>
                        </div>
                        <div className="text-sm font-medium">
                          ID: {animal.Id}
                        </div>
                      </div>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                      <ButtonComp
                        text="View Health Records"
                        type={"white"}
                        // beforeIcon={<ClipboardList className="h-4 w-4" />}
                        clickEvent={() => {
                          router.push(
                            `/home/veterinary-inspection/health-record?id=${animal.Slug}`
                          );
                        }}
                      />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardIntro
                title="Environmental Parameters"
                description="Climate and environmental controls for the enclosure"
              />
            </CardHeader>
            <CardContent className="space-y-4 mt-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EnvironmentControls
                  Icon={ThermometerIcon}
                  Title="Temperature"
                  Metric={environmentalControls.Temperature}
                  iconColor="text-blue-600"
                  bgColor="bg-blue-100"
                />
                <EnvironmentControls
                  Icon={Droplets}
                  Title="Humidity"
                  Metric={environmentalControls.Humidity}
                  iconColor="text-green-600"
                  bgColor="bg-green-100"
                />
                <EnvironmentControls
                  Icon={HousePlug}
                  Title="Lighting"
                  Metric={environmentalControls.Lighting}
                  iconColor="text-yellow-600"
                  bgColor="bg-yellow-100"
                />
                <EnvironmentControls
                  Icon={GlassWaterIcon}
                  Title="Water Features"
                  Metric={environmentalControls.WaterFeatures}
                  iconColor="text-cyan-600"
                  bgColor="bg-cyan-100"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Pending Maintenance</CardTitle>
                <CardDescription>
                  Scheduled and requested maintenance tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enclosure.pendingMaintenance.length > 0 ? (
                    enclosure.pendingMaintenance.map((maintenance, index) => (
                      <div
                        key={index}
                        className="flex gap-4 border rounded-lg p-4"
                      >
                        <div
                          className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${
                            maintenance.priority === "high"
                              ? "bg-red-100 text-red-800"
                              : maintenance.priority === "medium"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          <Tool className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{maintenance.id}</h3>
                            <Badge
                              className={
                                maintenance.priority === "high"
                                  ? "bg-red-100 text-red-800 hover:bg-red-100"
                                  : maintenance.priority === "medium"
                                  ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                  : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              }
                            >
                              {maintenance.priority.charAt(0).toUpperCase() +
                                maintenance.priority.slice(1)}{" "}
                              Priority
                            </Badge>
                          </div>
                          <p className="text-sm mt-1">
                            {maintenance.description}
                          </p>
                          <div className="text-xs text-muted-foreground mt-2">
                            Requested by {maintenance.requestedBy} on{" "}
                            {maintenance.requestedDate}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Scheduled: {maintenance.scheduledDate}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-muted-foreground">
                        No pending maintenance tasks
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Request Maintenance
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Maintenance History</CardTitle>
                <CardDescription>
                  Completed maintenance and repairs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enclosure.RecentMaintenance.map((maintenance, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{maintenance.id}</h3>
                        <span className="text-sm text-muted-foreground">
                          {maintenance.date}
                        </span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Badge variant="outline" className="mr-2">
                          {maintenance.type}
                        </Badge>
                        <span className="text-sm">
                          {maintenance.description}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Technician: {maintenance.technician}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Complete History
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inspections" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-end">
                <CardIntro
                  title="Inspection History"
                  description="Previous enclosure inspections and findings"
                />
                <div className="w-fit">
                  <ButtonComp
                    type={"white"}
                    text="New Inspection"
                    beforeIcon={<Plus className="h-4 w-4" />}
                    clickEvent={() => {
                      router.push(
                        `/home/veterinary-inspection/enclosure-inspection?id=${enclosure.Id}`
                      );
                    }}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="mt-3">
              <div className="space-y-4">
                {enclosureInspections.map((inspection, index) => (
                  <InspectionDetailCard key={index} inspection={inspection} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
