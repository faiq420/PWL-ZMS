import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { InspectionForm } from "@/components/veterinary/inspection-form"

export default function EditInspectionPage({ params }: { params: { slug: string } }) {
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
          <Link href={`/home/veterinary-inspection/${params.slug}`}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Inspection Details
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Edit Inspection: {inspection.id}</h1>
        <p className="text-muted-foreground">
          {inspection.animal} ({inspection.species}) • {inspection.date}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Inspection Details</CardTitle>
          <CardDescription>Update the information for this veterinary inspection</CardDescription>
        </CardHeader>
        <CardContent>
          <InspectionForm inspection={inspection} isEditing />
        </CardContent>
      </Card>
    </div>
  )
}
