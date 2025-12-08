"use client";

import { useEffect, useState } from "react";
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
import DetailsTab from "./Tabs/Details";
import Animals from "./Tabs/Animals";
import Locations from "./Tabs/Locations";
import useHelper from "@/Helper/helper";

// Zoo data
const zooData = [
  {
    ZooId: 1,
    ZooTitle: "Lahore Zoo",
    LogoPath:
      "https://tse2.mm.bing.net/th/id/OIP.OyH7D4tqb5GdF_J7HjgLUQHaHQ?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    CoverImageFilepath:
      "https://zameenblog.s3.amazonaws.com/blog/wp-content/uploads/2021/03/Cover-1440x625-2.jpg",
    ZooImages: [
      "https://www.shutterstock.com/shutterstock/photos/1646278351/display_1500/stock-photo-an-adult-leopard-basking-in-the-sun-at-chhatbir-zoo-in-zirakpur-near-chandigarh-in-punjab-india-1646278351.jpg",
      "https://www.shutterstock.com/shutterstock/photos/588075833/display_1500/stock-photo-elephant-suzi-and-trainer-in-the-lahore-zoo-punjab-pakistan-588075833.jpg",
      "https://www.shutterstock.com/shutterstock/photos/2524742731/display_1500/stock-photo-multan-pakistan-october-kashmir-park-in-multan-punjab-province-pakistan-2524742731.jpg",
      "https://www.shutterstock.com/shutterstock/photos/2524742679/display_1500/stock-photo-multan-pakistan-october-kashmir-park-in-multan-punjab-province-pakistan-2524742679.jpg",
      "https://www.shutterstock.com/shutterstock/photos/1646278351/display_1500/stock-photo-an-adult-leopard-basking-in-the-sun-at-chhatbir-zoo-in-zirakpur-near-chandigarh-in-punjab-india-1646278351.jpg",
      "https://www.shutterstock.com/shutterstock/photos/588075833/display_1500/stock-photo-elephant-suzi-and-trainer-in-the-lahore-zoo-punjab-pakistan-588075833.jpg",
      "https://www.shutterstock.com/shutterstock/photos/2524742731/display_1500/stock-photo-multan-pakistan-october-kashmir-park-in-multan-punjab-province-pakistan-2524742731.jpg",
      "https://www.shutterstock.com/shutterstock/photos/2524742679/display_1500/stock-photo-multan-pakistan-october-kashmir-park-in-multan-punjab-province-pakistan-2524742679.jpg",
    ],
    ZooDescription:
      "Lahore Zoo is the oldest zoo in Pakistan and one of the oldest in South Asia. Established in 1872, it houses a diverse collection of animals and birds. The zoo is located in the heart of Lahore city and is a popular destination for families and educational trips.",
    Animals: [
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
  },
  {
    ZooId: 2,
    ZooTitle: "Lahore Safari Park",
    LogoPath:
      "https://tse2.mm.bing.net/th/id/OIP.OyH7D4tqb5GdF_J7HjgLUQHaHQ?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    CoverImageFilepath:
      "https://th.bing.com/th/id/R.e967112c84d6ab332fc76717b9e719e6?rik=6S3jtZUUfJiEcg&riu=http%3a%2f%2flocallylahore.com%2fwp-content%2fuploads%2fsp12-768x333.jpg&ehk=90kBmeb3p9n97hicdZ0p8Ce4ksUZTRA7lWP7usT%2f8QQ%3d&risl=&pid=ImgRaw&r=0",
    ZooImages: [
      "https://www.shutterstock.com/shutterstock/photos/1646278351/display_1500/stock-photo-an-adult-leopard-basking-in-the-sun-at-chhatbir-zoo-in-zirakpur-near-chandigarh-in-punjab-india-1646278351.jpg",
      "https://www.shutterstock.com/shutterstock/photos/588075833/display_1500/stock-photo-elephant-suzi-and-trainer-in-the-lahore-zoo-punjab-pakistan-588075833.jpg",
      "https://www.shutterstock.com/shutterstock/photos/2524742731/display_1500/stock-photo-multan-pakistan-october-kashmir-park-in-multan-punjab-province-pakistan-2524742731.jpg",
      "https://www.shutterstock.com/shutterstock/photos/2524742679/display_1500/stock-photo-multan-pakistan-october-kashmir-park-in-multan-punjab-province-pakistan-2524742679.jpg",
    ],
    ZooDescription:
      "Lahore Safari Park, also known as Lahore Wildlife Park, is a large safari park located on Raiwind Road in Lahore. It offers visitors a chance to see animals in more natural settings compared to traditional zoos.",
    Animals: [
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
  },
  {
    ZooId: 3,
    ZooTitle: "Bahawalpur Zoo",
    LogoPath:
      "https://tse2.mm.bing.net/th/id/OIP.OyH7D4tqb5GdF_J7HjgLUQHaHQ?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    CoverImageFilepath:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiPAtR3czeDrdxYuNt34NIhDJ7t68uGAqmgSrEXxDuNByIBeBiha-xvXOwklndvWxgO0f_Hnt1FslVyLKL8ORRtISYOknzzv8x8AtB9kPFHo5lkSM_0fBhtMhUx_ZkTJW0GenRctADnzlNR/s1600/Bahawalpur20Zoo201-76-1516796494.jpg",
    ZooDescription:
      "Bahawalpur Zoo, also known as Shahi Bagh Zoo, is located in Bahawalpur, Punjab. It is one of the major zoos in Pakistan and houses a variety of animals and birds.",
    ZooImages: [
      "https://www.shutterstock.com/shutterstock/photos/1646278351/display_1500/stock-photo-an-adult-leopard-basking-in-the-sun-at-chhatbir-zoo-in-zirakpur-near-chandigarh-in-punjab-india-1646278351.jpg",
      "https://www.shutterstock.com/shutterstock/photos/588075833/display_1500/stock-photo-elephant-suzi-and-trainer-in-the-lahore-zoo-punjab-pakistan-588075833.jpg",
      "https://www.shutterstock.com/shutterstock/photos/2524742731/display_1500/stock-photo-multan-pakistan-october-kashmir-park-in-multan-punjab-province-pakistan-2524742731.jpg",
      "https://www.shutterstock.com/shutterstock/photos/2524742679/display_1500/stock-photo-multan-pakistan-october-kashmir-park-in-multan-punjab-province-pakistan-2524742679.jpg",
    ],
    Animals: [
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
  },
];

export default function ZooProfilePage() {
  const router = useRouter();
  const helper = useHelper();
  const params = useParams();
  const slug = params?.slug;
  const [zooDetails, setZooDetails] = useState({
    ZooId: 1,
    ZooTitle: "Lahore Safari Park",
    ZooDescription:
      "Lahore Safari Park, also known as Lahore Wildlife Park, is a large safari park located on Raiwind Road in Lahore. It offers visitors a chance to see animals in more natural settings compared to traditional zoos.",
    ZooOpeningTime: "5:00 PM",
    ZooClosingTime: "10:00 AM",
    LogoPath:
      "https://tse2.mm.bing.net/th/id/OIP.OyH7D4tqb5GdF_J7HjgLUQHaHQ?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    CoverImageFilepath:
      "https://th.bing.com/th/id/R.e967112c84d6ab332fc76717b9e719e6?rik=6S3jtZUUfJiEcg&riu=http%3a%2f%2flocallylahore.com%2fwp-content%2fuploads%2fsp12-768x333.jpg&ehk=90kBmeb3p9n97hicdZ0p8Ce4ksUZTRA7lWP7usT%2f8QQ%3d&risl=&pid=ImgRaw&r=0",
    ZooImages: [
      "https://www.shutterstock.com/shutterstock/photos/1646278351/display_1500/stock-photo-an-adult-leopard-basking-in-the-sun-at-chhatbir-zoo-in-zirakpur-near-chandigarh-in-punjab-india-1646278351.jpg",
      "https://www.shutterstock.com/shutterstock/photos/588075833/display_1500/stock-photo-elephant-suzi-and-trainer-in-the-lahore-zoo-punjab-pakistan-588075833.jpg",
      "https://www.shutterstock.com/shutterstock/photos/2524742731/display_1500/stock-photo-multan-pakistan-october-kashmir-park-in-multan-punjab-province-pakistan-2524742731.jpg",
      "https://www.shutterstock.com/shutterstock/photos/2524742679/display_1500/stock-photo-multan-pakistan-october-kashmir-park-in-multan-punjab-province-pakistan-2524742679.jpg",
    ],
  });
  const [locations, setLocations] = useState<
    { LocationId: number; LocationName: string; Type: string; Status: string }[]
  >([
    {
      LocationId: 1,
      LocationName: "Monkey Sanctuary",
      Type: "Sanctuary",
      Status: "Open",
    },
    {
      LocationId: 2,
      LocationName: "Tiger In The House",
      Type: "Sanctuary",
      Status: "Open",
    },
    {
      LocationId: 3,
      LocationName: "Birds",
      Type: "Sanctuary",
      Status: "Open",
    },
    {
      LocationId: 4,
      LocationName: "Camel Ride",
      Type: "Sanctuary",
      Status: "Open",
    },
    {
      LocationId: 5,
      LocationName: "Reptile House",
      Type: "Sanctuary",
      Status: "Open",
    },
    {
      LocationId: 6,
      LocationName: "Peacock House",
      Type: "Sanctuary",
      Status: "Closed",
    },
    {
      LocationId: 7,
      LocationName: "Fish Aquarium World",
      Type: "Sanctuary",
      Status: "Under-construstion",
    },
    {
      LocationId: 8,
      LocationName: "Rhinoceros House",
      Type: "Sanctuary",
      Status: "Open",
    },
    {
      LocationId: 9,
      LocationName: "Jungle Cafeteria",
      Type: "Dining",
      Status: "Renovating",
    },
    {
      LocationId: 10,
      LocationName: "Masjid Of Zoo",
      Type: "Prayer Area",
      Status: "Open",
    },
    {
      LocationId: 11,
      LocationName: "Clinic",
      Type: "Facility",
      Status: "Open",
    },
  ]);
  const [animals, setAnimals] = useState<
    {
      AnimalId: number;
      AnimalName: string;
      CategoryName: string;
      Count: number;
    }[]
  >([
    {
      AnimalName: "Bengal Tiger",
      Count: 2,
      CategoryName: "Mammals",
      AnimalId: 1,
    },
    { AnimalName: "Lion", Count: 3, CategoryName: "Mammals", AnimalId: 2 },
    { AnimalName: "Leopard", Count: 1, CategoryName: "Mammals", AnimalId: 3 },
    { AnimalName: "Hog Deer", Count: 14, CategoryName: "Mammals", AnimalId: 4 },
    {
      AnimalName: "Black Buck",
      Count: 8,
      CategoryName: "Mammals",
      AnimalId: 5,
    },
    {
      AnimalName: "Rhesus Monkey",
      Count: 12,
      CategoryName: "Mammals",
      AnimalId: 6,
    },
    { AnimalName: "Peacock", Count: 10, CategoryName: "Birds", AnimalId: 7 },
    { AnimalName: "Pheasant", Count: 8, CategoryName: "Birds", AnimalId: 8 },
    { AnimalName: "Python", Count: 2, CategoryName: "Reptiles", AnimalId: 9 },
    {
      AnimalName: "Marsh Crocodile",
      Count: 4,
      CategoryName: "Reptiles",
      AnimalId: 10,
    },
  ]);

  useEffect(() => {
    if (!isNaN(Number(slug))) {
      helper.xhr
        .Get(
          "/Zoo/GetZooById",
          helper.GetURLParamString({ zooId: Number(slug) }).toString()
        )
        .then((res) => {
          console.log(res);
        });
    }
  }, []);

  // If zoo not found
  if (!zooDetails) {
    return (
      <div className="flex-1 h-full p-8 flex items-center justify-center font-poppins">
        <Card className="w-full max-w-md text-center space-y-4">
          <CardHeader>
            <CardTitle className="tracking-tighter">Zoo Not Found</CardTitle>
            <CardDescription className="text-sm">
              The zoo you are looking for does not exist.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full text-xs" onClick={() => router.back()}>
              Go Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-3">
      <div className="flex items-center gap-4">
        <Image
          src={zooDetails.LogoPath}
          alt={`${zooDetails.ZooTitle} Logo`}
          width={50}
          height={50}
          className="rounded-full"
        />
        <Subheading text={zooDetails.ZooTitle} />
      </div>
      <Tabs defaultValue="history" className="space-y-2">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 w-full">
          <TabsTrigger value="history">
            <History className="h-4 w-4 mr-2" /> Basic Details
          </TabsTrigger>{" "}
          <TabsTrigger value="locations">
            <MapPinned className="h-4 w-4 mr-2" /> Locations
          </TabsTrigger>
          <TabsTrigger value="animals">
            <Paw className="h-4 w-4 mr-2" /> Animals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-2">
          <DetailsTab
            data={{
              name: zooDetails.ZooTitle,
              description: zooDetails.ZooDescription,
              imagePath: zooDetails.CoverImageFilepath,
              zooImages: zooDetails.ZooImages,
              id: zooDetails.ZooId,
            }}
          />
        </TabsContent>

        <TabsContent value="animals" className="space-y-2">
          <Animals data={{ name: zooDetails.ZooTitle, animals: animals }} />
        </TabsContent>
        <TabsContent value="locations" className="space-y-2">
          <Locations
            id={zooDetails.ZooId}
            name={zooDetails.ZooTitle}
            locations={locations}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
