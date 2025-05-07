"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Search, Coffee, Store, Edit, Trash2, ChevronRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Sample data for canteens
const initialCanteens = [
  {
    id: "canteen-1",
    name: "Safari Food Court",
    location: "Main Entrance",
    status: "open",
    capacity: 200,
    openingHours: "9:00 AM - 6:00 PM",
    description: "A large food court offering a variety of dining options near the main entrance.",
    restaurants: [
      {
        id: "rest-1",
        name: "Jungle Grill",
        cuisine: "BBQ & Grill",
        priceRange: "$$",
        status: "open",
        description: "Specializing in grilled meats and vegetables with safari-inspired flavors.",
      },
      {
        id: "rest-2",
        name: "Savanna Sips",
        cuisine: "Beverages & Snacks",
        priceRange: "$",
        status: "open",
        description: "Coffee, smoothies, and light snacks with a view of the entrance plaza.",
      },
    ],
  },
  {
    id: "canteen-2",
    name: "Rainforest Retreat",
    location: "Tropical Zone",
    status: "open",
    capacity: 150,
    openingHours: "10:00 AM - 5:00 PM",
    description: "A themed dining area surrounded by lush tropical plants and water features.",
    restaurants: [
      {
        id: "rest-3",
        name: "Tropical Tastes",
        cuisine: "Asian Fusion",
        priceRange: "$$",
        status: "open",
        description: "Pan-Asian cuisine featuring fresh ingredients and tropical flavors.",
      },
      {
        id: "rest-4",
        name: "Bamboo Bites",
        cuisine: "Vegetarian & Vegan",
        priceRange: "$$",
        status: "closed",
        description: "Plant-based meals and snacks in an eco-friendly setting.",
      },
    ],
  },
  {
    id: "canteen-3",
    name: "Arctic Eats",
    location: "Polar Exhibit",
    status: "closed",
    capacity: 100,
    openingHours: "11:00 AM - 4:00 PM",
    description: "A cool, climate-controlled dining area near the polar animal exhibits.",
    restaurants: [
      {
        id: "rest-5",
        name: "Frozen Delights",
        cuisine: "Ice Cream & Desserts",
        priceRange: "$",
        status: "closed",
        description: "Specialty ice creams, frozen yogurts, and cold treats.",
      },
    ],
  },
]

