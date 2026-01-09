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
import SectionIntro from "@/components/utils/Headings/SectionIntro";
import { useEffect, useState } from "react";
import useHelper from "@/Helper/helper";
import Unauthorized from "../../unauthorized/page";

export default function ZooProfilesPage() {
  const router = useRouter();
  const helper = useHelper();
  const pageData = helper.GetPageData();
  const [zooProfiles, setZooProfiles] = useState<
    {
      ZooId: number;
      ZooTitle: string;
      ZooDescription: string;
      CoverImageFilepath: string;
      ZooLogoFilepath: string;
      ZooOpeningTime: string;
      ZooClosingTime: string;
    }[]
  >([]);

  useEffect(() => {
    helper.xhr.Get("/Zoo/GetAllZoo").then((res) => {
      setZooProfiles(res);
    });
  }, []);

  return (
    <div className="flex-1 space-y-4">
      <div className="md:flex justify-between items-end">
        <SectionIntro
          title={pageData?.MenuName}
          description={pageData?.Description}
        />
        {pageData?.permissions.create && (
          <div className="w-fit">
            <ButtonComp
              type="dark"
              text="Add New Zoo"
              beforeIcon={<Plus />}
              clickEvent={() => router.push("/home/zoo-profiles/new")}
            />
          </div>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {zooProfiles.map((zoo) => (
          <ZooProfileCard zoo={zoo} key={zoo.ZooId} />
        ))}
      </div>
    </div>
  );
}
