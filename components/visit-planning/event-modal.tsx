"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

export function EventModal({ isOpen, onClose, event, onSave, viewMode }) {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    time: "",
    description: "",
    image: "/placeholder.svg?height=100&width=100",
  })

  useEffect(() => {
    if (event) {
      setFormData(event)
    } else {
      setFormData({
        title: "",
        location: "",
        time: "",
        description: "",
        image: "/placeholder.svg?height=100&width=100",
      })
    }
  }, [event, isOpen])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!viewMode) {
      onSave(formData)
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{viewMode ? "Event Details" : event ? "Edit Event" : "Create New Event"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    disabled={viewMode}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Event Image</Label>
                <div className="border rounded-md p-2 flex justify-center">
                  <div className="relative h-20 w-20">
                    <Image
                      src={formData.image || "/placeholder.svg"}
                      alt="Event"
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                </div>
                {!viewMode && (
                  <Input
                    type="file"
                    className="mt-2"
                    disabled={viewMode}
                    // In a real app, this would handle file uploads
                  />
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Location</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => handleSelectChange("location", value)}
                  disabled={viewMode}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Central City Zoo">Central City Zoo</SelectItem>
                    <SelectItem value="Savanna Wildlife Park">Savanna Wildlife Park</SelectItem>
                    <SelectItem value="Pacific Marine World">Pacific Marine World</SelectItem>
                    <SelectItem value="Alpine Nature Reserve">Alpine Nature Reserve</SelectItem>
                    <SelectItem value="Tropical Rainforest Zoo">Tropical Rainforest Zoo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  placeholder="e.g., 2:00 PM Daily"
                  disabled={viewMode}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                disabled={viewMode}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {viewMode ? "Close" : "Cancel"}
            </Button>
            {!viewMode && (
              <Button type="submit" className="bg-green-700 hover:bg-green-800">
                {event ? "Update Event" : "Create Event"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
