import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FoodAndDining } from "@/components/visitor-services/food-and-dining";
import { FacilitiesAndSafety } from "@/components/visitor-services/facilities-and-safety";
import SectionIntro from "@/components/utils/Headings/SectionIntro";
import { Card, CardContent } from "@/components/ui/card";
import FoodCourtTable from "./tabs/FoodCourt";

export default function VisitorServicesPage() {
  return (
    <div className="flex-1 space-y-4">
      <SectionIntro
        title="Visitor Services"
        description="Manage all visitor-related services including food, dining, facilities, and safety."
      />

      <Tabs defaultValue="food-dining" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="food-dining">Food & Dining</TabsTrigger>
          <TabsTrigger value="facilities-safety">
            Facilities, First Aid & Safety
          </TabsTrigger>
        </TabsList>

        <TabsContent value="food-dining" className="space-y-4">
          <FoodCourtTable />
        </TabsContent>

        <TabsContent value="facilities-safety" className="space-y-4">
          <FacilitiesAndSafety />
        </TabsContent>
      </Tabs>
    </div>
  );
}
