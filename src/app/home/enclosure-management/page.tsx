"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Trash2, Edit, Plus, ArrowUpDown, Eye } from "lucide-react";
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
// import { Enclosure, mockEnclosures } from "@/data/enclosures";
import useHelper from "@/Helper/helper";
import { useToast } from "@/components/ui/use-toast";

type Enclosure = {
  EnclosureId: number;
  EnclosureName: string;
  Type: string;
  Capacity: string;
  Status: string;
  ZooTitle: string;
  LocationName: string;
};

export default function EnclosurePage() {
  const { toast } = useToast();
  const router = useRouter();
  const helper = useHelper();
  const pageData = helper.GetPageData();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [enclosures, setEnclosures] = useState<Enclosure[]>([]);
  const [selectedEnclosures, setSelectedEnclosures] = useState<number[]>([]);
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [deleteEnclosuresDialog, setDeleteEnclosuresDialog] = useState(false);
  const [enclosureToDelete, setEnclosuresToDelete] = useState<any>(null);

  const toggleSelectEnclosure = (enclosureId: number) => {
    setSelectedEnclosures((prev) =>
      prev.includes(enclosureId)
        ? prev.filter((id) => id !== enclosureId)
        : [...prev, enclosureId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedEnclosures.length === filteredEnclosures.length) {
      setSelectedEnclosures([]);
    } else {
      setSelectedEnclosures(
        filteredEnclosures.map((enclosure: any) => enclosure.EnclosureId)
      );
    }
  };

  const filteredEnclosures = enclosures.filter((enclosure) => {
    const matchesSearch = enclosure.EnclosureName.toLowerCase().includes(
      searchQuery.toLowerCase()
    );

    return matchesSearch;
  });

  // Sort Enclosures based on selected sort order
  const sortedEnclosures = [...filteredEnclosures].sort((a, b) => {
    switch (sortOrder) {
      case "name-asc":
        return a.EnclosureName.localeCompare(b.EnclosureName);
      case "name-desc":
        return b.EnclosureName.localeCompare(a.EnclosureName);
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
      setIsDeleting(true);
      helper.xhr
        .Post(
          "/Enclosure/DeleteEnclosure",
          helper.ConvertToFormData({
            enclosureId: enclosureToDelete.EnclosureId,
          })
        )
        .then((res) => {
          if (res == "Enclosure deleted successfully.") {
            const updatedSafeties = enclosures.filter(
              (enclosure: any) =>
                enclosure.EnclosureId !== enclosureToDelete.EnclosureId
            );
            setEnclosures(updatedSafeties);
            setDeleteEnclosuresDialog(false);
            setEnclosuresToDelete(null);
            toast({ title: "Operation", description: res });
          }
        })
        .catch((e) => {
          toast({ title: "Operation", description: e });
        })
        .finally(() => {
          setIsDeleting(false);
        });
    }
  };

  useEffect(() => {
    helper.xhr.Get("/Enclosure/GetEnclosureList").then((res) => {
      setEnclosures(res);
    });
  }, []);

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
              {enclosureToDelete?.EnclosureName}
              ". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteEnclosures}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="flex flex-col gap-6">
        <SectionIntro
          title={pageData?.MenuName}
          description={pageData?.Description}
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
                      Enclosure
                      <ArrowUpDown className="h-4 w-4" />
                    </TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Inhabitants/Capacity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Zoo</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPosts.length > 0 ? (
                    currentPosts.map((enclosure) => (
                      <TableRow key={enclosure.EnclosureId}>
                        <TableCell>
                          <Checkbox
                            value={selectedEnclosures.includes(
                              enclosure.EnclosureId
                            )}
                            setter={(n, v) =>
                              toggleSelectEnclosure(enclosure.EnclosureId)
                            }
                            name="id"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {enclosure.EnclosureName}
                        </TableCell>
                        <TableCell>{enclosure.Type}</TableCell>
                        <TableCell className="text-center">
                          {enclosure.Capacity}
                        </TableCell>
                        <TableCell>{enclosure.Status}</TableCell>
                        <TableCell>{enclosure.ZooTitle}</TableCell>
                        <TableCell>{enclosure.LocationName}</TableCell>
                        <TableCell className="text-right flex justify-end">
                          {/* <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              router.push(
                                `/home/enclosure-management/View?id=${enclosure.EnclosureId}`
                              );
                            }}
                          >
                            <Eye className="text-black h-4 w-4 cursor-pointer" />
                          </Button> */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              router.push(
                                `/home/enclosure-management/${enclosure.EnclosureId}`
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
