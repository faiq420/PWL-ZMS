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
import { useEffect, useState } from "react";
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
import { getTokenString } from "@/lib/cookieToken";

type InspectionFiles = {
  InspectionFileId: number;
  file: File | null;
  InspectionFilepath?: string;
};
interface Medication {
  InspectionMedicationId: number;
  MedicationName: string;
  Dosage: string;
  Frequency: string;
  Duration: string;
}

interface History {
  InspectionId: number;
  InspectionNumber: string;
  CreatedAt: string;
  UserName: string;
  Description: string;
  Status: string;
  Slug: number;
}
interface InspectionDetails {
  InspectionId: number;
  InspectionNumber: string;
  AnimalId: number;
  AnimalName: string;
  AnimalScientificName: string;
  Date: string;
  FollowUpDate: string;
  InspectionStatusId: number;
  Status: string;
  ReasonForInspection: string;
  Temperature: string;
  HeartRate: string;
  RespiratoryRate: string;
  Weight: string;
  Findings: string;
  VeterinaryInspector: string;
  recommendations: string[];
  medications: Medication[];
  AnimalImageFile: string;
  LocationName: string;
  history: History[];
  files: [{ Filepath: string }];
}

export default function InspectionDetailsPage() {
  const params = useParams();
  const helper = useHelper();
  const slug = Number(params.slug);
  const[isDownloading,setIsDownloading] = useState<boolean>(false)
  const [inspectionDetails, setInspectionDetails] =
    useState<InspectionDetails>();

  useEffect(() => {
    helper.xhr
      .Get(
        "/Inspection/GetInspectionById",
        helper.GetURLParamString({ inspectionId: slug }).toString(),
      )
      .then((res) => {
        console.log(res);
        setInspectionDetails({
          ...res.data,
          medications: res.data.medications.map((data: Medication) => ({
            ...data,
          })),
          recommendations: res.data.recommendations,
          history: res.inspectionLogs.map((data: History) => ({
            ...data,
            InspectionDate: data.CreatedAt,
            Slug: data.InspectionId,
          })),
          files: res.data.files.map((i: any) => ({
            FilePath: i.InspectionFilepath,
          })),
        });
      });
  }, []);

  useEffect(() => {
    console.log("inspection detailsss", inspectionDetails);
  }, [inspectionDetails]);

  // if(inspectionDetails != null || inspectionDetails != )
  const DownloadReport = async () => {
    try {
      if (!inspectionDetails?.InspectionId) return;

      setIsDownloading(true);
      const response = await fetch(
        `${helper.API}/Inspection/DownloadInspectionReport?inspectionId=${inspectionDetails.InspectionId}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + getTokenString(),
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to download report");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "InspectionReport.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      setIsDownloading(false);
    } catch (error) {
      setIsDownloading(false);
      console.error("Download error:", error);
    }
  };

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
            <Subheading
              text={`Inspection: ${inspectionDetails?.InspectionNumber}`}
            />
            <Badge
              className={
                inspectionDetails?.Status.toLowerCase() === "completed"
                  ? "bg-green-100 text-green-800 hover:bg-green-100 mt-1"
                  : inspectionDetails?.Status.toLowerCase() === "scheduled"
                    ? "bg-blue-100 text-blue-800 hover:bg-blue-100 mt-1"
                    : inspectionDetails?.Status.toLowerCase() === "overdue"
                      ? "bg-red-100 text-red-800 hover:bg-red-100 mt-1"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-100 mt-1"
              }
            >
              {inspectionDetails?.Status}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            {inspectionDetails?.AnimalName} •{" "}
            {inspectionDetails?.Date && changeDateFormat(inspectionDetails.Date)}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/home/veterinary-inspection/${params.slug}`}>
              <Edit className="h-4 w-4 mr-2" /> Edit
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={
              (inspectionDetails == null || inspectionDetails == undefined) && isDownloading
            }
            onClick={DownloadReport}
          >
            <Printer className="h-4 w-4 mr-2" /> {isDownloading == true ? "Downloading...":"Print"}
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
                  <p className="">{inspectionDetails?.LocationName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Inspector
                  </h4>
                  <p className="">{inspectionDetails?.VeterinaryInspector}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Reason
                  </h4>
                  <p className="">{inspectionDetails?.ReasonForInspection}</p>
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
                  metric={`${inspectionDetails?.Temperature} °C`}
                />
                <VitalSignCard
                  title="Heart Rate"
                  metric={`${inspectionDetails?.HeartRate} BPM`}
                />
                <VitalSignCard
                  title="Respiratory Rate"
                  metric={`${inspectionDetails?.RespiratoryRate} BPM`}
                />
                <VitalSignCard
                  title="Weight"
                  metric={`${inspectionDetails?.Weight} Kg`}
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
                    {inspectionDetails?.Findings}
                  </p>
                </div>
                <Separator />

                <div>
                  <h3 className="font-medium text-sm font-poppins">
                    Recommendations
                  </h3>
                  <ul className="mt-2 text-sm space-y-1 list-disc pl-5">
                    {inspectionDetails?.recommendations.map(
                      (recommendation: string, index: number) => (
                        <li key={index} className="text-muted-foreground">
                          {recommendation}
                        </li>
                      ),
                    )}
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
                    {inspectionDetails?.medications.map(
                      (medication: Medication, index: number) => (
                        <TableRow
                          key={index}
                          className="transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <TableCell>{medication.MedicationName}</TableCell>
                          <TableCell>{medication.Dosage}</TableCell>
                          <TableCell>{medication.Frequency}</TableCell>
                          <TableCell>{medication.Duration}</TableCell>
                        </TableRow>
                      ),
                    )}
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
                {inspectionDetails?.files.map((image: any, index: number) => (
                  <div
                    key={index}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div className="aspect-video">
                      <div className="relative h-full w-full ">
                        <Image
                          src={helper.GetDocument(image.FilePath)}
                          // src={""}
                          alt={`Inspection image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-medium">Image {index + 1}</p>
                      <p className="text-xs text-muted-foreground">
                        Captured on {changeDateFormat(inspectionDetails?.Date)}
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
                {inspectionDetails?.history.map((record, index) => (
                  <HistoryCard
                    isCurrent={
                      record.InspectionId == inspectionDetails.InspectionId
                    }
                    InspectionNumber={record.InspectionNumber}
                    InspectionId={record.InspectionId}
                    Slug={record.Slug}
                    key={index}
                    Status={record.Status}
                    Date={changeDateFormat(record.CreatedAt)}
                    Inspector={record.UserName}
                    Findings={record.Description}
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
