"use client";
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
import ButtonComp from "@/components/utils/Button";
import BodyText from "@/components/utils/Headings/BodyText";
import Heading from "@/components/utils/Headings/Heading";
import Paragraph from "@/components/utils/Headings/Paragraph";
import {
  Building,
  Clock,
  MapPin,
  Plus,
  Search,
  ThermometerSun,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ZooProfileCard from "./_components/ZooProfileCard";

export default function ZooProfilesPage() {
  const router = useRouter();
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <Heading text={"Zoo Profiles"} />
        {/* <Button className="bg-green-700 hover:bg-green-800">
          <Plus className="mr-2 h-4 w-4" /> Add New Zoo
        </Button> */}
      </div>

      {/* <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search zoos..."
            className="w-full pl-8"
          />
        </div>
      </div> */}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            name: "Lahore Zoo",
            location: "Lahore, Punjab, Pakistan",
            type: "Urban Wildlife",
            image:
              "https://zameenblog.s3.amazonaws.com/blog/wp-content/uploads/2021/03/Cover-1440x625-2.jpg",
            status: "active",
            slug: "1",
            description:
              "Established in 1872, Lahore Zoo is one of the oldest zoos in South Asia, featuring a diverse collection of animals and birds.",
          },
          {
            name: "Lahore Safari Park",
            location: "Lahore, Punjab, Pakistan",
            type: "Safari & Conservation",
            image:
              "https://th.bing.com/th/id/R.e967112c84d6ab332fc76717b9e719e6?rik=6S3jtZUUfJiEcg&riu=http%3a%2f%2flocallylahore.com%2fwp-content%2fuploads%2fsp12-768x333.jpg&ehk=90kBmeb3p9n97hicdZ0p8Ce4ksUZTRA7lWP7usT%2f8QQ%3d&risl=&pid=ImgRaw&r=0",
            status: "active",
            slug: "2",
            description:
              "A large wildlife sanctuary offering safari experiences and conservation efforts for endangered species native to Pakistan.",
          },
          {
            name: "Bahawalpur Zoo",
            location: "Bahawalpur, Punjab, Pakistan",
            type: "Historical Zoo",
            image:
              "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiPAtR3czeDrdxYuNt34NIhDJ7t68uGAqmgSrEXxDuNByIBeBiha-xvXOwklndvWxgO0f_Hnt1FslVyLKL8ORRtISYOknzzv8x8AtB9kPFHo5lkSM_0fBhtMhUx_ZkTJW0GenRctADnzlNR/s1600/Bahawalpur20Zoo201-76-1516796494.jpg",
            status: "active",
            slug: "3",
            description:
              "Founded in 1942, Bahawalpur Zoo houses a variety of animals and is known for its historical significance and educational programs.",
          },
        ].map((zoo) => (
          <ZooProfileCard zoo={zoo} key={zoo.name} />
          // <Card key={zoo.name} className="overflow-hidden">
          //   <div className="relative h-48">
          //     <Image
          //       src={zoo.image || "/placeholder.svg"}
          //       alt={zoo.name}
          //       fill
          //       className="object-cover"
          //     />
          //     {/* <div
          //       className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
          //         zoo.status === "active"
          //           ? "bg-green-100 text-green-800"
          //           : zoo.status === "seasonal"
          //           ? "bg-blue-100 text-blue-800"
          //           : "bg-amber-100 text-amber-800"
          //       }`}
          //     >
          //       {zoo.status === "active"
          //         ? "Active"
          //         : zoo.status === "seasonal"
          //         ? "Seasonal"
          //         : "Maintenance"}
          //     </div> */}
          //   </div>
          //   <CardHeader>
          //     <CardTitle>
          //       <Paragraph
          //         className="font-semibold text-sm uppercase font-faustina"
          //         text={zoo.name}
          //       />
          //     </CardTitle>
          //     <CardDescription className="flex text-xs items-center font-faustina">
          //       <MapPin className="h-3 w-3 mr-1" />
          //       <span>{zoo.location}</span>
          //     </CardDescription>
          //   </CardHeader>
          //   {/* <CardContent>
          //     <div className="space-y-2 font-syne">
          //       <div className="flex items-center text-sm">
          //         <Building className="h-4 w-4 mr-2 text-muted-foreground" />
          //         <span>{zoo.type}</span>
          //       </div>
          //       <div className="flex items-center text-sm">
          //         <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
          //         <span>9:00 AM - 6:00 PM</span>
          //       </div>
          //       <div className="flex items-center text-sm">
          //         <ThermometerSun className="h-4 w-4 mr-2 text-muted-foreground" />
          //         <span>32°C / Sunny</span>
          //       </div>
          //     </div>
          //   </CardContent> */}
          //   <CardFooter className="flex justify-end">
          //     <ButtonComp />
          //     <Link href={`/home/zoo-profiles/${zoo.slug}`}>
          //       <Button variant="outline" size="sm">
          //         View Details
          //       </Button>
          //     </Link>
          //     {/* <Button variant="outline" size="sm">
          //       Edit
          //     </Button> */}
          //   </CardFooter>
          // </Card>
        ))}
      </div>
    </div>
  );
}
