"use client";
import { DeleteConfirmationDialog } from "@/components/digital-guide/delete-confirmation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import ButtonComp from "@/components/utils/Button";
import CardIntro from "@/components/utils/Headings/CardIntro";

import { Edit, Info, PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const FeaturedAnimalsTable = () => {
  const { toast } = useToast();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [deleteType, setDeleteType] = useState<"animal" | "schedule">("animal");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [featuredAnimals, setFeaturedAnimals] = useState([
    {
      id: 1,
      name: "Sumatran Tiger",
      scientificName: "Panthera tigris sumatrae",
      image: "/placeholder.svg?height=400&width=600",
      description:
        "The Sumatran tiger is a rare tiger subspecies that inhabits the Indonesian island of Sumatra. They are the smallest of all tiger subspecies, with males weighing between 100-140 kg and females 75-110 kg.",
      conservationStatus: "Critically Endangered",
      location: "Asian Forest Zone - Exhibit 12",
      feedingTimes: "11:00 AM & 3:30 PM",
      keeperTalk: "2:00 PM (Tiger Conservation)",
      featured: true,
      featuredUntil: "2023-06-30",
    },
    {
      id: 2,
      name: "Red Panda",
      scientificName: "Ailurus fulgens",
      image: "/placeholder.svg?height=400&width=600",
      description:
        "The red panda is a small mammal native to the eastern Himalayas and southwestern China. It has reddish-brown fur, a long, shaggy tail, and a waddling gait due to its shorter front legs.",
      conservationStatus: "Endangered",
      location: "Asian Forest Zone - Exhibit 8",
      feedingTimes: "10:30 AM & 4:00 PM",
      keeperTalk: "1:00 PM (Red Panda Conservation)",
      featured: true,
      featuredUntil: "2023-06-15",
    },
    {
      id: 3,
      name: "African Elephant",
      scientificName: "Loxodonta africana",
      image: "/placeholder.svg?height=400&width=600",
      description:
        "The African elephant is the largest living terrestrial animal. Males stand 3.2–4.0 m tall at the shoulder and weigh 4,700–6,048 kg, while females stand 2.2–2.6 m tall and weigh 2,160–3,232 kg.",
      conservationStatus: "Vulnerable",
      location: "African Savanna Zone - Exhibit 3",
      feedingTimes: "9:00 AM & 2:00 PM",
      keeperTalk: "11:30 AM (Elephant Conservation)",
      featured: true,
      featuredUntil: "2023-06-20",
    },
  ]);

  const openDeleteDialog = (type: any, item: any) => {
    setDeleteType(type);
    setSelectedItem(item);
    setDeleteModalOpen(true);
  };

  const handleDeleteFeaturedAnimal = () => {
    if (selectedItem) {
      setFeaturedAnimals(
        featuredAnimals.filter((animal) => animal.id !== selectedItem.id)
      );
      setDeleteModalOpen(false);
      toast({
        title: "Featured Animal Removed",
        description: `"${selectedItem.name}" has been removed from featured animals.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <DeleteConfirmationDialog
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          handleDeleteFeaturedAnimal();
        }}
        type={deleteType}
        item={selectedItem}
      />
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center border-b pb-2">
            <div>
              <CardIntro
                title="Featured Animals"
                description="Manage featured animals and special highlights"
              />
            </div>
            <div className="w-fit">
              <ButtonComp
                type={"dark"}
                clickEvent={() => {}}
                text="Add Featured Animal"
                beforeIcon={<PlusCircle className="mr-2 h-4 w-4" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-poppins font-medium">
              Animal of the Day
            </h3>
            <Button
              variant="outline"
              onClick={() => {
                // In a real app, this would randomly select a featured animal
                toast({
                  title: "Animal of the Day Updated",
                  description:
                    "A new featured animal has been selected for today.",
                });
              }}
            >
              Change Featured Animal
            </Button>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="relative h-64 w-full">
              <Image
                src={featuredAnimals[0]?.image || "/placeholder.svg"}
                alt="Featured Animal"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold">
                {featuredAnimals[0]?.name || "No featured animal"}
              </h3>
              <p className="text-muted-foreground italic">
                {featuredAnimals[0]?.scientificName}
              </p>

              <div className="mt-4 space-y-2">
                <p>{featuredAnimals[0]?.description}</p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Conservation Status</h4>
                  <div className="mt-1 px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm inline-block">
                    {featuredAnimals[0]?.conservationStatus}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-sm mt-1">{featuredAnimals[0]?.location}</p>
                </div>
                <div>
                  <h4 className="font-medium">Feeding Times</h4>
                  <p className="text-sm mt-1">
                    {featuredAnimals[0]?.feedingTimes}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Keeper Talk</h4>
                  <p className="text-sm mt-1">
                    {featuredAnimals[0]?.keeperTalk}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (featuredAnimals[0]) {
                      // setModalMode("edit");
                      // setSelectedItem(featuredAnimals[0]);
                      // setFeaturedAnimalModalOpen(true);
                    }
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-medium mt-6">Other Featured Animals</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredAnimals.slice(1).map((animal) => (
              <Card key={animal.id} className="overflow-hidden">
                <div className="relative h-40">
                  <Image
                    src={animal.image || "/placeholder.svg"}
                    alt={animal.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardIntro
                    title={animal.name}
                    description={animal.location}
                  />
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="mt-1 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs inline-block">
                      {animal.conservationStatus}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Featured until: {animal.featuredUntil}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // setModalMode("view");
                      // setSelectedItem(animal);
                      // setFeaturedAnimalModalOpen(true);
                    }}
                  >
                    <Info className="h-4 w-4 mr-2" /> View Details
                  </Button>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // setModalMode("edit");
                        // setSelectedItem(animal);
                        // setFeaturedAnimalModalOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openDeleteDialog("animal", animal)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturedAnimalsTable;
