import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface MetricPresentationCardProps {
  Title: string;
  icon: React.ReactNode;
  Count: number;
  Description: string;
}

const MetricPresentationCard: React.FC<MetricPresentationCardProps> = ({
  Title,
  icon,
  Count,
  Description,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{Title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{Count}</div>
        <p className="text-xs text-muted-foreground">{Description}</p>
      </CardContent>
    </Card>
  );
};

export default MetricPresentationCard;
