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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  Clock,
  Coffee,
  FileText,
  History,
  Info,
  MapPin,
  PawPrintIcon as Paw,
  Ticket,
  Users,
  Plus,
  Edit,
  Trash2,
  Eye,
  MapPinned,
} from "lucide-react";
import Image from "next/image";
import { AnimalModal } from "@/components/modals/animal-modal";
import { CafeteriaModal } from "@/components/modals/cafeteria-modal";
import { ShowModal } from "@/components/modals/show-modal";
import { TripModal } from "@/components/modals/trip-modal";
import { HistoryModal } from "@/components/modals/history-modal";
import { MilestoneModal } from "@/components/modals/milestone-modal";
// import { DeleteConfirmation } from "@/components/modals/delete-confirmation";
import { useParams, useRouter } from "next/navigation";
import { DeleteConfirmation } from "@/components/modals/delete-confirmation";
import BodyText from "@/components/utils/Headings/BodyText";
import { AchievementModal } from "@/components/modals/achievement-modal";
import Subheading from "@/components/utils/Headings/Subheading";
import HistoryTab from "./Tabs/History";
import Animals from "./Tabs/Animals";
import Shows from "./Tabs/Shows";
import Locations from "./Tabs/Locations";

// Zoo data
const zooData = {
  "1": {
    id: 1,
    name: "Lahore Zoo",
    location: "Shahrah-e-Quaid-e-Azam, Lahore, Punjab, Pakistan",
    established: "1872",
    imagePath:
      "https://zameenblog.s3.amazonaws.com/blog/wp-content/uploads/2021/03/Cover-1440x625-2.jpg",
    area: "25 acres",
    description:
      "Lahore Zoo is the oldest zoo in Pakistan and one of the oldest in South Asia. Established in 1872, it houses a diverse collection of animals and birds. The zoo is located in the heart of Lahore city and is a popular destination for families and educational trips.",
    history:
      "Lahore Zoo was established in 1872 during the British colonial era. It was initially part of the Lawrence Gardens (now Bagh-e-Jinnah) and was later developed as a separate facility. Over the years, it has expanded its collection and improved its facilities. The zoo has played a significant role in conservation efforts and public education about wildlife in Pakistan.",
    animals: [
      { name: "Asian Elephant", count: 2, category: "Mammals" },
      { name: "Bengal Tiger", count: 3, category: "Mammals" },
      { name: "White Lion", count: 2, category: "Mammals" },
      { name: "Chimpanzee", count: 4, category: "Mammals" },
      { name: "Indian Rhinoceros", count: 1, category: "Mammals" },
      { name: "Himalayan Brown Bear", count: 2, category: "Mammals" },
      { name: "Peacock", count: 12, category: "Birds" },
      { name: "Ostrich", count: 3, category: "Birds" },
      { name: "King Cobra", count: 2, category: "Reptiles" },
      { name: "Mugger Crocodile", count: 5, category: "Reptiles" },
    ],
    cafeterias: [
      {
        name: "Safari Café",
        location: "Main Entrance",
        menu: "Fast food, snacks, beverages",
        hours: "9:30 AM - 5:30 PM",
      },
      {
        name: "Jungle Treats",
        location: "Central Plaza",
        menu: "Ice cream, cold drinks, Pakistani snacks",
        hours: "10:00 AM - 5:00 PM",
      },
    ],
    shows: [
      {
        name: "Bird Show",
        date: "2025-05-11T11:00:00.000z",
        location: "Aviary Theater",
        duration: "30 minutes",
      },
      {
        name: "Elephant Bath",
        date: "2025-05-11T13:00:00.000z",
        location: "Elephant Enclosure",
        duration: "20 minutes",
      },
      {
        name: "Feeding Time: Big Cats",
        date: "2025-05-11T15:00:00.000z",
        location: "Tiger Habitat",
        duration: "25 minutes",
      },
      {
        name: "Reptile Demonstration",
        date: "2025-05-11T16:30:00.000z",
        location: "Reptile House",
        duration: "30 minutes",
      },
    ],
    milestones: [
      { year: "1872", description: "Establishment of the zoo" },
      { year: "1897", description: "Major expansion" },
      { year: "1922", description: "Modernization of facilities" },
      { year: "1947", description: "Conservation program launched" },
      { year: "2010", description: "Digital management system implemented" },
      { year: "2020", description: "Renovation of visitor facilities" },
    ],
    achievements: [
      { year: "1960", description: "Conservation of native wildlife species" },
      { year: "1975", description: "Educational programs for local schools" },
      { year: "1990", description: "Research on animal behavior" },
      { year: "2015", description: "Community engagement initiatives" },
    ],
  },
  "2": {
    id: 2,
    name: "Lahore Safari Park",
    location: "Raiwind Road, Lahore, Punjab, Pakistan",
    established: "1982",
    imagePath:
      "https://th.bing.com/th/id/R.e967112c84d6ab332fc76717b9e719e6?rik=6S3jtZUUfJiEcg&riu=http%3a%2f%2flocallylahore.com%2fwp-content%2fuploads%2fsp12-768x333.jpg&ehk=90kBmeb3p9n97hicdZ0p8Ce4ksUZTRA7lWP7usT%2f8QQ%3d&risl=&pid=ImgRaw&r=0",
    area: "242 acres",
    description:
      "Lahore Safari Park, also known as Lahore Wildlife Park, is a large safari park located on Raiwind Road in Lahore. It offers visitors a chance to see animals in more natural settings compared to traditional zoos.",
    history:
      "Established in 1982, Lahore Safari Park was created to provide a more natural environment for animals compared to traditional zoos. The park is divided into several sections, including a safari area where visitors can observe animals from vehicles. Over the years, it has become an important conservation center for endangered species native to Pakistan and the surrounding region.",
    animals: [
      { name: "Asiatic Lion", count: 4, category: "Mammals" },
      { name: "Spotted Deer", count: 25, category: "Mammals" },
      { name: "Blackbuck", count: 18, category: "Mammals" },
      { name: "Nilgai", count: 12, category: "Mammals" },
      { name: "Zebra", count: 6, category: "Mammals" },
      { name: "Giraffe", count: 3, category: "Mammals" },
      { name: "Ostrich", count: 8, category: "Birds" },
      { name: "Flamingo", count: 15, category: "Birds" },
      { name: "Marsh Crocodile", count: 7, category: "Reptiles" },
      { name: "Python", count: 3, category: "Reptiles" },
    ],
    cafeterias: [
      {
        name: "Safari Grill",
        location: "Main Entrance Plaza",
        menu: "BBQ, Pakistani cuisine, beverages",
        hours: "10:00 AM - 6:00 PM",
      },
      {
        name: "Wilderness Café",
        location: "Safari Rest Area",
        menu: "Fast food, snacks, ice cream",
        hours: "10:30 AM - 5:30 PM",
      },
      {
        name: "Oasis Refreshments",
        location: "Children's Area",
        menu: "Snacks, juices, ice cream",
        hours: "11:00 AM - 5:00 PM",
      },
    ],
    shows: [
      {
        name: "Safari Tour",
        date: "2025-05-11T11:00:00.000z",
        location: "Safari Entrance",
        duration: "45 minutes",
      },
      {
        name: "Birds of Prey Show",
        date: "2025-05-11T11:30:00.000z",
        location: "Amphitheater",
        duration: "30 minutes",
      },
      {
        name: "Lion Feeding",
        date: "2025-05-11T15:30:00.000z",
        location: "Lion Territory",
        duration: "20 minutes",
      },
      {
        name: "Wildlife Conservation Talk",
        date: "2025-05-11T13:00:00.000z",
        location: "Education Center",
        duration: "40 minutes",
      },
    ],
    milestones: [
      { year: "1982", description: "Establishment of the safari park" },
      { year: "1990", description: "Introduction of safari tours" },
      { year: "2000", description: "Expansion of wildlife conservation area" },
      { year: "2010", description: "Addition of educational center" },
      { year: "2018", description: "Renovation of visitor facilities" },
    ],
    achievements: [
      { year: "1960", description: "Conservation of native wildlife species" },
      { year: "1975", description: "Educational programs for local schools" },
      { year: "1990", description: "Research on animal behavior" },
      { year: "2015", description: "Community engagement initiatives" },
    ],
  },
  "3": {
    id: 3,
    name: "Bahawalpur Zoo",
    location: "Bahawalpur, Punjab, Pakistan",
    imagePath:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiPAtR3czeDrdxYuNt34NIhDJ7t68uGAqmgSrEXxDuNByIBeBiha-xvXOwklndvWxgO0f_Hnt1FslVyLKL8ORRtISYOknzzv8x8AtB9kPFHo5lkSM_0fBhtMhUx_ZkTJW0GenRctADnzlNR/s1600/Bahawalpur20Zoo201-76-1516796494.jpg",
    established: "1942",
    area: "25 acres",
    description:
      "Bahawalpur Zoo, also known as Shahi Bagh Zoo, is located in Bahawalpur, Punjab. It is one of the major zoos in Pakistan and houses a variety of animals and birds.",
    history:
      "Bahawalpur Zoo was established in 1942 during the princely state era of Bahawalpur. It was initially created as a royal garden (Shahi Bagh) by the Nawabs of Bahawalpur. After independence, it was developed into a full-fledged zoo. The zoo has historical significance and has been an important recreational and educational facility in the region for decades.",
    animals: [
      { name: "Bengal Tiger", count: 2, category: "Mammals" },
      { name: "Lion", count: 3, category: "Mammals" },
      { name: "Leopard", count: 1, category: "Mammals" },
      { name: "Hog Deer", count: 14, category: "Mammals" },
      { name: "Black Buck", count: 8, category: "Mammals" },
      { name: "Rhesus Monkey", count: 12, category: "Mammals" },
      { name: "Peacock", count: 10, category: "Birds" },
      { name: "Pheasant", count: 8, category: "Birds" },
      { name: "Python", count: 2, category: "Reptiles" },
      { name: "Marsh Crocodile", count: 4, category: "Reptiles" },
    ],
    cafeterias: [
      {
        name: "Royal Garden Café",
        location: "Main Entrance",
        menu: "Traditional Pakistani food, snacks, beverages",
        hours: "9:30 AM - 5:30 PM",
      },
      {
        name: "Oasis Snacks",
        location: "Central Area",
        menu: "Fast food, ice cream, cold drinks",
        hours: "10:00 AM - 5:00 PM",
      },
    ],
    shows: [
      {
        name: "Bird Show",
        date: "2025-05-11T11:00:00.000z",
        location: "Aviary",
        duration: "30 minutes",
      },
      {
        name: "Big Cat Feeding",
        date: "2025-05-11T14:30:00.000z",
        location: "Big Cat Enclosure",
        duration: "25 minutes",
      },
      {
        name: "Monkey Antics",
        date: "2025-05-11T12:30:00.000z",
        location: "Primate Section",
        duration: "20 minutes",
      },
      {
        name: "Wildlife Education Program",
        date: "2025-05-11T16:00:00.000z",
        location: "Education Center",
        duration: "35 minutes",
      },
    ],
    milestones: [
      { year: "1942", description: "Establishment of the zoo" },
      { year: "1960", description: "Major renovation and expansion" },
      { year: "1975", description: "Addition of educational facilities" },
      { year: "1990", description: "Conservation program initiated" },
      { year: "2015", description: "Modernization of animal enclosures" },
    ],
    achievements: [
      { year: "1960", description: "Conservation of native wildlife species" },
      { year: "1975", description: "Educational programs for local schools" },
      { year: "1990", description: "Research on animal behavior" },
      { year: "2015", description: "Community engagement initiatives" },
    ],
  },
};

