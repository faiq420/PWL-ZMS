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

interface Show {
  name: string
  time: string
  location: string
  duration: string
}

interface ShowModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (show: Show) => void
  show?: Show
  mode: "create" | "edit" | "view"
}

export function ShowModal({ isOpen, onClose, onSave, show, mode }: ShowModalProps) {
  const [formData, setFormData] = useState<Show>(
    show || {
      name: "",
      time: "",
      location: "",
      duration: "",
    },
  )

  const handleChange = (field: keyof Show, value: string) => {
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
            {mode === "create" ? "Add New Show" : mode === "edit" ? "Edit Show" : "Show Details"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Add a new show to the schedule."
              : mode === "edit"
                ? "Edit the details of this show."
                : "View show details."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
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
              <Label htmlFor="time" className="text-right">
                Time
              </Label>
              <Input
                id="time"
                value={formData.time}
                onChange={(e) => handleChange("time", e.target.value)}
                className="col-span-3"
                disabled={isViewOnly}
                placeholder="e.g. 2:00 PM"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="col-span-3"
                disabled={isViewOnly}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Duration
              </Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
                className="col-span-3"
                disabled={isViewOnly}
                placeholder="e.g. 30 minutes"
                required
              />
            </div>
          </div>
          <DialogFooter>
            {!isViewOnly && (
              <Button type="submit" className="bg-green-700 hover:bg-green-800">
                {mode === "create" ? "Add Show" : "Save Changes"}
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
