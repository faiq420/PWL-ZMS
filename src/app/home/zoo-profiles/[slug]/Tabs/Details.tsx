"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BodyText from "@/components/utils/Headings/BodyText";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { HistoryModal } from "@/components/modals/history-modal";
import CardIntro from "@/components/utils/Headings/CardIntro";
import { useRouter } from "next/navigation";
import useHelper from "@/Helper/helper";

type objType = {
  name: string;
  description: string;
  imagePath: string;
  zooImages: string[];
  id: string | number;
};

interface Props {
  data: objType;
}

const DetailsTab = ({ data }: Props) => {
  const router = useRouter();
  const helper = useHelper();
  const [historyModal, setHistoryModal] = useState({
    isOpen: false,
    mode: "edit" as "edit" | "view",
  });

  console.log(data);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between mb-2">
          <div>
            <CardTitle>
              <CardIntro title={`Details of ${data.name}`} />
            </CardTitle>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={
                () => router.push(`/home/zoo-profiles/${data.id}?tab=edit`)
                // setHistoryModal({ isOpen: true, mode: "edit" })
              }
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative h-64 w-full rounded-lg overflow-hidden">
            <Image
              src={
                data.imagePath != ""
                  ? helper.GetDocument(data.imagePath)
                  : "/placeholder.svg"
              }
              alt={`${data.name} Historical Photo`}
              fill
              unoptimized
              className="object-cover"
            />
          </div>

          <BodyText text={data.description} />

          {/* 🔥 Add Zoo Images Below */}
          {data.zooImages?.length > 0 && (
            <div className="space-y-3">
              <BodyText text="More Images" />

              {/* Horizontal scroll strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 pb-2">
                {data.zooImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative h-[120px] rounded-lg overflow-hidden shadow-sm hover:scale-[1.02] transition-transform"
                  >
                    <Image
                      src={
                        img != "" ? helper.GetDocument(img) : "/placeholder.svg"
                      }
                      alt={`Image ${idx + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>

              {/* Masonry grid auto-enabled for >5 images */}
              {/* {zooData.zooImages.length > 5 && (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {zooData.zooImages.map((img, idx) => (
                    <div
                      key={"masonry-" + idx}
                      className="relative w-full h-40 rounded-lg overflow-hidden shadow-sm"
                    >
                      <Image
                        src={img}
                        alt={`Grid ${idx + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              )} */}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default DetailsTab;