const cardColors = [
  "bg-gradient-to-r from-[#012E41] to-[#0376A7] text-white",
  "bg-gradient-to-r from-[#024A59] to-[#049FBF] text-white",
  "bg-gradient-to-r from-[#3CA6A6] to-[#174040] text-white",
];

export default function ZooProfilePage() {
  // State for zoo data
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug;
  const [zooInfo, setZooInfo] = useState(() => {
    return zooData[slug as keyof typeof zooData] || null;
  });

  // State for date picker and trip view
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [tripView, setTripView] = useState<"day" | "month" | "date">("day");

  // State for modals
  const [animalModal, setAnimalModal] = useState({
    isOpen: false,
    mode: "create" as "create" | "edit" | "view",
    data: null as any,
  });
  const [cafeteriaModal, setCafeteriaModal] = useState({
    isOpen: false,
    mode: "create" as "create" | "edit" | "view",
    data: null as any,
  });
  const [showModal, setShowModal] = useState({
    isOpen: false,
    mode: "create" as "create" | "edit" | "view",
    data: null as any,
  });
  const [tripModal, setTripModal] = useState({
    isOpen: false,
    mode: "create" as "create" | "edit" | "view",
    data: null as any,
  });
  const [historyModal, setHistoryModal] = useState({
    isOpen: false,
    mode: "edit" as "edit" | "view",
  });
  const [milestoneModal, setMilestoneModal] = useState({
    isOpen: false,
    mode: "create" as "create" | "edit" | "view",
    data: null as any,
  });
  const [achievementModal, setAchievementModal] = useState({
    isOpen: false,
    mode: "create" as "create" | "edit" | "view",
    data: null as any,
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    type: "",
    index: -1,
    title: "",
    description: "",
  });

  // Generate random ticket data for demonstration
  const ticketData = {
    totalSold: Math.floor(Math.random() * 1000) + 500,
    revenue: Math.floor(Math.random() * 50000) + 25000,
    categories: {
      adult: Math.floor(Math.random() * 500) + 250,
      child: Math.floor(Math.random() * 300) + 150,
      senior: Math.floor(Math.random() * 100) + 50,
      student: Math.floor(Math.random() * 150) + 75,
    },
  };

  // Generate random trip data for demonstration
  const generateTrips = (count: number) => {
    const types = [
      "Educational",
      "Corporate",
      "Family",
      "School",
      "College",
      "Special Needs",
    ];
    const statuses = ["Confirmed", "Pending", "Completed", "Cancelled"];

    return Array.from({ length: count }, (_, i) => ({
      id: `TRIP-${Math.floor(Math.random() * 10000)}`,
      name: `${types[Math.floor(Math.random() * types.length)]} Trip`,
      organizer: `${
        ["ABC School", "XYZ College", "Corporate Group", "Family Group"][
          Math.floor(Math.random() * 4)
        ]
      }`,
      participants: Math.floor(Math.random() * 50) + 10,
      date: new Date(
        2025,
        // Math.floor(Math.random() * 12),
        5,
        20
        // Math.floor(Math.random() * 28) + 1
      ),
      status: statuses[Math.floor(Math.random() * statuses.length)],
    }));
  };

  const [trips, setTrips] = useState(generateTrips(15));

  // Filter trips based on selected view
  const filteredTrips = trips.filter((trip) => {
    if (tripView === "day") {
      return trip.date.toDateString() === new Date().toDateString();
    } else if (tripView === "month") {
      return (
        trip.date.getMonth() === new Date().getMonth() &&
        trip.date.getFullYear() === new Date().getFullYear()
      );
    } else if (tripView === "date" && date) {
      return trip.date.toDateString() === date.toDateString();
    }
    return true;
  });

  // CRUD Handlers
  // Animals
  const handleAddAnimal = (animal: any) => {
    setZooInfo((prev: any) => ({
      ...prev,
      animals: [...prev.animals, animal],
    }));
    setAnimalModal({ isOpen: false, mode: "create", data: null });
  };

  const handleEditAnimal = (animal: any) => {
    // setZooInfo((prev: any) => ({
    //   ...prev,
    //   animals: prev.animals.map((a: any, i: number) =>
    //     i === index ? animal : a
    //   ),
    // }));
    // setAnimalModal({ isOpen: false, mode: "edit", data: null });
  };

  const handleDeleteAnimal = (index: number) => {
    setZooInfo((prev: any) => ({
      ...prev,
      animals: prev.animals.filter((_: any, i: number) => i !== index),
    }));
    setDeleteConfirmation({
      isOpen: false,
      type: "",
      index: -1,
      title: "",
      description: "",
    });
  };

  // Cafeterias
  const handleAddCafeteria = (cafeteria: any) => {
    setZooInfo((prev: any) => ({
      ...prev,
      cafeterias: [...prev.cafeterias, cafeteria],
    }));
    setCafeteriaModal({ isOpen: false, mode: "create", data: null });
  };

  const handleEditCafeteria = (cafeteria: any, index: number) => {
    setZooInfo((prev: any) => ({
      ...prev,
      cafeterias: prev.cafeterias.map((c: any, i: number) =>
        i === index ? cafeteria : c
      ),
    }));
    setCafeteriaModal({ isOpen: false, mode: "edit", data: null });
  };

  const handleDeleteCafeteria = (index: number) => {
    setZooInfo((prev: any) => ({
      ...prev,
      cafeterias: prev.cafeterias.filter((_: any, i: number) => i !== index),
    }));
    setDeleteConfirmation({
      isOpen: false,
      type: "",
      index: -1,
      title: "",
      description: "",
    });
  };

  // Shows
  const handleAddShow = (show: any) => {
    setZooInfo((prev: any) => ({
      ...prev,
      shows: [...prev.shows, show],
    }));
    setShowModal({ isOpen: false, mode: "create", data: null });
  };

  const handleEditShow = (show: any, index: number) => {
    setZooInfo((prev: any) => ({
      ...prev,
      shows: prev.shows.map((s: any, i: number) => (i === index ? show : s)),
    }));
    setShowModal({ isOpen: false, mode: "edit", data: null });
  };

  const handleDeleteShow = (index: number) => {
    setZooInfo((prev: any) => ({
      ...prev,
      shows: prev.shows.filter((_: any, i: number) => i !== index),
    }));
    setDeleteConfirmation({
      isOpen: false,
      type: "",
      index: -1,
      title: "",
      description: "",
    });
  };

  // Trips
  const handleAddTrip = (trip: any) => {
    setTrips((prev) => [...prev, trip]);
    setTripModal({ isOpen: false, mode: "create", data: null });
  };

  const handleEditTrip = (trip: any, index: number) => {
    setTrips((prev) => prev.map((t, i) => (i === index ? trip : t)));
    setTripModal({ isOpen: false, mode: "edit", data: null });
  };

  const handleDeleteTrip = (index: number) => {
    setTrips((prev) => prev.filter((_, i) => i !== index));
    setDeleteConfirmation({
      isOpen: false,
      type: "",
      index: -1,
      title: "",
      description: "",
    });
  };

  // History
  const handleUpdateHistory = (data: any) => {
    setZooInfo((prev: any) => ({
      ...prev,
      history: data.history,
      imagePath: data.image,
    }));
    setHistoryModal({ isOpen: false, mode: "edit" });
  };

  // Milestones
  const handleAddMilestone = (milestone: any) => {
    setZooInfo((prev: any) => ({
      ...prev,
      milestones: [...prev.milestones, milestone],
    }));
    setMilestoneModal({ isOpen: false, mode: "create", data: null });
  };

  const handleAddAchievement = (achievements: any) => {
    setZooInfo((prev: any) => ({
      ...prev,
      achievements: [...prev.achievements, achievements],
    }));
    setAchievementModal({ isOpen: false, mode: "create", data: null });
  };

  const handleEditMilestone = (milestone: any, index: number) => {
    setZooInfo((prev: any) => ({
      ...prev,
      milestones: prev.milestones.map((m: any, i: number) =>
        i === index ? milestone : m
      ),
    }));
    setMilestoneModal({ isOpen: false, mode: "edit", data: null });
  };

  const handleEditAchievement = (achievement: any, index: number) => {
    setZooInfo((prev: any) => ({
      ...prev,
      achievements: prev.achievements.map((m: any, i: number) =>
        i === index ? achievement : m
      ),
    }));
    setAchievementModal({ isOpen: false, mode: "edit", data: null });
  };

  const handleDeleteMilestone = (index: number) => {
    setZooInfo((prev: any) => ({
      ...prev,
      milestones: prev.milestones.filter((_: any, i: number) => i !== index),
    }));
    setDeleteConfirmation({
      isOpen: false,
      type: "",
      index: -1,
      title: "",
      description: "",
    });
  };

  const handleDeleteAchievement = (index: number) => {
    setZooInfo((prev: any) => ({
      ...prev,
      achievements: prev.achievements.filter(
        (_: any, i: number) => i !== index
      ),
    }));
    setDeleteConfirmation({
      isOpen: false,
      type: "",
      index: -1,
      title: "",
      description: "",
    });
  };

  // If zoo not found
  if (!zooInfo) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Zoo Not Found</CardTitle>
            <CardDescription>
              The zoo you are looking for does not exist.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-3">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Subheading text={zooInfo.name} />
          <div className="flex items-center text-muted-foreground mt-0 font-syne">
            <MapPin className="h-4 w-4 mr-1" />
            <p>{zooInfo.location}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {/* <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" /> Generate Report
          </Button>
          <Button className="bg-green-700 hover:bg-green-800">
            <Info className="mr-2 h-4 w-4" /> Update Information
          </Button> */}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {[
          {
            cardTitle: "Established",
            contentHeading: zooInfo.established,
            contentData:
              new Date().getFullYear() -
              Number.parseInt(zooInfo.established) +
              " years of operation",
          },
          {
            cardTitle: "Area",
            contentHeading: zooInfo.area,
            contentData: "Total land area",
          },
          {
            cardTitle: "Animal",
            contentHeading: zooInfo.animals.reduce(
              (sum: number, animal: any) => sum + animal.count,
              0
            ),
            contentData: zooInfo.animals.length + " different species",
          },
        ].map((card, index: number) => (
          <Card
            key={index}
            className={`font-poppins ${cardColors[index % cardColors.length]}`}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{card.cardTitle}</CardTitle>
            </CardHeader>
            <CardContent className="flex space-x-2 items-end justify-between">
              <div className="text-3xl font-semibold">
                {card.contentHeading}
              </div>
              <p className="text-xs">{card.contentData}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="history" className="space-y-2">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
          <TabsTrigger value="history">
            <History className="h-4 w-4 mr-2" /> History
          </TabsTrigger>
          <TabsTrigger value="animals">
            <Paw className="h-4 w-4 mr-2" /> Animals
          </TabsTrigger>
          <TabsTrigger value="shows">
            <Clock className="h-4 w-4 mr-2" /> Shows
          </TabsTrigger>
          <TabsTrigger value="locations">
            <MapPinned className="h-4 w-4 mr-2" /> Locations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-2">
          <HistoryTab
            data={{
              name: zooInfo.name,
              history: zooInfo.history,
              imagePath: zooInfo.imagePath,
              id: zooInfo.id,
              milestones: zooInfo.milestones,
              achievements: zooInfo.achievements,
            }}
          />
        </TabsContent>

        <TabsContent value="animals" className="space-y-2">
          <Animals data={{ name: zooInfo.name, animals: zooInfo.animals }} />
        </TabsContent>

        <TabsContent value="shows" className="space-y-2">
          <Shows data={{ name: zooInfo.name, shows: zooInfo.shows }} />
        </TabsContent>
        <TabsContent value="locations" className="space-y-2">
          <Locations id={zooInfo.id} name={zooInfo.name} />
        </TabsContent>
      </Tabs>

      <AnimalModal
        isOpen={animalModal.isOpen}
        mode={animalModal.mode}
        animal={animalModal.data}
        onClose={() =>
          setAnimalModal({ isOpen: false, mode: "create", data: null })
        }
        onAdd={handleAddAnimal}
        onSave={handleEditAnimal}
      />

      <CafeteriaModal
        isOpen={cafeteriaModal.isOpen}
        mode={cafeteriaModal.mode}
        cafeteria={cafeteriaModal.data}
        onClose={() =>
          setCafeteriaModal({ isOpen: false, mode: "create", data: null })
        }
        onSave={handleAddCafeteria}
      />

      {/* <ShowModal
        isOpen={showModal.isOpen}
        mode={showModal.mode}
        data={showModal.data}
        onClose={() =>
          setShowModal({ isOpen: false, mode: "create", data: null })
        }
        onAdd={handleAddShow}
        onEdit={handleEditShow}
      /> */}

      <TripModal
        isOpen={tripModal.isOpen}
        mode={tripModal.mode}
        trip={tripModal.data}
        onClose={() =>
          setTripModal({ isOpen: false, mode: "create", data: null })
        }
        onSave={handleAddTrip}
      />

      <HistoryModal
        isOpen={historyModal.isOpen}
        mode={historyModal.mode}
        history={zooInfo.history}
        image={zooInfo.imagePath}
        onClose={() => setHistoryModal({ isOpen: false, mode: "edit" })}
        onSave={handleUpdateHistory}
      />

      <MilestoneModal
        isOpen={milestoneModal.isOpen}
        mode={milestoneModal.mode}
        milestone={milestoneModal.data?.milestone}
        data={milestoneModal.data}
        onClose={() =>
          setMilestoneModal({ isOpen: false, mode: "create", data: null })
        }
        onAdd={handleAddMilestone}
        onEdit={handleEditMilestone}
      />

      <AchievementModal
        isOpen={achievementModal.isOpen}
        mode={achievementModal.mode}
        achievement={achievementModal.data?.achievement}
        data={achievementModal.data}
        onClose={() =>
          setAchievementModal({ isOpen: false, mode: "create", data: null })
        }
        onAdd={handleAddAchievement}
        onEdit={handleEditAchievement}
      />

      <DeleteConfirmation
        isOpen={deleteConfirmation.isOpen}
        onClose={() =>
          setDeleteConfirmation({
            isOpen: false,
            type: "",
            index: -1,
            title: "",
            description: "",
          })
        }
        title={deleteConfirmation.title}
        description={deleteConfirmation.description}
        onConfirm={() => {
          if (deleteConfirmation.type === "animal") {
            handleDeleteAnimal(deleteConfirmation.index);
          } else if (deleteConfirmation.type === "cafeteria") {
            handleDeleteCafeteria(deleteConfirmation.index);
          } else if (deleteConfirmation.type === "show") {
            handleDeleteShow(deleteConfirmation.index);
          } else if (deleteConfirmation.type === "trip") {
            handleDeleteTrip(deleteConfirmation.index);
          } else if (deleteConfirmation.type === "milestone") {
            handleDeleteMilestone(deleteConfirmation.index);
          } else if (deleteConfirmation.type === "achievement") {
            handleDeleteAchievement(deleteConfirmation.index);
          }
        }}
      />
    </div>
  );
}
