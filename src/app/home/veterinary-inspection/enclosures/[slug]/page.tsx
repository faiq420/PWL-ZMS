import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  ChevronLeft,
  ClipboardList,
  Download,
  Edit,
  Info,
  Plus,
  ThermometerIcon,
  PenToolIcon as Tool,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export default function EnclosureDetailsPage({ params }: { params: { slug: string } }) {
  // In a real implementation, fetch this data from your database based on the slug
  const enclosure = {
    id: "ENC-001",
    slug: params.slug,
    name: "Elephant Habitat",
    zone: "African Savanna",
    animals: [
      { name: "Zara", species: "African Elephant", id: "ANI-001", slug: "ani-001-zara-african-elephant" },
      { name: "Dumbo", species: "African Elephant", id: "ANI-007", slug: "ani-007-dumbo-african-elephant" },
      { name: "Tembo", species: "African Elephant", id: "ANI-012", slug: "ani-012-tembo-african-elephant" },
    ],
    size: "2 acres",
    constructed: "2010",
    lastRenovation: "2019",
    status: "excellent",
    lastInspection: "2023-04-15",
    nextInspectionDue: "2023-07-15",
    description:
      "Spacious habitat designed to mimic the African savanna ecosystem. Features a large watering hole, mud wallow, multiple feeding stations, and a heated indoor area for cold weather.",
    features: [
      "Watering hole (8m diameter)",
      "Mud wallow area",
      "4 feeding stations",
      "Heated indoor area (150 sq m)",
      "Enrichment structures",
      "Visitor viewing platform",
      "Keeper access points (3)",
    ],
    environmentalParameters: {
      temperature: {
        indoor: "24°C",
        outdoor: "Ambient",
        recommended: "18-26°C",
      },
      humidity: {
        indoor: "65%",
        outdoor: "Ambient",
        recommended: "40-70%",
      },
      lighting: {
        type: "Natural + Supplemental",
        schedule: "0600-1800 supplemental",
        intensity: "300-500 lux",
      },
      waterQuality: {
        ph: "7.2",
        testFrequency: "Weekly",
        lastTested: "2023-04-10",
      },
    },
    recentMaintenance: [
      {
        id: "MAINT-2023-005",
        type: "Routine",
        date: "2023-03-22",
        description: "Quarterly substrate replacement and disinfection",
        technician: "James Wilson",
      },
      {
        id: "MAINT-2023-002",
        type: "Repair",
        date: "2023-02-15",
        description: "Fixed water filtration system in main pool",
        technician: "Maria Rodriguez",
      },
      {
        id: "MAINT-2022-045",
        type: "Renovation",
        date: "2022-11-10",
        description: "Added additional shade structures",
        technician: "David Chen",
      },
    ],
    pendingMaintenance: [
      {
        id: "MAINT-REQ-2023-008",
        priority: "medium",
        requestedDate: "2023-04-05",
        description: "Replace worn enrichment structures",
        requestedBy: "Dr. Sarah Johnson",
        scheduledDate: "2023-05-10",
      },
    ],
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/home/veterinary-inspection">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Enclosures
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{enclosure.name}</h1>
          <p className="text-muted-foreground">
            {enclosure.zone} • {enclosure.id}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/home/veterinary-inspection/enclosures/${params.slug}/edit`}>
              <Edit className="h-4 w-4 mr-2" /> Edit Enclosure
            </Link>
          </Button>
          <Button className="bg-green-700 hover:bg-green-800" size="sm" asChild>
            <Link href={`/home/veterinary-inspection/enclosures/${params.slug}/inspect`}>
              <ClipboardList className="h-4 w-4 mr-2" /> New Inspection
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="animals">Animals</TabsTrigger>
          <TabsTrigger value="environment">Environment</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="inspections">Inspection History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Enclosure Details</CardTitle>
                <CardDescription>Basic information about the enclosure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Description</h3>
                  <p className="text-muted-foreground">{enclosure.description}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                    <Badge
                      className={
                        enclosure.status === "excellent"
                          ? "bg-green-100 text-green-800 hover:bg-green-100 mt-1"
                          : enclosure.status === "good"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100 mt-1"
                            : enclosure.status === "fair"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-100 mt-1"
                              : "bg-red-100 text-red-800 hover:bg-red-100 mt-1"
                      }
                    >
                      {enclosure.status.charAt(0).toUpperCase() + enclosure.status.slice(1)}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Size</h3>
                    <p className="mt-1">{enclosure.size}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Last Inspection</h3>
                    <p className="mt-1">{enclosure.lastInspection}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Next Inspection Due</h3>
                    <p className="mt-1">{enclosure.nextInspectionDue}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Constructed</h3>
                    <p className="mt-1">{enclosure.constructed}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Last Renovation</h3>
                    <p className="mt-1">{enclosure.lastRenovation}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium">Features</h3>
                  <ul className="mt-2 space-y-1 list-disc pl-5">
                    {enclosure.features.map((feature, index) => (
                      <li key={index} className="text-muted-foreground">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Images</CardTitle>
                <CardDescription>Enclosure photographs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {enclosure.images.map((image, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <div className="relative h-40 w-full">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Enclosure image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="h-4 w-4 mr-2" /> Add Images
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="animals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Housed Animals</CardTitle>
              <CardDescription>Animals currently in this enclosure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {enclosure.animals.map((animal, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative h-40">
                      <Image
                        src="/placeholder.svg?height=200&width=200"
                        alt={animal.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{animal.name}</CardTitle>
                          <CardDescription>{animal.species}</CardDescription>
                        </div>
                        <div className="text-sm font-medium">ID: {animal.id}</div>
                      </div>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/home/veterinary-inspection/health/${animal.slug}`}>View Health Records</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Environmental Parameters</CardTitle>
              <CardDescription>Climate and environmental controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <ThermometerIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Temperature</h3>
                      <p className="text-sm text-muted-foreground">
                        Recommended range: {enclosure.environmentalParameters.temperature.recommended}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-md border p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Indoor</h4>
                        <p className="text-2xl font-bold mt-1">
                          {enclosure.environmentalParameters.temperature.indoor}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Outdoor</h4>
                        <p className="text-2xl font-bold mt-1">
                          {enclosure.environmentalParameters.temperature.outdoor}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Info className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Humidity</h3>
                      <p className="text-sm text-muted-foreground">
                        Recommended range: {enclosure.environmentalParameters.humidity.recommended}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-md border p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Indoor</h4>
                        <p className="text-2xl font-bold mt-1">{enclosure.environmentalParameters.humidity.indoor}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Outdoor</h4>
                        <p className="text-2xl font-bold mt-1">{enclosure.environmentalParameters.humidity.outdoor}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Lighting</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span>{enclosure.environmentalParameters.lighting.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Schedule:</span>
                      <span>{enclosure.environmentalParameters.lighting.schedule}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Intensity:</span>
                      <span>{enclosure.environmentalParameters.lighting.intensity}</span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Water Quality</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">pH Level:</span>
                      <span>{enclosure.environmentalParameters.waterQuality.ph}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Test Frequency:</span>
                      <span>{enclosure.environmentalParameters.waterQuality.testFrequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Tested:</span>
                      <span>{enclosure.environmentalParameters.waterQuality.lastTested}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="h-4 w-4 mr-2" /> Download Environmental Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Pending Maintenance</CardTitle>
                <CardDescription>Scheduled and requested maintenance tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enclosure.pendingMaintenance.length > 0 ? (
                    enclosure.pendingMaintenance.map((maintenance, index) => (
                      <div key={index} className="flex gap-4 border rounded-lg p-4">
                        <div
                          className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${
                            maintenance.priority === "high"
                              ? "bg-red-100 text-red-800"
                              : maintenance.priority === "medium"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          <Tool className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{maintenance.id}</h3>
                            <Badge
                              className={
                                maintenance.priority === "high"
                                  ? "bg-red-100 text-red-800 hover:bg-red-100"
                                  : maintenance.priority === "medium"
                                    ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                    : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              }
                            >
                              {maintenance.priority.charAt(0).toUpperCase() + maintenance.priority.slice(1)} Priority
                            </Badge>
                          </div>
                          <p className="text-sm mt-1">{maintenance.description}</p>
                          <div className="text-xs text-muted-foreground mt-2">
                            Requested by {maintenance.requestedBy} on {maintenance.requestedDate}
                          </div>
                          <div className="text-xs text-muted-foreground">Scheduled: {maintenance.scheduledDate}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-muted-foreground">No pending maintenance tasks</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Request Maintenance
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Maintenance History</CardTitle>
                <CardDescription>Completed maintenance and repairs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enclosure.recentMaintenance.map((maintenance, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{maintenance.id}</h3>
                        <span className="text-sm text-muted-foreground">{maintenance.date}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Badge variant="outline" className="mr-2">
                          {maintenance.type}
                        </Badge>
                        <span className="text-sm">{maintenance.description}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Technician: {maintenance.technician}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Complete History
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inspections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inspection History</CardTitle>
              <CardDescription>Previous enclosure inspections and findings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "ENCINS-2023-001",
                    date: "2023-04-15",
                    inspector: "Dr. Sarah Johnson",
                    findings: "All systems functioning optimally. No issues detected.",
                    status: "excellent",
                    slug: "encins-2023-001-elephant-habitat",
                  },
                  {
                    id: "ENCINS-2023-001",
                    date: "2023-01-20",
                    inspector: "Dr. Michael Chen",
                    findings: "Heating system required minor adjustments. Water filtration working well.",
                    status: "good",
                    slug: "encins-2023-001-elephant-habitat-jan",
                  },
                  {
                    id: "ENCINS-2022-048",
                    date: "2022-10-05",
                    inspector: "Dr. Emily Rodriguez",
                    findings: "Enrichment structures showing wear. Scheduled for replacement.",
                    status: "fair",
                    slug: "encins-2022-048-elephant-habitat",
                  },
                  {
                    id: "ENCINS-2022-032",
                    date: "2022-07-12",
                    inspector: "Dr. Sarah Johnson",
                    findings: "Routine inspection. All parameters within acceptable ranges.",
                    status: "good",
                    slug: "encins-2022-032-elephant-habitat",
                  },
                ].map((inspection, index) => (
                  <div key={index} className="flex items-start space-x-4 border rounded-lg p-4">
                    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 bg-muted rounded-full">
                      <ClipboardList className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{inspection.id}</p>
                        <Badge
                          className={
                            inspection.status === "excellent"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : inspection.status === "good"
                                ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                : "bg-amber-100 text-amber-800 hover:bg-amber-100"
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
                      <Link href={`/home/veterinary-inspection/enclosures/inspections/${inspection.slug}`}>
                        View
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">View All Inspections</Button>
              <Button className="bg-green-700 hover:bg-green-800" asChild>
                <Link href={`/home/veterinary-inspection/enclosures/${params.slug}/inspect`}>
                  <Plus className="mr-2 h-4 w-4" /> New Inspection
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
