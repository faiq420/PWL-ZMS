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
import { ArrowUpDown, Eye, Stethoscope } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const HealthRecords = () => {
  const helper = useHelper();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [filterBy, setFilterBy] = useState("all");
  const [records, setRecords] = useState([
    {
      Name: "Zara",
      Id: "ANI-001",
      Slug: "ani-001-zara-african-elephant",
      Species: "African Elephant",
      Enclosure: "Enclosure",
      Status: "healthy",
      LastCheck: "2023-04-15",
    },
    {
      Name: "Raja",
      Id: "ANI-002",
      Slug: "ani-002-raja-bengal-tiger",
      Species: "Bengal Tiger",
      Enclosure: "Enclosure",
      Status: "treatment",
      LastCheck: "2023-04-18",
    },
    {
      Name: "Leo",
      Id: "ANI-003",
      Slug: "ani-003-leo-african-lion",
      Species: "African Lion",
      Enclosure: "Enclosure",
      Status: "healthy",
      LastCheck: "2023-04-20",
    },
    {
      Name: "Bubbles",
      Id: "ANI-004",
      Slug: "ani-004-bubbles-bottlenose-dolphin",
      Species: "Bottlenose Dolphin",
      Enclosure: "Enclosure",
      Status: "monitoring",
      LastCheck: "2023-03-25",
    },
    {
      Name: "Koko",
      Id: "ANI-005",
      Slug: "ani-005-koko-western-gorilla",
      Species: "Western Gorilla",
      Enclosure: "Enclosure",
      Status: "healthy",
      LastCheck: "2023-03-10",
    },
    {
      Name: "Melman",
      Id: "ANI-006",
      Slug: "ani-006-melman-reticulated-giraffe",
      Species: "Reticulated Giraffe",
      Enclosure: "Enclosure",
      Status: "healthy",
      LastCheck: "2023-03-30",
    },
  ]);

  const filteredRecords = records.filter((record) => {
    const matchesSearch = record.Name.toLowerCase().includes(
      searchQuery.toLowerCase()
    );
    const matchesFilter = filterBy == "all" || record.Species == filterBy;
    return matchesSearch && matchesFilter;
  });

  // Sort Records based on selected sort order
  const sortedRecords = [...filteredRecords].sort((a, b) => {
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
  const currentPosts = sortedRecords.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(records.length / postsPerPage);
  const paginationLabels = Array.from({ length: totalPages }, (_, i) => i + 1);

  /////////////////////////////////////

  return (
    <Card>
      <CardHeader>
        <CardIntro
          title="Animal Health Records"
          description="Comprehensive health records for all animals"
        />
      </CardHeader>
      <CardContent className="space-y-3 mt-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchTag
            value={searchQuery}
            setter={setSearchQuery}
            placeHolder="Search animals..."
          />
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
          </div>
        </div>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow className="bg-main-frostyBlue/5">
                <TableHead>
                  <div
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() =>
                      setSortOrder(
                        sortOrder === "name-asc" ? "name-desc" : "name-asc"
                      )
                    }
                  >
                    Name
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Specie</TableHead>
                <TableHead>Enclosure</TableHead>
                <TableHead>Last Check</TableHead>
                <TableHead className="text-center text-main-darkFadedBlue">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="!text-sm">
              {currentPosts.length > 0 ? (
                currentPosts.map((record: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{record.Name}</TableCell>
                    <TableCell>{record.Species}</TableCell>
                    <TableCell>{record.Enclosure}</TableCell>
                    <TableCell>{changeDateFormat(record.LastCheck)}</TableCell>
                    <TableCell className="flex justify-center items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          router.push(
                            `/home/veterinary-inspection/health-record?id=${record.Id}`
                          );
                        }}
                      >
                        <Eye className="text-black h-4 w-4 cursor-pointer" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          router.push(
                            `/home/veterinary-inspection/new?animalId=${record.Id}`
                          );
                        }}
                        className="text-destructive hover:text-destructive"
                      >
                        <Stethoscope className="text-black h-4 w-4 cursor-pointer" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-main-gray"
                  >
                    No health records found.
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
  );
};

export default HealthRecords;
