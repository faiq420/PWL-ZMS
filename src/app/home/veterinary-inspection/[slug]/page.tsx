import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, ChevronLeft, Download, Edit, FileText, Printer } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export default function InspectionDetailsPage({ params }: { params: { slug: string } }) {
  // In a real implementation, fetch this data from your database based on the slug
  const inspection = {
    id: "INS-2023-001",
    slug: params.slug,
    animal: "Zara",
    species: "African Elephant",
    inspector: "Dr. Sarah Johnson",
    date: "2023-04-15",
    time: "10:30 AM",
    status: "completed",
    location: "Elephant Habitat - Eastern Section",
    duration: "45 minutes",
    reason: "Routine health check",
    findings:
      "Overall good health. Minor inflammation in left rear foot, potentially from overuse. Recommended reduced weight-bearing activity for 2 weeks.",
    recommendations: [
      "Apply topical anti-inflammatory to left rear foot twice daily",
      "Monitor weight distribution when standing",
      "Follow up in 2 weeks to reassess inflammation",
      "Continue current diet and supplement regimen",
    ],
    vitalSigns: {
      temperature: "36.2°C",
      heartRate: "28 BPM",
      respiratoryRate: "10 BPM",
      weight: "3,420 kg",
    },
    medications: [
      {
        name: "Meloxicam",
        dosage: "150mg",
        frequency: "Once daily",
        duration: "7 days",
      },
      {
        name: "Vitamin E",
        dosage: "1000 IU",
        frequency: "Once daily",
        duration: "Ongoing",
      },
    ],
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    followupDate: "2023-04-29",
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
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
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Inspection: {inspection.id}</h1>
          <p className="text-muted-foreground">
            {inspection.animal} ({inspection.species}) • {inspection.date}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/home/veterinary-inspection/${params.slug}/edit`}>
              <Edit className="h-4 w-4 mr-2" /> Edit Inspection
            </Link>
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" /> Print Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="findings">Findings</TabsTrigger>
          <TabsTrigger value="medication">Medication</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inspection Summary</CardTitle>
              <CardDescription>Overview of the animal health inspection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Status</h3>
                    <Badge
                      className={
                        inspection.status === "completed"
                          ? "bg-green-100 text-green-800 hover:bg-green-100 mt-1"
                          : inspection.status === "scheduled"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100 mt-1"
                            : inspection.status === "overdue"
                              ? "bg-red-100 text-red-800 hover:bg-red-100 mt-1"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100 mt-1"
                      }
                    >
                      {inspection.status.charAt(0).toUpperCase() + inspection.status.slice(1)}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Animal</h3>
                    <p className="mt-1">{inspection.animal}</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Species</h3>
                    <p className="mt-1">{inspection.species}</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Inspector</h3>
                    <p className="mt-1">{inspection.inspector}</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Reason</h3>
                    <p className="mt-1">{inspection.reason}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Date & Time</h3>
                    <p className="mt-1">
                      {inspection.date} at {inspection.time}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Location</h3>
                    <p className="mt-1">{inspection.location}</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Duration</h3>
                    <p className="mt-1">{inspection.duration}</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Follow-up Date</h3>
                    <div className="flex items-center mt-1">
                      <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      {inspection.followupDate}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vital Signs</CardTitle>
              <CardDescription>Recorded vital measurements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Temperature</h4>
                  <p className="text-2xl font-bold mt-1">{inspection.vitalSigns.temperature}</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Heart Rate</h4>
                  <p className="text-2xl font-bold mt-1">{inspection.vitalSigns.heartRate}</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Respiratory Rate</h4>
                  <p className="text-2xl font-bold mt-1">{inspection.vitalSigns.respiratoryRate}</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Weight</h4>
                  <p className="text-2xl font-bold mt-1">{inspection.vitalSigns.weight}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="findings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Clinical Findings</CardTitle>
              <CardDescription>Results and observations from the inspection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Summary</h3>
                  <p className="mt-2 text-muted-foreground">{inspection.findings}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium">Recommendations</h3>
                  <ul className="mt-2 space-y-1 list-disc pl-5">
                    {inspection.recommendations.map((recommendation, index) => (
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
              <CardTitle>Prescribed Medications</CardTitle>
              <CardDescription>Current medication regimen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">Medication</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Dosage</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Frequency</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {inspection.medications.map((medication, index) => (
                        <tr
                          key={index}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <td className="p-4 align-middle font-medium">{medication.name}</td>
                          <td className="p-4 align-middle">{medication.dosage}</td>
                          <td className="p-4 align-middle">{medication.frequency}</td>
                          <td className="p-4 align-middle">{medication.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" /> Download Prescription
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inspection Images</CardTitle>
              <CardDescription>Photos and diagnostic images taken during inspection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inspection.images.map((image, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <div className="relative h-60 w-full">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Inspection image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium">Image {index + 1}</p>
                      <p className="text-sm text-muted-foreground">Taken on {inspection.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" /> Download All Images
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inspection History</CardTitle>
              <CardDescription>Previous inspections and health records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "INS-2023-001",
                    date: "2023-04-15",
                    inspector: "Dr. Sarah Johnson",
                    primaryFindings: "Minor inflammation in left rear foot",
                    status: "completed",
                    slug: "ins-2023-001-zara-african-elephant",
                  },
                  {
                    id: "INS-2022-045",
                    date: "2022-12-10",
                    inspector: "Dr. Michael Chen",
                    primaryFindings: "Annual checkup. All systems normal.",
                    status: "completed",
                    slug: "ins-2022-045-zara-african-elephant",
                  },
                  {
                    id: "INS-2022-033",
                    date: "2022-10-05",
                    inspector: "Dr. Sarah Johnson",
                    primaryFindings: "Routine tusk examination and trimming",
                    status: "completed",
                    slug: "ins-2022-033-zara-african-elephant",
                  },
                  {
                    id: "INS-2022-012",
                    date: "2022-05-22",
                    inspector: "Dr. Emily Rodriguez",
                    primaryFindings: "Blood work and vitamin levels check",
                    status: "completed",
                    slug: "ins-2022-012-zara-african-elephant",
                  },
                ].map((record, index) => (
                  <div key={index} className="flex items-start space-x-4 border rounded-lg p-4">
                    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 bg-muted rounded-full">
                      <FileText className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{record.id}</p>
                        <Badge
                          className={
                            record.status === "completed"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                          }
                        >
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">
                        {record.date} • {record.inspector}
                      </p>
                      <p className="text-sm">{record.primaryFindings}</p>
                    </div>
                    {record.id !== inspection.id && (
                      <Button variant="outline" size="sm" asChild className="flex-shrink-0">
                        <Link href={`/home/veterinary-inspection/${record.slug}`}>View</Link>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
