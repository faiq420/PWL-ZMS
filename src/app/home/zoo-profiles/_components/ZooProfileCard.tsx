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
      </div>
      <CardHeader className="space-y-0.5">
        <CardTitle>
          <Paragraph
            className="font-semibold !text-base uppercase font-poppins"
            text={zoo.name}
          />
        </CardTitle>
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
