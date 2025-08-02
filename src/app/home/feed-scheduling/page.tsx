"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import PageHeader from "@/components/page-header"
import {
  PlusCircle,
  Search,
  Trash2,
  Edit,
  CalendarDays,
  Plus,
  ArrowUpDown,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { mockAnimals } from "@/data/animals";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import SectionIntro from "@/components/utils/Headings/SectionIntro";
import CardIntro from "@/components/utils/Headings/CardIntro";
import FeedHistory from "./components/FeedHistory";
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
    animalName: "Lion Simba",
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
    animalName: "Elephant Dumbo",
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
    animalName: "Penguin Pingu",
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
              This will permanently delete the facility "{scheduleToDelete?.animalName}
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
          title="Feed Scheduling"
          description="Manage feeding schedules for all animals in the zoo."
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
                          {/* <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => setEditingSchedule(schedule)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Edit Feed Schedule</DialogTitle>
                          <DialogDescription>
                            Make changes to the feeding schedule.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="edit-animal-id"
                              className="text-right"
                            >
                              Animal
                            </Label>
                            <select
                              id="edit-animal-id"
                              value={editingSchedule?.animalId || ""}
                              onChange={(e) =>
                                setEditingSchedule((prev) =>
                                  prev
                                    ? { ...prev, animalId: e.target.value }
                                    : null
                                )
                              }
                              className="col-span-3 border rounded-md p-2"
                            >
                              <option value="">Select Animal</option>
                              {mockAnimals.map((animal) => (
                                <option key={animal.id} value={animal.id}>
                                  {animal.name} ({animal.species})
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="edit-feed-type"
                              className="text-right"
                            >
                              Feed Type
                            </Label>
                            <Input
                              id="edit-feed-type"
                              value={editingSchedule?.feedType || ""}
                              onChange={(e) =>
                                setEditingSchedule((prev) =>
                                  prev
                                    ? { ...prev, feedType: e.target.value }
                                    : null
                                )
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="edit-quantity"
                              className="text-right"
                            >
                              Quantity
                            </Label>
                            <Input
                              id="edit-quantity"
                              value={editingSchedule?.quantity || ""}
                              onChange={(e) =>
                                setEditingSchedule((prev) =>
                                  prev
                                    ? { ...prev, quantity: e.target.value }
                                    : null
                                )
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-time" className="text-right">
                              Time
                            </Label>
                            <Input
                              id="edit-time"
                              type="time"
                              value={editingSchedule?.time || ""}
                              onChange={(e) =>
                                setEditingSchedule((prev) =>
                                  prev
                                    ? { ...prev, time: e.target.value }
                                    : null
                                )
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="edit-frequency"
                              className="text-right"
                            >
                              Frequency
                            </Label>
                            <Input
                              id="edit-frequency"
                              value={editingSchedule?.frequency || ""}
                              onChange={(e) =>
                                setEditingSchedule((prev) =>
                                  prev
                                    ? { ...prev, frequency: e.target.value }
                                    : null
                                )
                              }
                              placeholder="e.g., Daily, Mon-Fri, Every other day"
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="edit-start-date"
                              className="text-right"
                            >
                              Start Date
                            </Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "col-span-3 justify-start text-left font-normal",
                                    !editingSchedule?.startDate &&
                                      "text-muted-foreground"
                                  )}
                                >
                                  <CalendarDays className="mr-2 h-4 w-4" />
                                  {editingSchedule?.startDate ? (
                                    format(editingSchedule.startDate, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={editingSchedule?.startDate}
                                  onSelect={(date) =>
                                    date &&
                                    setEditingSchedule((prev) =>
                                      prev ? { ...prev, startDate: date } : null
                                    )
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="edit-end-date"
                              className="text-right"
                            >
                              End Date (Optional)
                            </Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "col-span-3 justify-start text-left font-normal",
                                    !editingSchedule?.endDate &&
                                      "text-muted-foreground"
                                  )}
                                >
                                  <CalendarDays className="mr-2 h-4 w-4" />
                                  {editingSchedule?.endDate ? (
                                    format(editingSchedule.endDate, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={editingSchedule?.endDate}
                                  onSelect={(date) =>
                                    setEditingSchedule((prev) =>
                                      prev
                                        ? {
                                            ...prev,
                                            endDate: date || undefined,
                                          }
                                        : null
                                    )
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-notes" className="text-right">
                              Notes
                            </Label>
                            <Textarea
                              id="edit-notes"
                              value={editingSchedule?.notes || ""}
                              onChange={(e) =>
                                setEditingSchedule((prev) =>
                                  prev
                                    ? { ...prev, notes: e.target.value }
                                    : null
                                )
                              }
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" onClick={handleUpdateSchedule}>
                            Save Changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the feed schedule.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteSchedule(schedule.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog> */}
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
