import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Edit, Trash2, ArrowLeft, Plus, Router } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import Checkbox from "@/components/utils/FormElements/Checkbox";
import { ArrowUpDown } from "lucide-react";
import CardIntro from "@/components/utils/Headings/CardIntro";
import {
  changeDateFormat,
  changeDateFormatWithTime,
} from "@/Helper/DateFormats";
import ButtonComp from "@/components/utils/Button";
import { NavigateToRecord } from "@/Helper/Utility";
import { useRouter } from "next/navigation";

interface Prop {
  data: any;
  facilityDelete: (id: number) => void;
}

export default function Faciltiy({ data, facilityDelete }: Prop) {
  const router = useRouter();
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [facilities, setFacilities] = useState(data);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [deleteFacilityDialog, setDeleteFacilityDialog] = useState(false);
  const [facilityToDelete, setFacilityToDelete] = useState<any>(null);
  const [selectedFacility, setSelectedFacility] = useState<any>(null);

  const toggleSelectfacility = (facilityId: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(facilityId)
        ? prev.filter((id) => id !== facilityId)
        : [...prev, facilityId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedFacilities.length === data.length) {
      setSelectedFacilities([]);
    } else {
      setSelectedFacilities(data.map((facility: any) => facility.id));
    }
  };

  // Sort Courts based on selected sort order
  const sortedFacilties = [...data].sort((a, b) => {
    switch (sortOrder) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedFacilties.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(facilities.length / postsPerPage);
  const paginationLabels = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleDeleteFacility = () => {
    if (facilityToDelete) {
      const updatedFacilities = facilities.filter(
        (facility: any) => facility.id !== facilityToDelete.id
      );
      setFacilities(updatedFacilities);
      facilityDelete(facilityToDelete.id);
      setDeleteFacilityDialog(false);
      setFacilityToDelete(null);
    }
  };

  return (
    <>
      <AlertDialog
        open={deleteFacilityDialog}
        onOpenChange={setDeleteFacilityDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the facility "
              {facilityToDelete?.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteFacility}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Card>
        <CardHeader>
          <div className="md:flex gap-3 justify-between items-end mb-2 w-full">
            <CardIntro
              title="Facility Management"
              description="Manage all facilities throughout the zoos."
            />
            <div className="w-fit">
              <ButtonComp
                type={"dark"}
                clickEvent={() => {
                  console.log("dsndjs");
                  router.push(
                    NavigateToRecord("services", "Facilities", "create")
                  );
                }}
                text="Add Facility"
                beforeIcon={<Plus className=" h-4 w-4" />}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {selectedFacilities.length > 0 && (
            <div className="flex items-center gap-2 mb-4 p-2 bg-main-frostyBlue/10 rounded-md">
              <span className="text-sm text-main-darkFadedBlue">
                {selectedFacilities.length} facilit
                {selectedFacilities.length > 1 ? "ies" : "y"} selected
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
                        selectedFacilities.length === data.length &&
                        data.length > 0
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
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Features</TableHead>
                  <TableHead>Last Maintainance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center text-main-darkFadedBlue">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPosts.length > 0 ? (
                  currentPosts.map((facility: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Checkbox
                          value={selectedFacilities.includes(facility.id)}
                          setter={(n, v) => toggleSelectfacility(facility.id)}
                          name="id"
                        />
                      </TableCell>
                      <TableCell>{facility.name}</TableCell>
                      <TableCell>{facility.location}</TableCell>
                      <TableCell>{facility.type}</TableCell>
                      <TableCell>{facility.features.join(", ")}</TableCell>
                      <TableCell>
                        {changeDateFormat(facility.lastMaintenance)}
                      </TableCell>
                      <TableCell>{facility.status}</TableCell>
                      <TableCell className="flex justify-center items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            router.push(
                              NavigateToRecord(
                                "services",
                                "Facilities",
                                "edit",
                                facility.id
                              )
                            );
                          }}
                        >
                          <Edit className="text-black h-4 w-4 cursor-pointer" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setFacilityToDelete(facility);
                            setDeleteFacilityDialog(true);
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
                      colSpan={6}
                      className="h-24 text-center text-main-gray"
                    >
                      No facility found.
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
}
