"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, FileText, LineChart, ListChecks, Users } from "lucide-react";
import SectionIntro from "@/components/utils/Headings/SectionIntro";
import { useState } from "react";
import ReportCards from "./components/ReportCards";
import CardIntro from "@/components/utils/Headings/CardIntro";
import ButtonComp from "@/components/utils/Button";
import useHelper from "@/Helper/helper";

export default function ReportsLogsPage() {
  const helper = useHelper();
  const pageData = helper.GetPageData();
  const [cardData, setCardData] = useState([
    {
      title: "Visitor Statistics",
      Icon: LineChart,
      metrics: "1,234,567",
      description: "Total visitors this year",
    },
    {
      title: "Animal Health Overview",
      Icon: ListChecks,
      metrics: "98% Healthy",
      description: "Based on latest inspections",
    },
    {
      title: "User Activity Report",
      Icon: Users,
      metrics: "52",
      description: "Users logged in last 24 hours",
    },
    {
      title: "Financial Summary",
      Icon: FileText,
      metrics: "Rs 1.5M Revenue",
      description: "Q2 2024",
    },
  ]);
  const [activityLogs, setActivityLogs] = useState<string[]>([
    "[2025-07-16 10:30 AM] Admin 'John Doe' updated menu item 'Dashboard'.",
    "[2025-07-16 10:25 AM] User 'Jane Smith' booked a trip to 'Safari Park'.",
    "[2025-07-16 10:20 AM] Veterinary Doctor 'Dr. Alex' added a new health record for 'Lion Simba'.",
    "[2025-07-16 10:15 AM] System: Daily backup completed successfully.",
    "[2025-07-16 10:10 AM] Zoo Incharge 'Alice Brown' updated enclosure 'Tropical Birds'.",
  ]);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <SectionIntro
          title={pageData?.MenuName}
          description={pageData?.Description}
        />
      </div>
      <Tabs defaultValue="reports" className="w-full">
        <TabsList className="flex w-full">
          <TabsTrigger value="reports" className="flex-1">
            Reports
          </TabsTrigger>
          <TabsTrigger value="audit-trail" className="flex-1">
            Audit Trail
          </TabsTrigger>
          {/* <TabsTrigger value="error-logs">Error Logs</TabsTrigger>
          <TabsTrigger value="audit-trail">Audit Trail</TabsTrigger> */}
        </TabsList>

        <TabsContent value="reports" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cardData.map((card: any, index: number) => (
              <ReportCards
                title={card.title}
                Icon={card.Icon}
                metrics={card.metrics}
                description={card.description}
                key={index}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="audit-trail" className="mt-6">
          <Card>
            <CardHeader className="">
              <div className="flex justify-between items-end">
                <CardIntro
                  title="Recent Activity Logs"
                  description="Overview of recent user and system activities."
                />
                <div className="w-fit">
                  <ButtonComp
                    text="Download Full Log"
                    type={"white"}
                    clickEvent={() => {}}
                    beforeIcon={<Download className="h-4 w-4" />}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-xs text-muted-foreground mt-3 list-disc">
                {activityLogs.map((log: string, index: number) => (
                  <li key={index}>{log}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* <TabsContent value="error-logs" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>System Error Logs</CardTitle>
              <CardDescription>
                Records of system errors and warnings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="text-red-500">
                  [2025-07-16 09:45 AM] ERROR: Database connection failed.
                </li>
                <li className="text-orange-500">
                  [2025-07-16 09:30 AM] WARNING: API rate limit exceeded for
                  external service.
                </li>
                <li className="text-red-500">
                  [2025-07-16 08:15 AM] ERROR: Failed to process payment for
                  user '12345'.
                </li>
                <li className="text-orange-500">
                  [2025-07-16 07:00 AM] WARNING: Disk space low on server
                  'web-01'.
                </li>
              </ul>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 bg-transparent"
              >
                <Download className="mr-2 h-4 w-4" /> Download Error Log
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit-trail" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Audit Trail</CardTitle>
              <CardDescription>
                Detailed log of all critical system changes and administrative
                actions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  [2025-07-16 10:30 AM] Admin 'John Doe' changed role 'Zoo
                  Incharge' permissions.
                </li>
                <li>
                  [2025-07-16 09:00 AM] Super Admin 'System' created new user
                  'Jane Doe'.
                </li>
                <li>
                  [2025-07-15 05:00 PM] Admin 'John Doe' deleted menu item 'Old
                  Feature'.
                </li>
                <li>
                  [2025-07-15 04:30 PM] Super Admin 'System' updated system
                  configuration 'Email Settings'.
                </li>
              </ul>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 bg-transparent"
              >
                <Download className="mr-2 h-4 w-4" /> Download Audit Trail
              </Button>
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
