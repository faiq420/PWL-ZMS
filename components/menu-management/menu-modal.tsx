"use client";

import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ButtonComp from "../utils/Button";
import { OPTION } from "@/types/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (menuId: number) => void;
  item: OPTION;
  type: string;
}

export function Modal({ isOpen, onClose, onDelete, item, type }: ModalProps) {
  function handleSubmit() {
    onDelete(Number(item.value));
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-l">
        <DialogHeader className="space-y-5">
          <DialogTitle>Delete {type}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the {item.label}? <br />
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <div className="flex space-x-2 items-center">
            <ButtonComp text="Cancel" clickEvent={onClose} type={"white"} />
            <ButtonComp
              text="Delete"
              clickEvent={handleSubmit}
              type={"danger"}
            />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
