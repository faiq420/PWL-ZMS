"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Trash2, Edit, Plus, ArrowUpDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import SectionIntro from "@/components/utils/Headings/SectionIntro";
import CardIntro from "@/components/utils/Headings/CardIntro";
import ButtonComp from "@/components/utils/Button";
import { useRouter } from "next/navigation";
import SearchTag from "@/components/utils/FormElements/SearchTag";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { changeDateFormat } from "@/Helper/DateFormats";
import Checkbox from "@/components/utils/FormElements/Checkbox";
import { Enclosure, mockEnclosures } from "@/data/enclosures";

export default function EnclosurePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [enclosures, setEnclosures] = useState<Enclosure[]>([
    ...mockEnclosures,
  ]);
  const [selectedEnclosures, setSelectedEnclosures] = useState<number[]>([]);
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [deleteEnclosuresDialog, setDeleteEnclosuresDialog] = useState(false);
  const [enclosureToDelete, setEnclosuresToDelete] = useState<any>(null);

  const toggleSelectEnclosure = (bookingId: number) => {
    setSelectedEnclosures((prev) =>
      prev.includes(bookingId)
        ? prev.filter((id) => id !== bookingId)
        : [...prev, bookingId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedEnclosures.length === filteredEnclosures.length) {
      setSelectedEnclosures([]);
    } else {
      setSelectedEnclosures(
        filteredEnclosures.map((booking: any) => booking.id)
      );
    }
  };

  const filteredEnclosures = enclosures.filter((enclosure) => {
    const matchesSearch = enclosure.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  // Sort Enclosures based on selected sort order
  const sortedEnclosures = [...filteredEnclosures].sort((a, b) => {
    switch (sortOrder) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
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

  const handleDeleteEnclosures = () => {
    if (enclosureToDelete) {
      const updatedSafeties = enclosures.filter(
        (enclosure: any) => enclosure.id !== enclosureToDelete.id
      );
      setEnclosures(updatedSafeties);
      setDeleteEnclosuresDialog(false);
      setEnclosuresToDelete(null);
    }
  };

  return (
    <>
      <AlertDialog
        open={deleteEnclosuresDialog}
        onOpenChange={setDeleteEnclosuresDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the enclosure "
              {enclosureToDelete?.animalName}
              ". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteEnclosures}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="flex flex-col gap-6">
        <SectionIntro
          title="Enclosure Management"
          description="Manage zoo enclosures and geographical zones."
        />

        <Card className="space-y-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardIntro
              title="Enclosures"
              description="Overview of all enclosures."
            />
            <div className="w-fit">
              <ButtonComp
                text="Add New Enclosure"
                type={"dark"}
                beforeIcon={<Plus className="h-4 w-4" />}
                clickEvent={() => {
                  router.push("/home/enclosure-management/new");
                }}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <SearchTag
              value={searchQuery}
              setter={(value) => setSearchQuery(value)}
              placeHolder="Select Enclosures..."
            />
            {selectedEnclosures.length > 0 && (
              <div className="flex items-center gap-2 mb-4 p-2 bg-main-frostyBlue/10 rounded-md">
                <span className="text-sm text-main-darkFadedBlue">
                  {selectedEnclosures.length} enclosure
                  {selectedEnclosures.length > 1 ? "s" : ""} selected
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
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        value={
                          selectedEnclosures.length ===
                            filteredEnclosures.length &&
                          filteredEnclosures.length > 0
                        }
                        setter={toggleSelectAll}
                        name=""
                      />
                    </TableHead>
                    <TableHead
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() =>
                        setSortOrder(
                          sortOrder === "name-asc" ? "name-desc" : "name-asc"
                        )
                      }
                    >
                      Animal
                      <ArrowUpDown className="h-4 w-4" />
                    </TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Inhabitants</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPosts.length > 0 ? (
                    currentPosts.map((enclosure) => (
                      <TableRow key={enclosure.id}>
                        <TableCell>
                          <Checkbox
                            value={selectedEnclosures.includes(enclosure.id)}
                            setter={(n, v) =>
                              toggleSelectEnclosure(enclosure.id)
                            }
                            name="id"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {enclosure.name}
                        </TableCell>
                        <TableCell>{enclosure.type}</TableCell>
                        <TableCell>{enclosure.capacity}</TableCell>
                        <TableCell>{enclosure.currentAnimals}</TableCell>
                        <TableCell>{enclosure.status}</TableCell>
                        <TableCell>{enclosure.location}</TableCell>
                        <TableCell className="text-right flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              router.push(
                                `/home/enclosure-management/${enclosure.id}`
                              );
                            }}
                          >
                            <Edit className="text-black h-4 w-4 cursor-pointer" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEnclosuresToDelete(enclosure);
                              setDeleteEnclosuresDialog(true);
                            }}
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
                        colSpan={9}
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
          </CardContent>
        </Card>
      </div>
    </>
  );
}
