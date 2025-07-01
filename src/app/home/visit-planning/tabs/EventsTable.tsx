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

const EventsTable = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "School Visit",
      date: "2023-05-15T14:00:00.000z",
      status: "confirmed",
      type: "education",
      zoo: "Lahore Zoo",
    },
    {
      id: 2,
      title: "Corporate Team Building",
      date: "2023-05-16T14:00:00.000z",
      status: "pending",
      type: "corporate",
      zoo: "Lahori Safari Park",
    },
    {
      id: 3,
      title: "Birthday Party",
      date: "2023-05-18T14:00:00.000z",
      status: "confirmed",
      type: "birthday",
      zoo: "Lahore Zoo",
    },
    {
      id: 4,
      title: "Senior Center Visit",
      date: "2023-05-20T14:00:00.000z",
      status: "confirmed",
      type: "community",
      zoo: "Bahawalpur Zoo",
    },
  ]);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [deleteType, setDeleteType] = useState<
    "event" | "group" | "route" | "booking"
  >("event");
  const toggleSelectEvent = (eventId: string) => {
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
      setSelectedEvents(filteredEvents.map((event: any) => event.id));
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = Object.values(event).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesSearch;
  });

  // Sort Events based on selected sort order
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    switch (sortOrder) {
      case "name-asc":
        return a.title.localeCompare(b.title);
      case "name-desc":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  const router = useRouter();
  function NavigateToRecord(tab: string, mode: string, id?: number) {
    router.push(
      `/home/visit-planning?tab=${tab}&mode=${mode}` +
        (id != undefined ? `&id=${id}` : "")
    );
  }

  /////////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedEvents.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(events.length / postsPerPage);
  const paginationLabels = Array.from({ length: totalPages }, (_, i) => i + 1);

  /////////////////////////////////////

  const openDeleteDialog = (
    type: "event" | "group" | "route" | "booking",
    item: any
  ) => {
    setDeleteType(type);
    setSelectedItem(item);
    setDeleteModalOpen(true);
  };

  const handleDeleteEvent = () => {
    if (selectedItem) {
      setEvents(events.filter((event) => event.id !== selectedItem.id));
      setDeleteModalOpen(false);
      toast({
        title: "Event Deleted",
        description: `Event "${selectedItem.title}" has been deleted.`,
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
          handleDeleteEvent();
        }}
        index={0}
        type={deleteType}
        item={selectedItem}
      />
      <div className="flex justify-end items-end space-x-2">
        <div className="flex items-center space-x-2">
          <Input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            placeholder="Search events..."
            className="h-9 w-[150px] lg:w-[250px]"
          />
        </div>
        <div className="w-fit">
          <ButtonComp
            type={"dark"}
            clickEvent={() => {
              NavigateToRecord("event", "create");
            }}
            text="Add Event"
            beforeIcon={<Plus className=" h-4 w-4" />}
          />
        </div>
      </div>
      {selectedEvents.length > 0 && (
        <div className="flex items-center gap-2 mb-4 p-2 bg-main-frostyBlue/10 rounded-md">
          <span className="text-sm text-main-darkFadedBlue">
            {selectedEvents.length} event
            {selectedEvents.length > 1 ? "s" : ""} selected
          </span>
          <div className="flex-1"></div>
          {/* <Button
                      variant="outline"
                      size="sm"
                      className="border-main-darkFadedBlue text-main-darkFadedBlue"
                    >
                      Mark as Featured
                    </Button> */}
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
      <Table>
        <TableHeader>
          <TableRow className="bg-main-frostyBlue/5">
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
            <TableHead>
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() =>
                  setSortOrder(
                    sortOrder === "name-asc" ? "name-desc" : "name-asc"
                  )
                }
              >
                Title
                <ArrowUpDown className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>Zoo</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-center text-main-darkFadedBlue">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="!text-sm">
          {currentPosts.length > 0 ? (
            currentPosts.map((event: any, index: number) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox
                    value={selectedEvents.includes(event.id)}
                    setter={(n, v) => toggleSelectEvent(event.id)}
                    name="id"
                  />
                </TableCell>
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.zoo}</TableCell>
                <TableCell>{event.type}</TableCell>
                <TableCell>{changeDateFormatWithTime(event.date)}</TableCell>
                <TableCell className="flex justify-center items-center space-x-2">
                  <Edit
                    className="text-black h-4 w-4 cursor-pointer"
                    onClick={() => {
                      NavigateToRecord("event", "edit", event.id);
                    }}
                  />

                  <Trash2
                    className="text-red-500 h-4 w-4 cursor-pointer"
                    onClick={() => openDeleteDialog("event", event)}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-24 text-center text-main-gray"
              >
                No products found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
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
    </>
  );
};

export default EventsTable;
