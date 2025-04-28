"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (booking: any) => void
  onEdit: (booking: any) => void
  booking?: any
  mode: "create" | "edit" | "view"
}

export default function BookingModal({ isOpen, onClose, onAdd, onEdit, booking, mode }: BookingModalProps) {
  const [formData, setFormData] = useState({
    visitorName: "",
    date: new Date(),
    ticketType: "Adult",
    quantity: 1,
    totalPrice: 20,
    status: "Pending",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (booking && (mode === "edit" || mode === "view")) {
      setFormData({
        visitorName: booking.visitorName,
        date: new Date(booking.date),
        ticketType: booking.ticketType,
        quantity: booking.quantity,
        totalPrice: booking.totalPrice,
        status: booking.status,
      })
    } else {
      // Reset form for create mode
      setFormData({
        visitorName: "",
        date: new Date(),
        ticketType: "Adult",
        quantity: 1,
        totalPrice: 20,
        status: "Pending",
      })
    }
    setErrors({})
  }, [booking, mode, isOpen])

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })

    // Clear error when field is edited
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" })
    }

    // Calculate total price when ticket type or quantity changes
    if (field === "ticketType" || field === "quantity") {
      let basePrice = 0
      switch (value === "ticketType" ? value : formData.ticketType) {
        case "Adult":
          basePrice = 20
          break
        case "Child":
          basePrice = 10
          break
        case "Senior":
          basePrice = 15
          break
        case "Family":
          basePrice = 60
          break
        default:
          basePrice = 20
      }

      const quantity = field === "quantity" ? value : formData.quantity
      setFormData((prev) => ({ ...prev, totalPrice: basePrice * quantity }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.visitorName.trim()) {
      newErrors.visitorName = "Visitor name is required"
    }

    if (formData.quantity < 1) {
      newErrors.quantity = "Quantity must be at least 1"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    if (mode === "create") {
      onAdd(formData)
    } else if (mode === "edit") {
      onEdit(formData)
    }
  }

  const isViewOnly = mode === "view"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add New Booking" : mode === "edit" ? "Edit Booking" : "Booking Details"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="visitorName">Visitor Name</Label>
              <Input
                id="visitorName"
                value={formData.visitorName}
                onChange={(e) => handleChange("visitorName", e.target.value)}
                disabled={isViewOnly}
                className={errors.visitorName ? "border-red-500" : ""}
              />
              {errors.visitorName && <p className="text-red-500 text-sm">{errors.visitorName}</p>}
            </div>

            <div className="space-y-2">
              <Label>Date</Label>
              <div className="border rounded-md p-2">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={(date) => handleChange("date", date)}
                  disabled={isViewOnly}
                  className="mx-auto"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ticketType">Ticket Type</Label>
                <Select
                  value={formData.ticketType}
                  onValueChange={(value) => handleChange("ticketType", value)}
                  disabled={isViewOnly}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select ticket type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Adult">Adult</SelectItem>
                    <SelectItem value="Child">Child</SelectItem>
                    <SelectItem value="Senior">Senior</SelectItem>
                    <SelectItem value="Family">Family</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => handleChange("quantity", Number.parseInt(e.target.value))}
                  disabled={isViewOnly}
                  className={errors.quantity ? "border-red-500" : ""}
                />
                {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalPrice">Total Price ($)</Label>
              <Input id="totalPrice" type="number" value={formData.totalPrice} disabled={true} />
            </div>

            {mode !== "create" && (
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleChange("status", value)}
                  disabled={isViewOnly}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {isViewOnly ? "Close" : "Cancel"}
            </Button>
            {!isViewOnly && <Button type="submit">{mode === "create" ? "Add Booking" : "Update Booking"}</Button>}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
