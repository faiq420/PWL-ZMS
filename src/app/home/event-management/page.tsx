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
import Checkbox from "@/components/utils/FormElements/Checkbox";
import useHelper from "@/Helper/helper";
import { useToast } from "@/components/ui/use-toast";
import { changeDateFormat, to12Hour } from "@/Helper/DateFormats";

type Event = {
  EventId: number;
  EventTitle: string;
  EventStartingTime: string;
  EventClosingTime: string;
  IsOccasional: boolean;
  ZooTitle: string;
  EventDays: string;
};

export default function EventPage() {
  const { toast } = useToast();
  const router = useRouter();
  const helper = useHelper();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<number[]>([]);
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [deleteEventsDialog, setDeleteEventsDialog] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<any>(null);

  const toggleSelectEvent = (eventId: number) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedEvents.length === filteredEvents.length) {
      setSelectedEvents([]);
    } else {
      setSelectedEvents(filteredEvents.map((event: any) => event.EventId));
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.EventTitle.toLowerCase().includes(
      searchQuery.toLowerCase()
    );

    return matchesSearch;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    switch (sortOrder) {
      case "name-asc":
        return a.EventTitle.localeCompare(b.EventTitle);
      case "name-desc":
        return b.EventTitle.localeCompare(a.EventTitle);
      default:
        return 0;
    }
  });

  /////////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedEvents.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(events.length / postsPerPage);
  const paginationLabels = Array.from({ length: totalPages }, (_, i) => i + 1);

  /////////////////////////////////////

  const handleDeleteEvents = () => {
    if (eventToDelete) {
      setIsDeleting(true);
      helper.xhr
        .Post(
          "/Event/DeleteEvent",
          helper.ConvertToFormData({
            eventId: eventToDelete.EventId,
          })
        )
        .then((res) => {
          if (res == "Event deleted successfully.") {
            const updatedEvents = events.filter(
              (event: any) => event.EventId !== eventToDelete.EventId
            );
            setEvents(updatedEvents);
            setDeleteEventsDialog(false);
            setEventToDelete(null);
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
    helper.xhr.Get("/Event/GetEventList").then((res) => {
      setEvents(res.events.filter((event: any) => event.IsOccasional));
    });
  }, []);

  return (
    <>
      <AlertDialog
        open={deleteEventsDialog}
        onOpenChange={setDeleteEventsDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the event "
              {eventToDelete?.EventTitle}
              ". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteEvents}
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
          title="Event Management"
          description="Manage zoo events & trips."
        />

        <Card className="space-y-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardIntro title="Events" description="Overview of all events." />
            <div className="w-fit">
              <ButtonComp
                text="Add New Event"
                type={"dark"}
                beforeIcon={<Plus className="h-4 w-4" />}
                clickEvent={() => {
                  router.push("/home/event-management/new");
                }}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <SearchTag
              value={searchQuery}
              setter={(value) => setSearchQuery(value)}
              placeHolder="Select Events..."
            />
            {selectedEvents.length > 0 && (
              <div className="flex items-center gap-2 mb-4 p-2 bg-main-frostyBlue/10 rounded-md">
                <span className="text-sm text-main-darkFadedBlue">
                  {selectedEvents.length} event
                  {selectedEvents.length > 1 ? "s" : ""} selected
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
                          selectedEvents.length === filteredEvents.length &&
                          filteredEvents.length > 0
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
                      Event Name
                      <ArrowUpDown className="h-4 w-4" />
                    </TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Timing</TableHead>
                    <TableHead>Zoo</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPosts.length > 0 ? (
                    currentPosts.map((event: Event) => (
                      <TableRow key={event.EventId}>
                        <TableCell>
                          <Checkbox
                            value={selectedEvents.includes(event.EventId)}
                            setter={(n, v) => toggleSelectEvent(event.EventId)}
                            name="id"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {event.EventTitle}
                        </TableCell>
                        <TableCell>
                          {changeDateFormat(event.EventDays.split(",")[0])} -
                          {changeDateFormat(
                            event.EventDays.split(",")[
                              event.EventDays.split(",").length - 1
                            ]
                          )}
                        </TableCell>
                        <TableCell>
                          {to12Hour(event.EventStartingTime)} - {to12Hour(event.EventClosingTime)}
                        </TableCell>
                        <TableCell>{event.ZooTitle}</TableCell>
                        <TableCell className="text-right flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              router.push(
                                `/home/event-management/${event.EventId}`
                              );
                            }}
                          >
                            <Edit className="text-black h-4 w-4 cursor-pointer" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEventToDelete(event);
                              setDeleteEventsDialog(true);
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
                        No events found.
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
