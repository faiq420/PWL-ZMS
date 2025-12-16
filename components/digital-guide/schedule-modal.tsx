"use client";

import { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CardIntro from "../utils/Headings/CardIntro";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  schedule: any;
  onSave: (data: any) => void;
  viewMode?: boolean;
}

export function ScheduleModal({
  isOpen,
  onClose,
  schedule,
  onSave,
  viewMode = false,
}: Props) {
  const [formData, setFormData] = useState({
    time: "",
    title: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    if (schedule) {
      setFormData({
        ...schedule,
      });
    } else {
      setFormData({
        time: "",
        title: "",
        location: "",
        description: "",
      });
    }
  }, [schedule]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <CardIntro
            title={
              viewMode
                ? "Schedule Event Details"
                : schedule
                ? "Edit Schedule Event"
                : "Add Schedule Event"
            }
            description={
              viewMode
                ? "View details about this scheduled event."
                : schedule
                ? "Make changes to the scheduled event here."
                : "Add a new event to the daily schedule."
            }
          />
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="">
              Time
            </Label>
            <Input
              id="time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              className="col-span-3"
              disabled={viewMode}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="col-span-3"
              disabled={viewMode}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="">
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
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className=" pt-2">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="col-span-3"
              disabled={viewMode}
            />
          </div>

          {!viewMode && (
            <DialogFooter className="mt-4">
              <Button type="submit">
                {schedule ? "Save Changes" : "Add Event"}
              </Button>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
