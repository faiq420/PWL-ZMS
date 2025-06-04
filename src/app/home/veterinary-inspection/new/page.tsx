import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { InspectionForm } from "@/components/veterinary/inspection-form"

export default function NewInspectionPage() {
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

      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">New Inspection</h1>
        <p className="text-muted-foreground">Create a new veterinary inspection record</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inspection Details</CardTitle>
          <CardDescription>Enter the information for this veterinary inspection</CardDescription>
        </CardHeader>
        <CardContent>
          <InspectionForm />
        </CardContent>
      </Card>
    </div>
  )
}
