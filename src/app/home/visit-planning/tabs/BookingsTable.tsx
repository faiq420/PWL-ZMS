'use client'
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

const BookingsTable = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState([
    {
      id: 1,
      visitorName: "John Smith",
      visitDate: "2023-05-15",
      ticketType: "Family Pass",
      quantity: 4,
      totalPrice: "120.00",
      paymentStatus: "Paid",
      bookingMethod: "Online",
      zoo: "Lahore Zoo",
    },
    {
      id: 2,
      visitorName: "Emily Johnson",
      visitDate: "2023-05-16",
      ticketType: "Couple",
      quantity: 2,
      totalPrice: "50.00",
      paymentStatus: "Paid",
      bookingMethod: "Phone",
      zoo: "Lahore Safari Park",
    },
    {
      id: 3,
      visitorName: "Martinez Family",
      visitDate: "2023-05-18",
      ticketType: "Family Pass",
      quantity: 5,
      totalPrice: "150.00",
      paymentStatus: "Pending",
      bookingMethod: "Online",
      zoo: "Lahore Zoo",
    },
    {
      id: 4,
      visitorName: "David Wilson",
      visitDate: "2023-05-20",
      ticketType: "Solo",
      quantity: 1,
      totalPrice: "20.00",
      paymentStatus: "Paid",
      bookingMethod: "In Person",
      zoo: "Bahalwalpur Zoo",
    },
  ]);
  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [deleteType, setDeleteType] = useState<
    "booking" | "group" | "route" | "booking"
  >("booking");
  const toggleSelectbooking = (bookingId: string) => {
    setSelectedBookings((prev) =>
      prev.includes(bookingId)
        ? prev.filter((id) => id !== bookingId)
        : [...prev, bookingId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedBookings.length === filteredBookings.length) {
      setSelectedBookings([]);
    } else {
      setSelectedBookings(filteredBookings.map((booking: any) => booking.id));
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = booking.visitorName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  // Sort Bookings based on selected sort order
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    switch (sortOrder) {
      case "name-asc":
        return a.visitorName.localeCompare(b.visitorName);
      case "name-desc":
        return b.visitorName.localeCompare(a.visitorName);
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
  const currentPosts = sortedBookings.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(bookings.length / postsPerPage);
  const paginationLabels = Array.from({ length: totalPages }, (_, i) => i + 1);

  /////////////////////////////////////

  const openDeleteDialog = (
    type: "booking" | "group" | "route" | "booking",
    item: any
  ) => {
    setDeleteType(type);
    setSelectedItem(item);
    setDeleteModalOpen(true);
  };

  const handleDeletebooking = () => {
    if (selectedItem) {
      setBookings(bookings.filter((booking) => booking.id !== selectedItem.id));
      setDeleteModalOpen(false);
      toast({
        title: "booking Deleted",
        description: `booking "${selectedItem.title}" has been deleted.`,
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
          handleDeletebooking();
        }}
        index={0}
        type={deleteType}
        item={selectedItem}
      />
      <div className="flex justify-end items-end space-x-2">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search booking..."
            className="h-9 w-[150px] lg:w-[235px]"
          />
        </div>
        <div className="w-fit">
          <ButtonComp
            type={"dark"}
            clickEvent={() => {
              NavigateToRecord("booking", "create");
            }}
            text="Add Booking"
            beforeIcon={<Plus className=" h-4 w-4" />}
          />
        </div>
      </div>
      {selectedBookings.length > 0 && (
        <div className="flex items-center gap-2 mb-4 p-2 bg-main-frostyBlue/10 rounded-md">
          <span className="text-sm text-main-darkFadedBlue">
            {selectedBookings.length} booking
            {selectedBookings.length > 1 ? "s" : ""} selected
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
      <Table>
        <TableHeader>
          <TableRow className="bg-main-frostyBlue/5">
            <TableHead className="w-12">
              <Checkbox
                value={
                  selectedBookings.length === filteredBookings.length &&
                  filteredBookings.length > 0
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
            <TableHead>Booking Method</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Zoo</TableHead>
            <TableHead className="text-center text-main-darkFadedBlue">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="!text-sm">
          {currentPosts.length > 0 ? (
            currentPosts.map((booking: any, index: number) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox
                    value={selectedBookings.includes(booking.id)}
                    setter={(n, v) => toggleSelectbooking(booking.id)}
                    name="id"
                  />
                </TableCell>
                <TableCell>{booking.visitorName}</TableCell>
                <TableCell>{booking.bookingMethod}</TableCell>
                <TableCell>
                  {changeDateFormatWithTime(booking.visitDate)}
                </TableCell>
                <TableCell>{booking.quantity}</TableCell>
                <TableCell>{booking.totalPrice}</TableCell>
                <TableCell>{booking.zoo}</TableCell>
                <TableCell className="flex justify-center items-center space-x-2">
                  <Edit
                    className="text-black h-4 w-4 cursor-pointer"
                    onClick={() => {
                      NavigateToRecord("booking", "edit", booking.id);
                    }}
                  />

                  <Trash2
                    className="text-red-500 h-4 w-4 cursor-pointer"
                    onClick={() => openDeleteDialog("booking", booking)}
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

export default BookingsTable;
