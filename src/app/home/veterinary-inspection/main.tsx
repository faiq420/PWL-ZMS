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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Check,
  ClipboardList,
  Download,
  FileText,
  Filter,
  Plus,
  Search,
  Stethoscope,
  Upload,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import SectionIntro from "@/components/utils/Headings/SectionIntro";
import useHelper from "@/Helper/helper";

export default function VeterinaryInspectionPage() {
  const helper = useHelper();
  const pageData = helper.GetPageData();
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <SectionIntro
          title={pageData?.MenuName}
          description={pageData?.Description}
        />
        <Button className="bg-green-700 hover:bg-green-800" asChild>
          <Link href="/home/veterinary-inspection/new">
            <Plus className="mr-2 h-4 w-4" /> New Inspection
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="inspections" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inspections">Inspections</TabsTrigger>
          {/* <TabsTrigger value="health">Health Records</TabsTrigger> */}
          {/* <TabsTrigger value="enclosures">Enclosures</TabsTrigger> */}
          {/* <TabsTrigger value="reports">Reports</TabsTrigger> */}
        </TabsList>

        <TabsContent value="inspections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inspection Management</CardTitle>
              <CardDescription>
                Schedule, track, and manage animal health inspections
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search inspections..."
                    className="w-full pl-8"
                  />
                </div>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" /> More Filters
                  </Button>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          ID
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Animal
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Species
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Inspector
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Date
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Status
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {[
                        {
                          id: "INS-2023-001",
                          slug: "ins-2023-001-zara-african-elephant",
                          animal: "Zara",
                          species: "African Elephant",
                          inspector: "Dr. Sarah Johnson",
                          date: "2023-04-15",
                          status: "completed",
                        },
                        {
                          id: "INS-2023-002",
                          slug: "ins-2023-002-raja-bengal-tiger",
                          animal: "Raja",
                          species: "Bengal Tiger",
                          inspector: "Dr. Michael Chen",
                          date: "2023-04-18",
                          status: "completed",
                        },
                        {
                          id: "INS-2023-003",
                          slug: "ins-2023-003-leo-african-lion",
                          animal: "Leo",
                          species: "African Lion",
                          inspector: "Dr. Sarah Johnson",
                          date: "2023-04-20",
                          status: "completed",
                        },
                        {
                          id: "INS-2023-004",
                          slug: "ins-2023-004-bubbles-bottlenose-dolphin",
                          animal: "Bubbles",
                          species: "Bottlenose Dolphin",
                          inspector: "Dr. Emily Rodriguez",
                          date: "2023-04-25",
                          status: "scheduled",
                        },
                        {
                          id: "INS-2023-005",
                          slug: "ins-2023-005-koko-western-gorilla",
                          animal: "Koko",
                          species: "Western Gorilla",
                          inspector: "Dr. Michael Chen",
                          date: "2023-04-10",
                          status: "overdue",
                        },
                        {
                          id: "INS-2023-006",
                          slug: "ins-2023-006-melman-reticulated-giraffe",
                          animal: "Melman",
                          species: "Reticulated Giraffe",
                          inspector: "Dr. Sarah Johnson",
                          date: "2023-04-30",
                          status: "scheduled",
                        },
                        {
                          id: "INS-2023-007",
                          slug: "ins-2023-007-spike-komodo-dragon",
                          animal: "Spike",
                          species: "Komodo Dragon",
                          inspector: "Dr. Emily Rodriguez",
                          date: "2023-04-05",
                          status: "completed",
                        },
                      ].map((inspection) => (
                        <tr
                          key={inspection.id}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted cursor-pointer"
                          onClick={() => {}}
                        >
                          <td className="p-4 align-middle">{inspection.id}</td>
                          <td className="p-4 align-middle">
                            <Link
                              href={`/home/veterinary-inspection/${inspection.slug}`}
                              className="hover:underline"
                            >
                              {inspection.animal}
                            </Link>
                          </td>
                          <td className="p-4 align-middle">
                            {inspection.species}
                          </td>
                          <td className="p-4 align-middle">
                            {inspection.inspector}
                          </td>
                          <td className="p-4 align-middle">
                            {inspection.date}
                          </td>
                          <td className="p-4 align-middle">
                            <Badge
                              className={
                                inspection.status === "completed"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : inspection.status === "scheduled"
                                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                  : inspection.status === "overdue"
                                  ? "bg-red-100 text-red-800 hover:bg-red-100"
                                  : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                              }
                            >
                              {inspection.status.charAt(0).toUpperCase() +
                                inspection.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link
                                  href={`/home/veterinary-inspection/${inspection.slug}`}
                                >
                                  View
                                </Link>
                              </Button>
                              <Button variant="outline" size="sm" asChild>
                                <Link
                                  href={`/home/veterinary-inspection/${inspection.slug}/edit`}
                                >
                                  Edit
                                </Link>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Inspections</CardTitle>
                <CardDescription>
                  Scheduled inspections for the next 7 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      animal: "Bubbles",
                      species: "Bottlenose Dolphin",
                      date: "2023-04-25",
                      time: "10:00 AM",
                      inspector: "Dr. Emily Rodriguez",
                      slug: "ins-2023-004-bubbles-bottlenose-dolphin",
                    },
                    {
                      animal: "Melman",
                      species: "Reticulated Giraffe",
                      date: "2023-04-30",
                      time: "2:00 PM",
                      inspector: "Dr. Sarah Johnson",
                      slug: "ins-2023-006-melman-reticulated-giraffe",
                    },
                  ].map((inspection, index) => (
                    <div
                      key={index}
                      className="flex gap-4 border rounded-lg p-4"
                    >
                      <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 bg-blue-100 text-blue-800 rounded-full">
                        <Calendar className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">
                          <Link
                            href={`/home/veterinary-inspection/${inspection.slug}`}
                            className="hover:underline"
                          >
                            {inspection.animal} ({inspection.species})
                          </Link>
                        </h3>
                        <div className="text-sm text-muted-foreground mt-1">
                          {inspection.date} at {inspection.time}
                        </div>
                        <div className="text-sm mt-1">
                          Inspector: {inspection.inspector}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Calendar className="mr-2 h-4 w-4" /> View Full Schedule
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inspection Templates</CardTitle>
                <CardDescription>
                  Standardized templates for different species
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Mammal General Health",
                      fields: 24,
                      lastUpdated: "2023-03-10",
                    },
                    {
                      name: "Avian Health Assessment",
                      fields: 18,
                      lastUpdated: "2023-02-22",
                    },
                    {
                      name: "Reptile Inspection",
                      fields: 20,
                      lastUpdated: "2023-03-05",
                    },
                    {
                      name: "Aquatic Species Health",
                      fields: 22,
                      lastUpdated: "2023-03-15",
                    },
                  ].map((template) => (
                    <div
                      key={template.name}
                      className="flex gap-4 border rounded-lg p-4"
                    >
                      <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 bg-gray-100 rounded-full">
                        <ClipboardList className="h-6 w-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{template.name}</h3>
                        <div className="text-sm text-muted-foreground mt-1">
                          {template.fields} fields • Last updated:{" "}
                          {template.lastUpdated}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Create New Template
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Animal Health Records</CardTitle>
              <CardDescription>
                Comprehensive health records for all animals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search animals..."
                    className="w-full pl-8"
                  />
                </div>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Species" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mammals">Mammals</SelectItem>
                      <SelectItem value="birds">Birds</SelectItem>
                      <SelectItem value="reptiles">Reptiles</SelectItem>
                      <SelectItem value="amphibians">Amphibians</SelectItem>
                      <SelectItem value="fish">Fish</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" /> More Filters
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: "Zara",
                    id: "ANI-001",
                    slug: "ani-001-zara-african-elephant",
                    species: "African Elephant",
                    age: "15 years",
                    status: "healthy",
                    lastCheck: "2023-04-15",
                    image: "/placeholder.svg?height=200&width=200",
                  },
                  {
                    name: "Raja",
                    id: "ANI-002",
                    slug: "ani-002-raja-bengal-tiger",
                    species: "Bengal Tiger",
                    age: "8 years",
                    status: "treatment",
                    lastCheck: "2023-04-18",
                    image: "/placeholder.svg?height=200&width=200",
                  },
                  {
                    name: "Leo",
                    id: "ANI-003",
                    slug: "ani-003-leo-african-lion",
                    species: "African Lion",
                    age: "12 years",
                    status: "healthy",
                    lastCheck: "2023-04-20",
                    image: "/placeholder.svg?height=200&width=200",
                  },
                  {
                    name: "Bubbles",
                    id: "ANI-004",
                    slug: "ani-004-bubbles-bottlenose-dolphin",
                    species: "Bottlenose Dolphin",
                    age: "10 years",
                    status: "monitoring",
                    lastCheck: "2023-03-25",
                    image: "/placeholder.svg?height=200&width=200",
                  },
                  {
                    name: "Koko",
                    id: "ANI-005",
                    slug: "ani-005-koko-western-gorilla",
                    species: "Western Gorilla",
                    age: "18 years",
                    status: "healthy",
                    lastCheck: "2023-03-10",
                    image: "/placeholder.svg?height=200&width=200",
                  },
                  {
                    name: "Melman",
                    id: "ANI-006",
                    slug: "ani-006-melman-reticulated-giraffe",
                    species: "Reticulated Giraffe",
                    age: "7 years",
                    status: "healthy",
                    lastCheck: "2023-03-30",
                    image: "/placeholder.svg?height=200&width=200",
                  },
                ].map((animal) => (
                  <Card key={animal.id} className="overflow-hidden">
                    <div className="relative h-40">
                      <Image
                        src={animal.image || "/placeholder.svg"}
                        alt={animal.name}
                        fill
                        className="object-cover"
                      />
                      <div
                        className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                          animal.status === "healthy"
                            ? "bg-green-100 text-green-800"
                            : animal.status === "monitoring"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {animal.status.charAt(0).toUpperCase() +
                          animal.status.slice(1)}
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{animal.name}</CardTitle>
                          <CardDescription>{animal.species}</CardDescription>
                        </div>
                        <div className="text-sm font-medium">
                          ID: {animal.id}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Age:</span>
                          <span>{animal.age}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Last Check:
                          </span>
                          <span>{animal.lastCheck}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          href={`/home/veterinary-inspection/health/${animal.slug}`}
                        >
                          View Records
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Stethoscope className="h-4 w-4 mr-2" /> New Check
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="enclosures" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Enclosure Assessments</CardTitle>
              <CardDescription>
                Monitor and manage animal enclosure conditions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search enclosures..."
                    className="w-full pl-8"
                  />
                </div>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Needs Attention</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" /> More Filters
                  </Button>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          ID
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Enclosure
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Zone
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Animals
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Last Inspection
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Status
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {[
                        {
                          id: "ENC-001",
                          slug: "enc-001-elephant-habitat",
                          name: "Elephant Habitat",
                          zone: "African Savanna",
                          animals: "3 African Elephants",
                          lastInspection: "2023-04-15",
                          status: "excellent",
                        },
                        {
                          id: "ENC-002",
                          slug: "enc-002-tiger-enclosure",
                          name: "Tiger Enclosure",
                          zone: "Asian Forest",
                          animals: "2 Bengal Tigers",
                          lastInspection: "2023-04-18",
                          status: "good",
                        },
                        {
                          id: "ENC-003",
                          slug: "enc-003-lion-pride",
                          name: "Lion Pride",
                          zone: "African Savanna",
                          animals: "4 African Lions",
                          lastInspection: "2023-04-20",
                          status: "good",
                        },
                        {
                          id: "ENC-004",
                          slug: "enc-004-dolphin-pool",
                          name: "Dolphin Pool",
                          zone: "Marine Zone",
                          animals: "5 Bottlenose Dolphins",
                          lastInspection: "2023-03-25",
                          status: "fair",
                        },
                        {
                          id: "ENC-005",
                          slug: "enc-005-gorilla-habitat",
                          name: "Gorilla Habitat",
                          zone: "Rainforest",
                          animals: "6 Western Gorillas",
                          lastInspection: "2023-03-10",
                          status: "poor",
                        },
                        {
                          id: "ENC-006",
                          slug: "enc-006-giraffe-yard",
                          name: "Giraffe Yard",
                          zone: "African Savanna",
                          animals: "4 Reticulated Giraffes",
                          lastInspection: "2023-03-30",
                          status: "good",
                        },
                        {
                          id: "ENC-007",
                          slug: "enc-007-reptile-house",
                          name: "Reptile House",
                          zone: "Herpetology",
                          animals: "12 Various Reptiles",
                          lastInspection: "2023-04-05",
                          status: "fair",
                        },
                      ].map((enclosure) => (
                        <tr
                          key={enclosure.id}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted cursor-pointer"
                        >
                          <td className="p-4 align-middle">{enclosure.id}</td>
                          <td className="p-4 align-middle">
                            <Link
                              href={`/home/veterinary-inspection/enclosures/${enclosure.slug}`}
                              className="hover:underline"
                            >
                              {enclosure.name}
                            </Link>
                          </td>
                          <td className="p-4 align-middle">{enclosure.zone}</td>
                          <td className="p-4 align-middle">
                            {enclosure.animals}
                          </td>
                          <td className="p-4 align-middle">
                            {enclosure.lastInspection}
                          </td>
                          <td className="p-4 align-middle">
                            <Badge
                              className={
                                enclosure.status === "excellent"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : enclosure.status === "good"
                                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                  : enclosure.status === "fair"
                                  ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                  : "bg-red-100 text-red-800 hover:bg-red-100"
                              }
                            >
                              {enclosure.status.charAt(0).toUpperCase() +
                                enclosure.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link
                                  href={`/home/veterinary-inspection/enclosures/${enclosure.slug}`}
                                >
                                  View
                                </Link>
                              </Button>
                              <Button variant="outline" size="sm" asChild>
                                <Link
                                  href={`/home/veterinary-inspection/enclosures/${enclosure.slug}/inspect`}
                                >
                                  Inspect
                                </Link>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Requests</CardTitle>
                <CardDescription>
                  Pending maintenance for enclosures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      enclosure: "Gorilla Habitat",
                      slug: "enc-005-gorilla-habitat",
                      issue: "Damaged climbing structure",
                      priority: "high",
                      requestedBy: "Dr. Michael Chen",
                      requestDate: "2023-04-12",
                    },
                    {
                      enclosure: "Reptile House",
                      slug: "enc-007-reptile-house",
                      issue: "Temperature control malfunction",
                      priority: "medium",
                      requestedBy: "Dr. Emily Rodriguez",
                      requestDate: "2023-04-08",
                    },
                    {
                      enclosure: "Dolphin Pool",
                      slug: "enc-004-dolphin-pool",
                      issue: "Water filtration system needs service",
                      priority: "medium",
                      requestedBy: "Dr. Emily Rodriguez",
                      requestDate: "2023-04-02",
                    },
                  ].map((request, index) => (
                    <div
                      key={index}
                      className="flex gap-4 border rounded-lg p-4"
                    >
                      <div
                        className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${
                          request.priority === "high"
                            ? "bg-red-100 text-red-800"
                            : request.priority === "medium"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        <span className="text-xs font-bold uppercase">
                          {request.priority.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">
                          <Link
                            href={`/home/veterinary-inspection/enclosures/${request.slug}`}
                            className="hover:underline"
                          >
                            {request.enclosure}
                          </Link>
                        </h3>
                        <p className="text-sm mt-1">{request.issue}</p>
                        <div className="text-xs text-muted-foreground mt-2">
                          Requested by {request.requestedBy} on{" "}
                          {request.requestDate}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <Button variant="outline" size="sm">
                          <Check className="h-4 w-4 mr-2" /> Mark Complete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> New Maintenance Request
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Environmental Monitoring</CardTitle>
                <CardDescription>
                  Real-time environmental conditions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      enclosure: "Tropical Rainforest",
                      slug: "env-001-tropical-rainforest",
                      temperature: "78°F",
                      humidity: "85%",
                      status: "optimal",
                    },
                    {
                      enclosure: "Desert Habitat",
                      slug: "env-002-desert-habitat",
                      temperature: "92°F",
                      humidity: "15%",
                      status: "optimal",
                    },
                    {
                      enclosure: "Polar Zone",
                      slug: "env-003-polar-zone",
                      temperature: "34°F",
                      humidity: "60%",
                      status: "warning",
                    },
                    {
                      enclosure: "Aquatic Tanks",
                      slug: "env-004-aquatic-tanks",
                      temperature: "72°F",
                      humidity: "N/A",
                      status: "optimal",
                    },
                  ].map((env, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">
                          <Link
                            href={`/home/veterinary-inspection/environments/${env.slug}`}
                            className="hover:underline"
                          >
                            {env.enclosure}
                          </Link>
                        </h3>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            env.status === "optimal"
                              ? "bg-green-100 text-green-800"
                              : env.status === "warning"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {env.status.charAt(0).toUpperCase() +
                            env.status.slice(1)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Temperature
                          </div>
                          <div className="text-lg font-medium">
                            {env.temperature}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Humidity
                          </div>
                          <div className="text-lg font-medium">
                            {env.humidity}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/home/veterinary-inspection/environments">
                    View All Environments
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Veterinary Reports</CardTitle>
              <CardDescription>
                Generate and manage veterinary reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Health Summary</CardTitle>
                    <CardDescription>
                      Overall animal health status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Healthy</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: "78%" }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Under Monitoring</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full"
                          style={{ width: "15%" }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Under Treatment</span>
                        <span className="font-medium">7%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-500 rounded-full"
                          style={{ width: "7%" }}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/home/veterinary-inspection/reports/health-summary">
                        <Download className="mr-2 h-4 w-4" /> Download Report
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Inspection Compliance
                    </CardTitle>
                    <CardDescription>
                      Scheduled vs. completed inspections
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center h-40">
                      <div className="text-5xl font-bold text-green-600">
                        92%
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">
                        Compliance Rate
                      </div>
                      <div className="text-xs mt-4">
                        <span className="text-muted-foreground">
                          Total Scheduled:{" "}
                        </span>
                        <span className="font-medium">125</span>
                        <span className="text-muted-foreground ml-2">
                          Completed:{" "}
                        </span>
                        <span className="font-medium">115</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/home/veterinary-inspection/reports/compliance">
                        <Download className="mr-2 h-4 w-4" /> Download Report
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Medication Usage</CardTitle>
                    <CardDescription>
                      Medication inventory and usage
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Antibiotics</span>
                        <span className="font-medium">32%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: "32%" }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Anti-inflammatory</span>
                        <span className="font-medium">28%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500 rounded-full"
                          style={{ width: "28%" }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Parasiticides</span>
                        <span className="font-medium">25%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-500 rounded-full"
                          style={{ width: "25%" }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Others</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gray-500 rounded-full"
                          style={{ width: "15%" }}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/home/veterinary-inspection/reports/medication">
                        <Download className="mr-2 h-4 w-4" /> Download Report
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Generated Reports</CardTitle>
                  <CardDescription>
                    Recently generated and saved reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="relative w-full overflow-auto">
                      <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th className="h-12 px-4 text-left align-middle font-medium">
                              Report Name
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium">
                              Type
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium">
                              Generated By
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium">
                              Date
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                          {[
                            {
                              name: "Monthly Health Summary - April 2023",
                              slug: "report-001-monthly-health-summary-april-2023",
                              type: "Health Summary",
                              generatedBy: "Dr. Sarah Johnson",
                              date: "2023-04-30",
                            },
                            {
                              name: "Quarterly Inspection Report - Q1 2023",
                              slug: "report-002-quarterly-inspection-report-q1-2023",
                              type: "Inspection Report",
                              generatedBy: "Dr. Michael Chen",
                              date: "2023-04-15",
                            },
                            {
                              name: "Medication Usage Report - April 2023",
                              slug: "report-003-medication-usage-report-april-2023",
                              type: "Medication Report",
                              generatedBy: "Dr. Emily Rodriguez",
                              date: "2023-04-28",
                            },
                            {
                              name: "Enclosure Condition Assessment - Q1 2023",
                              slug: "report-004-enclosure-condition-assessment-q1-2023",
                              type: "Enclosure Report",
                              generatedBy: "Dr. Michael Chen",
                              date: "2023-04-10",
                            },
                            {
                              name: "Nutrition Analysis - April 2023",
                              slug: "report-005-nutrition-analysis-april-2023",
                              type: "Nutrition Report",
                              generatedBy: "Dr. Sarah Johnson",
                              date: "2023-04-25",
                            },
                          ].map((report, index) => (
                            <tr
                              key={index}
                              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                            >
                              <td className="p-4 align-middle">
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <Link
                                    href={`/home/veterinary-inspection/reports/${report.slug}`}
                                    className="hover:underline"
                                  >
                                    {report.name}
                                  </Link>
                                </div>
                              </td>
                              <td className="p-4 align-middle">
                                {report.type}
                              </td>
                              <td className="p-4 align-middle">
                                {report.generatedBy}
                              </td>
                              <td className="p-4 align-middle">
                                {report.date}
                              </td>
                              <td className="p-4 align-middle">
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm" asChild>
                                    <Link
                                      href={`/home/veterinary-inspection/reports/${report.slug}`}
                                    >
                                      View
                                    </Link>
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4" />
                                    <span className="sr-only">Download</span>
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" /> Upload Report
                  </Button>
                  <Button className="bg-green-700 hover:bg-green-800" asChild>
                    <Link href="/home/veterinary-inspection/reports/new">
                      <Plus className="mr-2 h-4 w-4" /> Generate New Report
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
