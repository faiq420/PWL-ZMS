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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Plus, ImageIcon, Save } from "lucide-react";
import ButtonComp from "../utils/Button";
import Dropdown from "../utils/FormElements/Dropdown";
import Toggle from "../utils/FormElements/Toggle";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (exhibit: any, index: number) => void;
  viewMode: boolean;
  index: number;
  id?: number;
}

export function ExhibitModal({
  isOpen,
  onClose,
  onSave,
  viewMode = false,
  index = 0,
  id = 0,
}: Props) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    type: "Animal Exhibit",
    status: "active",
    content: {
      title: "",
      scientificName: "",
      description: "",
      // funFacts: [""],
      conservationStatus: "",
      images: ["/placeholder.svg?height=400&width=600"],
    },
  });
  const [obj, setObj] = useState({
    Id: 0,
    QrId: "",
    LocationId: 0,
    Type: 0,
    IsActive: true,
  });
  const [types, setTypes] = useState([
    { value: 1, label: "Animal Exhibit" },
    { value: 2, label: "Information Point" },
    { value: 3, label: "Feeding Area" },
    { value: 4, label: "Educational Display" },
    { value: 5, label: "Zone Entry" },
    { value: 6, label: "Viewing Area" },
    { value: 7, label: "Other" },
  ]);
  const [locations, setLocations] = useState([
    { value: 1, label: "North Zone" },
    { value: 2, label: "South Zone" },
    { value: 3, label: "East Zone" },
    { value: 4, label: "West Zone" },
    { value: 5, label: "Central Zone" },
  ]);
  const HandleSubmit = () => {
    onSave(obj, index);
  };

  const handleChange = (n: string, v: number | string | boolean) => {
    setObj({ ...obj, [n]: v });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {viewMode
              ? "Exhibit Details"
              : obj.Id != 0
              ? "Edit Exhibit"
              : "Add New Exhibit"}
          </DialogTitle>
          <DialogDescription>
            {viewMode
              ? "View details about this exhibit."
              : obj.Id != 0
              ? "Make changes to the exhibit here."
              : "Create a new exhibit for the zoo."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Dropdown
            name="LocationId"
            activeId={obj.LocationId}
            options={locations}
            handleDropdownChange={handleChange}
            label="Location"
          />
          <Dropdown
            name="Type"
            activeId={obj.Type}
            options={types}
            handleDropdownChange={handleChange}
            label="Exhibit Type"
          />
          <Toggle
            name="IsActive"
            value={obj.IsActive}
            setter={handleChange}
            label="Active Status"
          />
        </div>
        <DialogFooter>
          {!viewMode && (
            <>
              <div className="w-fit">
                <ButtonComp
                  type={"white"}
                  text="Cancel"
                  beforeIcon={<X className="w-4 h-4" />}
                  clickEvent={onClose}
                />
              </div>
              <div className="w-fit">
                <ButtonComp
                  text={obj.Id == 0 ? "Create" : "Save"}
                  beforeIcon={<Save className="w-4 h-4" />}
                  clickEvent={HandleSubmit}
                />
              </div>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
