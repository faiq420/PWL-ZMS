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
import { Edit, Trash2, ArrowLeft, ArrowUpDown, Plus } from "lucide-react";
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
import CardIntro from "@/components/utils/Headings/CardIntro";
import Checkbox from "@/components/utils/FormElements/Checkbox";
import ButtonComp from "@/components/utils/Button";
import { NavigateToRecord } from "@/Helper/Utility";
import { changeDateFormat } from "@/Helper/DateFormats";
import { useRouter } from "next/navigation";

interface Prop {
  data: any;
  aidDelete: (id: number) => void;
}

export default function FirstAidTab({ data, aidDelete }: Prop) {
  const router = useRouter();
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [aids, setAids] = useState(data);
  const [selectedAids, setSelectedAids] = useState<string[]>([]);
  const [deleteAidDialog, setDeleteAidDialog] = useState(false);
  const [aidToDelete, setAidToDelete] = useState<any>(null);
  const [selectedAid, setSelectedAid] = useState<any>(null);

  const toggleSelectAid = (aidId: number) => {
    console.log(aidId);
    setSelectedAids((prev: any) =>
      prev.includes(aidId)
        ? prev.filter((id: number) => id !== aidId)
        : [...prev, aidId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedAids.length === data.length) {
      setSelectedAids([]);
    } else {
      setSelectedAids(data.map((aid: any) => aid.id));
    }
  };

  // Sort Courts based on selected sort order
  const sortedFirstAids = [...data].sort((a, b) => {
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
  const currentPosts = sortedFirstAids.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(aids.length / postsPerPage);
  const paginationLabels = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleDeleteAid = () => {
    if (aidToDelete) {
      const updatedAids = aids.filter((aid: any) => aid.id !== aidToDelete.id);
      setAids(updatedAids);
      aidDelete(aidToDelete.id);
      setDeleteAidDialog(false);
      setAidToDelete(null);
    }
  };
  return (
    <>
      <AlertDialog open={deleteAidDialog} onOpenChange={setDeleteAidDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the firstAid "{aidToDelete?.name}".
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAid}
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
              title="First Aid Management"
              description="Manage all first aids throughout the zoos."
            />
            <div className="w-fit">
              <ButtonComp
                type={"dark"}
                clickEvent={() => {
                  router.push(
                    NavigateToRecord("services", "First_Aid", "create")
                  );
                }}
                text="Add First Aid"
                beforeIcon={<Plus className=" h-4 w-4" />}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {selectedAids.length > 0 && (
            <div className="flex items-center gap-2 mb-4 p-2 bg-main-frostyBlue/10 rounded-md">
              <span className="text-sm text-main-darkFadedBlue">
                {selectedAids.length} first aid
                {selectedAids.length > 1 ? "s" : ""} selected
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
                        selectedAids.length === data.length && data.length > 0
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
                  <TableHead>Staffed</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Equipment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center text-main-darkFadedBlue">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPosts.length > 0 ? (
                  currentPosts.map((firstAid: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Checkbox
                          value={selectedAids.includes(firstAid.id)}
                          setter={(n, v) => toggleSelectAid(firstAid.id)}
                          name="id"
                        />
                      </TableCell>
                      <TableCell>{firstAid.name}</TableCell>
                      <TableCell>{firstAid.location}</TableCell>
                      <TableCell>{firstAid.staffed ? "YES" : "NO"}</TableCell>
                      <TableCell>{firstAid.staffingHours}</TableCell>
                      <TableCell>{firstAid.equipment.join(", ")}</TableCell>
                      <TableCell>{firstAid.status}</TableCell>
                      <TableCell className="flex justify-center items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            router.push(
                              NavigateToRecord(
                                "services",
                                "First_Aid",
                                "edit",
                                firstAid.id
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
                            setAidToDelete(firstAid);
                            setDeleteAidDialog(true);
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
                      No first aid found.
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
