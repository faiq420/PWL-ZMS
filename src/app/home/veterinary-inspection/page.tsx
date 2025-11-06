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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Check,
  ClipboardList,
  Download,
  FileText,
  Filter,
  Plus,
  Search,
  Stethoscope,
  Upload,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import SectionIntro from "@/components/utils/Headings/SectionIntro";
import InspectionTab from "./main-tabs/InspectionTab";
import HealthRecords from "./main-tabs/HealthRecords";
import Enclosures from "./main-tabs/Enclosures";

export default function VeterinaryInspectionPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <SectionIntro
          title="Veterinary Field Inspection"
          description="Manage and track veterinary field inspections."
        />
        {/* <Button className="bg-green-700 hover:bg-green-800" asChild>
          <Link href="/home/veterinary-inspection/new">
            <Plus className="mr-2 h-4 w-4" /> New Inspection
          </Link>
        </Button> */}
      </div>

      <Tabs defaultValue="inspections" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inspections">Inspections</TabsTrigger>
          <TabsTrigger value="health">Health Records</TabsTrigger>
          {/* <TabsTrigger value="enclosures">Enclosures</TabsTrigger> */}
          {/* <TabsTrigger value="reports">Reports</TabsTrigger> */}
        </TabsList>

        <TabsContent value="inspections" className="space-y-4">
          <InspectionTab />
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <HealthRecords />
        </TabsContent>

        <TabsContent value="enclosures" className="space-y-4">
          <Enclosures />
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Veterinary Reports</CardTitle>
              <CardDescription>
                Generate and manage veterinary reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Health Summary</CardTitle>
                    <CardDescription>
                      Overall animal health status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Healthy</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: "78%" }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Under Monitoring</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full"
                          style={{ width: "15%" }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Under Treatment</span>
                        <span className="font-medium">7%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-500 rounded-full"
                          style={{ width: "7%" }}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/home/veterinary-inspection/reports/health-summary">
                        <Download className="mr-2 h-4 w-4" /> Download Report
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Inspection Compliance
                    </CardTitle>
                    <CardDescription>
                      Scheduled vs. completed inspections
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center h-40">
                      <div className="text-5xl font-bold text-green-600">
                        92%
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">
                        Compliance Rate
                      </div>
                      <div className="text-xs mt-4">
                        <span className="text-muted-foreground">
                          Total Scheduled:{" "}
                        </span>
                        <span className="font-medium">125</span>
                        <span className="text-muted-foreground ml-2">
                          Completed:{" "}
                        </span>
                        <span className="font-medium">115</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/home/veterinary-inspection/reports/compliance">
                        <Download className="mr-2 h-4 w-4" /> Download Report
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Medication Usage</CardTitle>
                    <CardDescription>
                      Medication inventory and usage
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Antibiotics</span>
                        <span className="font-medium">32%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: "32%" }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Anti-inflammatory</span>
                        <span className="font-medium">28%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500 rounded-full"
                          style={{ width: "28%" }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Parasiticides</span>
                        <span className="font-medium">25%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-500 rounded-full"
                          style={{ width: "25%" }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Others</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gray-500 rounded-full"
                          style={{ width: "15%" }}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/home/veterinary-inspection/reports/medication">
                        <Download className="mr-2 h-4 w-4" /> Download Report
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Generated Reports</CardTitle>
                  <CardDescription>
                    Recently generated and saved reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="relative w-full overflow-auto">
                      <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th className="h-12 px-4 text-left align-middle font-medium">
                              Report Name
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium">
                              Type
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium">
                              Generated By
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium">
                              Date
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                          {[
                            {
                              name: "Monthly Health Summary - April 2023",
                              slug: "report-001-monthly-health-summary-april-2023",
                              type: "Health Summary",
                              generatedBy: "Dr. Sarah Johnson",
                              date: "2023-04-30",
                            },
                            {
                              name: "Quarterly Inspection Report - Q1 2023",
                              slug: "report-002-quarterly-inspection-report-q1-2023",
                              type: "Inspection Report",
                              generatedBy: "Dr. Michael Chen",
                              date: "2023-04-15",
                            },
                            {
                              name: "Medication Usage Report - April 2023",
                              slug: "report-003-medication-usage-report-april-2023",
                              type: "Medication Report",
                              generatedBy: "Dr. Emily Rodriguez",
                              date: "2023-04-28",
                            },
                            {
                              name: "Enclosure Condition Assessment - Q1 2023",
                              slug: "report-004-enclosure-condition-assessment-q1-2023",
                              type: "Enclosure Report",
                              generatedBy: "Dr. Michael Chen",
                              date: "2023-04-10",
                            },
                            {
                              name: "Nutrition Analysis - April 2023",
                              slug: "report-005-nutrition-analysis-april-2023",
                              type: "Nutrition Report",
                              generatedBy: "Dr. Sarah Johnson",
                              date: "2023-04-25",
                            },
                          ].map((report, index) => (
                            <tr
                              key={index}
                              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                            >
                              <td className="p-4 align-middle">
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <Link
                                    href={`/home/veterinary-inspection/reports/${report.slug}`}
                                    className="hover:underline"
                                  >
                                    {report.name}
                                  </Link>
                                </div>
                              </td>
                              <td className="p-4 align-middle">
                                {report.type}
                              </td>
                              <td className="p-4 align-middle">
                                {report.generatedBy}
                              </td>
                              <td className="p-4 align-middle">
                                {report.date}
                              </td>
                              <td className="p-4 align-middle">
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm" asChild>
                                    <Link
                                      href={`/home/veterinary-inspection/reports/${report.slug}`}
                                    >
                                      View
                                    </Link>
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4" />
                                    <span className="sr-only">Download</span>
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" /> Upload Report
                  </Button>
                  <Button className="bg-green-700 hover:bg-green-800" asChild>
                    <Link href="/home/veterinary-inspection/reports/new">
                      <Plus className="mr-2 h-4 w-4" /> Generate New Report
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
