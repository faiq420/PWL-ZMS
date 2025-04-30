import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Calendar, Clock, Headphones, Info, QrCode, Search, Volume2 } from "lucide-react"
import Image from "next/image"

export default function DigitalGuidePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Digital Guide</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <QrCode className="mr-2 h-4 w-4" /> Generate QR Code
          </Button>
          <Button className="bg-green-700 hover:bg-green-800">
            <Bell className="mr-2 h-4 w-4" /> Send Notification
          </Button>
        </div>
      </div>

      <Tabs defaultValue="scan" className="space-y-4">
        <TabsList>
          <TabsTrigger value="scan">Scan & Learn</TabsTrigger>
          <TabsTrigger value="audio">Audio Guide</TabsTrigger>
          <TabsTrigger value="featured">Featured Animals</TabsTrigger>
          <TabsTrigger value="schedule">Daily Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="scan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>QR Code Management</CardTitle>
              <CardDescription>Create and manage QR codes for exhibits and information points</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search exhibits..." className="w-full pl-8" />
                </div>
                <Button variant="outline">Filters</Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    id: "QR001",
                    name: "African Elephant Exhibit",
                    location: "African Savanna Zone",
                    type: "Animal Exhibit",
                    status: "active",
                  },
                  {
                    id: "QR002",
                    name: "Penguin Feeding Station",
                    location: "Polar Zone",
                    type: "Feeding Area",
                    status: "active",
                  },
                  {
                    id: "QR003",
                    name: "Rainforest Information Kiosk",
                    location: "Tropical House",
                    type: "Information Point",
                    status: "active",
                  },
                  {
                    id: "QR004",
                    name: "Tiger Conservation Display",
                    location: "Asian Forest Zone",
                    type: "Educational Display",
                    status: "inactive",
                  },
                  {
                    id: "QR005",
                    name: "Reptile House Entry",
                    location: "Reptile Zone",
                    type: "Zone Entry",
                    status: "active",
                  },
                  {
                    id: "QR006",
                    name: "Giraffe Viewing Platform",
                    location: "African Savanna Zone",
                    type: "Viewing Area",
                    status: "active",
                  },
                ].map((qr) => (
                  <Card key={qr.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{qr.name}</CardTitle>
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            qr.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {qr.status === "active" ? "Active" : "Inactive"}
                        </div>
                      </div>
                      <CardDescription>{qr.location}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex justify-center py-4">
                        <div className="h-32 w-32 bg-gray-100 flex items-center justify-center rounded-lg">
                          <QrCode className="h-16 w-16 text-gray-400" />
                        </div>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">QR ID:</span>
                          <span>{qr.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type:</span>
                          <span>{qr.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Scans:</span>
                          <span>{Math.floor(Math.random() * 1000)}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audio Guide Management</CardTitle>
              <CardDescription>Manage audio guides for different exhibits and languages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search audio guides..." className="w-full pl-8" />
                </div>
                <Button variant="outline">Filters</Button>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "African Elephant Exhibit",
                    duration: "3:45",
                    languages: ["English", "Spanish", "French", "Chinese"],
                    lastUpdated: "2023-05-15",
                  },
                  {
                    title: "Big Cat Kingdom",
                    duration: "4:20",
                    languages: ["English", "Spanish", "French", "German"],
                    lastUpdated: "2023-06-22",
                  },
                  {
                    title: "Penguin Colony",
                    duration: "2:50",
                    languages: ["English", "Spanish", "Japanese"],
                    lastUpdated: "2023-07-10",
                  },
                  {
                    title: "Rainforest Experience",
                    duration: "5:15",
                    languages: ["English", "Spanish", "Portuguese", "French"],
                    lastUpdated: "2023-08-05",
                  },
                  {
                    title: "Reptile House Tour",
                    duration: "4:00",
                    languages: ["English", "Spanish", "German"],
                    lastUpdated: "2023-09-18",
                  },
                ].map((audio) => (
                  <div key={audio.title} className="flex gap-4 border rounded-lg p-4">
                    <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 bg-gray-100 rounded-full">
                      <Headphones className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{audio.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Clock className="h-4 w-4 mr-1" />
                        {audio.duration}
                        <span className="mx-2">•</span>
                        <Volume2 className="h-4 w-4 mr-1" />
                        {audio.languages.length} languages
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {audio.languages.map((lang) => (
                          <span key={lang} className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex-shrink-0 flex flex-col gap-2">
                      <Button variant="outline" size="sm">
                        <Headphones className="h-4 w-4 mr-2" /> Preview
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="featured" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Featured Animals</CardTitle>
              <CardDescription>Manage featured animals and special highlights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Animal of the Day</h3>
                <Button variant="outline">Change Featured Animal</Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="relative h-64 w-full">
                  <Image
                    src="/placeholder.svg?height=400&width=800"
                    alt="Featured Animal"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold">Sumatran Tiger</h3>
                  <p className="text-muted-foreground italic">Panthera tigris sumatrae</p>

                  <div className="mt-4 space-y-2">
                    <p>
                      The Sumatran tiger is a rare tiger subspecies that inhabits the Indonesian island of Sumatra. They
                      are the smallest of all tiger subspecies, with males weighing between 100-140 kg and females
                      75-110 kg.
                    </p>
                    <p>
                      Critically endangered, there are estimated to be less than 400 Sumatran tigers left in the wild.
                      Their main threats include habitat loss due to palm oil plantations and poaching.
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium">Conservation Status</h4>
                      <div className="mt-1 px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm inline-block">
                        Critically Endangered
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">Location</h4>
                      <p className="text-sm mt-1">Asian Forest Zone - Exhibit 12</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Feeding Times</h4>
                      <p className="text-sm mt-1">11:00 AM & 3:30 PM</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Keeper Talk</h4>
                      <p className="text-sm mt-1">2:00 PM (Tiger Conservation)</p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-medium mt-6">Other Featured Animals</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: "Red Panda",
                    image: "/placeholder.svg?height=200&width=200",
                    location: "Asian Forest Zone",
                  },
                  {
                    name: "African Elephant",
                    image: "/placeholder.svg?height=200&width=200",
                    location: "African Savanna Zone",
                  },
                  {
                    name: "Emperor Penguin",
                    image: "/placeholder.svg?height=200&width=200",
                    location: "Polar Zone",
                  },
                ].map((animal) => (
                  <Card key={animal.name} className="overflow-hidden">
                    <div className="relative h-40">
                      <Image src={animal.image || "/placeholder.svg"} alt={animal.name} fill className="object-cover" />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle>{animal.name}</CardTitle>
                      <CardDescription>{animal.location}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        <Info className="h-4 w-4 mr-2" /> View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Schedule</CardTitle>
              <CardDescription>Manage and display daily activities and events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Today's Schedule</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" /> Change Date
                  </Button>
                  <Button variant="outline" size="sm">
                    Add Event
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    time: "10:00 AM",
                    title: "Elephant Feeding",
                    location: "African Savanna Zone",
                    description: "Watch our elephants enjoy their morning meal",
                    status: "upcoming",
                  },
                  {
                    time: "11:00 AM",
                    title: "Tiger Feeding",
                    location: "Asian Forest Zone",
                    description: "See our tigers being fed by expert keepers",
                    status: "upcoming",
                  },
                  {
                    time: "12:00 PM",
                    title: "Conservation Talk",
                    location: "Education Center",
                    description: "Learn about our wildlife conservation efforts",
                    status: "upcoming",
                  },
                  {
                    time: "1:30 PM",
                    title: "Penguin Parade",
                    location: "Polar Zone",
                    description: "Watch our penguins parade around their habitat",
                    status: "upcoming",
                  },
                  {
                    time: "2:30 PM",
                    title: "Reptile Encounter",
                    location: "Reptile House",
                    description: "Get up close with some fascinating reptiles",
                    status: "upcoming",
                  },
                  {
                    time: "3:30 PM",
                    title: "Giraffe Feeding",
                    location: "African Savanna Zone",
                    description: "Feed our giraffes from the elevated platform",
                    status: "upcoming",
                  },
                  {
                    time: "4:30 PM",
                    title: "Sea Lion Show",
                    location: "Marine Zone",
                    description: "Watch our sea lions perform amazing tricks",
                    status: "upcoming",
                  },
                ].map((event, index) => (
                  <div key={index} className="flex gap-4 border rounded-lg p-4">
                    <div className="flex-shrink-0 w-24 text-center">
                      <div className="text-lg font-bold">{event.time}</div>
                      <div
                        className={`mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                          event.status === "completed"
                            ? "bg-gray-100 text-gray-800"
                            : event.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {event.status === "completed"
                          ? "Completed"
                          : event.status === "active"
                            ? "In Progress"
                            : "Upcoming"}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{event.title}</h3>
                      <div className="text-sm text-muted-foreground mt-1">{event.location}</div>
                      <p className="text-sm mt-2">{event.description}</p>
                    </div>
                    <div className="flex-shrink-0 flex flex-col gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Bell className="h-4 w-4 mr-2" /> Notify
                      </Button>
                    </div>
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
