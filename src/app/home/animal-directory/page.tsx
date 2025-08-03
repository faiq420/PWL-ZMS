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
import {
  Clock,
  Filter,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  ArrowUpDown,
} from "lucide-react";
import Image from "next/image";
import { AnimalDeleteDialog } from "@/components/animal/animal-delete-dialog";
import { toast } from "@/components/ui/use-toast";
import Heading from "@/components/utils/Headings/Heading";
import Subheading from "@/components/utils/Headings/Subheading";
import SectionIntro from "@/components/utils/Headings/SectionIntro";
import ButtonComp from "@/components/utils/Button";
import SearchTag from "@/components/utils/FormElements/SearchTag";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import CardIntro from "@/components/utils/Headings/CardIntro";

export default function AnimalDirectoryPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [animalToDelete, setAnimalToDelete] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [zoos, setZoos] = useState([
    { value: "lahore-zoo", label: "Lahore Zoo" },
    { value: "lahore-safari-park", label: "Lahore Safari Park" },
    { value: "bahawalpur-zoo", label: "Bahawalpur Zoo" },
  ]);
  const [animals, setAnimals] = useState([
    {
      id: "african-elephant",
      name: "African Elephant",
      scientificName: "Loxodonta africana",
      category: "Mammals",
      conservationStatus: "Vulnerable",
      location: ["lahore-zoo", "bahawalpur-zoo"],
      enclosure: "Elephant Savannah",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "bengal-tiger",
      name: "Bengal Tiger",
      scientificName: "Panthera tigris tigris",
      category: "Mammals",
      conservationStatus: "Endangered",
      location: ["lahore-safari-park"],
      enclosure: "Tiger's Den",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "giant-panda",
      name: "Giant Panda",
      scientificName: "Ailuropoda melanoleuca",
      category: "Mammals",
      conservationStatus: "Vulnerable",
      location: ["lahore-zoo"],
      enclosure: "Bamboo Forest",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "komodo-dragon",
      name: "Komodo Dragon",
      scientificName: "Varanus komodoensis",
      category: "Reptiles",
      conservationStatus: "Endangered",
      location: ["bahawalpur-zoo"],
      enclosure: "The Grassland",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "blue-poison-dart-frog",
      name: "Blue Poison Dart Frog",
      scientificName: "Dendrobates azureus",
      category: "Amphibians",
      conservationStatus: "Least Concern",
      location: ["lahore-zoo"],
      enclosure: "Eye Pond",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "scarlet-macaw",
      name: "Scarlet Macaw",
      scientificName: "Ara macao",
      category: "Birds",
      conservationStatus: "Least Concern",
      location: ["lahore-safari-park"],
      enclosure: "Bird's Sanctuary",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "emperor-penguin",
      name: "Emperor Penguin",
      scientificName: "Aptenodytes forsteri",
      category: "Birds",
      conservationStatus: "Near Threatened",
      location: ["lahore-zoo"],
      enclosure: "Iceland",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "saltwater-crocodile",
      name: "Saltwater Crocodile",
      scientificName: "Crocodylus porosus",
      category: "Reptiles",
      conservationStatus: "Least Concern",
      location: ["bahawalpur-zoo"],
      enclosure: "The Nile",
      image: "/placeholder.svg?height=200&width=200",
    },
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

  const sortedAnimals = [...filteredAnimals].sort((a, b) => {
    switch (sortOrder) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  /////////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedAnimals.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(animals.length / postsPerPage);
  const paginationLabels = Array.from({ length: totalPages }, (_, i) => i + 1);

  /////////////////////////////////////

  const handleDelete = (animalId: string) => {
    // In a real app, delete from API
    setAnimals(animals.filter((x) => x.id != animalId));
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
        <SectionIntro
          title="Animal Directory"
          description="Explore and manage the animal directory."
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <SearchTag
          setter={setSearchTerm}
          value={searchTerm}
          placeHolder="Search animals..."
        />
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[165px]">
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
      <Card>
        <CardHeader>
          <div className="md:flex gap-3 justify-between items-end mb-2 w-full">
            <CardIntro
              title="Wildlife Management"
              description="Manage all animals throughout the zoos."
            />

            <div className="w-fit">
              <ButtonComp
                type={"dark"}
                clickEvent={() => {
                  router.push("/home/animal-directory/new");
                }}
                text="Add Animal"
                beforeIcon={<Plus className=" h-4 w-4" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow className="bg-main-frostyBlue/5">
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
                  <TableHead>Category</TableHead>
                  <TableHead>Enclosure</TableHead>
                  <TableHead>Zoo</TableHead>
                  <TableHead className="text-center text-main-darkFadedBlue">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="!text-sm">
                {currentPosts.length > 0 ? (
                  currentPosts.map((animal: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{animal.name}</TableCell>
                      <TableCell>{animal.category}</TableCell>
                      <TableCell>{animal.enclosure}</TableCell>
                      <TableCell>{animal.location.join(", ")}</TableCell>
                      <TableCell className="text-right flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            router.push(`/home/animal-directory/${animal.id}`);
                          }}
                        >
                          <Eye className="text-black h-4 w-4 cursor-pointer" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            router.push(
                              `/home/animal-directory/${animal.id}?edit=true`
                            );
                          }}
                        >
                          <Edit className="text-black h-4 w-4 cursor-pointer" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setAnimalToDelete(animal.id);
                          }}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center text-main-gray"
                    >
                      No animals found.
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
                      className={`${
                        currentPage == label && "bg-main-gray"
                      }  text-main-secondaryText cursor-pointer`}
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
