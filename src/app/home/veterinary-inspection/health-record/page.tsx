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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  ChevronLeft,
  Download,
  FileText,
  LineChart,
  Plus,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CardIntro from "@/components/utils/Headings/CardIntro";
import ButtonComp from "@/components/utils/Button";
import Subheading from "@/components/utils/Headings/Subheading";
import { changeDateFormat } from "@/Helper/DateFormats";
import HistoryCard from "../[slug]/View/components/HistoryCard";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function AnimalHealthRecordPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const animal = {
    Id: "ANI-001",
    Name: "Zara",
    Species: "African Elephant",
    Age: "15 years",
    BirthDate: "2008-06-12",
    Weight: 3420,
    Status: "healthy",
    Enclosure: "Elephant Habitat - Eastern Section",
    Diet: "Specialized herbivore diet with seasonal vegetables and fruits. Daily supplements.",
    Image: "/placeholder.svg?height=400&width=400",
    // recentInspections: [
    //   {
    //     id: "INS-2023-001",
    //     date: "2023-04-15",
    //     inspector: "Dr. Sarah Johnson",
    //     findings: "Minor inflammation in left rear foot",
    //     status: "completed",
    //     slug: "ins-2023-001-zara-african-elephant",
    //   },
    //   {
    //     id: "INS-2022-045",
    //     date: "2022-12-10",
    //     inspector: "Dr. Michael Chen",
    //     findings: "Annual checkup. All systems normal.",
    //     status: "completed",
    //     slug: "ins-2022-045-zara-african-elephant",
    //   },
    //   {
    //     id: "INS-2022-033",
    //     date: "2022-10-05",
    //     inspector: "Dr. Sarah Johnson",
    //     findings: "Routine tusk examination and trimming",
    //     status: "completed",
    //     slug: "ins-2022-033-zara-african-elephant",
    //   },
    // ],
    vaccinations: [
      {
        name: "Tetanus",
        date: "2022-05-15",
        administrator: "Dr. Emily Rodriguez",
        nextDueDate: "2025-05-15",
      },
      {
        name: "Rabies",
        date: "2023-02-20",
        administrator: "Dr. Michael Chen",
        nextDueDate: "2025-02-20",
      },
    ],
  };
  const [recentInspections, setRecentInspections] = useState([
    {
      Id: "INS-2023-001",
      Date: "2023-04-15T10:31:00.00z",
      Inspector: "Dr. Sarah Johnson",
      Findings: "Minor inflammation in left rear foot",
      Status: "completed",
      Slug: "ins-2023-001-zara-african-elephant",
    },
    {
      Id: "INS-2022-045",
      Date: "2022-12-10T10:31:00.00z",
      Inspector: "Dr. Michael Chen",
      Findings: "Annual checkup. All systems normal.",
      Status: "completed",
      Slug: "ins-2022-045-zara-african-elephant",
    },
    {
      Id: "INS-2022-033",
      Date: "2022-10-05T10:31:00.00z",
      Inspector: "Dr. Sarah Johnson",
      Findings: "Routine tusk examination and trimming",
      Status: "completed",
      Slug: "ins-2022-033-zara-african-elephant",
    },
    {
      Id: "INS-2022-012",
      Date: "2022-05-22T10:31:00.00z",
      Inspector: "Dr. Emily Rodriguez",
      Findings: "Blood work and vitamin levels check",
      Status: "completed",
      Slug: "ins-2022-012-zara-african-elephant",
    },
  ]);
  const [medicalHistory, setMedicalHistory] = useState([
    {
      Condition: "Foot inflammation",
      DiagnosedDate: "2023-04-15",
      Treatment: "Anti-inflammatory medication and reduced weight-bearing",
      Status: "Resolved",
      ResolvedDate: "2023-05-01",
    },
    {
      Condition: "Seasonal allergies",
      DiagnosedDate: "2022-08-10",
      Treatment: "Antihistamines as needed during peak seasons",
      Status: "Managed",
      ResolvedDate: null,
    },
  ]);
  const [vitalTrends, setVitalTrends] = useState([
    {
      Date: "2023-04-15",
      HeartRate: 89,
      Temperature: 36.5,
      RespiratoryRate: 12,
      Weight: 3420,
    },
    {
      Date: "2025-04-01",
      HeartRate: 85,
      Temperature: 35.5,
      RespiratoryRate: 12,
      Weight: 3425,
    },
  ]);

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/home/veterinary-inspection">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Health Records
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <Card className="overflow-hidden">
            <div className="relative h-60 w-full">
              <Image
                src={animal.Image || "/placeholder.svg"}
                alt={animal.Name}
                fill
                className="object-cover"
              />
              <div
                className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                  animal.Status === "healthy"
                    ? "bg-green-100 text-green-800"
                    : animal.Status === "monitoring"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {animal.Status.charAt(0).toUpperCase() + animal.Status.slice(1)}
              </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardIntro title={animal.Name} description={animal.Species} />
                <p className="text-sm font-medium font-poppins">
                  ID: {animal.Id}
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 mt-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Age
                  </h3>
                  <p className="text-sm">{animal.Age}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Weight
                  </h3>
                  <p className="text-sm">{animal.Weight.toLocaleString()} kg</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Birth Date
                  </h3>
                  <p className="text-sm">{changeDateFormat(animal.BirthDate)}</p>
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Enclosure
                </h3>
                <p className="text-sm">{animal.Enclosure}</p>
              </div>
            </CardContent>
            <CardFooter>
              <ButtonComp
                text="New Health Check"
                beforeIcon={<Stethoscope className="mr-2 h-4 w-4" />}
                clickEvent={() =>
                  router.push(
                    `/home/veterinary-inspection/new?animal=${animal.Id}`
                  )
                }
              />
            </CardFooter>
          </Card>
        </div>

        <div className="md:w-2/3 space-y-4">
          <div className="flex items-center justify-between">
            <Subheading text="Health Records" />
            <div className="w-fit">
              <ButtonComp
                type={"white"}
                text="Generate Report"
                clickEvent={() => {}}
                beforeIcon={<FileText className="mr-2 h-4 w-4" />}
              />
            </div>
          </div>

          <Tabs defaultValue="inspections" className="space-y-4">
            <TabsList>
              <TabsTrigger value="inspections">Inspections</TabsTrigger>
              <TabsTrigger value="medical">Medical History</TabsTrigger>
              {/* <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger> */}
              <TabsTrigger value="vitals">Vital Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="inspections" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-end">
                    <CardIntro
                      title="Recent Inspections"
                      description={`Health checks and inspections for ${animal.Name}`}
                    />
                    <div className="w-fit">
                      <ButtonComp
                        type={"white"}
                        text="New Inspection"
                        clickEvent={() => {}}
                        beforeIcon={<Plus className="mr-2 h-4 w-4" />}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="mt-3">
                  <div className="space-y-2">
                    {recentInspections.map((record, index) => (
                      <HistoryCard
                        isCurrent={false}
                        InspectionId={record.Id}
                        Slug={record.Slug}
                        key={index}
                        Status={record.Status}
                        Date={changeDateFormat(record.Date)}
                        Inspector={record.Inspector}
                        Findings={record.Findings}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="medical" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardIntro
                    title="Medical History"
                    description="Medical conditions and treatments"
                  />
                </CardHeader>
                <CardContent className="mt-3">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Condition</TableHead>
                          <TableHead>Diagnosed</TableHead>
                          <TableHead>Treatment</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Resolved</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="">
                        {medicalHistory.map((history, index) => (
                          <TableRow key={index}>
                            <TableCell>{history.Condition}</TableCell>
                            <TableCell>
                              {changeDateFormat(history.DiagnosedDate)}
                            </TableCell>
                            <TableCell>{history.Treatment}</TableCell>
                            <TableCell>{history.Status}</TableCell>
                            <TableCell>
                              {history.ResolvedDate
                                ? changeDateFormat(history.ResolvedDate)
                                : "Ongoing"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vaccinations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Vaccination Records</CardTitle>
                  <CardDescription>Immunization history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="relative w-full overflow-auto">
                      <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th className="h-12 px-4 text-left align-middle font-medium">
                              Vaccine
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium">
                              Date
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium">
                              Administered By
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium">
                              Next Due
                            </th>
                          </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                          {animal.vaccinations.map((vaccine, index) => (
                            <tr
                              key={index}
                              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                            >
                              <td className="p-4 align-middle font-medium">
                                {vaccine.name}
                              </td>
                              <td className="p-4 align-middle">
                                {vaccine.date}
                              </td>
                              <td className="p-4 align-middle">
                                {vaccine.administrator}
                              </td>
                              <td className="p-4 align-middle">
                                <div className="flex items-center">
                                  <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                                  {vaccine.nextDueDate}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Add Vaccination
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="vitals" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-end">
                    <CardIntro
                      title="Vital Sign Trends"
                      description="Track changes in vital measurements over time"
                    />
                    <div className="w-fit">
                      <ButtonComp
                        text="Export Vital Data"
                        clickEvent={() => {}}
                        type={"white"}
                        beforeIcon={<Download className="mr-2 h-4 w-4" />}
                      />
                    </div>
                  </div>
                  <CardTitle></CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 mt-3">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Heart Rate</TableHead>
                          <TableHead>Respiratory Rate</TableHead>
                          <TableHead>Temperature</TableHead>
                          <TableHead>Weight</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {vitalTrends.map((vitals, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              {changeDateFormat(vitals.Date)}
                            </TableCell>
                            <TableCell>{vitals.HeartRate} BPM</TableCell>
                            <TableCell>{vitals.RespiratoryRate} BPM</TableCell>
                            <TableCell>{vitals.Temperature} °C</TableCell>
                            <TableCell>{vitals.Weight} kg</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
