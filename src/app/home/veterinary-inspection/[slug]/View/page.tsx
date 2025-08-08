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
  Edit,
  FileText,
  Printer,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import { useState } from "react";
import useHelper from "@/Helper/helper";
import CardIntro from "@/components/utils/Headings/CardIntro";
import Subheading from "@/components/utils/Headings/Subheading";
import {
  changeDateFormat,
  changeDateFormatWithTime,
} from "@/Helper/DateFormats";
import VitalSignCard from "./components/VitalSignCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ButtonComp from "@/components/utils/Button";
import HistoryCard from "./components/HistoryCard";

export default function InspectionDetailsPage() {
  const params = useParams();
  const helper = useHelper();
  const slug = params.slug as string;
  const [recommendations, setRecommendations] = useState<string[]>([
    "Apply topical anti-inflammatory to left rear foot twice daily",
    "Monitor weight distribution when standing",
    "Follow up in 2 weeks to reassess inflammation",
    "Continue current diet and supplement regimen",
  ]);
  const [vitalSigns, setVitalSigns] = useState({
    temperature: 36.2,
    heartRate: 28,
    respiratoryRate: 10,
    weight: 3420,
  });
  const [medications, setMedications] = useState([
    {
      Name: "Meloxicam",
      Dosage: "150mg",
      Frequency: "Once daily",
      Duration: "7 days",
    },
    {
      Name: "Vitamin E",
      Dosage: "1000 IU",
      Frequency: "Once daily",
      Duration: "Ongoing",
    },
  ]);
  const [inspection, setInspection] = useState({
    Id: 1,
    InspectionId: "INS-2023-001",
    Slug: slug,
    Animal: "Zara",
    Species: "African Elephant",
    Inspector: "Dr. Sarah Johnson",
    DateTime: "2023-04-15T10:30:00.000z",
    Status: "completed",
    Location: "Elephant Habitat - Eastern Section",
    Reason: "Routine health check",
    Findings:
      "Overall good health. Minor inflammation in left rear foot, potentially from overuse. Recommended reduced weight-bearing activity for 2 weeks.",

    FollowupDate: "2023-04-29",
  });
  const [images, setImages] = useState([
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
  ]);
  const [history, setHistory] = useState([
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

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/home/veterinary-inspection">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Inspections
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div className="flex space-x-3">
            <Subheading text={`Inspection: ${inspection.InspectionId}`} />
            <Badge
              className={
                inspection.Status === "completed"
                  ? "bg-green-100 text-green-800 hover:bg-green-100 mt-1"
                  : inspection.Status === "scheduled"
                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100 mt-1"
                  : inspection.Status === "overdue"
                  ? "bg-red-100 text-red-800 hover:bg-red-100 mt-1"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-100 mt-1"
              }
            >
              {inspection.Status.charAt(0).toUpperCase() +
                inspection.Status.slice(1)}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            {inspection.Animal} ({inspection.Species}) •{" "}
            {changeDateFormatWithTime(inspection.DateTime)}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/home/veterinary-inspection/${params.slug}`}>
              <Edit className="h-4 w-4 mr-2" /> Edit
            </Link>
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" /> Print
          </Button>
        </div>
      </div>

      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList className="w-full">
          <TabsTrigger value="summary" className="flex-1">
            Summary
          </TabsTrigger>
          <TabsTrigger value="findings" className="flex-1">
            Findings
          </TabsTrigger>
          <TabsTrigger value="medication" className="flex-1">
            Medication
          </TabsTrigger>
          <TabsTrigger value="images" className="flex-1">
            Images
          </TabsTrigger>
          <TabsTrigger value="history" className="flex-1">
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardIntro
                title="Inspection Summary"
                description="Overview of the animal health inspection"
              />
            </CardHeader>
            <CardContent className="space-y-4 mt-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Location
                  </h4>
                  <p className="">{inspection.Location}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Inspector
                  </h4>
                  <p className="">{inspection.Inspector}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Reason
                  </h4>
                  <p className="">{inspection.Reason}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardIntro
                title="Vital Signs"
                description="Recorded vital measurements"
              />
            </CardHeader>
            <CardContent className="mt-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <VitalSignCard
                  title="Temperature"
                  metric={`${vitalSigns.temperature} °C`}
                />
                <VitalSignCard
                  title="Heart Rate"
                  metric={`${vitalSigns.heartRate} BPM`}
                />
                <VitalSignCard
                  title="Respiratory Rate"
                  metric={`${vitalSigns.respiratoryRate} BPM`}
                />
                <VitalSignCard
                  title="Weight"
                  metric={`${vitalSigns.weight} Kg`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="findings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardIntro
                title="Clinical Findings"
                description="Results and observations from the inspection"
              />
            </CardHeader>
            <CardContent className="mt-3">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm font-poppins">Summary</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {inspection.Findings}
                  </p>
                </div>
                <Separator />

                <div>
                  <h3 className="font-medium text-sm font-poppins">
                    Recommendations
                  </h3>
                  <ul className="mt-2 text-sm space-y-1 list-disc pl-5">
                    {recommendations.map((recommendation, index) => (
                      <li key={index} className="text-muted-foreground">
                        {recommendation}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medication" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-end">
                <CardIntro
                  title="Prescribed Medications"
                  description="Current medication regimen"
                />
                <div className="w-fit">
                  <ButtonComp
                    type={"white"}
                    clickEvent={() => {}}
                    text="Download Prescription"
                    beforeIcon={<Download className="mr-2 h-4 w-4" />}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="mt-3">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Medication</TableHead>
                      <TableHead>Dosage</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Duration</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medications.map((medication, index) => (
                      <TableRow
                        key={index}
                        className="transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <TableCell>{medication.Name}</TableCell>
                        <TableCell>{medication.Dosage}</TableCell>
                        <TableCell>{medication.Frequency}</TableCell>
                        <TableCell>{medication.Duration}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-end">
                <CardIntro
                  title="Inspection Images"
                  description="Photos and diagnostic images taken during inspection"
                />
                <div className="w-fit">
                  <ButtonComp
                    type={"white"}
                    clickEvent={() => {}}
                    text="Download Images"
                    beforeIcon={<Download className="mr-2 h-4 w-4" />}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="mt-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div className="aspect-video">
                      <div className="relative h-full w-full ">
                        <Image
                          // src={helper.GetDocument(image) || "/placeholder.svg"}
                          src={
                            "https://th.bing.com/th/id/R.2ebeff7d10282483da65aa71c3aed0cd?rik=lLSFw%2byxhZskig&riu=http%3a%2f%2fstore1st.com%2fsash%2fassets%2fimages%2fmedia%2fbg-img3.jpg&ehk=oLUQ8UGeuKgG%2fsfFbucdXmvdv9MkKd%2b9KxPqHrThRAs%3d&risl=&pid=ImgRaw&r=0"
                          }
                          alt={`Inspection image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-medium">Image {index + 1}</p>
                      <p className="text-xs text-muted-foreground">
                        Captured on {changeDateFormat(inspection.DateTime)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardIntro
                title="Inspection History"
                description="Previous inspections and health records"
              />
            </CardHeader>
            <CardContent className="mt-3">
              <div className="space-y-4">
                {history.map((record, index) => (
                  <HistoryCard
                    isCurrent={record.Id == inspection.InspectionId}
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
      </Tabs>
    </div>
  );
}
