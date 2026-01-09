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
import useHelper from "@/Helper/helper";

interface FeedSchedule {
  id: number;
  animalId: number;
  animalName: string;
  feedType: string;
  quantity: string;
  time: string;
  frequency: string; // e.g., Daily, Weekly, Mon-Fri
  notes?: string;
  startDate: string;
  endDate?: string;
}

const initialFeedSchedules: FeedSchedule[] = [
  {
    id: 1,
    animalId: 1,
    animalName: "Lion",
    feedType: "Raw Meat",
    quantity: "5 kg",
    time: "09:00 AM",
    frequency: "Daily",
    notes: "Supplement with vitamins",
    startDate: "2025-03-12",
  },
  {
    id: 2,
    animalId: 3,
    animalName: "Elephant",
    feedType: "Hay & Fruits",
    quantity: "50 kg",
    time: "10:30 AM",
    frequency: "Daily",
    notes: "Large water intake",
    startDate: "2025-03-12",
  },
  {
    id: 3,
    animalId: 5,
    animalName: "Penguin",
    feedType: "Fish",
    quantity: "0.5 kg",
    time: "02:00 PM",
    frequency: "Daily",
    notes: "Feed in water",
    startDate: "2025-05-01",
  },
];

export default function FeedSchedulingPage() {
  const router = useRouter();
  const helper = useHelper();
  const pageData = helper.GetPageData();
  const [searchQuery, setSearchQuery] = useState("");
  const [schedules, setSchedules] = useState<FeedSchedule[]>([
    ...initialFeedSchedules,
  ]);
  const [selectedSchedules, setSelectedSchedules] = useState<number[]>([]);
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [deleteSchedulesDialog, setDeleteSchedulesDialog] = useState(false);
  const [scheduleToDelete, setSchedulesToDelete] = useState<any>(null);

  const toggleSelectSchedule = (bookingId: number) => {
    setSelectedSchedules((prev) =>
      prev.includes(bookingId)
        ? prev.filter((id) => id !== bookingId)
        : [...prev, bookingId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedSchedules.length === filteredSchedules.length) {
      setSelectedSchedules([]);
    } else {
      setSelectedSchedules(filteredSchedules.map((booking: any) => booking.id));
    }
  };

  const filteredSchedules = schedules.filter((schedule) => {
    const matchesSearch = schedule.animalName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  // Sort Schedules based on selected sort order
  const sortedSchedules = [...filteredSchedules].sort((a, b) => {
    switch (sortOrder) {
      case "name-asc":
        return a.animalName.localeCompare(b.animalName);
      case "name-desc":
        return b.animalName.localeCompare(a.animalName);
      default:
        return 0;
    }
  });

  /////////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedSchedules.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(schedules.length / postsPerPage);
  const paginationLabels = Array.from({ length: totalPages }, (_, i) => i + 1);

  /////////////////////////////////////

  const handleDeleteSchedules = () => {
    if (scheduleToDelete) {
      const updatedSafeties = schedules.filter(
        (schedule: any) => schedule.id !== scheduleToDelete.id
      );
      setSchedules(updatedSafeties);
      setDeleteSchedulesDialog(false);
      setSchedulesToDelete(null);
    }
  };

  return (
    <>
      <AlertDialog
        open={deleteSchedulesDialog}
        onOpenChange={setDeleteSchedulesDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the schedule for "
              {scheduleToDelete?.animalName}
              ". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSchedules}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
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
              title="Active Feed Schedules"
              description="Overview of all active feeding plans."
            />
            <div className="w-fit">
              <ButtonComp
                text="Add New Schedule"
                type={"dark"}
                beforeIcon={<Plus className="h-4 w-4" />}
                clickEvent={() => {
                  router.push("/home/feed-scheduling/new");
                }}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <SearchTag
              value={searchQuery}
              setter={(value) => setSearchQuery(value)}
              placeHolder="Select Schedules..."
            />
            {selectedSchedules.length > 0 && (
              <div className="flex items-center gap-2 mb-4 p-2 bg-main-frostyBlue/10 rounded-md">
                <span className="text-sm text-main-darkFadedBlue">
                  {selectedSchedules.length} schedule
                  {selectedSchedules.length > 1 ? "s" : ""} selected
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
                          selectedSchedules.length ===
                            filteredSchedules.length &&
                          filteredSchedules.length > 0
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
                    <TableHead>Feed Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPosts.length > 0 ? (
                    currentPosts.map((schedule) => (
                      <TableRow key={schedule.id}>
                        <TableCell>
                          <Checkbox
                            value={selectedSchedules.includes(schedule.id)}
                            setter={(n, v) => toggleSelectSchedule(schedule.id)}
                            name="id"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {schedule.animalName}
                        </TableCell>
                        <TableCell>{schedule.feedType}</TableCell>
                        <TableCell>{schedule.quantity}</TableCell>
                        <TableCell>{schedule.time}</TableCell>
                        <TableCell>{schedule.frequency}</TableCell>
                        <TableCell>
                          {changeDateFormat(schedule.startDate)}
                        </TableCell>
                        <TableCell>
                          {schedule.endDate
                            ? changeDateFormat(schedule.endDate)
                            : "-"}
                        </TableCell>
                        <TableCell className="text-right flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              router.push(
                                `/home/feed-scheduling/${schedule.id}`
                              );
                            }}
                          >
                            <Edit className="text-black h-4 w-4 cursor-pointer" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSchedulesToDelete(schedule);
                              setDeleteSchedulesDialog(true);
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
                        No schedules found.
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
