"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import { DeleteConfirmationDialog } from "@/components/visit-planning/delete-confirmation";
import { changeDateFormatWithTime } from "@/Helper/DateFormats";
import { ArrowUpDown, Edit, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CardIntro from "@/components/utils/Headings/CardIntro";
import SearchTag from "@/components/utils/FormElements/SearchTag";
import { NavigateToRecord } from "@/Helper/Utility";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

type Records = {
  Id: number;
  Name: string;
  Zoo: string;
  Location: string;
  Status: string;
  Type: "food-court" | "restaurant-canteen-cart";
  IsOpened: boolean; //Working hours
};

const FoodCourtTable = () => {
  const { toast } = useToast();
  const [courts, setCourts] = useState<Records[]>([
    {
      Id: 1,
      Name: "Food Court 1",
      Type: "food-court",
      Zoo: "Lahore Zoo",
      Location: "Shahi Food Court",
      Status: "Open",
      IsOpened: true,
    },
    {
      Id: 2,
      Name: "Food Court 2",
      Type: "food-court",
      Zoo: "Lahore Safari Park",
      Location: "Food Court",
      Status: "Open",
      IsOpened: true,
    },
    {
      Id: 3,
      Name: "Food Court 3",
      Type: "food-court",
      Zoo: "Bahawalpur Zoo",
      Location: "Zoo Food Court",
      Status: "Under Maintainance",
      IsOpened: true,
    },
    {
      Id: 4,
      Name: "Safari Court",
      Type: "food-court",
      Zoo: "Lahore Safari Park",
      Location: "Safari Food Court",
      Status: "To be opened",
      IsOpened: false,
    },
    {
      Id: 5,
      Name: "Jungle Bites",
      Type: "restaurant-canteen-cart",
      Zoo: "Lahore Zoo",
      Location: "Main Entry Zone",
      Status: "Open",
      IsOpened: true,
    },
    {
      Id: 6,
      Name: "Savannah Canteen",
      Type: "restaurant-canteen-cart",
      Zoo: "Lahore Safari Park",
      Location: "Elephant Viewing Area",
      Status: "Closed",
      IsOpened: false,
    },
    {
      Id: 7,
      Name: "Rainforest Grub Cart",
      Type: "restaurant-canteen-cart",
      Zoo: "Bahawalpur Zoo",
      Location: "Near Reptile House",
      Status: "Open",
      IsOpened: true,
    },
    {
      Id: 8,
      Name: "Lion’s Share Restaurant",
      Type: "restaurant-canteen-cart",
      Zoo: "Bahawalpur Zoo",
      Location: "Big Cat Section",
      Status: "Under Maintainance",
      IsOpened: true,
    },
    {
      Id: 9,
      Name: "Zebra Stop Cart",
      Type: "restaurant-canteen-cart",
      Zoo: "Lahore Zoo",
      Location: "Behind Zebra Enclosure",
      Status: "To Be Opened",
      IsOpened: false,
    },
    {
      Id: 10,
      Name: "Safari Snacks Canteen",
      Type: "restaurant-canteen-cart",
      Zoo: "Lahore Safari Park",
      Location: "Bird Aviary Exit",
      Status: "Open",
      IsOpened: true,
    },
    {
      Id: 11,
      Name: "Monkey Munch Cart",
      Type: "restaurant-canteen-cart",
      Zoo: "Lahore Zoo",
      Location: "Primate Trail",
      Status: "Closed",
      IsOpened: false,
    },
    {
      Id: 12,
      Name: "Carnivore Cafe",
      Type: "restaurant-canteen-cart",
      Zoo: "Lahore Safari Park",
      Location: "Predator Zone",
      Status: "Open",
      IsOpened: true,
    },
  ]);
  const [selectedCourts, setSelectedCourts] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [deleteType, setDeleteType] = useState("food-court");
  const toggleSelectcourt = (courtId: number) => {
    setSelectedCourts((prev) =>
      prev.includes(courtId)
        ? prev.filter((id) => id !== courtId)
        : [...prev, courtId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedCourts.length === filteredCourts.length) {
      setSelectedCourts([]);
    } else {
      setSelectedCourts(filteredCourts.map((court: any) => court.Id));
    }
  };

  const filteredCourts = courts.filter((court) => {
    const matchesSearch = court.Name.toLowerCase().includes(
      searchQuery.toLowerCase()
    );

    return matchesSearch;
  });

  // Sort Courts based on selected sort order
  const sortedCourts = [...filteredCourts].sort((a, b) => {
    switch (sortOrder) {
      case "name-asc":
        return a.Name.localeCompare(b.Name);
      case "name-desc":
        return b.Name.localeCompare(a.Name);
      default:
        return 0;
    }
  });

  const router = useRouter();
  // function NavigateToRecord(tab: string, mode: string, id?: number) {
  //   router.push(
  //     `/home/visit-planning?tab=${tab}&mode=${mode}` +
  //       (id != undefined ? `&id=${id}` : "")
  //   );
  // }

  /////////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedCourts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(courts.length / postsPerPage);
  const paginationLabels = Array.from({ length: totalPages }, (_, i) => i + 1);

  /////////////////////////////////////

  const openDeleteDialog = (type: "food-court", item: any) => {
    setDeleteType(type);
    setSelectedItem(item);
    setDeleteModalOpen(true);
  };

  const handleDeletecourt = () => {
    if (selectedItem) {
      setCourts(courts.filter((court) => court.Id !== selectedItem.Id));
      setDeleteModalOpen(false);
      toast({
        title: "Court Deleted",
        description: `Court "${selectedItem.title}" has been deleted.`,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <DeleteConfirmationDialog
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          handleDeletecourt();
        }}
        index={0}
        type={deleteType}
        item={selectedItem}
      />
      <Card>
        <CardHeader>
          <div className="md:flex gap-3 justify-between items-end mb-2 w-full">
            <CardIntro
              title="Food Court Management"
              description="Manage all dinings across the zoos."
            />
            <div className="flex space-x-2">
              <div className="w-full md:w-[300px]">
                <SearchTag
                  value={searchQuery}
                  setter={(value) => setSearchQuery(value)}
                  placeHolder="Select food courts..."
                />
              </div>
              <Select
                onValueChange={(v: string) => {
                  router.push(NavigateToRecord("services", v, "create"));
                }}
              >
                <SelectTrigger>Add New</SelectTrigger>
                <SelectContent>
                  <SelectItem value={"food-court"}>Food Court</SelectItem>
                  <SelectItem value={"restaurant-canteen-cart"}>
                    Restaurant/Canteen/Cart
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {selectedCourts.length > 0 && (
            <div className="flex items-center gap-2 mb-4 p-2 bg-main-frostyBlue/10 rounded-md">
              <span className="text-sm text-main-darkFadedBlue">
                {selectedCourts.length} court
                {selectedCourts.length > 1 ? "s" : ""} selected
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
                        selectedCourts.length === filteredCourts.length &&
                        filteredCourts.length > 0
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
                      Name
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Zoo</TableHead>
                  <TableHead>Map Location Title</TableHead>
                  <TableHead>Is Opened</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center text-main-darkFadedBlue">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="!text-sm">
                {currentPosts.length > 0 ? (
                  currentPosts.map((court: Records, index: number) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Checkbox
                          value={selectedCourts.includes(court.Id)}
                          setter={(n, v) => toggleSelectcourt(court.Id)}
                          name="id"
                        />
                      </TableCell>
                      <TableCell>{court.Name}</TableCell>
                      <TableCell>{court.Zoo}</TableCell>
                      <TableCell>{court.Location}</TableCell>
                      <TableCell>{court.IsOpened ? "OPEN" : "CLOSE"}</TableCell>
                      <TableCell>{court.Status}</TableCell>
                      <TableCell className="flex justify-center items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            router.push(
                              NavigateToRecord(
                                "services",
                                court.Type,
                                "edit",
                                court.Id
                              )
                            );
                          }}
                        >
                          <Edit className="text-black h-4 w-4 cursor-pointer" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDeleteDialog("food-court", court)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
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
                      No Food Courts Found!
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

export default FoodCourtTable;
