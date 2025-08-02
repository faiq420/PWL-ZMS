import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ButtonComp from "@/components/utils/Button";
import { BookCopy, LineChart, LucideProps } from "lucide-react";
import React from "react";

interface Props {
  title: string;
  Icon: any;
  metrics: string;
  description: string;
}

const ReportCards = ({ title, Icon, metrics, description }: Props) => {
  return (
    <Card className="font-poppins">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-xl font-semibold">{metrics}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className="w-fit mt-2">
          <ButtonComp
            type={"white"}
            text="View Report"
            clickEvent={() => {}}
            beforeIcon={<BookCopy className="h-4 w-4" />}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportCards;
