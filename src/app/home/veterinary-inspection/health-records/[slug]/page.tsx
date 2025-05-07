"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import {
  ArrowLeft,
  Calendar,
  Download,
  FileText,
  Filter,
  LineChart,
  Plus,
  Search,
  Stethoscope,
  Syringe,
  Clipboard,
  Activity,
  Edit,
} from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for demonstration
const animalData = {
  "ANI-001": {
    id: "ANI-001",
    name: "Zara",
    species: "African Elephant",
    age: "15 years",
    birthDate: "2008-05-12",
    sex: "Female",
    weight: "4,200 kg",
    enclosure: "Elephant Habitat",
    status: "healthy",
    image: "/placeholder.svg?height=300&width=300",
    medicalHistory: [
      {
        id: "MED-001",
        date: "2023-04-15",
        type: "Routine Checkup",
        veterinarian: "Dr. Sarah Johnson",
        diagnosis: "Healthy condition",
        treatment: "None required",
        notes: "All vital signs normal. Weight stable.",
      },
      {
        id: "MED-002",
        date: "2023-01-10",
        type: "Vaccination",
        veterinarian: "Dr. Michael Chen",
        diagnosis: "Preventative care",
        treatment: "Annual vaccinations administered",
        notes: "No adverse reactions observed.",
      },
      {
        id: "MED-003",
        date: "2022-11-05",
        type: "Injury Treatment",
        veterinarian: "Dr. Sarah Johnson",
        diagnosis: "Minor abrasion on left leg",
        treatment: "Cleaned and treated with topical antibiotic",
        notes:
          "Injury likely from interaction with enrichment item. Healed well with no complications.",
      },
    ],
    medications: [
      {
        id: "MED-001",
        name: "Vitamin E Supplement",
        dosage: "1000 IU daily",
        startDate: "2022-06-15",
        endDate: "Ongoing",
        prescribedBy: "Dr. Sarah Johnson",
        notes: "Preventative supplement for joint health",
      },
    ],
    vaccinations: [
      {
        id: "VAC-001",
        name: "Tetanus",
        date: "2023-01-10",
        expiryDate: "2025-01-10",
        administeredBy: "Dr. Michael Chen",
      },
      {
        id: "VAC-002",
        name: "Rabies",
        date: "2023-01-10",
        expiryDate: "2024-01-10",
        administeredBy: "Dr. Michael Chen",
      },
    ],
    dietaryRequirements: {
      diet: "Herbivore",
      dailyIntake: "150-200 kg of vegetation",
      specialRequirements: "Variety of browse, hay, fruits, and vegetables",
      supplements: "Vitamin E, Calcium",
      restrictions: "None",
      notes:
        "Prefers branches from acacia trees. Enjoys occasional treats of watermelon.",
    },
    growthData: [
      { date: "2018-05-12", weight: "3,600 kg", height: "2.8 m" },
      { date: "2019-05-12", weight: "3,750 kg", height: "2.9 m" },
      { date: "2020-05-12", weight: "3,850 kg", height: "3.0 m" },
      { date: "2021-05-12", weight: "3,950 kg", height: "3.0 m" },
      { date: "2022-05-12", weight: "4,100 kg", height: "3.1 m" },
      { date: "2023-05-12", weight: "4,200 kg", height: "3.1 m" },
    ],
  },
  "ANI-002": {
    id: "ANI-002",
    name: "Raja",
    species: "Bengal Tiger",
    age: "8 years",
    birthDate: "2015-03-20",
    sex: "Male",
    weight: "220 kg",
    enclosure: "Tiger Enclosure",
    status: "treatment",
    image: "/placeholder.svg?height=300&width=300",
    medicalHistory: [
      {
        id: "MED-004",
        date: "2023-04-18",
        type: "Injury Assessment",
        veterinarian: "Dr. Michael Chen",
        diagnosis: "Minor abrasion on right front paw",
        treatment: "Cleaned and treated with topical antibiotic",
        notes:
          "Injury likely from rough terrain in enclosure. Monitoring for healing.",
      },
      {
        id: "MED-005",
        date: "2023-02-05",
        type: "Dental Examination",
        veterinarian: "Dr. Emily Rodriguez",
        diagnosis: "Mild tartar buildup",
        treatment: "Dental cleaning performed under sedation",
        notes:
          "Overall dental health is good. Recommended annual dental checks.",
      },
    ],
    medications: [
      {
        id: "MED-002",
        name: "Topical Antibiotic",
        dosage: "Apply to affected area twice daily",
        startDate: "2023-04-18",
        endDate: "2023-04-25",
        prescribedBy: "Dr. Michael Chen",
        notes: "For treatment of paw abrasion",
      },
    ],
    vaccinations: [
      {
        id: "VAC-003",
        name: "Feline Distemper",
        date: "2022-09-15",
        expiryDate: "2023-09-15",
        administeredBy: "Dr. Emily Rodriguez",
      },
      {
        id: "VAC-004",
        name: "Rabies",
        date: "2022-09-15",
        expiryDate: "2023-09-15",
        administeredBy: "Dr. Emily Rodriguez",
      },
    ],
    dietaryRequirements: {
      diet: "Carnivore",
      dailyIntake: "15-20 kg of meat",
      specialRequirements: "Raw meat with bone content",
      supplements: "Taurine, Vitamin A",
      restrictions: "No processed foods",
      notes: "Fasting day once per week to mimic natural feeding patterns.",
    },
    growthData: [
      { date: "2018-03-20", weight: "150 kg", height: "0.9 m" },
      { date: "2019-03-20", weight: "180 kg", height: "0.95 m" },
      { date: "2020-03-20", weight: "200 kg", height: "1.0 m" },
      { date: "2021-03-20", weight: "210 kg", height: "1.0 m" },
      { date: "2022-03-20", weight: "215 kg", height: "1.0 m" },
      { date: "2023-03-20", weight: "220 kg", height: "1.0 m" },
    ],
  },
};

