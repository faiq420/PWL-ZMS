"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


interface AchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit" | "view";
  achievement?: any;
  onAdd?: (achievement: any) => void;
  onEdit?: (achievement: any, index: number) => void;
  data?: { achievement: any; index: number } | null;
}

export function AchievementModal({
  isOpen,
  onClose,
  achievement,
  mode,
  onAdd,
  onEdit,
  data,
}: AchievementModalProps) {
  const [formData, setFormData] = useState<any>({
    year: achievement?.year,
    description: achievement?.description,
  }
  );
  
  console.log(formData);

  const handleChange = (field: any, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "create" && onAdd) {
      onAdd(formData);
    } else if (mode === "edit" && onEdit && data) {
      onEdit(formData, data.index);
    }
    setFormData({
      year: new Date().getFullYear(),
      description: ''
    })
    onClose();
  };

  const isViewOnly = mode === "view";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? "Add New Achievement"
              : mode === "edit"
                ? "Edit Achievement"
                : "Achievement Details"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Add a new historical achievement."
              : mode === "edit"
                ? "Edit this historical achievement."
                : "View achievement details."}
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
                type="number"
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
                {mode === "create" ? "Add Achievement" : "Save Changes"}
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
  );
}
