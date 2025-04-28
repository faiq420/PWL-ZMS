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

interface Animal {
  name: string
  count: number
  category: string
}

interface AnimalModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (animal: Animal) => void
  animal?: Animal
  mode: "create" | "edit" | "view"
}

export function AnimalModal({ isOpen, onClose, onSave, animal, mode }: AnimalModalProps) {
  const [formData, setFormData] = useState<Animal>(
    animal || {
      name: "",
      count: 1,
      category: "Mammals",
    },
  )

  const handleChange = (field: keyof Animal, value: string | number) => {
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
            {mode === "create" ? "Add New Animal" : mode === "edit" ? "Edit Animal" : "Animal Details"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Add a new animal to the zoo collection."
              : mode === "edit"
                ? "Edit the details of this animal."
                : "View animal details."}
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
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select
                disabled={isViewOnly}
                value={formData.category}
                onValueChange={(value) => handleChange("category", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mammals">Mammals</SelectItem>
                  <SelectItem value="Birds">Birds</SelectItem>
                  <SelectItem value="Reptiles">Reptiles</SelectItem>
                  <SelectItem value="Amphibians">Amphibians</SelectItem>
                  <SelectItem value="Fish">Fish</SelectItem>
                  <SelectItem value="Invertebrates">Invertebrates</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="count" className="text-right">
                Count
              </Label>
              <Input
                id="count"
                type="number"
                min="1"
                value={formData.count}
                onChange={(e) => handleChange("count", Number.parseInt(e.target.value))}
                className="col-span-3"
                disabled={isViewOnly}
                required
              />
            </div>
          </div>
          <DialogFooter>
            {!isViewOnly && (
              <Button type="submit" className="bg-green-700 hover:bg-green-800">
                {mode === "create" ? "Add Animal" : "Save Changes"}
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
