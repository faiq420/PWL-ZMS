import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, ChevronLeft, Download, FileText, LineChart, Plus, Stethoscope } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export default function AnimalHealthRecordPage({ params }: { params: { slug: string } }) {
  // In a real implementation, fetch this data from your database based on the slug
  const animal = {
    id: "ANI-001",
    name: "Zara",
    species: "African Elephant",
    age: "15 years",
    birthDate: "2008-06-12",
    sex: "Female",
    weight: "3,420 kg",
    acquisitionDate: "2010-03-15",
    microchipId: "985121045378965",
    status: "healthy",
    enclosure: "Elephant Habitat - Eastern Section",
    diet: "Specialized herbivore diet with seasonal vegetables and fruits. Daily supplements.",
    image: "/placeholder.svg?height=400&width=400",
    recentInspections: [
      {
        id: "INS-2023-001",
        date: "2023-04-15",
        inspector: "Dr. Sarah Johnson",
        findings: "Minor inflammation in left rear foot",
        status: "completed",
        slug: "ins-2023-001-zara-african-elephant",
      },
      {
        id: "INS-2022-045",
        date: "2022-12-10",
        inspector: "Dr. Michael Chen",
        findings: "Annual checkup. All systems normal.",
        status: "completed",
        slug: "ins-2022-045-zara-african-elephant",
      },
      {
        id: "INS-2022-033",
        date: "2022-10-05",
        inspector: "Dr. Sarah Johnson",
        findings: "Routine tusk examination and trimming",
        status: "completed",
        slug: "ins-2022-033-zara-african-elephant",
      },
    ],
    medicalHistory: [
      {
        condition: "Foot inflammation",
        diagnosedDate: "2023-04-15",
        treatment: "Anti-inflammatory medication and reduced weight-bearing",
        status: "Resolved",
        resolvedDate: "2023-05-01",
      },
      {
        condition: "Seasonal allergies",
        diagnosedDate: "2022-08-10",
        treatment: "Antihistamines as needed during peak seasons",
        status: "Managed",
        resolvedDate: null,
      },
    ],
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
    vitalTrends: {
      weights: [
        { date: "2023-04-15", value: "3,420 kg" },
        { date: "2022-12-10", value: "3,385 kg" },
        { date: "2022-10-05", value: "3,390 kg" },
        { date: "2022-05-22", value: "3,410 kg" },
        { date: "2022-01-15", value: "3,380 kg" },
      ],
      temperatures: [
        { date: "2023-04-15", value: "36.2°C" },
        { date: "2022-12-10", value: "36.1°C" },
        { date: "2022-10-05", value: "36.3°C" },
        { date: "2022-05-22", value: "36.2°C" },
        { date: "2022-01-15", value: "36.0°C" },
      ],
      bloodWork: [
        { date: "2023-04-15", status: "Normal", notes: "All values within normal ranges" },
        { date: "2022-10-05", status: "Normal", notes: "Slight elevation in CRP, not concerning" },
        { date: "2022-01-15", status: "Normal", notes: "All values within normal ranges" },
      ],
    },
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
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
              <Image src={animal.image || "/placeholder.svg"} alt={animal.name} fill className="object-cover" />
              <div
                className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                  animal.status === "healthy"
                    ? "bg-green-100 text-green-800"
                    : animal.status === "monitoring"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {animal.status.charAt(0).toUpperCase() + animal.status.slice(1)}
              </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{animal.name}</CardTitle>
                  <CardDescription>{animal.species}</CardDescription>
                </div>
                <div className="text-sm font-medium">ID: {animal.id}</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Age</h3>
                  <p>{animal.age}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Sex</h3>
                  <p>{animal.sex}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Weight</h3>
                  <p>{animal.weight}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Birth Date</h3>
                  <p>{animal.birthDate}</p>
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Enclosure</h3>
                <p>{animal.enclosure}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Microchip ID</h3>
                <p>{animal.microchipId}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Acquisition Date</h3>
                <p>{animal.acquisitionDate}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-green-700 hover:bg-green-800" asChild>
                <Link href={`/home/veterinary-inspection/new?animal=${animal.id}`}>
                  <Stethoscope className="mr-2 h-4 w-4" /> New Health Check
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:w-2/3 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Health Records</h2>
            <Button variant="outline" asChild>
              <Link href="/home/veterinary-inspection/reports/new?animal=ANI-001">
                <FileText className="mr-2 h-4 w-4" /> Generate Report
              </Link>
            </Button>
          </div>

          <Tabs defaultValue="inspections" className="space-y-4">
            <TabsList>
              <TabsTrigger value="inspections">Inspections</TabsTrigger>
              <TabsTrigger value="medical">Medical History</TabsTrigger>
              <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
              <TabsTrigger value="vitals">Vital Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="inspections" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Inspections</CardTitle>
                  <CardDescription>Health checks and inspections for {animal.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {animal.recentInspections.map((inspection, index) => (
                      <div key={index} className="flex items-start space-x-4 border rounded-lg p-4">
                        <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 bg-muted rounded-full">
                          <Stethoscope className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{inspection.id}</p>
                            <Badge
                              className={
                                inspection.status === "completed"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              }
                            >
                              {inspection.status.charAt(0).toUpperCase() + inspection.status.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">
                            {inspection.date} • {inspection.inspector}
                          </p>
                          <p className="text-sm">{inspection.findings}</p>
                        </div>
                        <Button variant="outline" size="sm" asChild className="flex-shrink-0">
                          <Link href={`/home/veterinary-inspection/${inspection.slug}`}>View</Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">View All Inspections</Button>
                  <Button className="bg-green-700 hover:bg-green-800" asChild>
                    <Link href={`/home/veterinary-inspection/new?animal=${animal.id}`}>
                      <Plus className="mr-2 h-4 w-4" /> New Inspection
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="medical" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Medical History</CardTitle>
                  <CardDescription>Medical conditions and treatments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="relative w-full overflow-auto">
                      <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th className="h-12 px-4 text-left align-middle font-medium">Condition</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Diagnosed</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Treatment</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Resolved</th>
                          </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                          {animal.medicalHistory.map((condition, index) => (
                            <tr
                              key={index}
                              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                            >
                              <td className="p-4 align-middle font-medium">{condition.condition}</td>
                              <td className="p-4 align-middle">{condition.diagnosedDate}</td>
                              <td className="p-4 align-middle">{condition.treatment}</td>
                              <td className="p-4 align-middle">
                                <Badge
                                  className={
                                    condition.status === "Resolved"
                                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                                      : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                  }
                                >
                                  {condition.status}
                                </Badge>
                              </td>
                              <td className="p-4 align-middle">{condition.resolvedDate || "Ongoing"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Add Medical Record
                  </Button>
                </CardFooter>
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
                            <th className="h-12 px-4 text-left align-middle font-medium">Vaccine</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Administered By</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Next Due</th>
                          </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                          {animal.vaccinations.map((vaccine, index) => (
                            <tr
                              key={index}
                              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                            >
                              <td className="p-4 align-middle font-medium">{vaccine.name}</td>
                              <td className="p-4 align-middle">{vaccine.date}</td>
                              <td className="p-4 align-middle">{vaccine.administrator}</td>
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
                  <CardTitle>Vital Sign Trends</CardTitle>
                  <CardDescription>Track changes in vital measurements over time</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Weight Tracking</h3>
                      <LineChart className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="rounded-md border">
                      <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                          <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                              <th className="h-10 px-4 text-left align-middle font-medium">Date</th>
                              <th className="h-10 px-4 text-left align-middle font-medium">Weight</th>
                            </tr>
                          </thead>
                          <tbody className="[&_tr:last-child]:border-0">
                            {animal.vitalTrends.weights.map((weight, index) => (
                              <tr
                                key={index}
                                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                              >
                                <td className="p-2 px-4 align-middle">{weight.date}</td>
                                <td className="p-2 px-4 align-middle font-medium">{weight.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Temperature Tracking</h3>
                      <LineChart className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="rounded-md border">
                      <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                          <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                              <th className="h-10 px-4 text-left align-middle font-medium">Date</th>
                              <th className="h-10 px-4 text-left align-middle font-medium">Temperature</th>
                            </tr>
                          </thead>
                          <tbody className="[&_tr:last-child]:border-0">
                            {animal.vitalTrends.temperatures.map((temp, index) => (
                              <tr
                                key={index}
                                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                              >
                                <td className="p-2 px-4 align-middle">{temp.date}</td>
                                <td className="p-2 px-4 align-middle font-medium">{temp.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Blood Work Analysis</h3>
                      <LineChart className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="rounded-md border">
                      <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                          <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                              <th className="h-10 px-4 text-left align-middle font-medium">Date</th>
                              <th className="h-10 px-4 text-left align-middle font-medium">Status</th>
                              <th className="h-10 px-4 text-left align-middle font-medium">Notes</th>
                            </tr>
                          </thead>
                          <tbody className="[&_tr:last-child]:border-0">
                            {animal.vitalTrends.bloodWork.map((blood, index) => (
                              <tr
                                key={index}
                                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                              >
                                <td className="p-2 px-4 align-middle">{blood.date}</td>
                                <td className="p-2 px-4 align-middle">
                                  <Badge
                                    className={
                                      blood.status === "Normal"
                                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                                        : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                    }
                                  >
                                    {blood.status}
                                  </Badge>
                                </td>
                                <td className="p-2 px-4 align-middle">{blood.notes}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" /> Export Vital Data
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
