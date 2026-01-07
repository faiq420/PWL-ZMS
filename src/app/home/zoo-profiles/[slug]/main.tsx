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
import Tickets from "./Tabs/Tickets";

export default function ZooProfilePage() {
  const router = useRouter();
  const helper = useHelper();
  const params = useParams();
  const slug = params?.slug;
  const [zooDetails, setZooDetails] = useState({
    ZooId: 1,
    ZooTitle: "",
    ZooDescription: "",
    ZooOpeningTime: "",
    ZooClosingTime: "",
    ZooLogoFilepath: "",
    CoverImageFilepath: "",
    ZooImages: ["", "", "", ""],
  });
  const [locations, setLocations] = useState<
    { LocationId: number; LocationName: string; Type: string; Status: string }[]
  >([]);
  const [animals, setAnimals] = useState<
    {
      AnimalId: number;
      AnimalName: string;
      CategoryName: string;
      Count: number;
    }[]
  >([]);
  const [tickets, setTickets] = useState<
    { TicketId: number; TicketName: string }[]
  >([]);

  useEffect(() => {
    if (!isNaN(Number(slug))) {
      helper.xhr
        .Get(
          "/Zoo/GetZooById",
          helper.GetURLParamString({ zooId: Number(slug) }).toString()
        )
        .then((res: any) => {
          console.log(res);
          setZooDetails({
            ...res.zoo_details,
            ZooImages: res.zoo_details.zooFiles.flatMap(
              (file: any) => file.ZooFilepath
            ),
          });
          setLocations(res.locations);
          setAnimals(res.animal_details);
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
          src={
            zooDetails.ZooLogoFilepath != ""
              ? helper.GetDocument(zooDetails.ZooLogoFilepath)
              : "/placeholder.svg"
          }
          alt={`${zooDetails.ZooTitle} Logo`}
          width={50}
          height={50}
          className="rounded-full"
        />
        <Subheading text={zooDetails.ZooTitle} />
      </div>
      <Tabs defaultValue="history" className="space-y-2">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
          <TabsTrigger value="history">
            <History className="h-4 w-4 mr-2" /> Basic Details
          </TabsTrigger>{" "}
          <TabsTrigger value="locations">
            <MapPinned className="h-4 w-4 mr-2" /> Locations
          </TabsTrigger>
          <TabsTrigger value="animals">
            <Paw className="h-4 w-4 mr-2" /> Animals
          </TabsTrigger>
          <TabsTrigger value="tickets">
            <Ticket className="h-4 w-4 mr-2" /> Tickets
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
        <TabsContent value="tickets" className="space-y-2">
          <Tickets
            id={zooDetails.ZooId}
            name={zooDetails.ZooTitle}
            tickets={tickets}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
