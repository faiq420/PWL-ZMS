"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EventModal } from "@/components/visit-planning/event-modal";
import { GroupVisitModal } from "@/components/visit-planning/group-visit-modal";
import { BookingModal } from "@/components/visit-planning/booking-modal";
import { useToast } from "@/components/ui/use-toast";
import RouteModal from "@/components/visit-planning/route-modal";
import { DeleteConfirmationDialog } from "@/components/visit-planning/delete-confirmation";

export default function VisitPlanningPage() {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [groupVisitModalOpen, setGroupVisitModalOpen] = useState(false);
  const [routeModalOpen, setRouteModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
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
      date: "2023-05-15",
      time: "10:00 AM",
      attendees: 45,
      status: "confirmed",
      type: "education",
      zoo: "Lahore Zoo",
    },
    {
      id: 2,
      title: "Corporate Team Building",
      date: "2023-05-16",
      time: "2:00 PM",
      attendees: 20,
      status: "pending",
      type: "corporate",
      zoo: "Lahori Safari Park",
    },
    {
      id: 3,
      title: "Birthday Party",
      date: "2023-05-18",
      time: "1:00 PM",
      attendees: 15,
      status: "confirmed",
      type: "birthday",
      zoo: "Lahore Zoo",
    },
    {
      id: 4,
      title: "Senior Center Visit",
      date: "2023-05-20",
      time: "11:00 AM",
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
      ticketType: "Adult",
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
      zoo: "Lahore World",
    },
    {
      id: 4,
      visitorName: "David Wilson",
      visitDate: "2023-05-20",
      ticketType: "Senior",
      quantity: 1,
      totalPrice: "20.00",
      paymentStatus: "Paid",
      bookingMethod: "In Person",
      zoo: "Bahalwalpur Zoo",
    },
  ]);

  // CRUD operations for events
  const handleAddEvent = (event: any) => {
    const newEvent = {
      id: events.length + 1,
      ...event,
      status: "pending",
    };
    setEvents([...events, newEvent]);
    toast({
      title: "Event Created",
      description: `Event "${event.title}" has been created successfully.`,
    });
  };

  const handleEditEvent = (updatedEvent: any) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    toast({
      title: "Event Updated",
      description: `Event "${updatedEvent.title}" has been updated successfully.`,
    });
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

  // CRUD operations for group visits
  const handleAddGroupVisit = (groupVisit: any) => {
    const newGroupVisit = {
      id: groupVisits.length + 1,
      ...groupVisit,
      status: "pending",
    };
    setGroupVisits([...groupVisits, newGroupVisit]);
    toast({
      title: "Group Visit Created",
      description: `Group visit for "${groupVisit.name}" has been created successfully.`,
    });
  };

  const handleEditGroupVisit = (updatedGroupVisit: any) => {
    setGroupVisits(
      groupVisits.map((visit) =>
        visit.id === updatedGroupVisit.id ? updatedGroupVisit : visit
      )
    );
    toast({
      title: "Group Visit Updated",
      description: `Group visit for "${updatedGroupVisit.name}" has been updated successfully.`,
    });
  };

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
  const handleAddBooking = (booking: any) => {
    const newBooking = {
      id: bookings.length + 1,
      ...booking,
    };
    setBookings([...bookings, newBooking]);
    toast({
      title: "Booking Created",
      description: `Booking for "${booking.visitorName}" has been created successfully.`,
    });
  };

  const handleEditBooking = (updatedBooking: any) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === updatedBooking.id ? updatedBooking : booking
      )
    );
    toast({
      title: "Booking Updated",
      description: `Booking for "${updatedBooking.visitorName}" has been updated successfully.`,
    });
  };

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

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Visit Planning</h2>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
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
          </Popover>
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

      <Tabs defaultValue="events" className="space-y-4">
        <TabsList>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="group-visits">Group Visits</TabsTrigger>
          <TabsTrigger value="suggested-routes">Suggested Routes</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-4">
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Search events..."
                className="h-8 w-[150px] lg:w-[250px]"
              />
              {/* <Select defaultValue="all">
                <SelectTrigger className="h-8 w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select> */}
            </div>
            <Button onClick={() => setEventModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Event
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id} className="flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>{event.title}</CardTitle>
                    <div
                      className={`px-2 py-1 rounded-2xl h-6 text-xs font-medium ${
                        event.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : event.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {event.status.charAt(0).toUpperCase() +
                        event.status.slice(1)}
                    </div>
                  </div>
                  <CardDescription>
                    {event.date} at {event.time}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="grid gap-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Attendees:</span>
                      <span>{event.attendees}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Type:</span>
                      <span>
                        {event.type.charAt(0).toUpperCase() +
                          event.type.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Zoo:</span>
                      <span>{event.zoo}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedItem(event);
                      setEventModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openDeleteDialog("event", event)}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="group-visits" className="space-y-4">
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Search group visits..."
                className="h-8 w-[150px] lg:w-[250px]"
              />
              <Select defaultValue="all">
                <SelectTrigger className="h-8 w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => setGroupVisitModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Group Visit
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {groupVisits.map((visit) => (
              <Card key={visit.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>{visit.name}</CardTitle>
                    <p
                      className={`px-2 py-1 rounded-2xl !h-6 text-xs font-medium ${
                        visit.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : visit.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {visit.status.charAt(0).toUpperCase() +
                        visit.status.slice(1)}
                    </p>
                  </div>
                  <CardDescription>
                    {visit.date} at {visit.time}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Group Size:</span>
                      <span>{visit.groupSize}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Contact:</span>
                      <span>{visit.contactPerson}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="truncate max-w-[200px]">
                        {visit.contactEmail}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Phone:</span>
                      <span>{visit.contactPhone}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Zoo:</span>
                      <span>{visit.zoo}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedItem(visit);
                      setGroupVisitModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openDeleteDialog("group", visit)}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="suggested-routes" className="space-y-4">
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Search routes..."
                className="h-8 w-[150px] lg:w-[250px]"
              />
              <Select defaultValue="all">
                <SelectTrigger className="h-8 w-[150px]">
                  <SelectValue placeholder="Filter by zoo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Zoos</SelectItem>
                  {availableZoos.map((zoo) => (
                    <SelectItem key={zoo.id} value={zoo.id.toString()}>
                      {zoo.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* <Button onClick={() => setRouteModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Route
            </Button> */}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {routes.map((route) => (
              <Card key={route.id}>
                <CardHeader className="pb-2">
                  <CardTitle>{route.name}</CardTitle>
                  <CardDescription>{route.zoo}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration:</span>
                      <span>{route.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Distance:</span>
                      <span>{route.distance}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Difficulty:</span>
                      <span>{route.difficulty}</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm text-muted-foreground">
                        Highlights:
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {route.highlights.map((highlight, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-xs rounded-full"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedItem(route);
                      setRouteModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openDeleteDialog("route", route)}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Search bookings..."
                className="h-8 w-[150px] lg:w-[250px]"
              />
              {/* <Select defaultValue="all">
                <SelectTrigger className="h-8 w-[150px]">
                  <SelectValue placeholder="Filter by payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select> */}
            </div>
            {/* <Button onClick={() => setBookingModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Booking
            </Button> */}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <Card key={booking.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>{booking.visitorName}</CardTitle>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-800"
                          : booking.paymentStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.paymentStatus}
                    </div>
                  </div>
                  <CardDescription>
                    Visit Date: {booking.visitDate}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Ticket Type:
                      </span>
                      <span>{booking.ticketType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Quantity:</span>
                      <span>{booking.quantity}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total:</span>
                      <span>{booking.totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Method:</span>
                      <span>{booking.bookingMethod}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Zoo:</span>
                      <span>{booking.zoo}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedItem(booking);
                      setBookingModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openDeleteDialog("booking", booking)}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <EventModal
        isOpen={eventModalOpen}
        onClose={() => setEventModalOpen(false)}
        onSave={selectedItem ? handleEditEvent : handleAddEvent}
        event={selectedItem}
        availableZoos={availableZoos}
      />

      <GroupVisitModal
        isOpen={groupVisitModalOpen}
        onClose={() => setGroupVisitModalOpen(false)}
        onSave={selectedItem ? handleEditGroupVisit : handleAddGroupVisit}
        groupVisit={selectedItem}
        availableZoos={availableZoos}
      />

      <RouteModal
        isOpen={routeModalOpen}
        onClose={() => setRouteModalOpen(false)}
        onSave={selectedItem ? handleEditRoute : handleAddRoute}
        route={selectedItem}
        availableZoos={availableZoos}
      />

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        onSave={selectedItem ? handleEditBooking : handleAddBooking}
        booking={selectedItem}
        availableZoos={availableZoos}
        viewMode={false}
      />

      <DeleteConfirmationDialog
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          if (deleteType === "event") {
            handleDeleteEvent();
          } else if (deleteType === "group") {
            handleDeleteGroupVisit();
          } else if (deleteType === "route") {
            handleDeleteRoute();
          } else if (deleteType === "booking") {
            handleDeleteBooking();
          }
        }}
        index={0}
        type={deleteType}
        item={selectedItem}
      />
    </div>
  );
}
