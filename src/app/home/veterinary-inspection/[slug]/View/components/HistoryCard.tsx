import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  InspectionId: string;
  Status: string;
  Date: string;
  Inspector: string;
  Findings: string;
  Slug: string;
  isCurrent: boolean;
}

const HistoryCard = ({
  InspectionId,
  Status,
  Date,
  Inspector,
  Findings,
  Slug,
  isCurrent,
}: Props) => {
  return (
    <div className="flex items-start space-x-4 border rounded-lg p-4">
      <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 bg-muted rounded-full">
        <FileText className="h-6 w-6 text-muted-foreground" />
      </div>
      <div className="flex-1 space-y-1">
        <p className="font-medium font-poppins">{InspectionId}</p>
        <p className="text-muted-foreground text-sm">
          {Date} • {Inspector}
        </p>
        <p className="text-sm">{Findings}</p>
      </div>
      <div className="flex flex-col justify-between gap-3">
        <Badge
          className={
            Status === "completed"
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : "bg-blue-100 text-blue-800 hover:bg-blue-100"
          }
        >
          {Status.charAt(0).toUpperCase() + Status.slice(1)}
        </Badge>
        {!isCurrent && (
          <Button variant="outline" size="sm" asChild className="flex-shrink-0">
            <Link href={`/home/veterinary-inspection/${Slug}/View`}>View</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default HistoryCard;
