"use client"

import { useState, useEffect } from "react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function GroupVisitModal({ isOpen, onClose, onSave, groupVisit, availableZoos }) {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    groupSize: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    specialRequirements: "",
    status: "pending",
    zoo: "",
  })

  useEffect(() => {
    if (groupVisit) {
      setFormData({
        ...groupVisit,
        groupSize: groupVisit.groupSize.toString(),
      })
    } else {
      setFormData({
        name: "",
        date: "",
        time: "",
        groupSize: "",
        contactPerson: "",
        contactEmail: "",
        contactPhone: "",
        specialRequirements: "",
        status: "pending",
        zoo: availableZoos.length > 0 ? availableZoos[0].name : "",
      })
    }
  }, [groupVisit, availableZoos])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...formData,
      groupSize: Number.parseInt(formData.groupSize, 10),
      id: groupVisit?.id || undefined,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{groupVisit ? "Edit Group Visit" : "Add New Group Visit"}</DialogTitle>
          <DialogDescription>
            {groupVisit ? "Make changes to the group visit here." : "Create a new group visit for the zoo."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Group Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
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
              <Label htmlFor="groupSize" className="text-right">
                Group Size
              </Label>
              <Input
                id="groupSize"
                name="groupSize"
                type="number"
                value={formData.groupSize}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contactPerson" className="text-right">
                Contact Person
              </Label>
              <Input
                id="contactPerson"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contactEmail" className="text-right">
                Email
              </Label>
              <Input
                id="contactEmail"
                name="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contactPhone" className="text-right">
                Phone
              </Label>
              <Input
                id="contactPhone"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="specialRequirements" className="text-right pt-2">
                Special Requirements
              </Label>
              <Textarea
                id="specialRequirements"
                name="specialRequirements"
                value={formData.specialRequirements}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
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
              <Select value={formData.zoo} onValueChange={(value) => handleSelectChange("zoo", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select zoo" />
                </SelectTrigger>
                <SelectContent>
                  {availableZoos.map((zoo) => (
                    <SelectItem key={zoo.id} value={zoo.name} disabled={zoo.status === "maintenance"}>
                      {zoo.name} {zoo.status === "maintenance" && "(Maintenance)"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{groupVisit ? "Save Changes" : "Create Group Visit"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
