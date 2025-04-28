"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "../../lib/utils"
import { CalendarIcon } from "lucide-react"

interface Trip {
  id: string
  name: string
  organizer: string
  participants: number
  date: Date
  status: string
}

interface TripModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (trip: Trip) => void
  trip?: Trip
  mode: "create" | "edit" | "view"
}

export function TripModal({ isOpen, onClose, onSave, trip, mode }: TripModalProps) {
  const [formData, setFormData] = useState<Trip>(
    trip || {
      id: `TRIP-${Math.floor(Math.random() * 10000)}`,
      name: "",
      organizer: "",
      participants: 0,
      date: new Date(),
      status: "Pending",
    },
  )

  const handleChange = (field: keyof Trip, value: string | number | Date) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const isViewOnly = mode === "view"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Schedule New Trip" : mode === "edit" ? "Edit Trip" : "Trip Details"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Schedule a new trip to the zoo."
              : mode === "edit"
                ? "Edit the details of this trip."
                : "View trip details."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Trip Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="col-span-3"
                disabled={isViewOnly}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="organizer" className="text-right">
                Organizer
              </Label>
              <Input
                id="organizer"
                value={formData.organizer}
                onChange={(e) => handleChange("organizer", e.target.value)}
                className="col-span-3"
                disabled={isViewOnly}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="participants" className="text-right">
                Participants
              </Label>
              <Input
                id="participants"
                type="number"
                min="1"
                value={formData.participants}
                onChange={(e) => handleChange("participants", Number.parseInt(e.target.value))}
                className="col-span-3"
                disabled={isViewOnly}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.date && "text-muted-foreground",
                      )}
                      disabled={isViewOnly}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => date && handleChange("date", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                disabled={isViewOnly}
                value={formData.status}
                onValueChange={(value) => handleChange("status", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Confirmed">Confirmed</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            {!isViewOnly && (
              <Button type="submit" className="bg-green-700 hover:bg-green-800">
                {mode === "create" ? "Schedule Trip" : "Save Changes"}
              </Button>
            )}
            {isViewOnly && (
              <Button type="button" onClick={onClose}>
                Close
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
