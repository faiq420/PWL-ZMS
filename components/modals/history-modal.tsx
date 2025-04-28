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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface HistoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (history: string) => void
  history: string
  mode: "edit" | "view"
}

export function HistoryModal({ isOpen, onClose, onSave, history, mode }: HistoryModalProps) {
  const [formData, setFormData] = useState<string>(history || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const isViewOnly = mode === "view"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{mode === "edit" ? "Edit Zoo History" : "Zoo History"}</DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Edit the historical information of this zoo."
              : "View the historical information of this zoo."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="history">Historical Information</Label>
              <Textarea
                id="history"
                value={formData}
                onChange={(e) => setFormData(e.target.value)}
                className="min-h-[200px]"
                disabled={isViewOnly}
                required
              />
            </div>
          </div>
          <DialogFooter>
            {!isViewOnly && (
              <Button type="submit" className="bg-green-700 hover:bg-green-800">
                Save Changes
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
