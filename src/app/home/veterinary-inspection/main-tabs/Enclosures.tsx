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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SearchTag from "@/components/utils/FormElements/SearchTag";
import CardIntro from "@/components/utils/Headings/CardIntro";
import { changeDateFormat } from "@/Helper/DateFormats";
import useHelper from "@/Helper/helper";
import { ArrowUpDown, Check, Eye, Plus, Stethoscope } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Enclosures = () => {
  const router = useRouter();
  const helper = useHelper();
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [enclosures, setEnclosures] = useState([
    {
      Id: "ENC-001",
      Slug: "enc-001-elephant-habitat",
      Name: "Elephant Habitat",
      Animals: "3 African Elephants",
      LastInspection: "2023-04-15",
      Status: "excellent",
    },
    {
      Id: "ENC-002",
      Slug: "enc-002-tiger-enclosure",
      Name: "Tiger Enclosure",
      Animals: "2 Bengal Tigers",
      LastInspection: "2023-04-18",
      Status: "good",
    },
    {
      Id: "ENC-003",
      Slug: "enc-003-lion-pride",
      Name: "Lion Pride",
      Animals: "4 African Lions",
      LastInspection: "2023-04-20",
      Status: "good",
    },
    {
      Id: "ENC-004",
      Slug: "enc-004-dolphin-pool",
      Name: "Dolphin Pool",
      Animals: "5 Bottlenose Dolphins",
      LastInspection: "2023-03-25",
      Status: "fair",
    },
    {
      Id: "ENC-005",
      Slug: "enc-005-gorilla-habitat",
      Name: "Gorilla Habitat",

      Animals: "6 Western Gorillas",
      LastInspection: "2023-03-10",
      Status: "poor",
    },
    {
      Id: "ENC-006",
      Slug: "enc-006-giraffe-yard",
      Name: "Giraffe Yard",

      Animals: "4 Reticulated Giraffes",
      LastInspection: "2023-03-30",
      Status: "good",
    },
    {
      Id: "ENC-007",
      Slug: "enc-007-reptile-house",
      Name: "Reptile House",

      Animals: "12 Various Reptiles",
      LastInspection: "2023-04-05",
      Status: "fair",
    },
  ]);
  const [sortOrder, setSortOrder] = useState("name-asc");
  const filteredEnclosures = enclosures.filter((enclosure) => {
    const matchesSearch = enclosure.Name.toLowerCase().includes(
      searchQuery.toLowerCase()
    );
    const matchesStatus =
      selectedStatus === "all" || enclosure.Status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Sort Enclosures based on selected sort order
  const sortedEnclosures = [...filteredEnclosures].sort((a, b) => {
    switch (sortOrder) {
      case "name-asc":
        return a.Name.localeCompare(b.Name);
      case "name-desc":
        return b.Name.localeCompare(a.Name);
      default:
        return 0;
    }
  });

  /////////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedEnclosures.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const totalPages = Math.ceil(enclosures.length / postsPerPage);
  const paginationLabels = Array.from({ length: totalPages }, (_, i) => i + 1);

  /////////////////////////////////////
  return (
    <>
      <Card>
        <CardHeader>
          <CardIntro
            title="Enclosure Assessments"
            description="Monitor and manage animal enclosure conditions"
          />
        </CardHeader>
        <CardContent className="space-y-3 mt-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <SearchTag
              value={searchQuery}
              setter={setSearchQuery}
              placeHolder="Search enclosures..."
            />

            <div className="flex gap-2">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Needs Attention</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow className="bg-main-frostyBlue/5">
                  <TableHead>ID</TableHead>
                  <TableHead>
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() =>
                        setSortOrder(
                          sortOrder === "name-asc" ? "name-desc" : "name-asc"
                        )
                      }
                    >
                      Enclosure
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Animals</TableHead>
                  <TableHead>Last Inspection</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center text-main-darkFadedBlue">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="!text-sm">
                {currentPosts.length > 0 ? (
                  currentPosts.map((enc: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{enc.Id}</TableCell>
                      <TableCell>{enc.Name}</TableCell>
                      <TableCell>{enc.Animals}</TableCell>
                      <TableCell>
                        {changeDateFormat(enc.LastInspection)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            enc.Status === "excellent"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : enc.Status === "good"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              : enc.Status === "fair"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                          }
                        >
                          {enc.Status.charAt(0).toUpperCase() +
                            enc.Status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="flex justify-center items-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            // NavigateToRecord("booking", "edit", booking.id);
                            router.push(
                              "/home/veterinary-inspection/enclosure-details?id=" +
                                enc.Id
                            );
                          }}
                        >
                          <Eye className="text-black h-4 w-4 cursor-pointer" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {}}
                          className=""
                        >
                          <Stethoscope className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-main-gray"
                    >
                      No enclosures found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => {
                      if (currentPage != 1) {
                        setCurrentPage(currentPage - 1);
                      }
                    }}
                    aria-disabled={currentPage == 1}
                    className="text-main-darkFadedBlue cursor-pointer"
                  />
                </PaginationItem>
                {paginationLabels.map((label: number) => (
                  <PaginationItem key={label}>
                    <PaginationLink
                      onClick={() => {
                        setCurrentPage(label);
                      }}
                      className={`${
                        currentPage == label && "bg-main-gray"
                      }  text-main-navyBlue cursor-pointer`}
                    >
                      {label}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => {
                      if (currentPage != totalPages) {
                        setCurrentPage(currentPage + 1);
                      }
                    }}
                    aria-disabled={currentPage == totalPages}
                    className="text-main-darkFadedBlue cursor-pointer"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
          {/* <div className="rounded-md border">
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
                  {enclosures.map((enclosure) => (
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
                      <td className="p-4 align-middle">{enclosure.animals}</td>
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
          </div> */}
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
                <div key={index} className="flex gap-4 border rounded-lg p-4">
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
                      {env.status.charAt(0).toUpperCase() + env.status.slice(1)}
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
                      <div className="text-lg font-medium">{env.humidity}</div>
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
    </>
  );
};

export default Enclosures;
