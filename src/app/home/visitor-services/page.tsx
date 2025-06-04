import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FoodAndDining } from "@/components/visitor-services/food-and-dining"
import { FacilitiesAndSafety } from "@/components/visitor-services/facilities-and-safety"

export default function VisitorServicesPage() {
  return (
    <div className="flex-1 space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Visitor Services</h1>
        <p className="text-muted-foreground mt-2">
          Manage all visitor-related services including food, dining, facilities, and safety
        </p>
      </div>

      <Tabs defaultValue="food-dining" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="food-dining">Food & Dining</TabsTrigger>
          <TabsTrigger value="facilities-safety">Facilities, First Aid & Safety</TabsTrigger>
        </TabsList>

        <TabsContent value="food-dining" className="space-y-4">
          <FoodAndDining />
        </TabsContent>

        <TabsContent value="facilities-safety" className="space-y-4">
          <FacilitiesAndSafety />
        </TabsContent>
      </Tabs>
    </div>
  )
}
