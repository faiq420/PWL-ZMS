"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  event: any;
  onSave: (event: any) => void;
  availableZoos: {
    id: number;
    name: string;
    location: string;
    status: string;
  }[];
}

export function EventModal({
  isOpen,
  onClose,
  onSave,
  event,
  availableZoos,
}: Props) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    attendees: "",
    type: "education",
    status: "pending",
    zoo: "",
  });

  useEffect(() => {
    if (event) {
      setFormData({
        ...event,
        attendees: event.attendees.toString(),
      });
    } else {
      setFormData({
        title: "",
        date: "",
        time: "",
        attendees: "",
        type: "education",
        status: "pending",
        zoo: availableZoos.length > 0 ? availableZoos[0].name : "",
      });
    }
  }, [event, availableZoos]);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({
      ...formData,
      attendees: Number.parseInt(formData.attendees, 10),
      id: event?.id || undefined,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{event ? "Edit Event" : "Add New Event"}</DialogTitle>
          <DialogDescription>
            {event
              ? "Make changes to the event here."
              : "Create a new event for the zoo."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Time
              </Label>
              <Input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="attendees" className="text-right">
                Attendees
              </Label>
              <Input
                id="attendees"
                name="attendees"
                type="number"
                value={formData.attendees}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="birthday">Birthday</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="zoo" className="text-right">
                Zoo
              </Label>
              <Select
                value={formData.zoo}
                onValueChange={(value) => handleSelectChange("zoo", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select zoo" />
                </SelectTrigger>
                <SelectContent>
                  {availableZoos.map((zoo) => (
                    <SelectItem
                      key={zoo.id}
                      value={zoo.name}
                      disabled={zoo.status === "maintenance"}
                    >
                      {zoo.name}{" "}
                      {zoo.status === "maintenance" && "(Maintenance)"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {event ? "Save Changes" : "Create Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
