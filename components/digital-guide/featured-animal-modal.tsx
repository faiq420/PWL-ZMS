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
import { ImageIcon, Upload } from "lucide-react"

export function FeaturedAnimalModal({ isOpen, onClose, animal, onSave, viewMode = false }) {
  const [formData, setFormData] = useState({
    name: "",
    scientificName: "",
    image: "/placeholder.svg?height=400&width=600",
    description: "",
    conservationStatus: "",
    location: "",
    feedingTimes: "",
    keeperTalk: "",
    featured: true,
    featuredUntil: "",
  })

  useEffect(() => {
    if (animal) {
      setFormData({
        ...animal,
      })
    } else {
      const twoWeeksFromNow = new Date()
      twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14)

      setFormData({
        name: "",
        scientificName: "",
        image: "/placeholder.svg?height=400&width=600",
        description: "",
        conservationStatus: "",
        location: "",
        feedingTimes: "",
        keeperTalk: "",
        featured: true,
        featuredUntil: twoWeeksFromNow.toISOString().split("T")[0],
      })
    }
  }, [animal])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  const handleImageUpload = () => {
    // In a real app, this would open a file picker
    alert("Image upload functionality would be implemented here")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {viewMode ? "Featured Animal Details" : animal ? "Edit Featured Animal" : "Add Featured Animal"}
          </DialogTitle>
          <DialogDescription>
            {viewMode
              ? "View details about this featured animal."
              : animal
                ? "Make changes to the featured animal here."
                : "Add a new animal to the featured list."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="col-span-3"
              disabled={viewMode}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="scientificName" className="text-right">
              Scientific Name
            </Label>
            <Input
              id="scientificName"
              name="scientificName"
              value={formData.scientificName}
              onChange={handleChange}
              className="col-span-3"
              disabled={viewMode}
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="image" className="text-right pt-2">
              Image
            </Label>
            <div className="col-span-3">
              <div className="flex items-center gap-4">
                <div className="relative h-32 w-32 border rounded overflow-hidden">
                  <ImageIcon
                    src={formData.image || "/placeholder.svg"}
                    alt={formData.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                {!viewMode && (
                  <Button type="button" variant="outline" onClick={handleImageUpload}>
                    <Upload className="h-4 w-4 mr-2" /> Upload Image
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="col-span-3 min-h-[100px]"
              disabled={viewMode}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="conservationStatus" className="text-right">
              Conservation Status
            </Label>
            <Select
              value={formData.conservationStatus}
              onValueChange={(value) => handleSelectChange("conservationStatus", value)}
              disabled={viewMode}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Least Concern">Least Concern</SelectItem>
                <SelectItem value="Near Threatened">Near Threatened</SelectItem>
                <SelectItem value="Vulnerable">Vulnerable</SelectItem>
                <SelectItem value="Endangered">Endangered</SelectItem>
                <SelectItem value="Critically Endangered">Critically Endangered</SelectItem>
                <SelectItem value="Extinct in the Wild">Extinct in the Wild</SelectItem>
                <SelectItem value="Extinct">Extinct</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Location
            </Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="col-span-3"
              disabled={viewMode}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="feedingTimes" className="text-right">
              Feeding Times
            </Label>
            <Input
              id="feedingTimes"
              name="feedingTimes"
              value={formData.feedingTimes}
              onChange={handleChange}
              className="col-span-3"
              disabled={viewMode}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="keeperTalk" className="text-right">
              Keeper Talk
            </Label>
            <Input
              id="keeperTalk"
              name="keeperTalk"
              value={formData.keeperTalk}
              onChange={handleChange}
              className="col-span-3"
              disabled={viewMode}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="featuredUntil" className="text-right">
              Featured Until
            </Label>
            <Input
              id="featuredUntil"
              name="featuredUntil"
              type="date"
              value={formData.featuredUntil}
              onChange={handleChange}
              className="col-span-3"
              disabled={viewMode}
              required
            />
          </div>

          {!viewMode && (
            <DialogFooter className="mt-4">
              <Button type="submit">{animal ? "Save Changes" : "Add Animal"}</Button>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
