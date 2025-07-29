"use client";

import type React from "react";

import { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ChevronRight,
  ArrowLeft,
  Accessibility,
  AmbulanceIcon as FirstAid,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Sample data for facilities
const initialFacilities = [
  {
    id: "facility-1",
    name: "Main Restrooms",
    type: "restroom",
    location: "Main Entrance",
    status: "operational",
    features: ["Wheelchair accessible", "Baby changing", "Family restroom"],
    lastMaintenance: "2023-05-15",
    description: "Large restroom facility with multiple stalls and amenities.",
  },
  {
    id: "facility-2",
    name: "Safari Zone Restrooms",
    type: "restroom",
    location: "Safari Zone",
    status: "operational",
    features: ["Wheelchair accessible", "Baby changing"],
    lastMaintenance: "2023-05-10",
    description: "Medium-sized restroom facility serving the Safari Zone area.",
  },
  {
    id: "facility-3",
    name: "Visitor Center",
    type: "information",
    location: "Main Plaza",
    status: "operational",
    features: [
      "Information desk",
      "Lost and found",
      "Tour booking",
      "Gift shop",
    ],
    lastMaintenance: "2023-04-30",
    description: "Central information hub for visitors with various services.",
  },
  {
    id: "facility-4",
    name: "Rainforest Rest Area",
    type: "rest_area",
    location: "Rainforest Zone",
    status: "maintenance",
    features: ["Seating", "Shade", "Water fountains"],
    lastMaintenance: "2023-05-20",
    description:
      "Covered seating area for visitors to rest in the Rainforest Zone.",
  },
];

// Sample data for first aid stations
const initialFirstAid = [
  {
    id: "firstaid-1",
    name: "Main First Aid Station",
    location: "Visitor Center",
    status: "operational",
    staffed: true,
    staffingHours: "9:00 AM - 6:00 PM",
    equipment: ["AED", "First aid kits", "Wheelchair", "Stretcher"],
    description: "Primary first aid station with trained medical staff.",
  },
  {
    id: "firstaid-2",
    name: "Safari Zone Medical Point",
    location: "Safari Zone",
    status: "operational",
    staffed: true,
    staffingHours: "10:00 AM - 5:00 PM",
    equipment: ["First aid kits", "AED"],
    description: "Satellite first aid station for the Safari Zone area.",
  },
  {
    id: "firstaid-3",
    name: "Aquatic Zone First Aid",
    location: "Aquatic Zone",
    status: "unstaffed",
    staffed: false,
    staffingHours: "N/A",
    equipment: ["First aid kits", "Emergency phone"],
    description: "Unstaffed first aid cabinet with emergency communication.",
  },
];

// Types for safety features
type SafetyItem = {
  id: string;
  name: string;
  type: string;
  locations: string[];
  lastUpdated: string;
  status: string;
  description: string;
  lastDrill?: string;
  lastInspection?: string;
};

// Sample data for safety features
const initialSafety: SafetyItem[] = [
  {
    id: "safety-1",
    name: "Emergency Evacuation Plan",
    type: "evacuation",
    locations: ["All zones"],
    lastUpdated: "2023-04-01",
    lastDrill: "2023-03-15",
    status: "active",
    description:
      "Comprehensive evacuation plan with marked routes throughout the zoo.",
  },
  {
    id: "safety-2",
    name: "Animal Escape Protocol",
    type: "protocol",
    locations: ["All animal enclosures"],
    lastUpdated: "2023-03-10",
    lastDrill: "2023-02-20",
    status: "active",
    description: "Procedures for handling animal escapes and visitor safety.",
  },
  {
    id: "safety-3",
    name: "Weather Emergency Plan",
    type: "protocol",
    locations: ["All zones"],
    lastUpdated: "2023-02-15",
    lastDrill: "2023-01-30",
    status: "active",
    description:
      "Procedures for severe weather events including shelter locations.",
  },
  {
    id: "safety-4",
    name: "Fire Suppression System",
    type: "evacuation",
    locations: ["All buildings"],
    lastUpdated: "2023-01-15",
    lastInspection: "2023-04-10",
    status: "active",
    description:
      "Automatic sprinkler and alarm systems in all enclosed structures.",
  },
];

export function FacilitiesAndSafety() {
  const [activeTab, setActiveTab] = useState("facilities");
  const [facilities, setFacilities] = useState(initialFacilities);
  const [firstAid, setFirstAid] = useState(initialFirstAid);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedFacility, setSelectedFacility] = useState<any>(null);
  const [selectedFirstAid, setSelectedFirstAid] = useState<any>(null);
  const [selectedSafety, setSelectedSafety] = useState<any>(null);
  const [safety, setSafety] = useState<SafetyItem[]>(initialSafety);
  const [isAddingFacility, setIsAddingFacility] = useState(false);
  const [isEditingFacility, setIsEditingFacility] = useState(false);
  const [isAddingFirstAid, setIsAddingFirstAid] = useState(false);
  const [isEditingFirstAid, setIsEditingFirstAid] = useState(false);
  const [isAddingSafety, setIsAddingSafety] = useState(false);
  const [isEditingSafety, setIsEditingSafety] = useState(false);

  const [deleteFacilityDialog, setDeleteFacilityDialog] = useState(false);
  const [deleteFirstAidDialog, setDeleteFirstAidDialog] = useState(false);
  const [deleteSafetyDialog, setDeleteSafetyDialog] = useState(false);

  const [facilityToDelete, setFacilityToDelete] = useState<any>(null);
  const [firstAidToDelete, setFirstAidToDelete] = useState<any>(null);
  const [safetyToDelete, setSafetyToDelete] = useState<any>(null);

  // Form states
  const [facilityForm, setFacilityForm] = useState({
    name: "",
    type: "restroom",
    location: "",
    status: "operational",
    features: "",
    lastMaintenance: "",
    description: "",
  });

  const [firstAidForm, setFirstAidForm] = useState({
    name: "",
    location: "",
    status: "operational",
    staffed: true,
    staffingHours: "",
    equipment: "",
    description: "",
  });

  const [safetyForm, setSafetyForm] = useState({
    name: "",
    type: "protocol",
    locations: "",
    lastUpdated: "",
    lastDrill: "",
    status: "active",
    description: "",
  });

  // Filter items based on search query
  const filteredFacilities = facilities.filter(
    (facility) =>
      facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFirstAid = firstAid.filter(
    (station) =>
      station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSafety = safety.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle facility form submission
  const handleFacilitySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const featuresArray = facilityForm.features
      .split(",")
      .map((feature) => feature.trim());

    if (isEditingFacility && selectedFacility) {
      // Update existing facility
      const updatedFacilities = facilities.map((facility) =>
        facility.id === selectedFacility.id
          ? {
              ...facility,
              name: facilityForm.name,
              type: facilityForm.type,
              location: facilityForm.location,
              status: facilityForm.status,
              features: featuresArray,
              lastMaintenance: facilityForm.lastMaintenance,
              description: facilityForm.description,
            }
          : facility
      );
      setFacilities(updatedFacilities);
      setSelectedFacility({
        ...selectedFacility,
        name: facilityForm.name,
        type: facilityForm.type,
        location: facilityForm.location,
        status: facilityForm.status,
        features: featuresArray,
        lastMaintenance: facilityForm.lastMaintenance,
        description: facilityForm.description,
      });
    } else {
      // Add new facility
      const newFacility = {
        id: `facility-${Date.now()}`,
        name: facilityForm.name,
        type: facilityForm.type,
        location: facilityForm.location,
        status: facilityForm.status,
        features: featuresArray,
        lastMaintenance: facilityForm.lastMaintenance,
        description: facilityForm.description,
      };
      setFacilities([...facilities, newFacility]);
    }

    // Reset form and state
    setFacilityForm({
      name: "",
      type: "restroom",
      location: "",
      status: "operational",
      features: "",
      lastMaintenance: "",
      description: "",
    });
    setIsAddingFacility(false);
    setIsEditingFacility(false);
  };

  // Handle first aid form submission
  const handleFirstAidSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const equipmentArray = firstAidForm.equipment
      .split(",")
      .map((item) => item.trim());

    if (isEditingFirstAid && selectedFirstAid) {
      // Update existing first aid station
      const updatedFirstAid = firstAid.map((station) =>
        station.id === selectedFirstAid.id
          ? {
              ...station,
              name: firstAidForm.name,
              location: firstAidForm.location,
              status: firstAidForm.status,
              staffed: firstAidForm.staffed,
              staffingHours: firstAidForm.staffed
                ? firstAidForm.staffingHours
                : "N/A",
              equipment: equipmentArray,
              description: firstAidForm.description,
            }
          : station
      );
      setFirstAid(updatedFirstAid);
      setSelectedFirstAid({
        ...selectedFirstAid,
        name: firstAidForm.name,
        location: firstAidForm.location,
        status: firstAidForm.status,
        staffed: firstAidForm.staffed,
        staffingHours: firstAidForm.staffed
          ? firstAidForm.staffingHours
          : "N/A",
        equipment: equipmentArray,
        description: firstAidForm.description,
      });
    } else {
      // Add new first aid station
      const newFirstAid = {
        id: `firstaid-${Date.now()}`,
        name: firstAidForm.name,
        location: firstAidForm.location,
        status: firstAidForm.status,
        staffed: firstAidForm.staffed,
        staffingHours: firstAidForm.staffed
          ? firstAidForm.staffingHours
          : "N/A",
        equipment: equipmentArray,
        description: firstAidForm.description,
      };
      setFirstAid([...firstAid, newFirstAid]);
    }

    // Reset form and state
    setFirstAidForm({
      name: "",
      location: "",
      status: "operational",
      staffed: true,
      staffingHours: "",
      equipment: "",
      description: "",
    });
    setIsAddingFirstAid(false);
    setIsEditingFirstAid(false);
  };

  // Handle safety form submission
  const handleSafetySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const locationsArray = safetyForm.locations
      .split(",")
      .map((location) => location.trim());

    if (isEditingSafety && selectedSafety) {
      // Update existing safety item
      const updatedSafety = safety.map((item) =>
        item.id === selectedSafety.id
          ? {
              ...item,
              name: safetyForm.name,
              type: safetyForm.type,
              locations: locationsArray,
              lastUpdated: safetyForm.lastUpdated,
              lastDrill: safetyForm.lastDrill,
              status: safetyForm.status,
              description: safetyForm.description,
            }
          : item
      );
      setSafety(updatedSafety);
      setSelectedSafety({
        ...selectedSafety,
        name: safetyForm.name,
        type: safetyForm.type,
        locations: locationsArray,
        lastUpdated: safetyForm.lastUpdated,
        lastDrill: safetyForm.lastDrill,
        status: safetyForm.status,
        description: safetyForm.description,
      });
    } else {
      // Add new safety item
      const newSafety = {
        id: `safety-${Date.now()}`,
        name: safetyForm.name,
        type: safetyForm.type,
        locations: locationsArray,
        lastUpdated: safetyForm.lastUpdated,
        lastDrill: safetyForm.lastDrill,
        status: safetyForm.status,
        description: safetyForm.description,
      };
      setSafety([...safety, newSafety]);
    }

    // Reset form and state
    setSafetyForm({
      name: "",
      type: "protocol",
      locations: "",
      lastUpdated: "",
      lastDrill: "",
      status: "active",
      description: "",
    });
    setIsAddingSafety(false);
    setIsEditingSafety(false);
  };

  // Handle edit facility
  const handleEditFacility = (facility: (typeof initialFacilities)[number]) => {
    setFacilityForm({
      name: facility.name,
      type: facility.type,
      location: facility.location,
      status: facility.status,
      features: facility.features.join(", "),
      lastMaintenance: facility.lastMaintenance,
      description: facility.description,
    });
    setIsEditingFacility(true);
  };

  // Handle edit first aid
  const handleEditFirstAid = (station: (typeof initialFirstAid)[number]) => {
    setFirstAidForm({
      name: station.name,
      location: station.location,
      status: station.status,
      staffed: station.staffed,
      staffingHours: station.staffingHours,
      equipment: station.equipment.join(", "),
      description: station.description,
    });
    setIsEditingFirstAid(true);
  };

  // Handle edit safety
  const handleEditSafety = (item: (typeof initialSafety)[number]) => {
    setSafetyForm({
      name: item.name,
      type: item.type,
      locations: item.locations.join(", "),
      lastUpdated: item.lastUpdated,
      lastDrill: item.lastDrill || "",
      status: item.status,
      description: item.description,
    });
    setIsEditingSafety(true);
  };

  // Handle delete facility
  const handleDeleteFacility = () => {
    if (facilityToDelete) {
      const updatedFacilities = facilities.filter(
        (facility) => facility.id !== facilityToDelete.id
      );
      setFacilities(updatedFacilities);

      if (selectedFacility && selectedFacility.id === facilityToDelete.id) {
        setSelectedFacility(null);
      }
    }
    setDeleteFacilityDialog(false);
    setFacilityToDelete(null);
  };

  // Handle delete first aid
  const handleDeleteFirstAid = () => {
    if (firstAidToDelete) {
      const updatedFirstAid = firstAid.filter(
        (station) => station.id !== firstAidToDelete.id
      );
      setFirstAid(updatedFirstAid);

      if (selectedFirstAid && selectedFirstAid.id === firstAidToDelete.id) {
        setSelectedFirstAid(null);
      }
    }
    setDeleteFirstAidDialog(false);
    setFirstAidToDelete(null);
  };

  // Handle delete safety
  const handleDeleteSafety = () => {
    if (safetyToDelete) {
      const updatedSafety = safety.filter(
        (item) => item.id !== safetyToDelete.id
      );
      setSafety(updatedSafety);

      if (selectedSafety && selectedSafety.id === safetyToDelete.id) {
        setSelectedSafety(null);
      }
    }
    setDeleteSafetyDialog(false);
    setSafetyToDelete(null);
  };

  return (
    <div className="space-y-4">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="firstaid">First Aid</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
        </TabsList>

        <div className="flex justify-between items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={`Search ${activeTab}...`}
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {activeTab === "facilities" && (
            <Dialog open={isAddingFacility} onOpenChange={setIsAddingFacility}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Facility
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleFacilitySubmit}>
                  <DialogHeader>
                    <DialogTitle>Add New Facility</DialogTitle>
                    <DialogDescription>
                      Create a new visitor facility in the zoo.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={facilityForm.name}
                        onChange={(e) =>
                          setFacilityForm({
                            ...facilityForm,
                            name: e.target.value,
                          })
                        }
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">
                        Type
                      </Label>
                      <Select
                        value={facilityForm.type}
                        onValueChange={(value) =>
                          setFacilityForm({ ...facilityForm, type: value })
                        }
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="restroom">Restroom</SelectItem>
                          <SelectItem value="information">
                            Information
                          </SelectItem>
                          <SelectItem value="rest_area">Rest Area</SelectItem>
                          <SelectItem value="storage">Storage</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="location" className="text-right">
                        Location
                      </Label>
                      <Input
                        id="location"
                        value={facilityForm.location}
                        onChange={(e) =>
                          setFacilityForm({
                            ...facilityForm,
                            location: e.target.value,
                          })
                        }
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="status" className="text-right">
                        Status
                      </Label>
                      <Select
                        value={facilityForm.status}
                        onValueChange={(value) =>
                          setFacilityForm({ ...facilityForm, status: value })
                        }
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="operational">
                            Operational
                          </SelectItem>
                          <SelectItem value="maintenance">
                            Maintenance
                          </SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="features" className="text-right">
                        Features
                      </Label>
                      <Input
                        id="features"
                        value={facilityForm.features}
                        onChange={(e) =>
                          setFacilityForm({
                            ...facilityForm,
                            features: e.target.value,
                          })
                        }
                        className="col-span-3"
                        placeholder="Comma-separated list of features"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="maintenance" className="text-right">
                        Last Maintenance
                      </Label>
                      <Input
                        id="maintenance"
                        type="date"
                        value={facilityForm.lastMaintenance}
                        onChange={(e) =>
                          setFacilityForm({
                            ...facilityForm,
                            lastMaintenance: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={facilityForm.description}
                        onChange={(e) =>
                          setFacilityForm({
                            ...facilityForm,
                            description: e.target.value,
                          })
                        }
                        className="col-span-3"
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save Facility</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}

          {activeTab === "firstaid" && (
            <Dialog open={isAddingFirstAid} onOpenChange={setIsAddingFirstAid}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add First Aid Station
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleFirstAidSubmit}>
                  <DialogHeader>
                    <DialogTitle>Add New First Aid Station</DialogTitle>
                    <DialogDescription>
                      Create a new first aid or medical station in the zoo.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={firstAidForm.name}
                        onChange={(e) =>
                          setFirstAidForm({
                            ...firstAidForm,
                            name: e.target.value,
                          })
                        }
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="location" className="text-right">
                        Location
                      </Label>
                      <Input
                        id="location"
                        value={firstAidForm.location}
                        onChange={(e) =>
                          setFirstAidForm({
                            ...firstAidForm,
                            location: e.target.value,
                          })
                        }
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="status" className="text-right">
                        Status
                      </Label>
                      <Select
                        value={firstAidForm.status}
                        onValueChange={(value) =>
                          setFirstAidForm({ ...firstAidForm, status: value })
                        }
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="operational">
                            Operational
                          </SelectItem>
                          <SelectItem value="unstaffed">Unstaffed</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="staffed" className="text-right">
                        Staffed
                      </Label>
                      <Select
                        value={firstAidForm.staffed ? "true" : "false"}
                        onValueChange={(value) =>
                          setFirstAidForm({
                            ...firstAidForm,
                            staffed: value === "true",
                          })
                        }
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select staffing" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Yes</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {firstAidForm.staffed && (
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="staffingHours" className="text-right">
                          Staffing Hours
                        </Label>
                        <Input
                          id="staffingHours"
                          value={firstAidForm.staffingHours}
                          onChange={(e) =>
                            setFirstAidForm({
                              ...firstAidForm,
                              staffingHours: e.target.value,
                            })
                          }
                          className="col-span-3"
                          placeholder="e.g. 9:00 AM - 6:00 PM"
                          required={firstAidForm.staffed}
                        />
                      </div>
                    )}
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="equipment" className="text-right">
                        Equipment
                      </Label>
                      <Input
                        id="equipment"
                        value={firstAidForm.equipment}
                        onChange={(e) =>
                          setFirstAidForm({
                            ...firstAidForm,
                            equipment: e.target.value,
                          })
                        }
                        className="col-span-3"
                        placeholder="Comma-separated list of equipment"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={firstAidForm.description}
                        onChange={(e) =>
                          setFirstAidForm({
                            ...firstAidForm,
                            description: e.target.value,
                          })
                        }
                        className="col-span-3"
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save First Aid Station</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}

          {activeTab === "safety" && (
            <Dialog open={isAddingSafety} onOpenChange={setIsAddingSafety}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Safety Feature
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSafetySubmit}>
                  <DialogHeader>
                    <DialogTitle>Add New Safety Feature</DialogTitle>
                    <DialogDescription>
                      Create a new safety protocol or feature for the zoo.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={safetyForm.name}
                        onChange={(e) =>
                          setSafetyForm({ ...safetyForm, name: e.target.value })
                        }
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">
                        Type
                      </Label>
                      <Select
                        value={safetyForm.type}
                        onValueChange={(value) =>
                          setSafetyForm({ ...safetyForm, type: value })
                        }
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="protocol">Protocol</SelectItem>
                          <SelectItem value="evacuation">Evacuation</SelectItem>
                          <SelectItem value="equipment">Equipment</SelectItem>
                          <SelectItem value="training">Training</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="locations" className="text-right">
                        Locations
                      </Label>
                      <Input
                        id="locations"
                        value={safetyForm.locations}
                        onChange={(e) =>
                          setSafetyForm({
                            ...safetyForm,
                            locations: e.target.value,
                          })
                        }
                        className="col-span-3"
                        placeholder="Comma-separated list of locations"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="lastUpdated" className="text-right">
                        Last Updated
                      </Label>
                      <Input
                        id="lastUpdated"
                        type="date"
                        value={safetyForm.lastUpdated}
                        onChange={(e) =>
                          setSafetyForm({
                            ...safetyForm,
                            lastUpdated: e.target.value,
                          })
                        }
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="lastDrill" className="text-right">
                        Last Drill
                      </Label>
                      <Input
                        id="lastDrill"
                        type="date"
                        value={safetyForm.lastDrill}
                        onChange={(e) =>
                          setSafetyForm({
                            ...safetyForm,
                            lastDrill: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="status" className="text-right">
                        Status
                      </Label>
                      <Select
                        value={safetyForm.status}
                        onValueChange={(value) =>
                          setSafetyForm({ ...safetyForm, status: value })
                        }
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="review">Under Review</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={safetyForm.description}
                        onChange={(e) =>
                          setSafetyForm({
                            ...safetyForm,
                            description: e.target.value,
                          })
                        }
                        className="col-span-3"
                        rows={3}
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save Safety Feature</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <TabsContent value="facilities" className="space-y-4">
          {selectedFacility ? (
            <div className="space-y-4">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedFacility(null)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Facilities
                </Button>
              </div>

              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold">
                    {selectedFacility.name}
                  </h2>
                  <p className="text-muted-foreground">
                    {selectedFacility.location}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Dialog
                    open={isEditingFacility}
                    onOpenChange={setIsEditingFacility}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => handleEditFacility(selectedFacility)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Facility
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <form onSubmit={handleFacilitySubmit}>
                        <DialogHeader>
                          <DialogTitle>Edit Facility</DialogTitle>
                          <DialogDescription>
                            Update the details for this facility.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="edit-name"
                              value={facilityForm.name}
                              onChange={(e) =>
                                setFacilityForm({
                                  ...facilityForm,
                                  name: e.target.value,
                                })
                              }
                              className="col-span-3"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-type" className="text-right">
                              Type
                            </Label>
                            <Select
                              value={facilityForm.type}
                              onValueChange={(value) =>
                                setFacilityForm({
                                  ...facilityForm,
                                  type: value,
                                })
                              }
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="restroom">
                                  Restroom
                                </SelectItem>
                                <SelectItem value="information">
                                  Information
                                </SelectItem>
                                <SelectItem value="rest_area">
                                  Rest Area
                                </SelectItem>
                                <SelectItem value="storage">Storage</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="edit-location"
                              className="text-right"
                            >
                              Location
                            </Label>
                            <Input
                              id="edit-location"
                              value={facilityForm.location}
                              onChange={(e) =>
                                setFacilityForm({
                                  ...facilityForm,
                                  location: e.target.value,
                                })
                              }
                              className="col-span-3"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-status" className="text-right">
                              Status
                            </Label>
                            <Select
                              value={facilityForm.status}
                              onValueChange={(value) =>
                                setFacilityForm({
                                  ...facilityForm,
                                  status: value,
                                })
                              }
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="operational">
                                  Operational
                                </SelectItem>
                                <SelectItem value="maintenance">
                                  Maintenance
                                </SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="edit-features"
                              className="text-right"
                            >
                              Features
                            </Label>
                            <Input
                              id="edit-features"
                              value={facilityForm.features}
                              onChange={(e) =>
                                setFacilityForm({
                                  ...facilityForm,
                                  features: e.target.value,
                                })
                              }
                              className="col-span-3"
                              placeholder="Comma-separated list of features"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="edit-maintenance"
                              className="text-right"
                            >
                              Last Maintenance
                            </Label>
                            <Input
                              id="edit-maintenance"
                              type="date"
                              value={facilityForm.lastMaintenance}
                              onChange={(e) =>
                                setFacilityForm({
                                  ...facilityForm,
                                  lastMaintenance: e.target.value,
                                })
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="edit-description"
                              className="text-right"
                            >
                              Description
                            </Label>
                            <Textarea
                              id="edit-description"
                              value={facilityForm.description}
                              onChange={(e) =>
                                setFacilityForm({
                                  ...facilityForm,
                                  description: e.target.value,
                                })
                              }
                              className="col-span-3"
                              rows={3}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Save Changes</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setFacilityToDelete(selectedFacility);
                      setDeleteFacilityDialog(true);
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Facility
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Facility Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Type
                      </h3>
                      <p className="mt-1 capitalize">
                        {selectedFacility.type.replace("_", " ")}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Status
                      </h3>
                      <Badge
                        className="mt-1"
                        variant={
                          selectedFacility.status === "operational"
                            ? "default"
                            : selectedFacility.status === "maintenance"
                            ? "warning"
                            : "destructive"
                        }
                      >
                        {selectedFacility.status.charAt(0).toUpperCase() +
                          selectedFacility.status.slice(1)}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Location
                      </h3>
                      <p className="mt-1">{selectedFacility.location}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Last Maintenance
                      </h3>
                      <p className="mt-1">
                        {selectedFacility.lastMaintenance || "Not recorded"}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Features
                      </h3>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {selectedFacility.features.map(
                          (feature: string, index: number) => (
                            <Badge key={index} variant="outline">
                              {feature}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Description
                      </h3>
                      <p className="mt-1">{selectedFacility.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <AlertDialog
                open={deleteFacilityDialog}
                onOpenChange={setDeleteFacilityDialog}
              >
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete the facility "
                      {facilityToDelete?.name}". This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteFacility}
                      className="bg-destructive text-destructive-foreground"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredFacilities.length > 0 ? (
                filteredFacilities.map((facility) => (
                  <Card key={facility.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>{facility.name}</CardTitle>
                        <Badge
                          variant={
                            facility.status === "operational"
                              ? "default"
                              : facility.status === "maintenance"
                              ? "warning"
                              : "destructive"
                          }
                        >
                          {facility.status.charAt(0).toUpperCase() +
                            facility.status.slice(1)}
                        </Badge>
                      </div>
                      <CardDescription>{facility.location}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Type:</span>
                          <span className="capitalize">
                            {facility.type.replace("_", " ")}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Features:
                          </span>
                          <span>{facility.features.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Last Maintenance:
                          </span>
                          <span>{facility.lastMaintenance || "N/A"}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedFacility(facility)}
                      >
                        View Details
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            handleEditFacility(facility);
                            setSelectedFacility(facility);
                            setIsEditingFacility(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setFacilityToDelete(facility);
                            setDeleteFacilityDialog(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex justify-center items-center h-40 border rounded-lg border-dashed">
                  <div className="text-center">
                    <Accessibility className="mx-auto h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-2 text-sm font-semibold">
                      No facilities found
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {searchQuery
                        ? "Try a different search term"
                        : "Get started by adding a new facility"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          <AlertDialog
            open={deleteFacilityDialog}
            onOpenChange={setDeleteFacilityDialog}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete the facility "
                  {facilityToDelete?.name}". This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteFacility}
                  className="bg-destructive text-destructive-foreground"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TabsContent>

        <TabsContent value="firstaid" className="space-y-4">
          {selectedFirstAid ? (
            <div className="space-y-4">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedFirstAid(null)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to First Aid Stations
                </Button>
              </div>

              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold">
                    {selectedFirstAid.name}
                  </h2>
                  <p className="text-muted-foreground">
                    {selectedFirstAid.location}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Dialog
                    open={isEditingFirstAid}
                    onOpenChange={setIsEditingFirstAid}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => handleEditFirstAid(selectedFirstAid)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Station
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <form onSubmit={handleFirstAidSubmit}>
                        <DialogHeader>
                          <DialogTitle>Edit First Aid Station</DialogTitle>
                          <DialogDescription>
                            Update the details for this first aid station.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="edit-name"
                              value={firstAidForm.name}
                              onChange={(e) =>
                                setFirstAidForm({
                                  ...firstAidForm,
                                  name: e.target.value,
                                })
                              }
                              className="col-span-3"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="edit-location"
                              className="text-right"
                            >
                              Location
                            </Label>
                            <Input
                              id="edit-location"
                              value={firstAidForm.location}
                              onChange={(e) =>
                                setFirstAidForm({
                                  ...firstAidForm,
                                  location: e.target.value,
                                })
                              }
                              className="col-span-3"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-status" className="text-right">
                              Status
                            </Label>
                            <Select
                              value={firstAidForm.status}
                              onValueChange={(value) =>
                                setFirstAidForm({
                                  ...firstAidForm,
                                  status: value,
                                })
                              }
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="operational">
                                  Operational
                                </SelectItem>
                                <SelectItem value="unstaffed">
                                  Unstaffed
                                </SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="edit-staffed"
                              className="text-right"
                            >
                              Staffed
                            </Label>
                            <Select
                              value={firstAidForm.staffed ? "true" : "false"}
                              onValueChange={(value) =>
                                setFirstAidForm({
                                  ...firstAidForm,
                                  staffed: value === "true",
                                })
                              }
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select staffing" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="true">Yes</SelectItem>
                                <SelectItem value="false">No</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {firstAidForm.staffed && (
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="edit-staffingHours"
                                className="text-right"
                              >
                                Staffing Hours
                              </Label>
                              <Input
                                id="edit-staffingHours"
                                value={firstAidForm.staffingHours}
                                onChange={(e) =>
                                  setFirstAidForm({
                                    ...firstAidForm,
                                    staffingHours: e.target.value,
                                  })
                                }
                                className="col-span-3"
                                placeholder="e.g. 9:00 AM - 6:00 PM"
                                required={firstAidForm.staffed}
                              />
                            </div>
                          )}
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="edit-equipment"
                              className="text-right"
                            >
                              Equipment
                            </Label>
                            <Input
                              id="edit-equipment"
                              value={firstAidForm.equipment}
                              onChange={(e) =>
                                setFirstAidForm({
                                  ...firstAidForm,
                                  equipment: e.target.value,
                                })
                              }
                              className="col-span-3"
                              placeholder="Comma-separated list of equipment"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="edit-description"
                              className="text-right"
                            >
                              Description
                            </Label>
                            <Textarea
                              id="edit-description"
                              value={firstAidForm.description}
                              onChange={(e) =>
                                setFirstAidForm({
                                  ...firstAidForm,
                                  description: e.target.value,
                                })
                              }
                              className="col-span-3"
                              rows={3}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Save Changes</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setFirstAidToDelete(selectedFirstAid);
                      setDeleteFirstAidDialog(true);
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Station
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>First Aid Station Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Status
                      </h3>
                      <Badge
                        className="mt-1"
                        variant={
                          selectedFirstAid.status === "operational"
                            ? "default"
                            : selectedFirstAid.status === "unstaffed"
                            ? "warning"
                            : "destructive"
                        }
                      >
                        {selectedFirstAid.status.charAt(0).toUpperCase() +
                          selectedFirstAid.status.slice(1)}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Location
                      </h3>
                      <p className="mt-1">{selectedFirstAid.location}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Staffed
                      </h3>
                      <p className="mt-1">
                        {selectedFirstAid.staffed ? "Yes" : "No"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Staffing Hours
                      </h3>
                      <p className="mt-1">{selectedFirstAid.staffingHours}</p>
                    </div>
                    <div className="md:col-span-2">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Equipment
                      </h3>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {selectedFirstAid.equipment.map(
                          (item: string, index: number) => (
                            <Badge key={index} variant="outline">
                              {item}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Description
                      </h3>
                      <p className="mt-1">{selectedFirstAid.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <AlertDialog
                open={deleteFirstAidDialog}
                onOpenChange={setDeleteFirstAidDialog}
              >
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete the first aid station "
                      {firstAidToDelete?.name}". This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteFirstAid}
                      className="bg-destructive text-destructive-foreground"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredFirstAid.length > 0 ? (
                filteredFirstAid.map((station) => (
                  <Card key={station.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>{station.name}</CardTitle>
                        <Badge
                          variant={
                            station.status === "operational"
                              ? "default"
                              : station.status === "unstaffed"
                              ? "warning"
                              : "destructive"
                          }
                        >
                          {station.status.charAt(0).toUpperCase() +
                            station.status.slice(1)}
                        </Badge>
                      </div>
                      <CardDescription>{station.location}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Staffed:
                          </span>
                          <span>{station.staffed ? "Yes" : "No"}</span>
                        </div>
                        {station.staffed && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Hours:
                            </span>
                            <span>{station.staffingHours}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Equipment:
                          </span>
                          <span>{station.equipment.length} items</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedFirstAid(station)}
                      >
                        View Details
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            handleEditFirstAid(station);
                            setSelectedFirstAid(station);
                            setIsEditingFirstAid(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setFirstAidToDelete(station);
                            setDeleteFirstAidDialog(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex justify-center items-center h-40 border rounded-lg border-dashed">
                  <div className="text-center">
                    <FirstAid className="mx-auto h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-2 text-sm font-semibold">
                      No first aid stations found
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {searchQuery
                        ? "Try a different search term"
                        : "Get started by adding a new first aid station"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          <AlertDialog
            open={deleteFirstAidDialog}
            onOpenChange={setDeleteFirstAidDialog}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete the first aid station "
                  {firstAidToDelete?.name}". This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteFirstAid}
                  className="bg-destructive text-destructive-foreground"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TabsContent>

        <TabsContent value="safety" className="space-y-4">
          {selectedSafety ? (
            <div className="space-y-4">
              <div className="flex items-center">
                <Button variant="ghost" onClick={() => setSelectedSafety(null)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Safety Features
                </Button>
              </div>

              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold">{selectedSafety.name}</h2>
                  <p className="text-muted-foreground capitalize">
                    {selectedSafety.type}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Dialog
                    open={isEditingSafety}
                    onOpenChange={setIsEditingSafety}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => handleEditSafety(selectedSafety)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Safety Feature
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <form onSubmit={handleSafetySubmit}>
                        <DialogHeader>
                          <DialogTitle>Edit Safety Feature</DialogTitle>
                          <DialogDescription>
                            Update the details for this safety feature.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="edit-name"
                              value={safetyForm.name}
                              onChange={(e) =>
                                setSafetyForm({
                                  ...safetyForm,
                                  name: e.target.value,
                                })
                              }
                              className="col-span-3"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-type" className="text-right">
                              Type
                            </Label>
                            <Select
                              value={safetyForm.type}
                              onValueChange={(value) =>
                                setSafetyForm({ ...safetyForm, type: value })
                              }
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="protocol">
                                  Protocol
                                </SelectItem>
                                <SelectItem value="evacuation">
                                  Evacuation
                                </SelectItem>
                                <SelectItem value="equipment">
                                  Equipment
                                </SelectItem>
                                <SelectItem value="training">
                                  Training
                                </SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="edit-locations"
                              className="text-right"
                            >
                              Locations
                            </Label>
                            <Input
                              id="edit-locations"
                              value={safetyForm.locations}
                              onChange={(e) =>
                                setSafetyForm({
                                  ...safetyForm,
                                  locations: e.target.value,
                                })
                              }
                              className="col-span-3"
                              placeholder="Comma-separated list of locations"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="edit-lastUpdated"
                              className="text-right"
                            >
                              Last Updated
                            </Label>
                            <Input
                              id="edit-lastUpdated"
                              type="date"
                              value={safetyForm.lastUpdated}
                              onChange={(e) =>
                                setSafetyForm({
                                  ...safetyForm,
                                  lastUpdated: e.target.value,
                                })
                              }
                              className="col-span-3"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="edit-lastDrill"
                              className="text-right"
                            >
                              Last Drill
                            </Label>
                            <Input
                              id="edit-lastDrill"
                              type="date"
                              value={safetyForm.lastDrill}
                              onChange={(e) =>
                                setSafetyForm({
                                  ...safetyForm,
                                  lastDrill: e.target.value,
                                })
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-status" className="text-right">
                              Status
                            </Label>
                            <Select
                              value={safetyForm.status}
                              onValueChange={(value) =>
                                setSafetyForm({ ...safetyForm, status: value })
                              }
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="review">
                                  Under Review
                                </SelectItem>
                                <SelectItem value="inactive">
                                  Inactive
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="edit-description"
                              className="text-right"
                            >
                              Description
                            </Label>
                            <Textarea
                              id="edit-description"
                              value={safetyForm.description}
                              onChange={(e) =>
                                setSafetyForm({
                                  ...safetyForm,
                                  description: e.target.value,
                                })
                              }
                              className="col-span-3"
                              rows={3}
                              required
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Save Changes</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setSafetyToDelete(selectedSafety);
                      setDeleteSafetyDialog(true);
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Safety Feature
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Safety Feature Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Type
                      </h3>
                      <p className="mt-1 capitalize">{selectedSafety.type}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Status
                      </h3>
                      <Badge
                        className="mt-1"
                        variant={
                          selectedSafety.status === "active"
                            ? "default"
                            : selectedSafety.status === "review"
                            ? "warning"
                            : "destructive"
                        }
                      >
                        {selectedSafety.status === "review"
                          ? "Under Review"
                          : selectedSafety.status.charAt(0).toUpperCase() +
                            selectedSafety.status.slice(1)}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Last Updated
                      </h3>
                      <p className="mt-1">{selectedSafety.lastUpdated}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Last Drill/Test
                      </h3>
                      <p className="mt-1">
                        {selectedSafety.lastDrill || "N/A"}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Locations
                      </h3>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {selectedSafety.locations.map(
                          (location: string, index: number) => (
                            <Badge key={index} variant="outline">
                              {location}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Description
                      </h3>
                      <p className="mt-1">{selectedSafety.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <AlertDialog
                open={deleteSafetyDialog}
                onOpenChange={setDeleteSafetyDialog}
              >
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete the safety feature "
                      {safetyToDelete?.name}". This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteSafety}
                      className="bg-destructive text-destructive-foreground"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredSafety.length > 0 ? (
                filteredSafety.map((item) => (
                  <Card key={item.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>{item.name}</CardTitle>
                        <Badge
                          variant={
                            item.status === "active"
                              ? "default"
                              : item.status === "review"
                              ? "warning"
                              : "destructive"
                          }
                        >
                          {item.status === "review"
                            ? "Under Review"
                            : item.status.charAt(0).toUpperCase() +
                              item.status.slice(1)}
                        </Badge>
                      </div>
                      <CardDescription className="capitalize">
                        {item.type}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Locations:
                          </span>
                          <span>{item.locations.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Last Updated:
                          </span>
                          <span>{item.lastUpdated}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Last Drill:
                          </span>
                          <span>{item.lastDrill || "N/A"}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedSafety(item)}
                      >
                        View Details
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            handleEditSafety(item);
                            setSelectedSafety(item);
                            setIsEditingSafety(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setSafetyToDelete(item);
                            setDeleteSafetyDialog(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex justify-center items-center h-40 border rounded-lg border-dashed">
                  <div className="text-center">
                    <ShieldAlert className="mx-auto h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-2 text-sm font-semibold">
                      No safety features found
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {searchQuery
                        ? "Try a different search term"
                        : "Get started by adding a new safety feature"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          <AlertDialog
            open={deleteSafetyDialog}
            onOpenChange={setDeleteSafetyDialog}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete the safety feature "
                  {safetyToDelete?.name}". This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteSafety}
                  className="bg-destructive text-destructive-foreground"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TabsContent>
      </Tabs>
    </div>
  );
}
