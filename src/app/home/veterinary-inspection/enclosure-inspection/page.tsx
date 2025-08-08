"use client";

import type React from "react";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  ArrowLeft,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  Save,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import Subheading from "@/components/utils/Headings/Subheading";
import Checkbox from "@/components/utils/FormElements/Checkbox";
import DateTimePicker from "@/components/utils/FormElements/DateTimePicker";
import Dropdown from "@/components/utils/FormElements/Dropdown";
import TextArea from "@/components/utils/FormElements/TextArea";
import CardIntro from "@/components/utils/Headings/CardIntro";
import ButtonComp from "@/components/utils/Button";

// Mock data - in a real app, this would come from your database
const mockEnclosures = {
  "african-savanna": {
    id: "african-savanna",
    name: "African Savanna",
    type: "Outdoor Habitat",
    zone: "Africa Zone",
    size: "2.5 acres",
    animals: [
      {
        id: "1",
        name: "Zara",
        species: "African Elephant",
        age: "12 years",
        health: "Good",
      },
      {
        id: "2",
        name: "Kesi",
        species: "African Elephant",
        age: "8 years",
        health: "Good",
      },
      {
        id: "3",
        name: "Simba",
        species: "African Lion",
        age: "6 years",
        health: "Excellent",
      },
      {
        id: "4",
        name: "Nala",
        species: "African Lion",
        age: "5 years",
        health: "Good",
      },
    ],
  },
  "primate-house": {
    id: "primate-house",
    name: "Primate House",
    type: "Indoor Facility",
    zone: "Primate Zone",
    size: "5,000 sq ft",
    animals: [
      {
        id: "5",
        name: "Koko",
        species: "Western Gorilla",
        age: "15 years",
        health: "Good",
      },
      {
        id: "6",
        name: "Bandit",
        species: "Chimpanzee",
        age: "10 years",
        health: "Fair",
      },
    ],
  },
};

const inspectionChecklist = [
  {
    id: "structural",
    category: "Structural",
    items: [
      "Fencing integrity and security",
      "Gate locks and mechanisms",
      "Shelter structures condition",
      "Drainage systems functioning",
      "Pathway safety and accessibility",
    ],
  },
  {
    id: "safety",
    category: "Safety & Security",
    items: [
      "Emergency exits accessible",
      "Safety barriers in place",
      "Warning signs visible",
      "Security cameras operational",
      "Staff access points secure",
    ],
  },
  {
    id: "environmental",
    category: "Environmental",
    items: [
      "Water quality and availability",
      "Food storage areas clean",
      "Waste management adequate",
      "Temperature control systems",
      "Lighting adequate",
    ],
  },
  {
    id: "animal",
    category: "Animal Welfare",
    items: [
      "Enrichment items present",
      "Hiding/resting areas available",
      "Exercise space adequate",
      "Social grouping appropriate",
      "Behavioral indicators normal",
    ],
  },
];

