"use client";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import Image from "next/image";

interface Props {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  mode: string;
}

export function InspectionModal({ id, isOpen, onClose, mode }: Props) {
  const [obj, setObj] = useState({
    image: "/placeholder.svg",
    name: "",
    status: "",
    disease: "",
    specialCareRequirements: "",
    dietaryRequirements: "",
    specialConsiderations: "",
  });

  const handleChange = (field: string, value: any) => {
    setObj({ ...obj, [field]: value });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? "Add New Inspection"
              : mode === "edit"
              ? "Edit Inspection"
              : "Inspection Details"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Add a new animal inspection."
              : mode === "edit"
              ? "Edit the details of this inspection."
              : "View inspection details."}
          </DialogDescription>
        </DialogHeader>
        <form className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="row-span-2 relative">
              <Image
                src={obj.image}
                alt={obj.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={obj.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Common name of the animal"
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Health Status</Label>
              <Input
                id="status"
                value={obj.status}
                onChange={(e) => handleChange("status", e.target.value)}
                placeholder="Health status of the animal"
                disabled={mode=="view"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scientificName">Disease ( If any )</Label>
              <Input
                id="disease"
                value={obj.disease}
                onChange={(e) => handleChange("disease", e.target.value)}
                placeholder=""
                disabled={mode=="view"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scientificName">Special Care Requirements</Label>
              <Input
                id="specialCareRequirements"
                value={obj.specialCareRequirements}
                onChange={(e) =>
                  handleChange("specialCareRequirements", e.target.value)
                }
                placeholder="Special treatments through out course"
                disabled={mode=="view"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scientificName">Special Considerations</Label>
              <Input
                id="specialConsiderations"
                value={obj.specialConsiderations}
                onChange={(e) =>
                  handleChange("specialConsiderations", e.target.value)
                }
                placeholder="Special considerations through out course"
                disabled={mode=="view"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scientificName">Dietary Requirements</Label>
              <Input
                id="dietaryRequirements"
                value={obj.dietaryRequirements}
                onChange={(e) =>
                  handleChange("dietaryRequirements", e.target.value)
                }
                placeholder="Special diet plan if necessary"
                disabled={mode=="view"}
              />
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
