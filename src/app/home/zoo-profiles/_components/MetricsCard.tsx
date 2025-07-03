import { Card, CardContent } from "@/components/ui/card";
import React from "react";

interface Props {
  MetricCount: number;
  Title: string;
  Description: string;
  className: string;
}

const MetricsCard = ({ MetricCount, Title, Description, className }: Props) => {
  return (
    <Card className={`${className}`}>
      <CardContent className="flex space-x-3 pt-6">
        <div className="text-4xl font-bold">{MetricCount}</div>
        <div className="text-xs">
          <p className="text-sm">{Title}</p>
          <p className="">{Description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
