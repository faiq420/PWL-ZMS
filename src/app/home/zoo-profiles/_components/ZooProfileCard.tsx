"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ButtonComp from "@/components/utils/Button";
import Paragraph from "@/components/utils/Headings/Paragraph";
import { MapPin } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  zoo: ZooType;
}

type ZooType = {
  name: string;
  location: string;
  type: string;
  image: string | StaticImageData;
  status: string;
  slug: string;
  description: string;
};

const ZooProfileCard = ({ zoo }: Props) => {
  const router = useRouter();
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image
          src={zoo.image || "/placeholder.svg"}
          alt={zoo.name}
          fill
          className="object-cover"
        />
        {/* <div
                className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                  zoo.status === "active"
                    ? "bg-green-100 text-green-800"
                    : zoo.status === "seasonal"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {zoo.status === "active"
                  ? "Active"
                  : zoo.status === "seasonal"
                  ? "Seasonal"
                  : "Maintenance"}
              </div> */}
      </div>
      <CardHeader className="space-y-0.5">
        <CardTitle>
          <Paragraph
            className="font-semibold text-sm uppercase font-faustina"
            text={zoo.name}
          />
        </CardTitle>
        <CardDescription className="flex text-xs items-center font-faustina">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{zoo.location}</span>
        </CardDescription>
      </CardHeader>
      {/* <CardContent>
              <div className="space-y-2 font-syne">
                <div className="flex items-center text-sm">
                  <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{zoo.type}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center text-sm">
                  <ThermometerSun className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>32°C / Sunny</span>
                </div>
              </div>
            </CardContent> */}
      <CardFooter className="flex justify-end mt-2">
        <ButtonComp
          clickEvent={() => {
            router.push(`/home/zoo-profiles/${zoo.slug}`);
          }}
          text="View Details"
          type={"white"}
        />
      </CardFooter>
    </Card>
  );
};

export default ZooProfileCard;
