import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coffee, Edit, MapPin, Plus, Search, Utensils, Wand2 } from "lucide-react"
import Image from "next/image"

export default function VisitorServicesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Visitor Services</h2>
        <Button className="bg-green-700 hover:bg-green-800">
          <Plus className="mr-2 h-4 w-4" /> Add New Service
        </Button>
      </div>

      <Tabs defaultValue="food" className="space-y-4">
        <TabsList>
          <TabsTrigger value="food">Food & Dining</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="firstaid">First Aid & Safety</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
        </TabsList>

        <TabsContent value="food" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Food Courts & Restaurants</CardTitle>
              <CardDescription>Manage dining options across all zoo locations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search dining options..." className="w-full pl-8" />
                </div>
                <Button variant="outline">Filters</Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: "Savanna Grill",
                    location: "African Savanna Zone",
                    type: "Restaurant",
                    cuisine: "African-inspired",
                    hours: "10:00 AM - 6:00 PM",
                    image: "/placeholder.svg?height=200&width=300",
                  },
                  {
                    name: "Jungle Café",
                    location: "Tropical House",
                    type: "Café",
                    cuisine: "International",
                    hours: "9:00 AM - 5:30 PM",
                    image: "/placeholder.svg?height=200&width=300",
                  },
                  {
                    name: "Polar Express",
                    location: "Polar Zone",
                    type: "Food Kiosk",
                    cuisine: "Snacks & Drinks",
                    hours: "10:00 AM - 5:00 PM",
                    image: "/placeholder.svg?height=200&width=300",
                  },
                  {
                    name: "Bamboo Bistro",
                    location: "Asian Forest Zone",
                    type: "Restaurant",
                    cuisine: "Asian Fusion",
                    hours: "11:00 AM - 4:30 PM",
                    image: "/placeholder.svg?height=200&width=300",
                  },
                  {
                    name: "Safari Snacks",
                    location: "Main Plaza",
                    type: "Food Cart",
                    cuisine: "Quick Bites",
                    hours: "9:00 AM - 6:00 PM",
                    image: "/placeholder.svg?height=200&width=300",
                  },
                  {
                    name: "Aquatic Eats",
                    location: "Marine Zone",
                    type: "Restaurant",
                    cuisine: "Seafood",
                    hours: "11:00 AM - 5:00 PM",
                    image: "/placeholder.svg?height=200&width=300",
                  },
                ].map((dining) => (
                  <Card key={dining.name} className="overflow-hidden">
                    <div className="relative h-40">
                      <Image src={dining.image || "/placeholder.svg"} alt={dining.name} fill className="object-cover" />
                      <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Open
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{dining.name}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1" /> {dining.location}
                          </CardDescription>
                        </div>
                        <div className="flex items-center">
                          {dining.type === "Restaurant" ? (
                            <Utensils className="h-4 w-4 text-muted-foreground" />
                          ) : dining.type === "Café" ? (
                            <Coffee className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Utensils className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type:</span>
                          <span>{dining.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Cuisine:</span>
                          <span>{dining.cuisine}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Hours:</span>
                          <span>{dining.hours}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        View Menu
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facilities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Facilities Management</CardTitle>
              <CardDescription>Manage restrooms, rest areas, and other visitor facilities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search facilities..." className="w-full pl-8" />
                </div>
                <Button variant="outline">Filters</Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: "Main Plaza Restrooms",
                    type: "Restroom",
                    location: "Main Entrance Plaza",
                    features: ["Wheelchair Accessible", "Baby Changing", "Family Restroom"],
                    status: "operational",
                  },
                  {
                    name: "African Savanna Restrooms",
                    type: "Restroom",
                    location: "African Savanna Zone",
                    features: ["Wheelchair Accessible", "Baby Changing"],
                    status: "operational",
                  },
                  {
                    name: "Tropical House Restrooms",
                    type: "Restroom",
                    location: "Tropical House",
                    features: ["Wheelchair Accessible"],
                    status: "maintenance",
                  },
                  {
                    name: "Central Prayer Room",
                    type: "Prayer Room",
                    location: "Main Plaza",
                    features: ["Separate Male/Female Areas", "Washing Facilities"],
                    status: "operational",
                  },
                  {
                    name: "Savanna Rest Area",
                    type: "Rest Area",
                    location: "African Savanna Zone",
                    features: ["Shaded Seating", "Water Fountains", "Charging Stations"],
                    status: "operational",
                  },
                  {
                    name: "Aquatic Zone Restrooms",
                    type: "Restroom",
                    location: "Marine Zone",
                    features: ["Wheelchair Accessible", "Baby Changing", "Showers"],
                    status: "operational",
                  },
                ].map((facility) => (
                  <Card key={facility.name}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{facility.name}</CardTitle>
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            facility.status === "operational"
                              ? "bg-green-100 text-green-800"
                              : facility.status === "maintenance"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {facility.status === "operational"
                            ? "Operational"
                            : facility.status === "maintenance"
                              ? "Maintenance"
                              : "Closed"}
                        </div>
                      </div>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" /> {facility.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type:</span>
                          <span>{facility.type}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Features:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {facility.features.map((feature) => (
                              <span key={feature} className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <MapPin className="h-4 w-4 mr-2" /> View on Map
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="firstaid" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>First Aid & Safety</CardTitle>
              <CardDescription>Manage first aid stations and safety information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">First Aid Stations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          name: "Main Plaza First Aid",
                          location: "Main Entrance Plaza",
                          staff: "Nurse on duty",
                          hours: "9:00 AM - 6:00 PM",
                          phone: "Ext. 1001",
                        },
                        {
                          name: "African Savanna First Aid",
                          location: "African Savanna Zone",
                          staff: "First Aid Attendant",
                          hours: "10:00 AM - 5:00 PM",
                          phone: "Ext. 1002",
                        },
                        {
                          name: "Aquatic Zone First Aid",
                          location: "Marine Zone",
                          staff: "First Aid Attendant",
                          hours: "10:00 AM - 5:00 PM",
                          phone: "Ext. 1003",
                        },
                      ].map((station) => (
                        <div key={station.name} className="flex gap-4 border rounded-lg p-4">
                          <div className="flex-1">
                            <h3 className="font-medium">{station.name}</h3>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <MapPin className="h-4 w-4 mr-1" />
                              {station.location}
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                              <div>
                                <span className="text-muted-foreground">Staff: </span>
                                {station.staff}
                              </div>
                              <div>
                                <span className="text-muted-foreground">Hours: </span>
                                {station.hours}
                              </div>
                              <div>
                                <span className="text-muted-foreground">Phone: </span>
                                {station.phone}
                              </div>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <Button variant="outline" size="sm">
                              <MapPin className="h-4 w-4 mr-2" /> View on Map
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" /> Add First Aid Station
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Emergency Procedures</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium">Medical Emergency</h3>
                        <p className="text-sm mt-2">
                          In case of a medical emergency, contact the nearest first aid station or any staff member. For
                          serious emergencies, call the emergency hotline at Ext. 9999.
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Edit Procedure
                        </Button>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium">Lost Child</h3>
                        <p className="text-sm mt-2">
                          If a child is lost, report to the nearest information kiosk or any staff member. The child
                          will be escorted to the Lost & Found Center at the Main Plaza.
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Edit Procedure
                        </Button>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium">Evacuation</h3>
                        <p className="text-sm mt-2">
                          In case of an evacuation, follow the illuminated exit signs and staff instructions. Assembly
                          points are located at the Main Plaza and each zone's entrance.
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Edit Procedure
                        </Button>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium">Animal Escape</h3>
                        <p className="text-sm mt-2">
                          In the unlikely event of an animal escape, follow staff instructions immediately. Move calmly
                          to the nearest secure building and wait for the all-clear.
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Edit Procedure
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" /> Add Emergency Procedure
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accessibility" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Accessibility Services</CardTitle>
              <CardDescription>Manage accessibility features and services for visitors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Mobility Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium">Wheelchair Rental</h3>
                        <p className="text-sm mt-2">
                          Wheelchairs are available for rent at the Main Plaza Guest Services. Standard wheelchairs are
                          free of charge, while motorized scooters are $25 per day.
                        </p>
                        <div className="mt-2 flex justify-between items-center">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Available: </span>
                            <span className="font-medium">12 Standard, 5 Motorized</span>
                          </div>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </Button>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium">Accessible Routes</h3>
                        <p className="text-sm mt-2">
                          All main pathways throughout the zoo are wheelchair accessible. Accessible routes are marked
                          on zoo maps with a wheelchair symbol.
                        </p>
                        <div className="mt-2 flex justify-end">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </Button>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium">Shuttle Service</h3>
                        <p className="text-sm mt-2">
                          Complimentary shuttle service is available for visitors with mobility challenges. Shuttles run
                          every 20 minutes and stop at all major zones.
                        </p>
                        <div className="mt-2 flex justify-between items-center">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Status: </span>
                            <span className="font-medium text-green-600">Operational</span>
                          </div>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Additional Accessibility Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium">Sign Language Interpretation</h3>
                        <p className="text-sm mt-2">
                          Sign language interpreters are available for guided tours and shows with one week advance
                          notice. Contact Guest Services to arrange.
                        </p>
                        <div className="mt-2 flex justify-end">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </Button>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium">Sensory Kits</h3>
                        <p className="text-sm mt-2">
                          Sensory kits containing noise-canceling headphones, fidget tools, and visual guides are
                          available at Guest Services for visitors with sensory sensitivities.
                        </p>
                        <div className="mt-2 flex justify-between items-center">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Available: </span>
                            <span className="font-medium">8 kits</span>
                          </div>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </Button>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium">Braille & Large Print Materials</h3>
                        <p className="text-sm mt-2">
                          Zoo maps and guides are available in Braille and large print formats at all information kiosks
                          and Guest Services.
                        </p>
                        <div className="mt-2 flex justify-end">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </Button>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium">Service Animal Policy</h3>
                        <p className="text-sm mt-2">
                          Service animals are welcome throughout the zoo. Service animal relief areas are located near
                          each restroom facility.
                        </p>
                        <div className="mt-2 flex justify-end">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Button className="w-full">
                <Wand2 className="mr-2 h-4 w-4" /> Generate Accessibility Report
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
