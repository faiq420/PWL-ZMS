"use client";

import type React from "react";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import {
    ChevronRight,
    ShieldAlert,
    Edit,
    Trash2,
    ArrowLeft,
    ArrowUpDown,
    Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import CardIntro from "@/components/utils/Headings/CardIntro";
import { changeDateFormat } from "@/Helper/DateFormats";

interface Prop {
    searchQuery: string;
}

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
        lastDrill: "2023-04-10",
        status: "active",
        description:
            "Automatic sprinkler and alarm systems in all enclosed structures.",
    },
];

export default function Safety({ searchQuery }: Prop) {
    const [sortOrder, setSortOrder] = useState("name-asc");
    const [safety, setSafety] = useState<SafetyItem[]>(initialSafety);
    const [selectedSafety, setSelectedSafety] = useState<any>(null);
    const [isAddingSafety, setIsAddingSafety] = useState(false);
    const [isEditingSafety, setIsEditingSafety] = useState(false);
    const [deleteSafetyDialog, setDeleteSafetyDialog] = useState(false);
    const [safetyToDelete, setSafetyToDelete] = useState<any>(null);

    const [safetyForm, setSafetyForm] = useState({
        name: "",
        type: "protocol",
        locations: "",
        lastUpdated: "",
        lastDrill: "",
        status: "active",
        description: "",
    });

    const filteredSafety = safety.filter(
        (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

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


    // Sort Courts based on selected sort order
    const sortedFacilties = [...filteredSafety].sort((a, b) => {
        switch (sortOrder) {
            case "name-asc":
                return a.name.localeCompare(b.name);
            case "name-desc":
                return b.name.localeCompare(a.name);
            default:
                return 0;
        }
    });

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 20;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = sortedFacilties.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(safety.length / postsPerPage);
    const paginationLabels = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <>
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
                <Card>
                    <CardHeader>
                        <div className="md:flex gap-3 justify-between items-end mb-2 w-full">
                            <CardIntro
                                title="Safety"
                                description="Manage all safety across the zoos."
                            />
                            <div className="flex space-x-2">
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
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-md">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-main-frostyBlue/5">
                                        {/* <TableHead className="w-12">
                                                        <Checkbox
                                                            value={
                                                                selectedFacility.length === filteredFacilities.length &&
                                                                filteredFacilities.length > 0
                                                            }
                                                            // setter={toggleSelectAll}
                                                            name=""
                                                        />
                                                    </TableHead> */}
                                        <TableHead>
                                            <div
                                                className="flex items-center gap-1 cursor-pointer"
                                                onClick={() =>
                                                    setSortOrder(
                                                        sortOrder === "name-asc" ? "name-desc" : "name-asc"
                                                    )
                                                }
                                            >
                                                Name
                                                <ArrowUpDown className="h-4 w-4" />
                                            </div>
                                        </TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Last Updated</TableHead>
                                        <TableHead>Last Drill</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-center text-main-darkFadedBlue">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="!text-sm">
                                    {filteredSafety.length > 0 ? (
                                        safety.map((safe: any, index: number) => (
                                            <TableRow key={index}>
                                                {/* <TableCell>
                                                                <Checkbox
                                                                    value={selectedCourts.includes(court.Id)}
                                                                    setter={(n, v) => toggleSelectcourt(court.Id)}
                                                                    name="id"
                                                                />
                                                            </TableCell> */}
                                                <TableCell>{safe.name}</TableCell>
                                                <TableCell>{safe.type}</TableCell>
                                                <TableCell>{safe.locations}</TableCell>
                                                <TableCell>{changeDateFormat(safe.lastUpdated)}</TableCell>
                                                <TableCell>{changeDateFormat(safe.lastDrill)}</TableCell>
                                                <TableCell>{safe.status}</TableCell>
                                                <TableCell className="flex justify-center items-center space-x-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => {
                                                            setSelectedSafety(safe);
                                                            setIsEditingSafety(true);
                                                        }}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-destructive hover:text-destructive"
                                                        onClick={() => {
                                                            setSelectedSafety(safe);
                                                            setSafetyToDelete(safe);
                                                            setDeleteSafetyDialog(true);
                                                        }}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                    {/* <Button
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            onClick={() => {
                                                                                handleEditFacility(index)(facility);
                                                                                setSelectedFacility(facility);
                                                                                setIsEditingFacility(true);
                                                                            }}
                                                                        >
                                                                            <Edit className="text-black h-4 w-4 cursor-pointer" />
                                                                        </Button>
                
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            onClick={() => handleDeleteFacility}
                                                                            className="text-destructive hover:text-destructive"
                                                                        >
                                                                            <Trash2 className="h-4 w-4" />
                                                                        </Button> */}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={6}
                                                className="h-24 text-center text-main-gray"
                                            >
                                                No products found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="mt-4">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => {
                                                if (currentPage != 1) {
                                                    setCurrentPage(currentPage - 1);
                                                }
                                            }}
                                            aria-disabled={currentPage == 1}
                                            className="text-main-darkFadedBlue cursor-pointer"
                                        />
                                    </PaginationItem>
                                    {paginationLabels.map((label: number) => (
                                        <PaginationItem key={label}>
                                            <PaginationLink
                                                onClick={() => {
                                                    setCurrentPage(label);
                                                }}
                                                className={`${currentPage == label && "bg-main-gray"
                                                    }  text-main-navyBlue cursor-pointer`}
                                            >
                                                {label}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => {
                                                if (currentPage != totalPages) {
                                                    setCurrentPage(currentPage + 1);
                                                }
                                            }}
                                            aria-disabled={currentPage == totalPages}
                                            className="text-main-darkFadedBlue cursor-pointer"
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </CardContent>
                </Card >
                // <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                //     {filteredSafety.length > 0 ? (
                //         filteredSafety.map((item) => (
                //             <Card key={item.id}>
                //                 <CardHeader className="pb-2">
                //                     <div className="flex justify-between items-start">
                //                         <CardTitle>{item.name}</CardTitle>
                //                         <Badge
                //                             variant={
                //                                 item.status === "active"
                //                                     ? "default"
                //                                     : item.status === "review"
                //                                         ? "warning"
                //                                         : "destructive"
                //                             }
                //                         >
                //                             {item.status === "review"
                //                                 ? "Under Review"
                //                                 : item.status.charAt(0).toUpperCase() +
                //                                 item.status.slice(1)}
                //                         </Badge>
                //                     </div>
                //                     <CardDescription className="capitalize">
                //                         {item.type}
                //                     </CardDescription>
                //                 </CardHeader>
                //                 <CardContent>
                //                     <div className="space-y-2">
                //                         <div className="flex justify-between text-sm">
                //                             <span className="text-muted-foreground">
                //                                 Locations:
                //                             </span>
                //                             <span>{item.locations.length}</span>
                //                         </div>
                //                         <div className="flex justify-between text-sm">
                //                             <span className="text-muted-foreground">
                //                                 Last Updated:
                //                             </span>
                //                             <span>{item.lastUpdated}</span>
                //                         </div>
                //                         <div className="flex justify-between text-sm">
                //                             <span className="text-muted-foreground">
                //                                 Last Drill:
                //                             </span>
                //                             <span>{item.lastDrill || "N/A"}</span>
                //                         </div>
                //                     </div>
                //                 </CardContent>
                //                 <CardFooter className="flex justify-between">
                //                     <Button
                //                         variant="outline"
                //                         size="sm"
                //                         onClick={() => setSelectedSafety(item)}
                //                     >
                //                         View Details
                //                         <ChevronRight className="ml-2 h-4 w-4" />
                //                     </Button>
                //                     <div className="flex space-x-2">
                //                         <Button
                //                             variant="outline"
                //                             size="icon"
                //                             onClick={() => {
                //                                 handleEditSafety(item);
                //                                 setSelectedSafety(item);
                //                                 setIsEditingSafety(true);
                //                             }}
                //                         >
                //                             <Edit className="h-4 w-4" />
                //                         </Button>
                //                         <Button
                //                             variant="outline"
                //                             size="icon"
                //                             onClick={() => {
                //                                 setSafetyToDelete(item);
                //                                 setDeleteSafetyDialog(true);
                //                             }}
                //                         >
                //                             <Trash2 className="h-4 w-4" />
                //                         </Button>
                //                     </div>
                //                 </CardFooter>
                //             </Card>
                //         ))
                //     ) : (
                //         <div className="col-span-full flex justify-center items-center h-40 border rounded-lg border-dashed">
                //             <div className="text-center">
                //                 <ShieldAlert className="mx-auto h-10 w-10 text-muted-foreground" />
                //                 <h3 className="mt-2 text-sm font-semibold">
                //                     No safety features found
                //                 </h3>
                //                 <p className="mt-1 text-sm text-muted-foreground">
                //                     {searchQuery
                //                         ? "Try a different search term"
                //                         : "Get started by adding a new safety feature"}
                //                 </p>
                //             </div>
                //         </div>
                //     )}
                // </div>
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
        </>
    )
}