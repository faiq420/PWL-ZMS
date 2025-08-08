"use client";
import { Badge } from "@/components/ui/badge";
import ButtonComp from "@/components/utils/Button";
import { changeDateFormat } from "@/Helper/DateFormats";
import { ClipboardList } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  inspection: {
    Id: string;
    Status: string;
    Date: string;
    Inspector: string;
    Findings: string;
  };
}

const InspectionDetailCard = ({ inspection }: Props) => {
  const router = useRouter();
  return (
    <div className="flex items-start space-x-4 border rounded-lg p-4">
      <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 bg-muted rounded-full">
        <ClipboardList className="h-6 w-6 text-muted-foreground" />
      </div>
      <div className="flex-1 space-y-1">
        <p className="font-medium font-poppins">{inspection.Id}</p>
        <p className="text-muted-foreground text-sm">
          {changeDateFormat(inspection.Date)} • {inspection.Inspector}
        </p>
        <p className="text-sm">{inspection.Findings}</p>
      </div>
      <div className="flex flex-col justify-between space-y-4">
        <Badge
          className={
            inspection.Status === "excellent"
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : inspection.Status === "good"
              ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
              : "bg-amber-100 text-amber-800 hover:bg-amber-100"
          }
        >
          {inspection.Status.charAt(0).toUpperCase() +
            inspection.Status.slice(1)}
        </Badge>
        <div className="w-fit">
          <ButtonComp
            text="View"
            type={"white"}
            clickEvent={() =>
              router.push(
                `/home/veterinary-inspection/enclosure-details?id=${inspection.Id}`
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default InspectionDetailCard;