export function FoodAndDining() {
  const [canteens, setCanteens] = useState(initialCanteens)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCanteen, setSelectedCanteen] = useState<any>(null)
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null)
  const [isAddingCanteen, setIsAddingCanteen] = useState(false)
  const [isEditingCanteen, setIsEditingCanteen] = useState(false)
  const [isAddingRestaurant, setIsAddingRestaurant] = useState(false)
  const [isEditingRestaurant, setIsEditingRestaurant] = useState(false)
  const [deleteCanteenDialog, setDeleteCanteenDialog] = useState(false)
  const [deleteRestaurantDialog, setDeleteRestaurantDialog] = useState(false)
  const [canteenToDelete, setCanteenToDelete] = useState<any>(null)
  const [restaurantToDelete, setRestaurantToDelete] = useState<any>(null)

  // Form states
  const [canteenForm, setCanteenForm] = useState({
    name: "",
    location: "",
    capacity: "",
    openingHours: "",
    description: "",
    status: "open",
  })

  const [restaurantForm, setRestaurantForm] = useState({
    name: "",
    cuisine: "",
    priceRange: "$",
    description: "",
    status: "open",
  })

  // Filter canteens based on search query
  const filteredCanteens = canteens.filter(
    (canteen) =>
      canteen.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      canteen.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle canteen form submission
  const handleCanteenSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isEditingCanteen && selectedCanteen) {
      // Update existing canteen
      const updatedCanteens = canteens.map((canteen) =>
        canteen.id === selectedCanteen.id
          ? {
              ...canteen,
              name: canteenForm.name,
              location: canteenForm.location,
              capacity: Number.parseInt(canteenForm.capacity),
              openingHours: canteenForm.openingHours,
              description: canteenForm.description,
              status: canteenForm.status,
            }
          : canteen,
      )
      setCanteens(updatedCanteens)
      setSelectedCanteen({
        ...selectedCanteen,
        name: canteenForm.name,
        location: canteenForm.location,
        capacity: Number.parseInt(canteenForm.capacity),
        openingHours: canteenForm.openingHours,
        description: canteenForm.description,
        status: canteenForm.status,
      })
    } else {
      // Add new canteen
      const newCanteen = {
        id: `canteen-${Date.now()}`,
        name: canteenForm.name,
        location: canteenForm.location,
        capacity: Number.parseInt(canteenForm.capacity),
        openingHours: canteenForm.openingHours,
        description: canteenForm.description,
        status: canteenForm.status,
        restaurants: [],
      }
      setCanteens([...canteens, newCanteen])
    }

    // Reset form and state
    setCanteenForm({
      name: "",
      location: "",
      capacity: "",
      openingHours: "",
      description: "",
      status: "open",
    })
    setIsAddingCanteen(false)
    setIsEditingCanteen(false)
  }

  // Handle restaurant form submission
  const handleRestaurantSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isEditingRestaurant && selectedRestaurant && selectedCanteen) {
      // Update existing restaurant
      const updatedCanteens = canteens.map((canteen) => {
        if (canteen.id === selectedCanteen.id) {
          const updatedRestaurants = canteen.restaurants.map((restaurant) =>
            restaurant.id === selectedRestaurant.id
              ? {
                  ...restaurant,
                  name: restaurantForm.name,
                  cuisine: restaurantForm.cuisine,
                  priceRange: restaurantForm.priceRange,
                  description: restaurantForm.description,
                  status: restaurantForm.status,
                }
              : restaurant,
          )
          return { ...canteen, restaurants: updatedRestaurants }
        }
        return canteen
      })

      setCanteens(updatedCanteens)

      // Update selected canteen and restaurant
      const updatedRestaurants = selectedCanteen.restaurants.map((restaurant) =>
        restaurant.id === selectedRestaurant.id
          ? {
              ...restaurant,
              name: restaurantForm.name,
              cuisine: restaurantForm.cuisine,
              priceRange: restaurantForm.priceRange,
              description: restaurantForm.description,
              status: restaurantForm.status,
            }
          : restaurant,
      )

      setSelectedCanteen({ ...selectedCanteen, restaurants: updatedRestaurants })
      setSelectedRestaurant({
        ...selectedRestaurant,
        name: restaurantForm.name,
        cuisine: restaurantForm.cuisine,
        priceRange: restaurantForm.priceRange,
        description: restaurantForm.description,
        status: restaurantForm.status,
      })
    } else if (selectedCanteen) {
      // Add new restaurant
      const newRestaurant = {
        id: `rest-${Date.now()}`,
        name: restaurantForm.name,
        cuisine: restaurantForm.cuisine,
        priceRange: restaurantForm.priceRange,
        description: restaurantForm.description,
        status: restaurantForm.status,
      }

      const updatedCanteens = canteens.map((canteen) =>
        canteen.id === selectedCanteen.id
          ? { ...canteen, restaurants: [...canteen.restaurants, newRestaurant] }
          : canteen,
      )

      setCanteens(updatedCanteens)
      setSelectedCanteen({
        ...selectedCanteen,
        restaurants: [...selectedCanteen.restaurants, newRestaurant],
      })
    }

    // Reset form and state
    setRestaurantForm({
      name: "",
      cuisine: "",
      priceRange: "$",
      description: "",
      status: "open",
    })
    setIsAddingRestaurant(false)
    setIsEditingRestaurant(false)
  }

  // Handle edit canteen
  const handleEditCanteen = (canteen) => {
    setCanteenForm({
      name: canteen.name,
      location: canteen.location,
      capacity: canteen.capacity.toString(),
      openingHours: canteen.openingHours,
      description: canteen.description,
      status: canteen.status,
    })
    setIsEditingCanteen(true)
  }

  // Handle edit restaurant
  const handleEditRestaurant = (restaurant) => {
    setRestaurantForm({
      name: restaurant.name,
      cuisine: restaurant.cuisine,
      priceRange: restaurant.priceRange,
      description: restaurant.description,
      status: restaurant.status,
    })
    setIsEditingRestaurant(true)
  }

  // Handle delete canteen
  const handleDeleteCanteen = () => {
    if (canteenToDelete) {
      const updatedCanteens = canteens.filter((canteen) => canteen.id !== canteenToDelete.id)
      setCanteens(updatedCanteens)

      if (selectedCanteen && selectedCanteen.id === canteenToDelete.id) {
        setSelectedCanteen(null)
      }
    }
    setDeleteCanteenDialog(false)
    setCanteenToDelete(null)
  }

  // Handle delete restaurant
  const handleDeleteRestaurant = () => {
    if (restaurantToDelete && selectedCanteen) {
      const updatedCanteens = canteens.map((canteen) => {
        if (canteen.id === selectedCanteen.id) {
          const updatedRestaurants = canteen.restaurants.filter((restaurant) => restaurant.id !== restaurantToDelete.id)
          return { ...canteen, restaurants: updatedRestaurants }
        }
        return canteen
      })

      setCanteens(updatedCanteens)

      if (selectedCanteen) {
        const updatedRestaurants = selectedCanteen.restaurants.filter(
          (restaurant) => restaurant.id !== restaurantToDelete.id,
        )
        setSelectedCanteen({ ...selectedCanteen, restaurants: updatedRestaurants })
      }

      if (selectedRestaurant && selectedRestaurant.id === restaurantToDelete.id) {
        setSelectedRestaurant(null)
      }
    }
    setDeleteRestaurantDialog(false)
    setRestaurantToDelete(null)
  }

  // Render canteen list view
  if (!selectedCanteen) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search canteens..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog open={isAddingCanteen} onOpenChange={setIsAddingCanteen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Canteen
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleCanteenSubmit}>
                <DialogHeader>
                  <DialogTitle>Add New Canteen</DialogTitle>
                  <DialogDescription>Create a new food court or canteen area in the zoo.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={canteenForm.name}
                      onChange={(e) => setCanteenForm({ ...canteenForm, name: e.target.value })}
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
                      value={canteenForm.location}
                      onChange={(e) => setCanteenForm({ ...canteenForm, location: e.target.value })}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="capacity" className="text-right">
                      Capacity
                    </Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={canteenForm.capacity}
                      onChange={(e) => setCanteenForm({ ...canteenForm, capacity: e.target.value })}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="hours" className="text-right">
                      Hours
                    </Label>
                    <Input
                      id="hours"
                      value={canteenForm.openingHours}
                      onChange={(e) => setCanteenForm({ ...canteenForm, openingHours: e.target.value })}
                      className="col-span-3"
                      placeholder="e.g. 9:00 AM - 6:00 PM"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select
                      value={canteenForm.status}
                      onValueChange={(value) => setCanteenForm({ ...canteenForm, status: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={canteenForm.description}
                      onChange={(e) => setCanteenForm({ ...canteenForm, description: e.target.value })}
                      className="col-span-3"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Canteen</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCanteens.length > 0 ? (
            filteredCanteens.map((canteen) => (
              <Card key={canteen.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{canteen.name}</CardTitle>
                    <Badge
                      variant={
                        canteen.status === "open"
                          ? "success"
                          : canteen.status === "maintenance"
                            ? "warning"
                            : "destructive"
                      }
                    >
                      {canteen.status.charAt(0).toUpperCase() + canteen.status.slice(1)}
                    </Badge>
                  </div>
                  <CardDescription>{canteen.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Capacity:</span>
                      <span>{canteen.capacity} seats</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Hours:</span>
                      <span>{canteen.openingHours}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Restaurants:</span>
                      <span>{canteen.restaurants.length}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => setSelectedCanteen(canteen)}>
                    View Details
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <div className="flex space-x-2">
                    <Dialog
                      open={isEditingCanteen && selectedCanteen?.id === canteen.id}
                      onOpenChange={(open) => {
                        setIsEditingCanteen(open)
                        if (open) setSelectedCanteen(canteen)
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <form onSubmit={handleCanteenSubmit}>
                          <DialogHeader>
                            <DialogTitle>Edit Canteen</DialogTitle>
                            <DialogDescription>Update the details for this canteen.</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-name" className="text-right">
                                Name
                              </Label>
                              <Input
                                id="edit-name"
                                value={canteenForm.name}
                                onChange={(e) => setCanteenForm({ ...canteenForm, name: e.target.value })}
                                className="col-span-3"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-location" className="text-right">
                                Location
                              </Label>
                              <Input
                                id="edit-location"
                                value={canteenForm.location}
                                onChange={(e) => setCanteenForm({ ...canteenForm, location: e.target.value })}
                                className="col-span-3"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-capacity" className="text-right">
                                Capacity
                              </Label>
                              <Input
                                id="edit-capacity"
                                type="number"
                                value={canteenForm.capacity}
                                onChange={(e) => setCanteenForm({ ...canteenForm, capacity: e.target.value })}
                                className="col-span-3"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-hours" className="text-right">
                                Hours
                              </Label>
                              <Input
                                id="edit-hours"
                                value={canteenForm.openingHours}
                                onChange={(e) => setCanteenForm({ ...canteenForm, openingHours: e.target.value })}
                                className="col-span-3"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-status" className="text-right">
                                Status
                              </Label>
                              <Select
                                value={canteenForm.status}
                                onValueChange={(value) => setCanteenForm({ ...canteenForm, status: value })}
                              >
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="open">Open</SelectItem>
                                  <SelectItem value="closed">Closed</SelectItem>
                                  <SelectItem value="maintenance">Maintenance</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-description" className="text-right">
                                Description
                              </Label>
                              <Textarea
                                id="edit-description"
                                value={canteenForm.description}
                                onChange={(e) => setCanteenForm({ ...canteenForm, description: e.target.value })}
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
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setCanteenToDelete(canteen)
                        setDeleteCanteenDialog(true)
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
                <Store className="mx-auto h-10 w-10 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-semibold">No canteens found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {searchQuery ? "Try a different search term" : "Get started by adding a new canteen"}
                </p>
              </div>
            </div>
          )}
        </div>

        <AlertDialog open={deleteCanteenDialog} onOpenChange={setDeleteCanteenDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the canteen "{canteenToDelete?.name}" and all its restaurants. This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteCanteen} className="bg-destructive text-destructive-foreground">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    )
  }

  // Render canteen detail view with restaurants
  if (selectedCanteen && !selectedRestaurant) {
    return (
      <div className="space-y-4">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => setSelectedCanteen(null)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Canteens
          </Button>
        </div>

        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">{selectedCanteen.name}</h2>
            <p className="text-muted-foreground">{selectedCanteen.location}</p>
          </div>
          <div className="flex space-x-2">
            <Dialog open={isEditingCanteen} onOpenChange={setIsEditingCanteen}>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={() => handleEditCanteen(selectedCanteen)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Canteen
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleCanteenSubmit}>
                  <DialogHeader>
                    <DialogTitle>Edit Canteen</DialogTitle>
                    <DialogDescription>Update the details for this canteen.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="edit-name"
                        value={canteenForm.name}
                        onChange={(e) => setCanteenForm({ ...canteenForm, name: e.target.value })}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-location" className="text-right">
                        Location
                      </Label>
                      <Input
                        id="edit-location"
                        value={canteenForm.location}
                        onChange={(e) => setCanteenForm({ ...canteenForm, location: e.target.value })}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-capacity" className="text-right">
                        Capacity
                      </Label>
                      <Input
                        id="edit-capacity"
                        type="number"
                        value={canteenForm.capacity}
                        onChange={(e) => setCanteenForm({ ...canteenForm, capacity: e.target.value })}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-hours" className="text-right">
                        Hours
                      </Label>
                      <Input
                        id="edit-hours"
                        value={canteenForm.openingHours}
                        onChange={(e) => setCanteenForm({ ...canteenForm, openingHours: e.target.value })}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-status" className="text-right">
                        Status
                      </Label>
                      <Select
                        value={canteenForm.status}
                        onValueChange={(value) => setCanteenForm({ ...canteenForm, status: value })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="edit-description"
                        value={canteenForm.description}
                        onChange={(e) => setCanteenForm({ ...canteenForm, description: e.target.value })}
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
                setCanteenToDelete(selectedCanteen)
                setDeleteCanteenDialog(true)
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Canteen
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Canteen Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <Badge
                  className="mt-1"
                  variant={
                    selectedCanteen.status === "open"
                      ? "success"
                      : selectedCanteen.status === "maintenance"
                        ? "warning"
                        : "destructive"
                  }
                >
                  {selectedCanteen.status.charAt(0).toUpperCase() + selectedCanteen.status.slice(1)}
                </Badge>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                <p className="mt-1">{selectedCanteen.location}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Capacity</h3>
                <p className="mt-1">{selectedCanteen.capacity} seats</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Opening Hours</h3>
                <p className="mt-1">{selectedCanteen.openingHours}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                <p className="mt-1">{selectedCanteen.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Restaurants</h3>
          <Dialog open={isAddingRestaurant} onOpenChange={setIsAddingRestaurant}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Restaurant
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleRestaurantSubmit}>
                <DialogHeader>
                  <DialogTitle>Add New Restaurant</DialogTitle>
                  <DialogDescription>Add a new restaurant to {selectedCanteen.name}.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="rest-name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="rest-name"
                      value={restaurantForm.name}
                      onChange={(e) => setRestaurantForm({ ...restaurantForm, name: e.target.value })}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="cuisine" className="text-right">
                      Cuisine
                    </Label>
                    <Input
                      id="cuisine"
                      value={restaurantForm.cuisine}
                      onChange={(e) => setRestaurantForm({ ...restaurantForm, cuisine: e.target.value })}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Price Range
                    </Label>
                    <Select
                      value={restaurantForm.priceRange}
                      onValueChange={(value) => setRestaurantForm({ ...restaurantForm, priceRange: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select price range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="$">$ (Budget)</SelectItem>
                        <SelectItem value="$$">$$ (Moderate)</SelectItem>
                        <SelectItem value="$$$">$$$ (Expensive)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="rest-status" className="text-right">
                      Status
                    </Label>
                    <Select
                      value={restaurantForm.status}
                      onValueChange={(value) => setRestaurantForm({ ...restaurantForm, status: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                        <SelectItem value="renovation">Renovation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="rest-description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="rest-description"
                      value={restaurantForm.description}
                      onChange={(e) => setRestaurantForm({ ...restaurantForm, description: e.target.value })}
                      className="col-span-3"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Restaurant</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {selectedCanteen.restaurants.length > 0 ? (
            selectedCanteen.restaurants.map((restaurant) => (
              <Card key={restaurant.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                    <Badge
                      variant={
                        restaurant.status === "open"
                          ? "success"
                          : restaurant.status === "renovation"
                            ? "warning"
                            : "destructive"
                      }
                    >
                      {restaurant.status.charAt(0).toUpperCase() + restaurant.status.slice(1)}
                    </Badge>
                  </div>
                  <CardDescription>{restaurant.cuisine}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Price Range:</span>
                      <span>{restaurant.priceRange}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{restaurant.description}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => setSelectedRestaurant(restaurant)}>
                    View Details
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <div className="flex space-x-2">
                    <Dialog
                      open={isEditingRestaurant && selectedRestaurant?.id === restaurant.id}
                      onOpenChange={(open) => {
                        setIsEditingRestaurant(open)
                        if (open) setSelectedRestaurant(restaurant)
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <form onSubmit={handleRestaurantSubmit}>
                          <DialogHeader>
                            <DialogTitle>Edit Restaurant</DialogTitle>
                            <DialogDescription>Update the details for this restaurant.</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-rest-name" className="text-right">
                                Name
                              </Label>
                              <Input
                                id="edit-rest-name"
                                value={restaurantForm.name}
                                onChange={(e) => setRestaurantForm({ ...restaurantForm, name: e.target.value })}
                                className="col-span-3"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-cuisine" className="text-right">
                                Cuisine
                              </Label>
                              <Input
                                id="edit-cuisine"
                                value={restaurantForm.cuisine}
                                onChange={(e) => setRestaurantForm({ ...restaurantForm, cuisine: e.target.value })}
                                className="col-span-3"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-price" className="text-right">
                                Price Range
                              </Label>
                              <Select
                                value={restaurantForm.priceRange}
                                onValueChange={(value) => setRestaurantForm({ ...restaurantForm, priceRange: value })}
                              >
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Select price range" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="$">$ (Budget)</SelectItem>
                                  <SelectItem value="$$">$$ (Moderate)</SelectItem>
                                  <SelectItem value="$$$">$$$ (Expensive)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-rest-status" className="text-right">
                                Status
                              </Label>
                              <Select
                                value={restaurantForm.status}
                                onValueChange={(value) => setRestaurantForm({ ...restaurantForm, status: value })}
                              >
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="open">Open</SelectItem>
                                  <SelectItem value="closed">Closed</SelectItem>
                                  <SelectItem value="renovation">Renovation</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-rest-description" className="text-right">
                                Description
                              </Label>
                              <Textarea
                                id="edit-rest-description"
                                value={restaurantForm.description}
                                onChange={(e) => setRestaurantForm({ ...restaurantForm, description: e.target.value })}
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
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setRestaurantToDelete(restaurant)
                        setDeleteRestaurantDialog(true)
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
                <Coffee className="mx-auto h-10 w-10 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-semibold">No restaurants found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Get started by adding a new restaurant to this canteen
                </p>
              </div>
            </div>
          )}
        </div>

        <AlertDialog open={deleteCanteenDialog} onOpenChange={setDeleteCanteenDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the canteen "{canteenToDelete?.name}" and all its restaurants. This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteCanteen} className="bg-destructive text-destructive-foreground">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={deleteRestaurantDialog} onOpenChange={setDeleteRestaurantDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the restaurant "{restaurantToDelete?.name}". This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteRestaurant}
                className="bg-destructive text-destructive-foreground"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    )
  }

  // Render restaurant detail view
  if (selectedCanteen && selectedRestaurant) {
    return (
      <div className="space-y-4">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => setSelectedRestaurant(null)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {selectedCanteen.name}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">{selectedRestaurant.name}</h2>
            <p className="text-muted-foreground">{selectedRestaurant.cuisine}</p>
          </div>
          <div className="flex space-x-2">
            <Dialog open={isEditingRestaurant} onOpenChange={setIsEditingRestaurant}>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={() => handleEditRestaurant(selectedRestaurant)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Restaurant
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleRestaurantSubmit}>
                  <DialogHeader>
                    <DialogTitle>Edit Restaurant</DialogTitle>
                    <DialogDescription>Update the details for this restaurant.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-rest-name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="edit-rest-name"
                        value={restaurantForm.name}
                        onChange={(e) => setRestaurantForm({ ...restaurantForm, name: e.target.value })}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-cuisine" className="text-right">
                        Cuisine
                      </Label>
                      <Input
                        id="edit-cuisine"
                        value={restaurantForm.cuisine}
                        onChange={(e) => setRestaurantForm({ ...restaurantForm, cuisine: e.target.value })}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-price" className="text-right">
                        Price Range
                      </Label>
                      <Select
                        value={restaurantForm.priceRange}
                        onValueChange={(value) => setRestaurantForm({ ...restaurantForm, priceRange: value })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select price range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="$">$ (Budget)</SelectItem>
                          <SelectItem value="$$">$$ (Moderate)</SelectItem>
                          <SelectItem value="$$$">$$$ (Expensive)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-rest-status" className="text-right">
                        Status
                      </Label>
                      <Select
                        value={restaurantForm.status}
                        onValueChange={(value) => setRestaurantForm({ ...restaurantForm, status: value })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                          <SelectItem value="renovation">Renovation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-rest-description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="edit-rest-description"
                        value={restaurantForm.description}
                        onChange={(e) => setRestaurantForm({ ...restaurantForm, description: e.target.value })}
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
                setRestaurantToDelete(selectedRestaurant)
                setDeleteRestaurantDialog(true)
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Restaurant
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Restaurant Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <Badge
                  className="mt-1"
                  variant={
                    selectedRestaurant.status === "open"
                      ? "success"
                      : selectedRestaurant.status === "renovation"
                        ? "warning"
                        : "destructive"
                  }
                >
                  {selectedRestaurant.status.charAt(0).toUpperCase() + selectedRestaurant.status.slice(1)}
                </Badge>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Cuisine</h3>
                <p className="mt-1">{selectedRestaurant.cuisine}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Price Range</h3>
                <p className="mt-1">{selectedRestaurant.priceRange}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                <p className="mt-1">
                  {selectedCanteen.name}, {selectedCanteen.location}
                </p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                <p className="mt-1">{selectedRestaurant.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <AlertDialog open={deleteRestaurantDialog} onOpenChange={setDeleteRestaurantDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the restaurant "{restaurantToDelete?.name}". This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteRestaurant}
                className="bg-destructive text-destructive-foreground"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    )
  }
}
