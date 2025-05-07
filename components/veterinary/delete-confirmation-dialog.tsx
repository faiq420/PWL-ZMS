"use client"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface DeleteConfirmationDialogProps {
  itemId: string
  itemName: string
  itemType: string
  redirectPath?: string
  onDelete?: () => void
}

export const DeleteConfirmationDialog = ({
  itemId,
  itemName,
  itemType,
  redirectPath = "/home/veterinary-inspection",
  onDelete,
}: DeleteConfirmationDialogProps) => {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      // In a real implementation, you would handle the delete API call here
      // For example:
      // await fetch(`/api/veterinary/${itemType.toLowerCase()}/${itemId}`, {
      //   method: "DELETE",
      // })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      if (onDelete) {
        onDelete()
      } else if (redirectPath) {
        router.push(redirectPath)
      }
    } catch (error) {
      console.error(`Error deleting ${itemType.toLowerCase()}:`, error)
      // Handle error state here - in a real app you might show an error toast
    } finally {
      setIsDeleting(false)
      setOpen(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4 mr-2" /> Delete {itemType}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will permanently delete <span className="font-medium">{itemName}</span> {itemType.toLowerCase()}
            . This action cannot be undone and all associated data will be removed from the system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              handleDelete()
            }}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : `Delete ${itemType}`}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
 