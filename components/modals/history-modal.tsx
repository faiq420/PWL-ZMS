"use client"

import type React from "react"

import { useRef, useState } from "react"
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
import { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"
import { PlusCircle } from "lucide-react"

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (historyAndImagePath: any) => void;
  history: string;
  image?: StaticImport | string;
  mode: "edit" | "view";
}

export function HistoryModal({ isOpen, onClose, onSave, history, image, mode }: HistoryModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };
  const [formData, setFormData] = useState<any>({
    history: history,
    image: image
  })

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
            <div className="relative h-[28vh] w-full">
              <Image
                height={500}
                width={500}
                className="object-cover h-full w-full"
                src={formData.image}
                alt="ZOO-IMG"
              />
              {mode === "edit" && (<div onClick={handleFileClick} className="absolute right-4 top-4 flex items-center justify-center p-2 rounded-full bg-white border w-max cursor-pointer">
                <input onChange={(e) => {
                  const target: any = e.target as HTMLInputElement;
                  const objectURL = URL.createObjectURL(target.files[0])
                  if (target.files && target.files[0]) {
                    setFormData((prev: any) => ({ ...prev, image: objectURL }))
                  }
                }} ref={fileInputRef} className="hidden" type="file" />
                <PlusCircle />
              </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="history">Historical Information</Label>
              <Textarea
                id="history"
                rows={2}
                value={formData.history}
                onChange={(e) => setFormData((prev: any) => ({ ...prev, history: e.target.value }))}
                className="min-h-[150px]"
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
