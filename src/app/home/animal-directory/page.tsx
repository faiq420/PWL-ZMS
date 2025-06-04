"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Filter, Plus, Search, Eye, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { AnimalDeleteDialog } from "@/components/animal/animal-delete-dialog";
import { toast } from "@/components/ui/use-toast";
import Heading from "@/components/utils/Headings/Heading";
import Subheading from "@/components/utils/Headings/Subheading";

// Mock data for demonstration
const animals = [
  {
    id: "african-elephant",
    name: "African Elephant",
    scientificName: "Loxodonta africana",
    category: "Mammals",
    conservationStatus: "Vulnerable",
    location: ["lahore-zoo", "bahawalpur-zoo"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "bengal-tiger",
    name: "Bengal Tiger",
    scientificName: "Panthera tigris tigris",
    category: "Mammals",
    conservationStatus: "Endangered",
    location: ["lahore-safari-park"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "giant-panda",
    name: "Giant Panda",
    scientificName: "Ailuropoda melanoleuca",
    category: "Mammals",
    conservationStatus: "Vulnerable",
    location: ["lahore-zoo"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "komodo-dragon",
    name: "Komodo Dragon",
    scientificName: "Varanus komodoensis",
    category: "Reptiles",
    conservationStatus: "Endangered",
    location: ["bahawalpur-zoo"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "blue-poison-dart-frog",
    name: "Blue Poison Dart Frog",
    scientificName: "Dendrobates azureus",
    category: "Amphibians",
    conservationStatus: "Least Concern",
    location: ["lahore-zoo"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "scarlet-macaw",
    name: "Scarlet Macaw",
    scientificName: "Ara macao",
    category: "Birds",
    conservationStatus: "Least Concern",
    location: ["lahore-safari-park"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "emperor-penguin",
    name: "Emperor Penguin",
    scientificName: "Aptenodytes forsteri",
    category: "Birds",
    conservationStatus: "Near Threatened",
    location: ["lahore-zoo"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "saltwater-crocodile",
    name: "Saltwater Crocodile",
    scientificName: "Crocodylus porosus",
    category: "Reptiles",
    conservationStatus: "Least Concern",
    location: ["bahawalpur-zoo"],
    image: "/placeholder.svg?height=200&width=200",
  },
];

export default function AnimalDirectoryPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [animalToDelete, setAnimalToDelete] = useState<string | null>(null);
  const [zoos, setZoos] = useState([
    { value: "lahore-zoo", label: "Lahore Zoo" },
    { value: "lahore-safari-park", label: "Lahore Safari Park" },
    { value: "bahawalpur-zoo", label: "Bahawalpur Zoo" },
  ]);

  const filteredAnimals = animals.filter((animal) => {
    const matchesSearch =
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.scientificName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeTab === "all" ||
      animal.category.toLowerCase() === activeTab.toLowerCase();

    const matchesEndangered =
      activeTab === "endangered"
        ? ["Endangered", "Critically Endangered"].includes(
            animal.conservationStatus
          )
        : true;

    const matchesLocation =
      selectedCategory == "all" ||
      animal.location.some((location) => selectedCategory == location);
    return (
      matchesSearch && matchesCategory && matchesEndangered && matchesLocation
    );
  });

  const handleDelete = (animalId: string) => {
    // In a real app, delete from API
    toast({
      title: "Animal deleted",
      description: `The animal has been removed from the directory.`,
    });
    setAnimalToDelete(null);
    // Would refresh data here
  };

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Animal Directory</h2>
        <Button
          className="bg-green-700 hover:bg-green-800"
          onClick={() => router.push("/home/animal-directory/new")}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Animal
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search animals..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Zoos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {zoos.map((zoo: any, index: number) => (
                <SelectItem key={index} value={zoo.value}>
                  {zoo.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="all">All Animals</TabsTrigger>
          <TabsTrigger value="mammals">Mammals</TabsTrigger>
          <TabsTrigger value="birds">Birds</TabsTrigger>
          <TabsTrigger value="reptiles">Reptiles</TabsTrigger>
          <TabsTrigger value="endangered">Endangered</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredAnimals.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredAnimals.map((animal) => (
                <Card key={animal.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={animal.image || "/placeholder.svg"}
                      alt={animal.name}
                      fill
                      className="object-cover"
                    />
                    {/* <div
                      className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                        animal.conservationStatus === "Endangered" ||
                        animal.conservationStatus === "Critically Endangered"
                          ? "bg-red-100 text-red-800"
                          : animal.conservationStatus === "Vulnerable"
                          ? "bg-amber-100 text-amber-800"
                          : animal.conservationStatus === "Near Threatened"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {animal.conservationStatus}
                    </div> */}
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle>
                      <Subheading text={animal.name} />
                    </CardTitle>
                    <CardDescription className="italic font-syne">
                      {animal.scientificName}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 font-syne">
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Category:</span>
                        <span>{animal.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span>
                          {/* {animal.location.length} Zoo
                          {animal.location.length !== 1 ? "s" : ""} */}
                          {animal.location.join(", ")}
                        </span>
                      </div>
                      <div className="flex items-center text-sm mt-2">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Feeding Time: 2:00 PM</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(`/home/animal-directory/${animal.id}`)
                      }
                    >
                      <Eye className="mr-1 h-4 w-4" /> View
                    </Button>
                    <div className="flex space-x-2">
                      {/* <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          router.push(
                            `/home/animal-directory/${animal.id}?edit=true`
                          )
                        }
                      >
                        <Edit className="mr-1 h-4 w-4" /> Edit
                      </Button> */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => setAnimalToDelete(animal.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                No animals found matching your criteria.
              </p>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <AnimalDeleteDialog
        open={!!animalToDelete}
        onOpenChange={(open) => !open && setAnimalToDelete(null)}
        onConfirm={() => animalToDelete && handleDelete(animalToDelete)}
        animalName={
          animalToDelete
            ? animals.find((a) => a.id === animalToDelete)?.name || ""
            : ""
        }
      />
    </div>
  );
}
