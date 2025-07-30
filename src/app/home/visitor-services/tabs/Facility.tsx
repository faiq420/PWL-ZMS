import { useState } from "react";
import {
    Card,
    CardContent,
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
    Edit,
    Trash2,
    ArrowLeft,
    Plus
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
import Checkbox from "@/components/utils/FormElements/Checkbox";
import { ArrowUpDown } from "lucide-react";
import CardIntro from "@/components/utils/Headings/CardIntro";
import { changeDateFormat } from "@/Helper/DateFormats";

interface Prop {
    searchQuery: string;
}

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

export default function Faciltiy({ searchQuery }: Prop) {
    const [sortOrder, setSortOrder] = useState("name-asc");
    const [facilities, setFacilities] = useState(initialFacilities);
    const [selectedFacility, setSelectedFacility] = useState<any>(null);
    const [isAddingFacility, setIsAddingFacility] = useState(false);
    const [isEditingFacility, setIsEditingFacility] = useState(false);
    const [deleteFacilityDialog, setDeleteFacilityDialog] = useState(false);
    const [facilityToDelete, setFacilityToDelete] = useState<any>(null);

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

    const filteredFacilities = facilities.filter(
        (facility) =>
            facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            facility.location.toLowerCase().includes(searchQuery.toLowerCase())
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

    // Toggle
    const toggleSelectAll = () => {
        if (selectedFacility?.length === filteredFacilities.length) {
            setSelectedFacility([]);
        } else {
            setSelectedFacility(filteredFacilities.map((court: any) => court.Id));
        }
    };

    // Sort Courts based on selected sort order
    const sortedFacilties = [...filteredFacilities].sort((a, b) => {
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

    const totalPages = Math.ceil(facilities.length / postsPerPage);
    const paginationLabels = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <>
            {selectedFacility ?
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
                :
                <>
                    <Card>
                        <CardHeader>
                            <div className="md:flex gap-3 justify-between items-end mb-2 w-full">
                                <CardIntro
                                    title="Facilties"
                                    description="Manage all facilties across the zoos."
                                />
                                <div className="flex space-x-2">
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
                                            <TableHead>Location</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Features</TableHead>
                                            <TableHead>Last Maintainance</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-center text-main-darkFadedBlue">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="!text-sm">
                                        {filteredFacilities.length > 0 ? (
                                            facilities.map((facility: any, index: number) => (
                                                <TableRow key={index}>
                                                    {/* <TableCell>
                                                <Checkbox
                                                    value={selectedCourts.includes(court.Id)}
                                                    setter={(n, v) => toggleSelectcourt(court.Id)}
                                                    name="id"
                                                />
                                            </TableCell> */}
                                                    <TableCell>{facility.name}</TableCell>
                                                    <TableCell>{facility.location}</TableCell>
                                                    <TableCell>{facility.type}</TableCell>
                                                    <TableCell>{facility.features}</TableCell>
                                                    <TableCell>{changeDateFormat(facility.lastMaintenance)}</TableCell>
                                                    <TableCell>{facility.status}</TableCell>
                                                    <TableCell className="flex justify-center items-center space-x-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => {
                                                                setSelectedFacility(facility);
                                                                setIsEditingFacility(true);
                                                            }}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-destructive hover:text-destructive"
                                                            onClick={() => {
                                                                setSelectedFacility(facility);
                                                                setFacilityToDelete(facility);
                                                                setDeleteFacilityDialog(true);
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
                    </Card>
                </>
            }
        </>
    )
}