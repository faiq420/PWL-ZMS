import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, Clock, MapPin, Plus, Search, ThermometerSun } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ZooProfilesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Zoo Profiles</h2>
        <Button className="bg-green-700 hover:bg-green-800">
          <Plus className="mr-2 h-4 w-4" /> Add New Zoo
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search zoos..." className="w-full pl-8" />
        </div>
        <Button variant="outline">Filters</Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Zoos</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="seasonal">Seasonal</TabsTrigger>
          <TabsTrigger value="maintenance">Under Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Lahore Zoo",
                location: "Lahore, Punjab, Pakistan",
                type: "Urban Wildlife",
                image: "/placeholder.svg?height=200&width=300",
                status: "active",
                slug: "lahore-zoo",
                description:
                  "Established in 1872, Lahore Zoo is one of the oldest zoos in South Asia, featuring a diverse collection of animals and birds.",
              },
              {
                name: "Lahore Safari Park",
                location: "Lahore, Punjab, Pakistan",
                type: "Safari & Conservation",
                image: "/placeholder.svg?height=200&width=300",
                status: "active",
                slug: "lahore-safari-park",
                description:
                  "A large wildlife sanctuary offering safari experiences and conservation efforts for endangered species native to Pakistan.",
              },
              {
                name: "Bahawalpur Zoo",
                location: "Bahawalpur, Punjab, Pakistan",
                type: "Historical Zoo",
                image: "/placeholder.svg?height=200&width=300",
                status: "active",
                slug: "bahawalpur-zoo",
                description:
                  "Founded in 1942, Bahawalpur Zoo houses a variety of animals and is known for its historical significance and educational programs.",
              },
            ].map((zoo) => (
              <Card key={zoo.name} className="overflow-hidden">
                <div className="relative h-48">
                  <Image src={zoo.image || "/placeholder.svg"} alt={zoo.name} fill className="object-cover" />
                  <div
                    className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                      zoo.status === "active"
                        ? "bg-green-100 text-green-800"
                        : zoo.status === "seasonal"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {zoo.status === "active" ? "Active" : zoo.status === "seasonal" ? "Seasonal" : "Maintenance"}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{zoo.name}</CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" /> {zoo.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{zoo.type}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <ThermometerSun className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>32°C / Sunny</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{zoo.description}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Link href={`/dashboard/zoo-profiles/${zoo.slug}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Active zoos would be displayed here */}
            <Card className="h-64 flex items-center justify-center text-muted-foreground">
              Active zoos will be displayed here
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="seasonal" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Seasonal zoos would be displayed here */}
            <Card className="h-64 flex items-center justify-center text-muted-foreground">
              Seasonal zoos will be displayed here
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Maintenance zoos would be displayed here */}
            <Card className="h-64 flex items-center justify-center text-muted-foreground">
              Zoos under maintenance will be displayed here
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
