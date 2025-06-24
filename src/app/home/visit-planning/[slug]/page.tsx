"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DateInputTag from "@/components/utils/FormElements/DateInputTag";
import InputTag from "@/components/utils/FormElements/InputTag";
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
        time: "2:00 PM",
        attendees: 20,
        status: "pending",
        type: "corporate",
        zoo: "Lahori Safari Park",
    },
    "birthday-party": {
        id: 3,
        title: "Birthday Party",
        date: "2023-05-18",
        time: "1:00 PM",
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

export default function VisitingSlug() {
    const params = useParams();
    const searchParams = useSearchParams()
    const router = useRouter();

    const { slug } = params

    const [isNewEvent, setIsNewEvent] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<any>(searchParams.get("edit"))
    const [eventInfo, setEventInfo] = useState(() => {
        return events[slug as keyof typeof events] || null;
    });

    const words = String(slug).split("-");
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const slugTitle = capitalizedWords.join(" ");

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
        "Lahori Safari Park",
    ]

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
                            {isNewEvent ? (
                                <h2 className="text-3xl font-bold tracking-tight">Add New Event</h2>
                            ) : (
                                <div>
                                    {!isEditing && <h2 className="text-3xl font-bold tracking-tight">Add New Event</h2>}
                                    <h4 className="text-2xl font-semibold tracking-tight">{slugTitle}</h4>
                                </div>
                            )}
                        </div>
                        {/* {!isNewAnimal && !isEditing && (
            <Badge
              variant={
                animal.conservationStatus === "Endangered"
                  ? "destructive"
                  : animal.conservationStatus === "Vulnerable"
                  ? "warning"
                  : animal.conservationStatus === "Near Threatened"
                  ? "outline"
                  : "secondary"
              }
            >
              {animal.conservationStatus}
            </Badge>
          )} */}
                    </div>
                    <div className="flex space-x-2">
                        {!isNewEvent && !isEditing && (
                            <>
                                <Button variant="outline" onClick={() => setIsEditing(true)}>
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                </Button>
                                <Button
                                    variant="destructive"
                                // onClick={() => setShowDeleteDialog(true)}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </Button>
                            </>
                        )}
                        {(isNewEvent || isEditing) && (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        if (isNewEvent) {
                                            router.back()
                                        } else {
                                            setIsEditing(false);
                                        }
                                    }}
                                >
                                    <X className="mr-2 h-4 w-4" /> Cancel
                                </Button>
                                <Button
                                    className="bg-green-700 hover:bg-green-800"
                                // onClick={handleSave}
                                >
                                    <Save className="mr-2 h-4 w-4" /> Save
                                </Button>
                            </>
                        )}

                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <h3 className="text-3xl font-bold">{isEditing ? "Edit Events Details" : isNewEvent ? "Add a New Event" : null}</h3>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-4 gap-4 items-center">
                            <div className="flex flex-col h-full w-full gap-2">
                                <label>Title</label>
                                <Input
                                    type="text"
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
                                <Input value={eventInfo.time} type="time" placeholder="" onChange={(e: any) => setEventInfo(prev => ({ ...prev, time: e.target.value }))} />
                            </div>
                            <div className="flex flex-col h-full w-full gap-2">
                                <label>Attendees</label>
                                <Input
                                    type="text"
                                    value={eventInfo.attendees}
                                    onChange={(e: any) => setEventInfo(prev => ({ ...prev, attendees: e.target.value }))} />
                            </div>
                            <div className="flex flex-col h-full w-full gap-2">
                                <label>Status</label>
                                <Select value={eventInfo.status} onValueChange={(value) => setEventInfo(prev => ({ ...prev, status: value }))} >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Event Type" />
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
                                        <SelectValue placeholder="Select Event Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {zooList.map(v => <SelectItem value={v}>{v}</SelectItem>)}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}