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
import Checkbox from "@/components/utils/FormElements/Checkbox";

interface Prop {
    searchQuery: string;
}

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

export default function FirstAidTab({ searchQuery }: Prop) {
    const [sortOrder, setSortOrder] = useState("name-asc");
    const [checkFirstAid, setCheckFirstAid] = useState<number[]>([])
    const [firstAid, setFirstAid] = useState(initialFirstAid);
    const [selectedFirstAid, setSelectedFirstAid] = useState<any>(null);
    const [isAddingFirstAid, setIsAddingFirstAid] = useState(false);
    const [isEditingFirstAid, setIsEditingFirstAid] = useState(false);
    const [deleteFirstAidDialog, setDeleteFirstAidDialog] = useState(false);
    const [firstAidToDelete, setFirstAidToDelete] = useState<any>(null);

    const [firstAidForm, setFirstAidForm] = useState({
        name: "",
        location: "",
        status: "operational",
        staffed: true,
        staffingHours: "",
        equipment: "",
        description: "",
    });

    const filteredFirstAid = firstAid.filter(
        (station) =>
            station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            station.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

    // Sort Courts based on selected sort order
    const sortedFirstAid = [...filteredFirstAid].sort((a, b) => {
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
    const currentPosts = sortedFirstAid.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(firstAid.length / postsPerPage);
    const paginationLabels = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Toggle
    const toggleSelectFirstAid = (fId: number) => {
        setCheckFirstAid((prev) =>
            prev.includes(fId)
                ? prev.filter((id) => id !== fId)
                : [...prev, fId]
        );
    };

    const toggleSelectAll = () => {
        if (checkFirstAid.length === filteredFirstAid.length) {
            console.log("Select All If Condition")
            setCheckFirstAid([]);
        } else {
            setCheckFirstAid(filteredFirstAid.map((aid: any) => aid.id));
        }
    };

    return (
        <>
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
                <Card>
                    <CardHeader>
                        <div className="md:flex gap-3 justify-between items-end mb-2 w-full">
                            <CardIntro
                                title="First Aid"
                                description="Manage all first aid across the zoos."
                            />
                            <div className="flex space-x-2">
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
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {checkFirstAid.length > 0 && (
                            <div className="flex items-center gap-2 p-2 bg-main-frostyBlue/10 rounded-md">
                                <span className="text-sm text-main-darkFadedBlue">
                                    {checkFirstAid.length} First Aid
                                    {checkFirstAid.length > 1 ? "s" : ""} Selected
                                </span>
                                <div className="flex-1"></div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-red-500 text-red-500 hover:bg-red-50"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </Button>
                            </div>
                        )}
                        <div className="border rounded-md">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-main-frostyBlue/5">
                                        <TableHead className="w-12">
                                            <Checkbox
                                                value={
                                                    checkFirstAid.length === filteredFirstAid.length &&
                                                    filteredFirstAid.length > 0
                                                }
                                                setter={toggleSelectAll}
                                                name=""
                                            />
                                        </TableHead>
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
                                        <TableHead>Staffed</TableHead>
                                        <TableHead>Hours</TableHead>
                                        <TableHead>Equipment</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-center text-main-darkFadedBlue">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="!text-sm">
                                    {currentPosts.length > 0 ? (
                                        currentPosts.map((aid: any, index: number) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Checkbox
                                                        value={checkFirstAid.includes(aid.id)}
                                                        setter={(n, v) => toggleSelectFirstAid(aid.id)}
                                                        name="id"
                                                    />
                                                </TableCell>
                                                <TableCell>{aid.name}</TableCell>
                                                <TableCell>{aid.location}</TableCell>
                                                <TableCell>{aid.staffed ? "Yes" : "No"}</TableCell>
                                                <TableCell>{aid.staffingHours}</TableCell>
                                                <TableCell>{aid.equipment}</TableCell>
                                                <TableCell>{aid.status}</TableCell>
                                                <TableCell className="flex justify-center items-center space-x-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => {
                                                            setSelectedFirstAid(aid);
                                                            setIsEditingFirstAid(true);
                                                        }}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-destructive hover:text-destructive"
                                                        onClick={() => {
                                                            setSelectedFirstAid(aid);
                                                            setFirstAidToDelete(aid);
                                                            setDeleteFirstAidDialog(true);
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
                                                No First Aids Found!
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
            )
            }

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
        </>
    )
}