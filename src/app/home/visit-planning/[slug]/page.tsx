"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Edit, Save, Trash2, X } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const events = {
    "school-visit": {
        id: 1,
        title: "School Visit",
        date: "2023-05-15",
        time: "10:00 AM",
        attendees: 45,
        status: "confirmed",
        type: "education",
        zoo: "Lahore Zoo",
    },
    "corporate-team-building": {
        id: 2,
        title: "Corporate Team Building",
        date: "2023-05-16",
        time: "02:00 PM",
        attendees: 20,
        status: "pending",
        type: "corporate",
        zoo: "Lahori Safari Park",
    },
    "birthday-party": {
        id: 3,
        title: "Birthday Party",
        date: "2023-05-18",
        time: "01:00 PM",
        attendees: 15,
        status: "confirmed",
        type: "birthday",
        zoo: "Lahore Zoo",
    },
    "senior-center-visit": {
        id: 4,
        title: "Senior Center Visit",
        date: "2023-05-20",
        time: "11:00 AM",
        attendees: 25,
        status: "confirmed",
        type: "community",
        zoo: "Bhawalpur Zoo",
    },
}

const groupVisits = {
    "lincoln-elementary-school": {
        id: 1,
        title: "Lincoln Elementary School",
        date: "2023-05-22",
        time: "09:30 AM",
        groupSize: 60,
        contactPerson: "Sarah Johnson",
        contactEmail: "sjohnson@lincoln.edu",
        contactPhone: "(555) 123-4567",
        specialRequirements: "3 students require wheelchair access",
        status: "confirmed",
        zoo: "Central City Zoo",
    },
    "tech-innovations-inc.": {
        id: 2,
        title: "Tech Innovations Inc.",
        date: "2023-05-25",
        time: "01:00 PM",
        groupSize: 35,
        contactPerson: "Michael Chen",
        contactEmail: "mchen@techinnovations.com",
        contactPhone: "(555) 987-6543",
        specialRequirements: "Vegetarian lunch options required",
        status: "pending",
        zoo: "Woodland Wildlife Park",
    },
    "golden-years-retirement-community": {
        id: 3,
        title: "Golden Years Retirement Community",
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
}

const bookings = {
    "john-smith": {
        id: 1,
        visitorName: "John Smith",
        visitDate: "2023-05-15",
        ticketType: "Family Pass",
        quantity: 4,
        totalPrice: "120.00",
        paymentStatus: "confirmed",
        bookingMethod: "Online",
        zoo: "Lahore Zoo",
    },
    "emily-johnson": {
        id: 2,
        visitorName: "Emily Johnson",
        visitDate: "2023-05-16",
        ticketType: "Couple",
        quantity: 2,
        totalPrice: "50.00",
        paymentStatus: "confirmed",
        bookingMethod: "Phone",
        zoo: "Lahore Safari Park",
    },
    "martinez-family": {
        id: 3,
        visitorName: "Martinez Family",
        visitDate: "2023-05-18",
        ticketType: "Family Pass",
        quantity: 5,
        totalPrice: "150.00",
        paymentStatus: "pending",
        bookingMethod: "Online",
        zoo: "Lahore Zoo",
    },
    "david-wilson": {
        id: 4,
        visitorName: "David Wilson",
        visitDate: "2023-05-20",
        ticketType: "Solo",
        quantity: 1,
        totalPrice: "20.00",
        paymentStatus: "confirmed",
        bookingMethod: "In Person",
        zoo: "Bhawalpur Zoo",
    }
}

export default function VisitingSlug() {
    const params = useParams();
    const searchParams = useSearchParams()
    const router = useRouter();
    const { slug } = params
    const mode = searchParams.get("mode")
    const tab = searchParams.get("tab")

    const [eventInfo, setEventInfo] = useState(() => {
        return events[slug as keyof typeof events] || {
            id: 0,
            title: "",
            date: "2025-01-01",
            time: "12:00 am",
            attendees: 0,
            status: "",
            type: "",
            zoo: "",
        };
    });
    const [groupVisitInfo, setGroupVisitInfo] = useState(() => {
        return groupVisits[slug as keyof typeof groupVisits] || {
            id: 0,
            title: "",
            date: "2023-05-28",
            time: "12:00 am",
            groupSize: 0,
            contactPerson: "",
            contactEmail: "",
            contactPhone: "",
            specialRequirements: "",
            status: "",
            zoo: "",
        };
    });
    const [bookingInfo, setBookingInfo] = useState(() => {
        return bookings[slug as keyof typeof bookings] || {
            id: 4,
            visitorName: "",
            visitDate: "2023-05-20",
            ticketType: "",
            quantity: 0,
            totalPrice: "",
            paymentStatus: "",
            bookingMethod: "",
            zoo: "",
        };
    });

    const capitalize = (value: string, space = " ") => {
        const words = String(value).split(space);
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        return capitalizedWords.join(" ");
    }

    const isNew = mode === "create"
    const isEditing = mode === "edit"

    const type = [
        "education",
        "birthday",
        "community",
        "corporate"
    ]

    const statusList = [
        "pending",
        "confirmed"
    ]

    const zooList = [
        "Lahore Zoo",
        "Bhawalpur Zoo",
        "Lahore Safari Park",
        "Central City Zoo",
        "Woodland Wildlife Park",
        "Desert Oasis Zoo"
    ]

    const ticketType = [
        "Solo",
        "Couple",
        "Family Pass",
    ]

    const handleTicketType = (type: any) => {
        console.log(type)
        setBookingInfo(prev => ({ ...prev, ticketType: type}))
    }

    const handleSave = (e: any) => {
        switch (tab) {
            case "event":
                e.preventDefault()
                setEventInfo((prev: any) => ({ ...prev, id: prev.id + 1, eventInfo }))
                console.log(eventInfo)
                break;
            case "group-visit":
                e.preventDefault()
                setGroupVisitInfo((prev: any) => ({ ...prev, id: prev.id + 1, groupVisitInfo }))
                console.log(groupVisitInfo)
                break;
            case "booking":
                e.preventDefault()
                setBookingInfo((prev: any) => ({ ...prev, id: prev.id + 1, bookingInfo }))
                console.log(bookingInfo)
                break;
            default:
                console.log("Fuck You")
        }
        // router.back()
    }

    return (
        <>
            <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => router.back()}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            {
                                isNew ? (
                                    <h2 className="text-3xl font-bold tracking-tight" >
                                        {capitalize(String(tab), "-")}
                                    </h2>
                                ) : isEditing ? (
                                    <div>
                                        <h4 className="text-2xl font-semibold tracking-tight">
                                            {capitalize(String(slug), "-")}
                                        </h4>
                                    </div>
                                ) : null
                            }
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        {(isNew || isEditing) && (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={() => router.back()}
                                >
                                    <X className="mr-2 h-4 w-4" /> Cancel
                                </Button>
                                <Button
                                    className="bg-green-700 hover:bg-green-800"
                                    onClick={handleSave}
                                >
                                    <Save className="mr-2 h-4 w-4" /> Save
                                </Button>
                            </>
                        )}

                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <h3 className="text-3xl font-bold border-b">
                            {isEditing ?
                                "Edit Details"
                                :
                                isNew ?
                                    `Create New ${capitalize(String(tab), "-")}`
                                    : null}
                        </h3>
                    </CardHeader>
                    <CardContent>
                        {/* Event Tab */}
                        {tab === "event" && (
                            <div className="grid grid-cols-4 gap-4 items-center">
                                <div className="flex flex-col h-full w-full gap-2">
                                    <label>Title</label>
                                    <Input
                                        type="text"
                                        placeholder="Event Title"
                                        value={eventInfo.title}
                                        onChange={(e: any) => setEventInfo(prev => ({ ...prev, title: e.target.value }))}
                                    />
                                </div>
                                <div className="flex flex-col h-full w-full gap-2">
                                    <label>Date</label>
                                    <Input
                                        type="date"
                                        value={eventInfo.date}
                                        onChange={(e) => setEventInfo(prev => ({ ...prev, date: e.target.value }))}
                                    />
                                </div>
                                <div className="flex flex-col h-full w-full gap-2">
                                    <label>Time</label>
                                    <Input
                                        type="time"
                                        value={eventInfo.time}
                                        onChange={(e: any) => setEventInfo(prev => ({ ...prev, time: e.target.value }))}
                                    />
                                </div>
                                <div className="flex flex-col h-full w-full gap-2">
                                    <label>Attendees</label>
                                    <Input
                                        type="number"
                                        placeholder="No: of Attendees"
                                        value={eventInfo.attendees}
                                        onChange={(e: any) => setEventInfo(prev => ({ ...prev, attendees: e.target.value }))} />
                                </div>
                                <div className="flex flex-col h-full w-full gap-2">
                                    <label>Status</label>
                                    <Select value={eventInfo.status} onValueChange={(value) => setEventInfo(prev => ({ ...prev, status: value }))} >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {statusList.map(v => <SelectItem value={v}>{v}</SelectItem>)}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col h-full w-full gap-2">
                                    <label>Type</label>
                                    <Select value={eventInfo.type} onValueChange={(value) => setEventInfo(prev => ({ ...prev, type: value }))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Event Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {type.map(v => <SelectItem value={v}>{v}</SelectItem>)}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col h-full w-full gap-2">
                                    <label>Zoo</label>
                                    <Select value={eventInfo.zoo} onValueChange={(value) => setEventInfo(prev => ({ ...prev, zoo: value }))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Zoo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {zooList.map(v => <SelectItem value={v}>{v}</SelectItem>)}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}
                        {/* Group Visit Tab */}
                        {tab === "group-visit" && (
                            <div className="grid grid-cols-4 gap-4 items-center">
                                <div className="flex flex-col h-full w-full gap-2">
                                    <label>Title</label>
                                    <Input
                                        type="text"
                                        placeholder="Event Title"
                                        value={groupVisitInfo.title}
                                        onChange={(e: any) => setGroupVisitInfo(prev => ({ ...prev, title: e.target.value }))}
                                    />
                                </div>
                                <div className="flex flex-col h-full w-full gap-2">
                                    <label>Date</label>
                                    <Input
                                        type="date"
                                        value={groupVisitInfo.date}
                                        onChange={(e) => setGroupVisitInfo(prev => ({ ...prev, date: e.target.value }))}
                                    />
                                </div>
                                <div className="flex flex-col h-full w-full gap-2">
                                    <label>Time</label>
                                    <Input
                                        type="time"
                                        value={groupVisitInfo.time}
                                        onChange={(e: any) => setGroupVisitInfo(prev => ({ ...prev, time: e.target.value }))}
                                    />
                                </div>
                                <div className="flex flex-col h-full w-full gap-2">
                                    <label>Group Size</label>
                                    <Input
                                        type="number"
                                        placeholder="Group Size"
                                        value={groupVisitInfo.groupSize}
                                        onChange={(e: any) => setGroupVisitInfo(prev => ({ ...prev, groupSize: e.target.value }))} />
                                </div>
                                <div className="flex flex-col h-full w-full gap-2">
                                    <label>Contact Person</label>
                                    <Input
                                        type="text"
                                        placeholder="Contact Person"
                                        value={groupVisitInfo.contactPerson}
                                        onChange={(e: any) => setGroupVisitInfo(prev => ({ ...prev, contactPerson: e.target.value }))} />
                                </div>
                                <div className="flex flex-col h-full w-full gap-2">
                                    <label>Contact Email</label>
                                    <Input
                                        type="email"
                                        placeholder="Contact Email"
                                        value={groupVisitInfo.contactEmail}
                                        onChange={(e: any) => setGroupVisitInfo(prev => ({ ...prev, contactEmail: e.target.value }))} />
                                </div>
                                <div className="flex flex-col h-full w-full gap-2">
                                    <label>Contact Phone</label>
                                    <Input
                                        type="text"
                                        placeholder="Contact Phone"
                                        value={groupVisitInfo.contactPhone}
                                        onChange={(e: any) => setGroupVisitInfo(prev => ({ ...prev, contactPhone: e.target.value }))} />
                                </div>
                                <div className="flex flex-col h-full w-full gap-2">
                                    <label>Requirements</label>
                                    <Input
                                        type="text"
                                        placeholder="Special Requirements"
                                        value={groupVisitInfo.specialRequirements}
                                        onChange={(e: any) => setGroupVisitInfo(prev => ({ ...prev, specialRequirements: e.target.value }))} />
                                </div>
                                <div className="flex flex-col h-full w-full gap-2">
                                    <label>Status</label>
                                    <Select value={groupVisitInfo.status} onValueChange={(value) => setGroupVisitInfo(prev => ({ ...prev, status: value }))} >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {statusList.map(v => <SelectItem value={v}>{v}</SelectItem>)}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col h-full w-full gap-2">
                                    <label>Zoo</label>
                                    <Select value={groupVisitInfo.zoo} onValueChange={(value) => setGroupVisitInfo(prev => ({ ...prev, zoo: value }))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Zoo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {zooList.map(v => <SelectItem value={v}>{v}</SelectItem>)}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}
                        {/* Group Visit Tab */}
                        {tab === "booking" && (
                            <div className="grid grid-cols-3 gap-4 items-center">
                                <div className="flex flex-col h-full w-full gap-2">
                                    <label>Visitor Name</label>
                                    <Input
                                        type="text"
                                        placeholder="Visitor Name"
                                        value={bookingInfo.visitorName}
                                        onChange={(e: any) => setBookingInfo(prev => ({ ...prev, visitorName: e.target.value }))}
                                    />
                                </div>
                                <div className="flex flex-col h-full w-full gap-2">
                                    <label>Visit Date</label>
                                    <Input
                                        type="date"
                                        value={bookingInfo.visitDate}
                                        onChange={(e) => setBookingInfo(prev => ({ ...prev, visitDate: e.target.value }))}
                                    />
                                </div>
                                <div className="flex flex-col h-full w-full gap-2">
                                    <label>Ticket Type</label>
                                    <Select value={bookingInfo.ticketType} onValueChange={(e) => handleTicketType(e)} >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Ticket Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {ticketType.map(v => <SelectItem value={v}>{v}</SelectItem>)}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col h-full w-full gap-2">
                                    <label>Quantity</label>
                                    <Input
                                        type="number"
                                        placeholder="Group Size"
                                        value={bookingInfo.quantity}
                                        onChange={(e: any) => setBookingInfo(prev => ({ ...prev, quantity: e.target.value }))} />
                                </div>
                                <div className="flex flex-col h-full w-full gap-2">
                                    <label>Total Price</label>
                                    <Input
                                        type="text"
                                        placeholder="Total Price"
                                        value={bookingInfo.totalPrice}
                                        onChange={(e: any) => setBookingInfo(prev => ({ ...prev, totalPrice: e.target.value }))} />
                                </div>
                                <div className="flex flex-col h-full w-full gap-2">
                                    <label>Payment Status</label>
                                    <Select value={bookingInfo.paymentStatus} onValueChange={(value) => setBookingInfo(prev => ({ ...prev, paymentStatus: value }))} >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Payment Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {statusList.map(v => <SelectItem value={v}>{v}</SelectItem>)}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col h-full w-full gap-2">
                                    <label>Zoo</label>
                                    <Select value={bookingInfo.zoo} onValueChange={(value) => setBookingInfo(prev => ({ ...prev, zoo: value }))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Zoo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {zooList.map(v => <SelectItem value={v}>{v}</SelectItem>)}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}

                    </CardContent>
                </Card>
            </div >
        </>
    )
}