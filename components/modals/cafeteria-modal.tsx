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
import { Textarea } from "@/components/ui/textarea"

interface Cafeteria {
  name: string
  location: string
  menu: string
  hours: string
}

interface CafeteriaModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (cafeteria: Cafeteria) => void
  cafeteria?: Cafeteria
  mode: "create" | "edit" | "view"
}

export function CafeteriaModal({ isOpen, onClose, onSave, cafeteria, mode }: CafeteriaModalProps) {
  const [formData, setFormData] = useState<Cafeteria>(
    cafeteria || {
      name: "",
      location: "",
      menu: "",
      hours: "",
    },
  )

  const handleChange = (field: keyof Cafeteria, value: string) => {
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
            {mode === "create" ? "Add New Cafeteria" : mode === "edit" ? "Edit Cafeteria" : "Cafeteria Details"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Add a new cafeteria to the zoo."
              : mode === "edit"
                ? "Edit the details of this cafeteria."
                : "View cafeteria details."}
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
              <Label htmlFor="hours" className="text-right">
                Hours
              </Label>
              <Input
                id="hours"
                value={formData.hours}
                onChange={(e) => handleChange("hours", e.target.value)}
                className="col-span-3"
                disabled={isViewOnly}
                placeholder="e.g. 9:00 AM - 5:00 PM"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="menu" className="text-right">
                Menu
              </Label>
              <Textarea
                id="menu"
                value={formData.menu}
                onChange={(e) => handleChange("menu", e.target.value)}
                className="col-span-3"
                disabled={isViewOnly}
                placeholder="List menu items"
                required
              />
            </div>
          </div>
          <DialogFooter>
            {!isViewOnly && (
              <Button type="submit" className="bg-green-700 hover:bg-green-800">
                {mode === "create" ? "Add Cafeteria" : "Save Changes"}
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
