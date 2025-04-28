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

interface Milestone {
  year: string
  description: string
}

interface MilestoneModalProps {
  isOpen: boolean
  onClose: () => void
  mode: "create" | "edit" | "view"
  milestone?: Milestone
  onAdd?: (milestone: Milestone) => void
  onEdit?: (milestone: Milestone, index: number) => void
  data?: { milestone: Milestone; index: number } | null
}

export function MilestoneModal({ isOpen, onClose, onSave, milestone, mode, onAdd, onEdit, data }: MilestoneModalProps) {
  const [formData, setFormData] = useState<Milestone>(
    milestone || {
      year: "",
      description: "",
    },
  )

  const handleChange = (field: keyof Milestone, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (mode === "create" && onAdd) {
      onAdd(formData)
    } else if (mode === "edit" && onEdit && data) {
      onEdit(formData, data.index)
    }
    onClose()
  }

  const isViewOnly = mode === "view"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add New Milestone" : mode === "edit" ? "Edit Milestone" : "Milestone Details"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Add a new historical milestone."
              : mode === "edit"
                ? "Edit this historical milestone."
                : "View milestone details."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="year" className="text-right">
                Year
              </Label>
              <Input
                id="year"
                value={formData.year}
                onChange={(e) => handleChange("year", e.target.value)}
                className="col-span-3"
                disabled={isViewOnly}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="col-span-3"
                disabled={isViewOnly}
                required
              />
            </div>
          </div>
          <DialogFooter>
            {!isViewOnly && (
              <Button type="submit" className="bg-green-700 hover:bg-green-800">
                {mode === "create" ? "Add Milestone" : "Save Changes"}
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
