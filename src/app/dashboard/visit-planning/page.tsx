"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { PlusCircle, Edit, Trash2, Info, CalendarIcon, Users, MapPin } from "lucide-react"
import BookingModal from "@/components/visit-planning/booking-modal"
import EventModal from "@/components/visit-planning/event-modal"
import GroupVisitModal from "@/components/visit-planning/group-visit-modal"
import RouteModal from "@/components/visit-planning/route-modal"
import DeleteConfirmation from "@/components/visit-planning/delete-confirmation"

export default function VisitPlanningPage() {
  const [activeTab, setActiveTab] = useState("bookings")
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Modal states
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [eventModalOpen, setEventModalOpen] = useState(false)
  const [groupVisitModalOpen, setGroupVisitModalOpen] = useState(false)
  const [routeModalOpen, setRouteModalOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  // Modal modes
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">("create")
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null)
  const [deleteItemType, setDeleteItemType] = useState<"booking" | "event" | "group" | "route">("booking")

  // Mock data
  const [bookings, setBookings] = useState([
    {
      id: 1,
      visitorName: "John Doe",
      date: new Date(2023, 4, 15),
      ticketType: "Adult",
      quantity: 2,
      totalPrice: 40,
      status: "Confirmed",
    },
    {
      id: 2,
      visitorName: "Jane Smith",
      date: new Date(2023, 4, 16),
      ticketType: "Child",
      quantity: 3,
      totalPrice: 30,
      status: "Pending",
    },
    {
      id: 3,
      visitorName: "Robert Johnson",
      date: new Date(2023, 4, 17),
      ticketType: "Family",
      quantity: 1,
      totalPrice: 60,
      status: "Confirmed",
    },
  ])

  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Feeding Time",
      date: new Date(2023, 4, 15),
      time: "10:00 AM",
      location: "Lion Enclosure",
      description: "Watch our lions during their feeding time.",
    },
    {
      id: 2,
      name: "Bird Show",
      date: new Date(2023, 4, 16),
      time: "2:00 PM",
      location: "Amphitheater",
      description: "Amazing birds of prey demonstration.",
    },
    {
      id: 3,
      name: "Conservation Talk",
      date: new Date(2023, 4, 17),
      time: "11:30 AM",
      location: "Education Center",
      description: "Learn about our conservation efforts.",
    },
  ])

  const [groupVisits, setGroupVisits] = useState([
    {
      id: 1,
      groupName: "Springfield Elementary",
      date: new Date(2023, 4, 20),
      time: "9:00 AM",
      size: 30,
      contactPerson: "Ms. Krabappel",
      contactEmail: "krabappel@springfield.edu",
      status: "Confirmed",
    },
    {
      id: 2,
      groupName: "Retirement Village",
      date: new Date(2023, 4, 22),
      time: "11:00 AM",
      size: 15,
      contactPerson: "Mr. Burns",
      contactEmail: "burns@retirement.com",
      status: "Pending",
    },
    {
      id: 3,
      groupName: "Scout Troop 42",
      date: new Date(2023, 4, 25),
      time: "10:00 AM",
      size: 20,
      contactPerson: "Ned Flanders",
      contactEmail: "ned@scouts.org",
      status: "Confirmed",
    },
  ])

  const [routes, setRoutes] = useState([
    {
      id: 1,
      name: "Family Adventure",
      duration: "2 hours",
      difficulty: "Easy",
      highlights: ["Petting Zoo", "Aquarium", "Playground"],
      description: "Perfect for families with young children.",
    },
    {
      id: 2,
      name: "Wildlife Explorer",
      duration: "3 hours",
      difficulty: "Moderate",
      highlights: ["Big Cats", "Primates", "Birds of Prey"],
      description: "See our most popular animal exhibits.",
    },
    {
      id: 3,
      name: "Conservation Trail",
      duration: "1.5 hours",
      difficulty: "Easy",
      highlights: ["Endangered Species", "Conservation Center", "Botanical Garden"],
      description: "Learn about our conservation efforts.",
    },
  ])

  // CRUD operations for bookings
  const handleAddBooking = (booking: any) => {
    const newBooking = {
      id: bookings.length + 1,
      ...booking,
      status: "Pending",
    }
    setBookings([...bookings, newBooking])
    setBookingModalOpen(false)
  }

  const handleEditBooking = (booking: any) => {
    setBookings(bookings.map((b) => (b.id === selectedItemId ? { ...b, ...booking } : b)))
    setBookingModalOpen(false)
  }

  const handleDeleteBooking = () => {
    setBookings(bookings.filter((b) => b.id !== selectedItemId))
    setDeleteDialogOpen(false)
  }

  // CRUD operations for events
  const handleAddEvent = (event: any) => {
    const newEvent = {
      id: events.length + 1,
      ...event,
    }
    setEvents([...events, newEvent])
    setEventModalOpen(false)
  }

  const handleEditEvent = (event: any) => {
    setEvents(events.map((e) => (e.id === selectedItemId ? { ...e, ...event } : e)))
    setEventModalOpen(false)
  }

  const handleDeleteEvent = () => {
    setEvents(events.filter((e) => e.id !== selectedItemId))
    setDeleteDialogOpen(false)
  }

  // CRUD operations for group visits
  const handleAddGroupVisit = (groupVisit: any) => {
    const newGroupVisit = {
      id: groupVisits.length + 1,
      ...groupVisit,
      status: "Pending",
    }
    setGroupVisits([...groupVisits, newGroupVisit])
    setGroupVisitModalOpen(false)
  }

  const handleEditGroupVisit = (groupVisit: any) => {
    setGroupVisits(groupVisits.map((g) => (g.id === selectedItemId ? { ...g, ...groupVisit } : g)))
    setGroupVisitModalOpen(false)
  }

  const handleDeleteGroupVisit = () => {
    setGroupVisits(groupVisits.filter((g) => g.id !== selectedItemId))
    setDeleteDialogOpen(false)
  }

  // CRUD operations for routes
  const handleAddRoute = (route: any) => {
    const newRoute = {
      id: routes.length + 1,
      ...route,
    }
    setRoutes([...routes, newRoute])
    setRouteModalOpen(false)
  }

  const handleEditRoute = (route: any) => {
    setRoutes(routes.map((r) => (r.id === selectedItemId ? { ...r, ...route } : r)))
    setRouteModalOpen(false)
  }

  const handleDeleteRoute = () => {
    setRoutes(routes.filter((r) => r.id !== selectedItemId))
    setDeleteDialogOpen(false)
  }

  // Helper functions for opening modals
  const openCreateBookingModal = () => {
    setModalMode("create")
    setSelectedItemId(null)
    setBookingModalOpen(true)
  }

  const openViewEditBookingModal = (id: number, mode: "view" | "edit") => {
    setModalMode(mode)
    setSelectedItemId(id)
    setBookingModalOpen(true)
  }

  const openDeleteBookingDialog = (id: number) => {
    setSelectedItemId(id)
    setDeleteItemType("booking")
    setDeleteDialogOpen(true)
  }

  const openCreateEventModal = () => {
    setModalMode("create")
    setSelectedItemId(null)
    setEventModalOpen(true)
  }

  const openViewEditEventModal = (id: number, mode: "view" | "edit") => {
    setModalMode(mode)
    setSelectedItemId(id)
    setEventModalOpen(true)
  }

  const openDeleteEventDialog = (id: number) => {
    setSelectedItemId(id)
    setDeleteItemType("event")
    setDeleteDialogOpen(true)
  }

  const openCreateGroupVisitModal = () => {
    setModalMode("create")
    setSelectedItemId(null)
    setGroupVisitModalOpen(true)
  }

  const openViewEditGroupVisitModal = (id: number, mode: "view" | "edit") => {
    setModalMode(mode)
    setSelectedItemId(id)
    setGroupVisitModalOpen(true)
  }

  const openDeleteGroupVisitDialog = (id: number) => {
    setSelectedItemId(id)
    setDeleteItemType("group")
    setDeleteDialogOpen(true)
  }

  const openCreateRouteModal = () => {
    setModalMode("create")
    setSelectedItemId(null)
    setRouteModalOpen(true)
  }

  const openViewEditRouteModal = (id: number, mode: "view" | "edit") => {
    setModalMode(mode)
    setSelectedItemId(id)
    setRouteModalOpen(true)
  }

  const openDeleteRouteDialog = (id: number) => {
    setSelectedItemId(id)
    setDeleteItemType("route")
    setDeleteDialogOpen(true)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Visit Planning</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="bookings">Ticket Booking</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="groups">Group Visits</TabsTrigger>
              <TabsTrigger value="routes">Suggested Routes</TabsTrigger>
            </TabsList>

            {/* Bookings Tab */}
            <TabsContent value="bookings" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Ticket Bookings</h2>
                <Button onClick={openCreateBookingModal}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Booking
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {bookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle>{booking.visitorName}</CardTitle>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openViewEditBookingModal(booking.id, "view")}
                          >
                            <Info className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openViewEditBookingModal(booking.id, "edit")}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => openDeleteBookingDialog(booking.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardDescription>
                        {booking.date.toLocaleDateString()} - {booking.status}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Ticket Type: {booking.ticketType}</div>
                        <div>Quantity: {booking.quantity}</div>
                        <div>Total Price: ${booking.totalPrice}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Zoo Events</h2>
                <Button onClick={openCreateEventModal}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Event
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {events.map((event) => (
                  <Card key={event.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle>{event.name}</CardTitle>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => openViewEditEventModal(event.id, "view")}>
                            <Info className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => openViewEditEventModal(event.id, "edit")}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => openDeleteEventDialog(event.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardDescription>
                        {event.date.toLocaleDateString()} at {event.time}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm">
                        <div className="flex items-center mb-1">
                          <MapPin className="h-4 w-4 mr-1" /> {event.location}
                        </div>
                        <p>{event.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Group Visits Tab */}
            <TabsContent value="groups" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Group Visits</h2>
                <Button onClick={openCreateGroupVisitModal}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Group Visit
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {groupVisits.map((group) => (
                  <Card key={group.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle>{group.groupName}</CardTitle>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openViewEditGroupVisitModal(group.id, "view")}
                          >
                            <Info className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openViewEditGroupVisitModal(group.id, "edit")}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => openDeleteGroupVisitDialog(group.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardDescription>
                        {group.date.toLocaleDateString()} at {group.time} - {group.status}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" /> Group Size: {group.size}
                        </div>
                        <div>Contact: {group.contactPerson}</div>
                        <div className="col-span-2">Email: {group.contactEmail}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Routes Tab */}
            <TabsContent value="routes" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Suggested Routes</h2>
                <Button onClick={openCreateRouteModal}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Route
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {routes.map((route) => (
                  <Card key={route.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle>{route.name}</CardTitle>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => openViewEditRouteModal(route.id, "view")}>
                            <Info className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => openViewEditRouteModal(route.id, "edit")}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => openDeleteRouteDialog(route.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardDescription>
                        Duration: {route.duration} - Difficulty: {route.difficulty}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm">
                        <p className="mb-2">{route.description}</p>
                        <div>
                          <strong>Highlights:</strong>
                          <ul className="list-disc list-inside ml-2">
                            {route.highlights.map((highlight, index) => (
                              <li key={index}>{highlight}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5" /> Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {events.slice(0, 3).map((event) => (
                <div key={event.id} className="text-sm p-2 border rounded-md">
                  <div className="font-medium">{event.name}</div>
                  <div className="text-muted-foreground">
                    {event.date.toLocaleDateString()} - {event.time}
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => setActiveTab("events")}>
                View All Events
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        onAdd={handleAddBooking}
        onEdit={handleEditBooking}
        booking={selectedItemId ? bookings.find((b) => b.id === selectedItemId) : undefined}
        mode={modalMode}
      />

      <EventModal
        isOpen={eventModalOpen}
        onClose={() => setEventModalOpen(false)}
        onAdd={handleAddEvent}
        onEdit={handleEditEvent}
        event={selectedItemId ? events.find((e) => e.id === selectedItemId) : undefined}
        mode={modalMode}
      />

      <GroupVisitModal
        isOpen={groupVisitModalOpen}
        onClose={() => setGroupVisitModalOpen(false)}
        onAdd={handleAddGroupVisit}
        onEdit={handleEditGroupVisit}
        groupVisit={selectedItemId ? groupVisits.find((g) => g.id === selectedItemId) : undefined}
        mode={modalMode}
      />

      <RouteModal
        isOpen={routeModalOpen}
        onClose={() => setRouteModalOpen(false)}
        onAdd={handleAddRoute}
        onEdit={handleEditRoute}
        route={selectedItemId ? routes.find((r) => r.id === selectedItemId) : undefined}
        mode={modalMode}
      />

      <DeleteConfirmation
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => {
          if (deleteItemType === "booking") handleDeleteBooking()
          else if (deleteItemType === "event") handleDeleteEvent()
          else if (deleteItemType === "group") handleDeleteGroupVisit()
          else if (deleteItemType === "route") handleDeleteRoute()
        }}
        itemType={deleteItemType}
      />
    </div>
  )
}
