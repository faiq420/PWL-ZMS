"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (i: number) => void;
  type: string;
  item: any;
  description?: string;
  index: number;
}

export function DeleteConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  item,
  description,
  index,
  type,
}: Props) {
  const getTitle = () => {
    switch (type) {
      case "booking":
        return "Delete Booking";
      case "event":
        return "Delete Event";
      case "group":
        return "Delete Group Visit";
      case "route":
        return "Delete Route";
      default:
        return "Delete Item";
    }
  };

  const getDescription = () => {
    switch (type) {
      case "booking":
        return `Are you sure you want to delete the booking for ${item?.visitorName}?`;
      case "event":
        return `Are you sure you want to delete the event "${item?.title}"?`;
      case "group":
        return `Are you sure you want to delete the group visit for ${item?.organization}?`;
      case "route":
        return `Are you sure you want to delete the route "${item?.name}"?`;
      default:
        return "Are you sure you want to delete this item?";
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{getTitle()}</AlertDialogTitle>
          <AlertDialogDescription>
            {getDescription()}
            <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onConfirm(index);
            }}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
