"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
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
import ButtonComp from "@/components/utils/Button";
import Checkbox from "@/components/utils/FormElements/Checkbox";
import SearchTag from "@/components/utils/FormElements/SearchTag";
import CardIntro from "@/components/utils/Headings/CardIntro";
import { changeDateFormatWithTime } from "@/Helper/DateFormats";
import useHelper from "@/Helper/helper";
import {
  ArrowUpDown,
  Calendar,
  ClipboardList,
  Edit,
  Eye,
  Filter,
  Plus,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const InspectionTab = () => {
  const helper = useHelper();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [inspections, setInspections] = useState([
    {
      Id: "INS-2023-001",
      Slug: "ins-2023-001-zara-african-elephant",
      Animal: "Zara",
      Species: "African Elephant",
      Inspector: "Dr. Sarah Johnson",
      Date: "2023-04-15",
      Status: "completed",
    },
    {
      Id: "INS-2023-002",
      Slug: "ins-2023-002-raja-bengal-tiger",
      Animal: "Raja",
      Species: "Bengal Tiger",
      Inspector: "Dr. Michael Chen",
      Date: "2023-04-18",
      Status: "completed",
    },
    {
      Id: "INS-2023-003",
      Slug: "ins-2023-003-leo-african-lion",
      Animal: "Leo",
      Species: "African Lion",
      Inspector: "Dr. Sarah Johnson",
      Date: "2023-04-20",
      Status: "completed",
    },
    {
      Id: "INS-2023-004",
      Slug: "ins-2023-004-bubbles-bottlenose-dolphin",
      Animal: "Bubbles",
      Species: "Bottlenose Dolphin",
      Inspector: "Dr. Emily Rodriguez",
      Date: "2023-04-25",
      Status: "scheduled",
    },
    {
      Id: "INS-2023-005",
      Slug: "ins-2023-005-koko-western-gorilla",
      Animal: "Koko",
      Species: "Western Gorilla",
      Inspector: "Dr. Michael Chen",
      Date: "2023-04-10",
      Status: "overdue",
    },
    {
      Id: "INS-2023-006",
      Slug: "ins-2023-006-melman-reticulated-giraffe",
      Animal: "Melman",
      Species: "Reticulated Giraffe",
      Inspector: "Dr. Sarah Johnson",
      Date: "2023-04-30",
      Status: "scheduled",
    },
    {
      Id: "INS-2023-007",
      Slug: "ins-2023-007-spike-komodo-dragon",
      Animal: "Spike",
      Species: "Komodo Dragon",
      Inspector: "Dr. Emily Rodriguez",
      Date: "2023-04-05",
      Status: "completed",
    },
  ]);
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [selectedInspections, setSelectedInspections] = useState<string[]>([]);

  const toggleSelectInspection = (inspectionId: string) => {
    setSelectedInspections((prev) =>
      prev.includes(inspectionId)
        ? prev.filter((id) => id !== inspectionId)
        : [...prev, inspectionId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedInspections.length === filteredInspections.length) {
      setSelectedInspections([]);
    } else {
      setSelectedInspections(
        filteredInspections.map((inspection: any) => inspection.Id)
      );
    }
  };

  const filteredInspections = inspections.filter((inspection) => {
    const matchesSearch = inspection.Animal.toLowerCase().includes(
      searchQuery.toLowerCase()
    );
    const matchedFilter =
      selectedFilter == "all" ||
      inspection.Status.toLowerCase() === selectedFilter.toLowerCase();

    return matchesSearch && matchedFilter;
  });

  // Sort Inspections based on selected sort order
  const sortedInspections = [...filteredInspections].sort((a, b) => {
    switch (sortOrder) {
      case "name-asc":
        return a.Id.localeCompare(b.Id);
      case "name-desc":
        return b.Id.localeCompare(a.Id);
      default:
        return 0;
    }
  });

  /////////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedInspections.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const totalPages = Math.ceil(inspections.length / postsPerPage);
  const paginationLabels = Array.from({ length: totalPages }, (_, i) => i + 1);

  /////////////////////////////////////

  return (
    <>
      <Card>
        <CardHeader>
          <div className="md:flex gap-3 justify-between items-end mb-2 w-full">
            <CardIntro
              title="Inspection Management"
              description="Schedule, track, and manage animal health inspections"
            />
            <div className="w-fit">
              <ButtonComp
                type={"dark"}
                clickEvent={() => {
                  router.push("/home/veterinary-inspection/new");
                }}
                text="Schedule Appointment"
                beforeIcon={<Plus className=" h-4 w-4" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 mt-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <SearchTag
              value={searchQuery}
              setter={setSearchQuery}
              placeHolder="Search inspections..."
            />
            <div className="flex gap-2">
              <Select
                defaultValue="all"
                value={selectedFilter}
                onValueChange={setSelectedFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {selectedInspections.length > 0 && (
            <div className="flex items-center gap-2 mb-4 p-2 bg-main-frostyBlue/10 rounded-md">
              <span className="text-sm text-main-darkFadedBlue">
                {selectedInspections.length} inspection
                {selectedInspections.length > 1 ? "s" : ""} selected
              </span>
              <div className="flex-1"></div>
              <Button
                variant="outline"
                size="sm"
                className="border-red-500 text-red-500 hover:bg-red-50"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          )}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow className="bg-main-frostyBlue/5">
                  <TableHead className="w-12">
                    <Checkbox
                      value={
                        selectedInspections.length ===
                          filteredInspections.length &&
                        filteredInspections.length > 0
                      }
                      setter={toggleSelectAll}
                      name=""
                    />
                  </TableHead>
                  <TableHead>
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() =>
                        setSortOrder(
                          sortOrder === "name-asc" ? "name-desc" : "name-asc"
                        )
                      }
                    >
                      ID
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Animal</TableHead>
                  <TableHead>Species</TableHead>
                  <TableHead>Inspector</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center text-main-darkFadedBlue">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="!text-sm">
                {currentPosts.length > 0 ? (
                  currentPosts.map((inspection: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Checkbox
                          value={selectedInspections.includes(inspection.Id)}
                          setter={(n, v) =>
                            toggleSelectInspection(inspection.Id)
                          }
                          name="id"
                        />
                      </TableCell>
                      <TableCell>{inspection.Id}</TableCell>
                      <TableCell>{inspection.Animal}</TableCell>
                      <TableCell>{inspection.Species}</TableCell>
                      <TableCell>{inspection.Inspector}</TableCell>
                      <TableCell>
                        {changeDateFormatWithTime(inspection.Date)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            inspection.Status === "completed"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : inspection.Status === "scheduled"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              : inspection.Status === "overdue"
                              ? "bg-red-100 text-red-800 hover:bg-red-100"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }
                        >
                          {inspection.Status.charAt(0).toUpperCase() +
                            inspection.Status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="flex justify-center items-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            router.push(
                              `/home/veterinary-inspection/${inspection.Slug}`
                            );
                          }}
                        >
                          <Edit className="text-black h-4 w-4 cursor-pointer" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            router.push(
                              `/home/veterinary-inspection/${inspection.Slug}/View`
                            );
                          }}
                        >
                          <Eye className="h-4 w-4" />
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
                      No inspections found.
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
        </CardContent>
      </Card>
    </>
  );
};

export default InspectionTab;
