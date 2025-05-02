"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function DeleteConfirmationDialog({ isOpen, onClose, onConfirm, type, item }) {
  if (!item) return null

  const getTitle = () => {
    switch (type) {
      case "qrcode":
        return `Delete QR Code: ${item.name}`
      case "audio":
        return `Delete Audio Guide: ${item.title}`
      case "animal":
        return `Remove Featured Animal: ${item.name}`
      case "schedule":
        return `Delete Schedule Event: ${item.title}`
      default:
        return "Delete Item"
    }
  }

  const getDescription = () => {
    switch (type) {
      case "qrcode":
        return `Are you sure you want to delete the QR code for "${item.name}"? This action cannot be undone.`
      case "audio":
        return `Are you sure you want to delete the audio guide for "${item.title}"? This action cannot be undone.`
      case "animal":
        return `Are you sure you want to remove "${item.name}" from featured animals? This action cannot be undone.`
      case "schedule":
        return `Are you sure you want to delete the schedule event "${item.title}"? This action cannot be undone.`
      default:
        return "Are you sure you want to delete this item? This action cannot be undone."
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{getTitle()}</AlertDialogTitle>
          <AlertDialogDescription>{getDescription()}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-red-600 hover:bg-red-700">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