export default function AnimalHealthRecordsPage({
  params,
}: {
  params: { slug: keyof typeof animalData };
}) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [dateFilter, setDateFilter] = useState("all");

  // Animal state
  const [animal, setAnimal] = useState<any>(null);

  // Fetch animal data
  useEffect(() => {
    // In a real app, fetch from API
    // For demo, use mock data
    if (animalData[params.slug]) {
      setAnimal(animalData[params.slug]);
    } else {
      // Handle not found
      toast({
        title: "Animal not found",
        description: "The requested animal could not be found.",
        variant: "destructive",
      });
      router.push("/home/veterinary-inspection");
    }
  }, [params.slug, router]);

  if (!animal) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Loading...</h2>
          <p className="text-muted-foreground">
            Retrieving animal health records
          </p>
        </div>
      </div>
    );
  }

  // Filter medical history based on search term and date filter
  const filteredMedicalHistory = animal.medicalHistory.filter((record: any) => {
    const matchesSearch =
      record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.veterinarian.toLowerCase().includes(searchTerm.toLowerCase());

    if (dateFilter === "all") return matchesSearch;

    const recordDate = new Date(record.date);
    const now = new Date();

    if (dateFilter === "last-month") {
      const lastMonth = new Date(now.setMonth(now.getMonth() - 1));
      return matchesSearch && recordDate >= lastMonth;
    }

    if (dateFilter === "last-6-months") {
      const last6Months = new Date(now.setMonth(now.getMonth() - 6));
      return matchesSearch && recordDate >= last6Months;
    }

    if (dateFilter === "last-year") {
      const lastYear = new Date(now.setFullYear(now.getFullYear() - 1));
      return matchesSearch && recordDate >= lastYear;
    }

    return matchesSearch;
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/home/veterinary-inspection")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">
            Health Records: {animal.name}
          </h2>
          <Badge
            variant={
              animal.status === "healthy"
                ? "secondary"
                : animal.status === "monitoring"
                ? "warning"
                : animal.status === "treatment"
                ? "destructive"
                : "outline"
            }
          >
            {animal.status.charAt(0).toUpperCase() + animal.status.slice(1)}
          </Badge>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export Records
          </Button>
          <Button
            className="bg-green-700 hover:bg-green-800"
            onClick={() => router.push("/home/veterinary-inspection/new")}
          >
            <Plus className="mr-2 h-4 w-4" /> New Inspection
          </Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="medical-history">Medical History</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
          <TabsTrigger value="diet">Diet & Nutrition</TabsTrigger>
          <TabsTrigger value="growth">Growth & Development</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Animal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-square relative rounded-md overflow-hidden">
                  <Image
                    src={animal.image || "/placeholder.svg"}
                    alt={animal.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Species:</span>
                    <span>{animal.species}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Age:</span>
                    <span>{animal.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Birth Date:</span>
                    <span>{animal.birthDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sex:</span>
                    <span>{animal.sex}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Weight:</span>
                    <span>{animal.weight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Enclosure:</span>
                    <span>{animal.enclosure}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    router.push(
                      `/home/animal-directory/${animal.id.toLowerCase()}`
                    )
                  }
                >
                  View Animal Profile
                </Button>
              </CardFooter>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Health Summary</CardTitle>
                <CardDescription>
                  Current health status and recent activity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-md p-4 text-center">
                    <div className="flex justify-center mb-2">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Stethoscope className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold">
                      {animal.medicalHistory.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Medical Records
                    </div>
                  </div>
                  <div className="border rounded-md p-4 text-center">
                    <div className="flex justify-center mb-2">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <Syringe className="h-5 w-5 text-purple-600" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold">
                      {animal.medications.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Active Medications
                    </div>
                  </div>
                  <div className="border rounded-md p-4 text-center">
                    <div className="flex justify-center mb-2">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Clipboard className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold">
                      {animal.vaccinations.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Vaccinations
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Recent Medical Activity
                  </h3>
                  <div className="space-y-3">
                    {animal.medicalHistory.slice(0, 3).map((record: any) => (
                      <div key={record.id} className="border rounded-md p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{record.type}</div>
                            <div className="text-sm text-muted-foreground">
                              {record.date} • {record.veterinarian}
                            </div>
                          </div>
                          <Badge
                            variant={
                              record.type.includes("Routine")
                                ? "outline"
                                : "secondary"
                            }
                          >
                            {record.type}
                          </Badge>
                        </div>
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Diagnosis:</span>{" "}
                          {record.diagnosis}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-2">Upcoming Care</h3>
                  <div className="border rounded-md p-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Next Routine Checkup</div>
                        <div className="text-sm text-muted-foreground">
                          Scheduled for{" "}
                          {new Date(
                            new Date().setMonth(new Date().getMonth() + 3)
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Health Trends</CardTitle>
              <CardDescription>
                Weight and vital signs over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border rounded-md bg-muted/20">
                <div className="text-center">
                  <LineChart className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-medium">Weight Trend Chart</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Chart showing weight changes over time would appear here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medical-history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medical History</CardTitle>
              <CardDescription>
                Complete record of medical examinations and treatments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search medical records..."
                    className="w-full pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="last-month">Last Month</SelectItem>
                      <SelectItem value="last-6-months">
                        Last 6 Months
                      </SelectItem>
                      <SelectItem value="last-year">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" /> More Filters
                  </Button>
                </div>
              </div>

              {filteredMedicalHistory.length > 0 ? (
                <div className="border rounded-md divide-y">
                  {filteredMedicalHistory.map((record: any) => (
                    <div key={record.id} className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{record.type}</h3>
                            <Badge variant="outline">{record.date}</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Veterinarian: {record.veterinarian}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            router.push(
                              `/home/veterinary-inspection/${record.id}`
                            )
                          }
                        >
                          View Details
                        </Button>
                      </div>
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-medium">Diagnosis</div>
                          <div className="text-sm">{record.diagnosis}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Treatment</div>
                          <div className="text-sm">{record.treatment}</div>
                        </div>
                      </div>
                      {record.notes && (
                        <div className="mt-2">
                          <div className="text-sm font-medium">Notes</div>
                          <div className="text-sm">{record.notes}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-medium">No Records Found</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    No medical records match your search criteria.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Export Records
              </Button>
              <Button
                className="bg-green-700 hover:bg-green-800"
                onClick={() =>
                  router.push("/home/veterinary-inspection/new")
                }
              >
                <Plus className="mr-2 h-4 w-4" /> Add New Record
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="medications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medications</CardTitle>
              <CardDescription>
                Current and past medication records
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {animal.medications.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Current Medications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {animal.medications.map((medication: any) => (
                      <div
                        key={medication.id}
                        className="border rounded-md p-4"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{medication.name}</h4>
                            <div className="text-sm text-muted-foreground">
                              Prescribed by {medication.prescribedBy} on{" "}
                              {medication.startDate}
                            </div>
                          </div>
                          <Badge
                            variant={
                              medication.endDate === "Ongoing"
                                ? "default"
                                : "outline"
                            }
                          >
                            {medication.endDate === "Ongoing"
                              ? "Active"
                              : "Completed"}
                          </Badge>
                        </div>
                        <div className="mt-3 space-y-2">
                          <div>
                            <span className="text-sm font-medium">Dosage:</span>{" "}
                            <span className="text-sm">{medication.dosage}</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium">
                              Duration:
                            </span>{" "}
                            <span className="text-sm">
                              {medication.startDate} to {medication.endDate}
                            </span>
                          </div>
                          {medication.notes && (
                            <div>
                              <span className="text-sm font-medium">
                                Notes:
                              </span>{" "}
                              <span className="text-sm">
                                {medication.notes}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Syringe className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-medium">No Active Medications</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    This animal is not currently on any medications.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-green-700 hover:bg-green-800">
                <Plus className="mr-2 h-4 w-4" /> Prescribe New Medication
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="vaccinations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vaccinations</CardTitle>
              <CardDescription>
                Vaccination history and schedule
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {animal.vaccinations.length > 0 ? (
                <div className="border rounded-md divide-y">
                  {animal.vaccinations.map((vaccination: any) => (
                    <div key={vaccination.id} className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <h3 className="font-medium">{vaccination.name}</h3>
                          <div className="text-sm text-muted-foreground">
                            Administered on {vaccination.date} by{" "}
                            {vaccination.administeredBy}
                          </div>
                        </div>
                        <Badge
                          variant={
                            new Date(vaccination.expiryDate) > new Date()
                              ? "outline"
                              : "destructive"
                          }
                        >
                          {new Date(vaccination.expiryDate) > new Date()
                            ? `Valid until ${vaccination.expiryDate}`
                            : "Expired"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Syringe className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-medium">
                    No Vaccination Records
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    No vaccination records found for this animal.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Export Vaccination Records
              </Button>
              <Button className="bg-green-700 hover:bg-green-800">
                <Plus className="mr-2 h-4 w-4" /> Add Vaccination
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="diet" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Diet & Nutrition</CardTitle>
              <CardDescription>
                Dietary requirements and feeding schedule
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Dietary Information
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Diet Type:</span>{" "}
                      {animal.dietaryRequirements.diet}
                    </div>
                    <div>
                      <span className="font-medium">Daily Intake:</span>{" "}
                      {animal.dietaryRequirements.dailyIntake}
                    </div>
                    <div>
                      <span className="font-medium">Special Requirements:</span>{" "}
                      {animal.dietaryRequirements.specialRequirements}
                    </div>
                    <div>
                      <span className="font-medium">Supplements:</span>{" "}
                      {animal.dietaryRequirements.supplements}
                    </div>
                    <div>
                      <span className="font-medium">Restrictions:</span>{" "}
                      {animal.dietaryRequirements.restrictions || "None"}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Feeding Notes</h3>
                  <p className="text-gray-700">
                    {animal.dietaryRequirements.notes}
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-2">Feeding Schedule</h3>
                <div className="border rounded-md divide-y">
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <div className="font-medium">Morning Feed</div>
                      <div className="text-sm text-muted-foreground">
                        8:00 AM
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {animal.species === "African Elephant"
                          ? "50-70 kg of vegetation"
                          : "5-7 kg of meat"}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <div className="font-medium">Midday Feed</div>
                      <div className="text-sm text-muted-foreground">
                        1:00 PM
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {animal.species === "African Elephant"
                          ? "50-70 kg of vegetation"
                          : "5-7 kg of meat"}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <div className="font-medium">Evening Feed</div>
                      <div className="text-sm text-muted-foreground">
                        6:00 PM
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {animal.species === "African Elephant"
                          ? "50-70 kg of vegetation"
                          : "5-7 kg of meat"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Edit className="mr-2 h-4 w-4" /> Update Dietary Information
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="growth" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Growth & Development</CardTitle>
              <CardDescription>
                Weight and height measurements over time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="h-80 flex items-center justify-center border rounded-md bg-muted/20">
                <div className="text-center">
                  <Activity className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-medium">Growth Chart</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Chart showing weight and height changes over time would
                    appear here
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Growth Data</h3>
                <div className="border rounded-md">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium">
                            Date
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium">
                            Weight
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium">
                            Height
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium">
                            Age
                          </th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {animal.growthData.map((data: any, index: number) => {
                          const recordDate = new Date(data.date);
                          const birthDate = new Date(animal.birthDate);
                          const ageInYears = Math.floor(
                            (recordDate.getTime() - birthDate.getTime()) /
                              (1000 * 60 * 60 * 24 * 365)
                          );

                          return (
                            <tr
                              key={index}
                              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                            >
                              <td className="p-4 align-middle">{data.date}</td>
                              <td className="p-4 align-middle">
                                {data.weight}
                              </td>
                              <td className="p-4 align-middle">
                                {data.height}
                              </td>
                              <td className="p-4 align-middle">
                                {ageInYears} years
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-green-700 hover:bg-green-800">
                <Plus className="mr-2 h-4 w-4" /> Add New Measurement
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
