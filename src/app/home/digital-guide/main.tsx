"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import RouteModal from "@/components/visit-planning/route-modal";
import { DeleteConfirmationDialog } from "@/components/visit-planning/delete-confirmation";
import { useRouter } from "next/navigation";
import Heading from "@/components/utils/Headings/Heading";
import SectionIntro from "@/components/utils/Headings/SectionIntro";
import FeaturedAnimalsTable from "./tabs/FeaturedAnimalsTable";
import DailyScheduleTable from "./tabs/DailyScheduleTable";
import useHelper from "@/Helper/helper";

export default function DigitalGuidePage() {
  const { toast } = useToast();
  const router = useRouter();
  const helper = useHelper();
  const pageData = helper.GetPageData();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [routeModalOpen, setRouteModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [deleteType, setDeleteType] = useState<
    "event" | "group" | "route" | "booking"
  >("event");

  // Available zoos in the system - this would come from an API in a real application
  const [availableZoos, setAvailableZoos] = useState([
    {
      id: 1,
      name: "Lahore Zoo",
      location: "Mall Road",
      status: "active",
    },
    {
      id: 2,
      name: "Lahore Safari Park",
      location: "Wildlife Park Road",
      status: "active",
    },
    {
      id: 3,
      name: "Bahawalpur Zoo",
      location: "Circular Road",
      status: "active", //maintenance
    },
  ]);

  // Mock data for events
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "School Visit",
      date: "2023-05-15T14:00:00.000z",
      attendees: 45,
      status: "confirmed",
      type: "education",
      zoo: "Lahore Zoo",
    },
    {
      id: 2,
      title: "Corporate Team Building",
      date: "2023-05-16T14:00:00.000z",
      attendees: 20,
      status: "pending",
      type: "corporate",
      zoo: "Lahori Safari Park",
    },
    {
      id: 3,
      title: "Birthday Party",
      date: "2023-05-18T14:00:00.000z",
      attendees: 15,
      status: "confirmed",
      type: "birthday",
      zoo: "Lahore Zoo",
    },
    {
      id: 4,
      title: "Senior Center Visit",
      date: "2023-05-20T14:00:00.000z",
      attendees: 25,
      status: "confirmed",
      type: "community",
      zoo: "Bahawalpur Zoo",
    },
  ]);

  // Mock data for group visits
  const [groupVisits, setGroupVisits] = useState([
    {
      id: 1,
      name: "Lincoln Elementary School",
      date: "2023-05-22",
      time: "9:30 AM",
      groupSize: 60,
      contactPerson: "Sarah Johnson",
      contactEmail: "sjohnson@lincoln.edu",
      contactPhone: "(555) 123-4567",
      specialRequirements: "3 students require wheelchair access",
      status: "confirmed",
      zoo: "Central City Zoo",
    },
    {
      id: 2,
      name: "Tech Innovations Inc.",
      date: "2023-05-25",
      time: "1:00 PM",
      groupSize: 35,
      contactPerson: "Michael Chen",
      contactEmail: "mchen@techinnovations.com",
      contactPhone: "(555) 987-6543",
      specialRequirements: "Vegetarian lunch options required",
      status: "pending",
      zoo: "Woodland Wildlife Park",
    },
    {
      id: 3,
      name: "Golden Years Retirement Community",
      date: "2023-05-28",
      time: "10:00 AM",
      groupSize: 20,
      contactPerson: "Robert Williams",
      contactEmail: "rwilliams@goldenyears.org",
      contactPhone: "(555) 456-7890",
      specialRequirements: "Slow-paced tour, frequent rest stops needed",
      status: "confirmed",
      zoo: "Desert Oasis Zoo",
    },
  ]);

  // Mock data for suggested routes
  const [routes, setRoutes] = useState([
    {
      id: 1,
      name: "Family Adventure",
      duration: "2 hours",
      distance: "1.2 miles",
      difficulty: "Easy",
      highlights: ["Elephant Enclosure", "Penguin Pool", "Lion Territory"],
      description:
        "Perfect for families with children of all ages. This route covers the most popular exhibits with minimal walking.",
      recommendedTimes: ["Morning", "Late Afternoon"],
      zoo: "Central City Zoo",
    },
    {
      id: 2,
      name: "Conservation Trail",
      duration: "3 hours",
      distance: "2.5 miles",
      difficulty: "Moderate",
      highlights: [
        "Endangered Species Center",
        "Conservation Education Hub",
        "Breeding Program Exhibits",
      ],
      description:
        "Learn about our conservation efforts and see some of the world's most endangered species.",
      recommendedTimes: ["Midday"],
      zoo: "Woodland Wildlife Park",
    },
    {
      id: 3,
      name: "Marine Explorer",
      duration: "1.5 hours",
      distance: "0.8 miles",
      difficulty: "Easy",
      highlights: ["Dolphin Lagoon", "Shark Tunnel", "Coral Reef Display"],
      description:
        "Discover the wonders of marine life with this ocean-focused route.",
      recommendedTimes: ["Afternoon"],
      zoo: "Oceanview Marine World",
    },
  ]);

  // Mock data for bookings
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

  // // CRUD operations for events
  // const handleAddEvent = (event: any) => {
  //   const newEvent = {
  //     id: events.length + 1,
  //     ...event,
  //     status: "pending",
  //   };
  //   setEvents([...events, newEvent]);
  //   toast({
  //     title: "Event Created",
  //     description: `Event "${event.title}" has been created successfully.`,
  //   });
  // };

  // const handleEditEvent = (updatedEvent: any) => {
  //   setEvents(
  //     events.map((event) =>
  //       event.id === updatedEvent.id ? updatedEvent : event
  //     )
  //   );
  //   toast({
  //     title: "Event Updated",
  //     description: `Event "${updatedEvent.title}" has been updated successfully.`,
  //   });
  // };

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

  // CRUD operations for group visits
  // const handleAddGroupVisit = (groupVisit: any) => {
  //   const newGroupVisit = {
  //     id: groupVisits.length + 1,
  //     ...groupVisit,
  //     status: "pending",
  //   };
  //   setGroupVisits([...groupVisits, newGroupVisit]);
  //   toast({
  //     title: "Group Visit Created",
  //     description: `Group visit for "${groupVisit.name}" has been created successfully.`,
  //   });
  // };

  // const handleEditGroupVisit = (updatedGroupVisit: any) => {
  //   setGroupVisits(
  //     groupVisits.map((visit) =>
  //       visit.id === updatedGroupVisit.id ? updatedGroupVisit : visit
  //     )
  //   );
  //   toast({
  //     title: "Group Visit Updated",
  //     description: `Group visit for "${updatedGroupVisit.name}" has been updated successfully.`,
  //   });
  // };

  const handleDeleteGroupVisit = () => {
    if (selectedItem) {
      setGroupVisits(
        groupVisits.filter((visit) => visit.id !== selectedItem.id)
      );
      setDeleteModalOpen(false);
      toast({
        title: "Group Visit Deleted",
        description: `Group visit for "${selectedItem.name}" has been deleted.`,
        variant: "destructive",
      });
    }
  };

  // CRUD operations for routes
  const handleAddRoute = (route: any) => {
    const newRoute = {
      id: routes.length + 1,
      ...route,
    };
    setRoutes([...routes, newRoute]);
    toast({
      title: "Route Created",
      description: `Route "${route.name}" has been created successfully.`,
    });
  };

  const handleEditRoute = (updatedRoute: any) => {
    setRoutes(
      routes.map((route) =>
        route.id === updatedRoute.id ? updatedRoute : route
      )
    );
    toast({
      title: "Route Updated",
      description: `Route "${updatedRoute.name}" has been updated successfully.`,
    });
  };

  const handleDeleteRoute = () => {
    if (selectedItem) {
      setRoutes(routes.filter((route) => route.id !== selectedItem.id));
      setDeleteModalOpen(false);
      toast({
        title: "Route Deleted",
        description: `Route "${selectedItem.name}" has been deleted.`,
        variant: "destructive",
      });
    }
  };

  // CRUD operations for bookings
  // const handleAddBooking = (booking: any) => {
  //   const newBooking = {
  //     id: bookings.length + 1,
  //     ...booking,
  //   };
  //   setBookings([...bookings, newBooking]);
  //   toast({
  //     title: "Booking Created",
  //     description: `Booking for "${booking.visitorName}" has been created successfully.`,
  //   });
  // };

  // const handleEditBooking = (updatedBooking: any) => {
  //   setBookings(
  //     bookings.map((booking) =>
  //       booking.id === updatedBooking.id ? updatedBooking : booking
  //     )
  //   );
  //   toast({
  //     title: "Booking Updated",
  //     description: `Booking for "${updatedBooking.visitorName}" has been updated successfully.`,
  //   });
  // };

  const handleDeleteBooking = () => {
    if (selectedItem) {
      setBookings(bookings.filter((booking) => booking.id !== selectedItem.id));
      setDeleteModalOpen(false);
      toast({
        title: "Booking Deleted",
        description: `Booking for "${selectedItem.visitorName}" has been deleted.`,
        variant: "destructive",
      });
    }
  };

  // Open delete confirmation dialog
  const openDeleteDialog = (
    type: "event" | "group" | "route" | "booking",
    item: any
  ) => {
    setDeleteType(type);
    setSelectedItem(item);
    setDeleteModalOpen(true);
  };

  function NavigateToRecord(tab: string, mode: string, id?: number) {
    router.push(
      `/home/visit-planning?tab=${tab}&mode=${mode}` +
        (id != undefined ? `&id=${id}` : "")
    );
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <SectionIntro
          title={pageData?.MenuName}
          description={pageData?.Description}
        />
        <div className="flex items-center space-x-2">
          {/* <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[200px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover> */}
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Zoo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Zoos</SelectItem>
              {availableZoos.map((zoo) => (
                <SelectItem key={zoo.id} value={zoo.id.toString()}>
                  {zoo.name} {zoo.status === "maintenance" && "(Maintenance)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="featuredAnimals" className="space-y-4">
        <TabsList className="">
          <TabsTrigger value="featuredAnimals">Featured Animals</TabsTrigger>
          <TabsTrigger value="dailySchedule">Daily Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="featuredAnimals" className="space-y-2">
          <FeaturedAnimalsTable />
        </TabsContent>

        <TabsContent value="dailySchedule" className="space-y-2">
          <DailyScheduleTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
