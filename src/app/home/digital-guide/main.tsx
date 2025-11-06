"use client";

import { useState } from "react";
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
import {
  Bell,
  Calendar,
  Clock,
  Headphones,
  Info,
  QrCode,
  Search,
  Volume2,
  PlusCircle,
  Edit,
  Trash2,
  Play,
  Pause,
} from "lucide-react";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { QrCodeModal } from "@/components/digital-guide/qr-code-modal";
import { ExhibitModal } from "@/components/digital-guide/exhibit-modal";
import { AudioGuideModal } from "@/components/digital-guide/audio-guide-modal";
import { FeaturedAnimalModal } from "@/components/digital-guide/featured-animal-modal";
import { ScheduleModal } from "@/components/digital-guide/schedule-modal";
import { DeleteConfirmationDialog } from "@/components/digital-guide/delete-confirmation";
import { Slider } from "@/components/ui/slider";
import SectionIntro from "@/components/utils/Headings/SectionIntro";
import ScanLearnTable from "./windows/ScanLearnTable";
import AudioGuideTable from "./windows/AudioGuideTable";
import CardIntro from "@/components/utils/Headings/CardIntro";

export default function DigitalGuidePage() {
  const { toast } = useToast();

  // State for content categories
  const [contentCategories, setContentCategories] = useState([
    { id: "scan", name: "Scan & Learn", icon: QrCode },
    { id: "audio", name: "Audio Guide", icon: Headphones },
    { id: "featured", name: "Featured Animals", icon: Info },
    { id: "schedule", name: "Daily Schedule", icon: Calendar },
  ]);

  // State for active tab
  const [activeTab, setActiveTab] = useState("scan");

  // State for modals
  const [audioGuideModalOpen, setAudioGuideModalOpen] = useState(false);
  const [featuredAnimalModalOpen, setFeaturedAnimalModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // State for modal mode (create, edit, view)
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
    "create"
  );

  // State for selected item
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [deleteType, setDeleteType] = useState<
    "qrcode" | "audio" | "animal" | "schedule"
  >("qrcode");

  // State for audio playback

  // Mock data for each tab
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

  const [schedules, setSchedules] = useState([
    {
      id: 1,
      time: "10:00 AM",
      title: "Elephant Feeding",
      location: "African Savanna Zone",
      description: "Watch our elephants enjoy their morning meal",
      status: "upcoming",
      notificationSent: false,
      notifyTime: "30min",
    },
    {
      id: 2,
      time: "11:00 AM",
      title: "Tiger Feeding",
      location: "Asian Forest Zone",
      description: "See our tigers being fed by expert keepers",
      status: "upcoming",
      notificationSent: false,
      notifyTime: "30min",
    },
    {
      id: 3,
      time: "12:00 PM",
      title: "Conservation Talk",
      location: "Education Center",
      description: "Learn about our wildlife conservation efforts",
      status: "upcoming",
      notificationSent: false,
      notifyTime: "1hour",
    },
    {
      id: 4,
      time: "1:30 PM",
      title: "Penguin Parade",
      location: "Polar Zone",
      description: "Watch our penguins parade around their habitat",
      status: "upcoming",
      notificationSent: false,
      notifyTime: "1hour",
    },
    {
      id: 5,
      time: "2:30 PM",
      title: "Reptile Encounter",
      location: "Reptile House",
      description: "Get up close with some fascinating reptiles",
      status: "upcoming",
      notificationSent: false,
      notifyTime: "30min",
    },
  ]);

  // CRUD operations for featured animals
  const handleAddFeaturedAnimal = (animal: any) => {
    const newAnimal = {
      id: featuredAnimals.length + 1,
      ...animal,
      featured: true,
      featuredUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // 2 weeks from now
    };
    setFeaturedAnimals([...featuredAnimals, newAnimal]);
    toast({
      title: "Featured Animal Created",
      description: `"${animal.name}" has been added to featured animals.`,
    });
  };

  const handleEditFeaturedAnimal = (updatedAnimal: any) => {
    setFeaturedAnimals(
      featuredAnimals.map((animal) =>
        animal.id === updatedAnimal.id ? updatedAnimal : animal
      )
    );
    toast({
      title: "Featured Animal Updated",
      description: `"${updatedAnimal.name}" has been updated successfully.`,
    });
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

  // CRUD operations for schedules
  const handleAddSchedule = (schedule: any) => {
    const newSchedule = {
      id: schedules.length + 1,
      ...schedule,
      status: "upcoming",
      notificationSent: false,
    };
    setSchedules([...schedules, newSchedule]);
    toast({
      title: "Schedule Event Created",
      description: `"${schedule.title}" has been added to the daily schedule.`,
    });
  };

  const handleEditSchedule = (updatedSchedule: any) => {
    setSchedules(
      schedules.map((schedule) =>
        schedule.id === updatedSchedule.id ? updatedSchedule : schedule
      )
    );
    toast({
      title: "Schedule Event Updated",
      description: `"${updatedSchedule.title}" has been updated successfully.`,
    });
  };

  const handleDeleteSchedule = () => {
    if (selectedItem) {
      setSchedules(
        schedules.filter((schedule) => schedule.id !== selectedItem.id)
      );
      setDeleteModalOpen(false);
      toast({
        title: "Schedule Event Removed",
        description: `"${selectedItem.title}" has been removed from the daily schedule.`,
        variant: "destructive",
      });
    }
  };

  // Open delete confirmation dialog
  const openDeleteDialog = (type: any, item: any) => {
    setDeleteType(type);
    setSelectedItem(item);
    setDeleteModalOpen(true);
  };

  // Handle notification sending
  const sendNotification = (scheduleId: number) => {
    setSchedules(
      schedules.map((schedule) =>
        schedule.id === scheduleId
          ? { ...schedule, notificationSent: true }
          : schedule
      )
    );
    toast({
      title: "Notification Sent",
      description: "Event notification has been sent to visitors.",
    });
  };

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <SectionIntro
          title="Digital Guide"
          description="Explore and manage the digital guide."
        />
      </div>
      <Tabs
        defaultValue={activeTab}
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="flex-1 w-full">
          {contentCategories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="flex-1"
            >
              <category.icon className="mr-2 h-4 w-4" />
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Scan & Learn Tab */}
        <TabsContent value="scan" className="space-y-4">
          <ScanLearnTable />
        </TabsContent>

        {/* Audio Guide Tab */}
        <TabsContent value="audio" className="space-y-4">
          <AudioGuideTable />
        </TabsContent>

        {/* Featured Animals Tab */}
        <TabsContent value="featured" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <CardIntro
                    title="Featured Animals"
                    description="Manage featured animals and special highlights"
                  />
                </div>
                <Button
                  className="bg-green-700 hover:bg-green-800"
                  onClick={() => {
                    setModalMode("create");
                    setSelectedItem(null);
                    setFeaturedAnimalModalOpen(true);
                  }}
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Featured Animal
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-poppins font-medium">Animal of the Day</h3>
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
                      <p className="text-sm mt-1">
                        {featuredAnimals[0]?.location}
                      </p>
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
                          setModalMode("edit");
                          setSelectedItem(featuredAnimals[0]);
                          setFeaturedAnimalModalOpen(true);
                        }
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" /> Edit
                    </Button>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-medium mt-6">
                Other Featured Animals
              </h3>
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
                      <CardTitle>{animal.name}</CardTitle>
                      <CardDescription>{animal.location}</CardDescription>
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
                          setModalMode("view");
                          setSelectedItem(animal);
                          setFeaturedAnimalModalOpen(true);
                        }}
                      >
                        <Info className="h-4 w-4 mr-2" /> View Details
                      </Button>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setModalMode("edit");
                            setSelectedItem(animal);
                            setFeaturedAnimalModalOpen(true);
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
        </TabsContent>

        {/* Daily Schedule Tab */}
        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardIntro
                    title="Daily Schedule"
                    description="Manage and display daily activities and events"
                  />
                </div>
                <Button
                  className="bg-green-700 hover:bg-green-800"
                  onClick={() => {
                    setModalMode("create");
                    setSelectedItem(null);
                    setScheduleModalOpen(true);
                  }}
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Schedule
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-poppins font-medium">
                  Today's Schedule
                </h3>
                {/* <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" /> Change Date
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setModalMode("create");
                      setSelectedItem(null);
                      setScheduleModalOpen(true);
                    }}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" /> Add Event
                  </Button>
                </div> */}
              </div>

              <div className="space-y-4">
                {schedules.map((event) => (
                  <div
                    key={event.id}
                    className="flex gap-4 border rounded-lg p-4"
                  >
                    <div className="flex-shrink-0 w-24 text-center flex flex-col justify-center">
                      <div className="text-lg font-bold">{event.time}</div>
                      <div
                        className={`mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                          event.status === "completed"
                            ? "bg-gray-100 text-gray-800"
                            : event.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {event.status === "completed"
                          ? "Completed"
                          : event.status === "active"
                          ? "In Progress"
                          : "Upcoming"}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="font-medium">{event.title}</h3>
                      <div className="text-sm text-muted-foreground mt-1">
                        {event.location}
                      </div>
                      <p className="text-sm mt-2">{event.description}</p>
                    </div>
                    <div className="flex-shrink-0 flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setModalMode("edit");
                          setSelectedItem(event);
                          setScheduleModalOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openDeleteDialog("schedule", event)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {/* Modals */}

      {/* <AudioGuideModal
        isOpen={audioGuideModalOpen}
        onClose={() => setAudioGuideModalOpen(false)}
        audioGuide={selectedItem}
        onSave={
          modalMode === "create" ? handleAddAudioGuide : handleEditAudioGuide
        }
        viewMode={modalMode === "view"}
      /> */}
      <FeaturedAnimalModal
        isOpen={featuredAnimalModalOpen}
        onClose={() => setFeaturedAnimalModalOpen(false)}
        animal={selectedItem}
        onSave={
          modalMode === "create"
            ? handleAddFeaturedAnimal
            : handleEditFeaturedAnimal
        }
        viewMode={modalMode === "view"}
      />
      <ScheduleModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        schedule={selectedItem}
        onSave={modalMode === "create" ? handleAddSchedule : handleEditSchedule}
        viewMode={modalMode === "view"}
      />
      <DeleteConfirmationDialog
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          if (deleteType === "animal") {
            handleDeleteFeaturedAnimal();
          } else if (deleteType === "schedule") {
            handleDeleteSchedule();
          }
        }}
        type={deleteType}
        item={selectedItem}
      />
    </div>
  );
}
