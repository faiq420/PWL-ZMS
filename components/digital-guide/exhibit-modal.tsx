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
import { X, Plus, ImageIcon } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  exhibit: any;
  onSave: (exhibit: any) => void;
  viewMode: boolean;
}

export function ExhibitModal({
  isOpen,
  onClose,
  exhibit,
  onSave,
  viewMode = false,
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

  useEffect(() => {
    if (exhibit) {
      setFormData({
        ...exhibit,
        content: {
          ...exhibit.content,
          // funFacts: exhibit.content.funFacts || [""],
          images: exhibit.content?.images || [
            "/placeholder.svg?height=400&width=600",
          ],
        },
      });
    } else {
      setFormData({
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
    }
  }, [exhibit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [name]: value,
      },
    }));
  };

  // const handleFunFactChange = (index: number, value: string) => {
  //   const newFunFacts = [...formData.content.funFacts];
  //   newFunFacts[index] = value;
  //   setFormData((prev) => ({
  //     ...prev,
  //     content: {
  //       ...prev.content,
  //       funFacts: newFunFacts,
  //     },
  //   }));
  // };

  // const addFunFact = () => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     content: {
  //       ...prev.content,
  //       funFacts: [...prev.content.funFacts, ""],
  //     },
  //   }));
  // };

  // const removeFunFact = (index: number) => {
  //   const newFunFacts = [...formData.content.funFacts];
  //   newFunFacts.splice(index, 1);
  //   setFormData((prev) => ({
  //     ...prev,
  //     content: {
  //       ...prev.content,
  //       funFacts: newFunFacts,
  //     },
  //   }));
  // };

  const handleSelectChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Filter out empty fun facts
    // const filteredFunFacts = formData.content.funFacts.filter(
    //   (fact) => fact.trim() !== ""
    // );
    const updatedFormData = {
      ...formData,
      content: {
        ...formData.content,
        // funFacts: filteredFunFacts,
      },
    };
    onSave(updatedFormData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {viewMode
              ? "Exhibit Details"
              : exhibit
              ? "Edit Exhibit"
              : "Add New Exhibit"}
          </DialogTitle>
          <DialogDescription>
            {viewMode
              ? "View details about this exhibit."
              : exhibit
              ? "Make changes to the exhibit here."
              : "Create a new exhibit for the zoo."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="col-span-3"
                  disabled={viewMode}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange("type", value)}
                  disabled={viewMode}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Animal Exhibit">
                      Animal Exhibit
                    </SelectItem>
                    <SelectItem value="Feeding Area">Feeding Area</SelectItem>
                    <SelectItem value="Information Point">
                      Information Point
                    </SelectItem>
                    <SelectItem value="Educational Display">
                      Educational Display
                    </SelectItem>
                    <SelectItem value="Zone Entry">Zone Entry</SelectItem>
                    <SelectItem value="Viewing Area">Viewing Area</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                  disabled={viewMode}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content.title" className="text-right">
                  Title
                </Label>
                <Input
                  id="content.title"
                  name="title"
                  value={formData.content.title}
                  onChange={handleContentChange}
                  className="col-span-3"
                  disabled={viewMode}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content.scientificName" className="text-right">
                  Scientific Name
                </Label>
                <Input
                  id="content.scientificName"
                  name="scientificName"
                  value={formData.content.scientificName}
                  onChange={handleContentChange}
                  className="col-span-3"
                  disabled={viewMode}
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label
                  htmlFor="content.description"
                  className="text-right pt-2"
                >
                  Description
                </Label>
                <Textarea
                  id="content.description"
                  name="description"
                  value={formData.content.description}
                  onChange={handleContentChange}
                  className="col-span-3 min-h-[100px]"
                  disabled={viewMode}
                />
              </div>
              {/* <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="content.conservationStatus"
                  className="text-right"
                >
                  Conservation Status
                </Label>
                <Select
                  value={formData.content.conservationStatus}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      content: { ...prev.content, conservationStatus: value },
                    }))
                  }
                  disabled={viewMode}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Not">Not Applicable</SelectItem>
                    <SelectItem value="Least Concern">Least Concern</SelectItem>
                    <SelectItem value="Near Threatened">
                      Near Threatened
                    </SelectItem>
                    <SelectItem value="Vulnerable">Vulnerable</SelectItem>
                    <SelectItem value="Endangered">Endangered</SelectItem>
                    <SelectItem value="Critically Endangered">
                      Critically Endangered
                    </SelectItem>
                    <SelectItem value="Extinct in the Wild">
                      Extinct in the Wild
                    </SelectItem>
                    <SelectItem value="Extinct">Extinct</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}

              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">Images</Label>
                <div className="col-span-3 space-y-2">
                  {formData.content.images.map((image, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="relative h-20 w-20 border rounded overflow-hidden">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Image ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      {!viewMode && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-20"
                          onClick={() => {
                            // In a real app, this would open a file picker
                            alert(
                              "Image upload functionality would be implemented here"
                            );
                          }}
                          disabled={viewMode}
                        >
                          <ImageIcon className="h-4 w-4 mr-2" /> Change Image
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {!viewMode && (
            <DialogFooter className="mt-4">
              <Button type="submit">
                {exhibit ? "Save Changes" : "Create Exhibit"}
              </Button>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