export default function EnclosureInspectionPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const slug = params.slug as string;

  const enclosure = mockEnclosures["primate-house"];
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [obj, setObj] = useState({
    Id: 0,
    DateTime: "",
    InspectorId: 0,
    Notes: "",
    EnclosureId: enclosure.id,
  });
  const [inspectors, setInspectors] = useState([
    { value: 1, label: "Dr. Sarah Johnson" },
    { value: 2, label: "Dr. Michael Chen" },
    { value: 3, label: "Dr. Emily Rodriguez" },
    { value: 4, label: "Dr. David Kim" },
  ]);

  const handleChange = (n: string, v: string | number | boolean) => {
    setObj((prev) => ({
      ...prev,
      [n]: v,
    }));
  };

  if (!enclosure) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Enclosure Not Found
          </h1>
          <p className="text-gray-600 mt-2">
            The requested enclosure could not be found.
          </p>
          <Button onClick={() => router.back()} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const handleChecklistChange = (itemId: string, checked: boolean) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: checked,
    }));
  };

  const getCompletionStats = () => {
    const totalItems = inspectionChecklist.reduce(
      (sum, category) => sum + category.items.length,
      0
    );
    const completedItems = Object.values(checkedItems).filter(Boolean).length;
    return {
      completed: completedItems,
      total: totalItems,
      percentage: Math.round((completedItems / totalItems) * 100),
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!obj.InspectorId) {
      toast({
        title: "Validation Error",
        description: "Please select an inspector.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Inspection Saved",
      description: "The enclosure inspection has been successfully recorded.",
    });

    setIsSubmitting(false);
    router.push("/dashboard/veterinary-inspection");
  };

  const stats = getCompletionStats();

  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900"></h1>
            <Subheading text={`Enclosure Inspection`} />
            <p className="text-muted-foreground text-sm">{enclosure.name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-sm font-medium">
            {stats.completed}/{stats.total} Complete
          </Badge>
          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${stats.percentage}%` }}
            />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Inspection Details & Animal Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Inspection Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg font-medium font-poppins">
                  <Clock className="h-5 w-5 mr-2" />
                  Inspection Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 mt-3">
                <DateTimePicker
                  value={obj.DateTime}
                  name="DateTime"
                  setter={handleChange}
                  label="Inspection Date & Time"
                />
                <Dropdown
                  activeId={obj.InspectorId}
                  name="InspectorId"
                  handleDropdownChange={handleChange}
                  label="Inspector"
                  options={inspectors}
                  placeHolder="Select an inspector"
                />
                <div className="pt-2 text-gray-600 text-sm flex justify-between">
                  <span>Enclosure Type:</span>
                  <span className="font-medium">{enclosure.type}</span>
                </div>
              </CardContent>
            </Card>

            {/* Animal Information */}
            <Card>
              <CardHeader>
                <CardIntro
                  title="Animals in Enclosure"
                  description={`${enclosure.animals.length} 
                    ${
                      enclosure.animals.length !== 1 ? "animals" : "animal"
                    } currently housed`}
                />
              </CardHeader>
              <CardContent className="mt-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 gay-y-3">
                  {enclosure.animals.map((animal) => (
                    <div
                      key={animal.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{animal.name}</div>
                        <div className="text-sm text-gray-600">
                          {animal.species}
                        </div>
                        <div className="text-xs text-gray-500">
                          {animal.age}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            animal.health === "Excellent"
                              ? "default"
                              : animal.health === "Good"
                              ? "secondary"
                              : "destructive"
                          }
                          className="text-xs"
                        >
                          {animal.health}
                        </Badge>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notes Section */}
            <Card>
              <CardHeader>
                <CardIntro
                  title="Additional Notes & Observations"
                  description="Record any additional observations, concerns, or
                  recommendations"
                />
              </CardHeader>
              <CardContent className="mt-3">
                <TextArea
                  placeHolder="Enter your notes and observations here..."
                  value={obj.Notes}
                  setter={handleChange}
                  name="Notes"
                />
              </CardContent>
            </Card>

            {/* Submit Section */}
            <div className="flex items-center justify-between pt-6 border-t">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  Progress: {stats.completed}/{stats.total} items completed (
                  {stats.percentage}%)
                </div>
                {stats.percentage < 100 && (
                  <div className="flex items-center text-amber-600 text-sm">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Inspection incomplete
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                <div className="w-fit">
                  <ButtonComp
                    type={"white"}
                    text="Cancel"
                    clickEvent={() => {
                      router.back();
                    }}
                  />
                </div>
                <div className="w-fit">
                  <ButtonComp
                    text="Save Inspection"
                    clickEvent={() => {}}
                    disabled={isSubmitting || obj.InspectorId == 0}
                    beforeIcon={<Save className="h-4 w-4 mr-2" />}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Inspection Checklist */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="font-poppins">
                <CardTitle className="flex items-center text-lg font-medium">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Inspection Checklist
                </CardTitle>
                <CardDescription className="text-xs text-gray-500">
                  Mark each item as completed during your inspection
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-3">
                <div className="space-y-6">
                  {inspectionChecklist.map((category) => (
                    <div key={category.id}>
                      <h3 className="font-medium font-poppins mb-3 flex items-center">
                        {category.category}
                        <Badge variant="outline" className="ml-2 text-[10px]">
                          {
                            category.items.filter(
                              (item) => checkedItems[`${category.id}-${item}`]
                            ).length
                          }
                          /{category.items.length}
                        </Badge>
                      </h3>
                      <div className="pl-4">
                        {category.items.map((item) => {
                          const itemId = `${category.id}-${item}`;
                          const isChecked = checkedItems[itemId] || false;

                          return (
                            <div
                              key={itemId}
                              className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50"
                            >
                              <Checkbox
                                value={isChecked}
                                name={itemId}
                                setter={(n, v) =>
                                  setCheckedItems((prev) => ({
                                    ...prev,
                                    [n]: v,
                                  }))
                                }
                              />

                              <Label
                                htmlFor={itemId}
                                className={cn(
                                  "flex-1 cursor-pointer text-xs",
                                  isChecked && "line-through text-gray-500"
                                )}
                                onClick={() => {
                                  setCheckedItems((prev) => ({
                                    ...prev,
                                    [itemId]: !isChecked,
                                  }));
                                }}
                              >
                                {item}
                              </Label>
                              {isChecked && (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                      {category.id !==
                        inspectionChecklist[inspectionChecklist.length - 1]
                          .id && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
