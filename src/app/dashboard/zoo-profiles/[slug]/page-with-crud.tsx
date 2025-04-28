"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Clock,
  Coffee,
  FileText,
  History,
  Info,
  MapPin,
  PawPrintIcon as Paw,
  Ticket,
  Users,
  Plus,
  Edit,
  Trash2,
} from "lucide-react"
import Image from "next/image"

// Zoo data
const zooData = {
  "lahore-zoo": {
    name: "Lahore Zoo",
    location: "Shahrah-e-Quaid-e-Azam, Lahore, Punjab, Pakistan",
    established: "1872",
    area: "25 acres",
    description:
      "Lahore Zoo is the oldest zoo in Pakistan and one of the oldest in South Asia. Established in 1872, it houses a diverse collection of animals and birds. The zoo is located in the heart of Lahore city and is a popular destination for families and educational trips.",
    history:
      "Lahore Zoo was established in 1872 during the British colonial era. It was initially part of the Lawrence Gardens (now Bagh-e-Jinnah) and was later developed as a separate facility. Over the years, it has expanded its collection and improved its facilities. The zoo has played a significant role in conservation efforts and public education about wildlife in Pakistan.",
    animals: [
      { name: "Asian Elephant", count: 2, category: "Mammals" },
      { name: "Bengal Tiger", count: 3, category: "Mammals" },
      { name: "White Lion", count: 2, category: "Mammals" },
      { name: "Chimpanzee", count: 4, category: "Mammals" },
      { name: "Indian Rhinoceros", count: 1, category: "Mammals" },
      { name: "Himalayan Brown Bear", count: 2, category: "Mammals" },
      { name: "Peacock", count: 12, category: "Birds" },
      { name: "Ostrich", count: 3, category: "Birds" },
      { name: "King Cobra", count: 2, category: "Reptiles" },
      { name: "Mugger Crocodile", count: 5, category: "Reptiles" },
    ],
    cafeterias: [
      {
        name: "Safari Café",
        location: "Main Entrance",
        menu: "Fast food, snacks, beverages",
        hours: "9:30 AM - 5:30 PM",
      },
      {
        name: "Jungle Treats",
        location: "Central Plaza",
        menu: "Ice cream, cold drinks, Pakistani snacks",
        hours: "10:00 AM - 5:00 PM",
      },
    ],
    shows: [
      { name: "Bird Show", time: "11:00 AM", location: "Aviary Theater", duration: "30 minutes" },
      { name: "Elephant Bath", time: "1:00 PM", location: "Elephant Enclosure", duration: "20 minutes" },
      { name: "Feeding Time: Big Cats", time: "3:00 PM", location: "Tiger Habitat", duration: "25 minutes" },
      { name: "Reptile Demonstration", time: "4:30 PM", location: "Reptile House", duration: "30 minutes" },
    ],
    milestones: [
      { year: "1872", description: "Establishment of the zoo" },
      { year: "1897", description: "Major expansion" },
      { year: "1922", description: "Modernization of facilities" },
      { year: "1947", description: "Conservation program launched" },
      { year: "2010", description: "Digital management system implemented" },
      { year: "2020", description: "Renovation of visitor facilities" },
    ],
    achievements: [
      { description: "First successful breeding program for endangered species" },
      { description: "Award for excellence in zoo management" },
      { description: "Recognition for conservation efforts" },
      { description: "Educational outreach program development" },
    ],
  },
  "lahore-safari-park": {
    name: "Lahore Safari Park",
    location: "Raiwind Road, Lahore, Punjab, Pakistan",
    established: "1982",
    area: "242 acres",
    description:
      "Lahore Safari Park, also known as Lahore Wildlife Park, is a large safari park located on Raiwind Road in Lahore. It offers visitors a chance to see animals in more natural settings compared to traditional zoos.",
    history:
      "Established in 1982, Lahore Safari Park was created to provide a more natural environment for animals compared to traditional zoos. The park is divided into several sections, including a safari area where visitors can observe animals from vehicles. Over the years, it has become an important conservation center for endangered species native to Pakistan and the surrounding region.",
    animals: [
      { name: "Asiatic Lion", count: 4, category: "Mammals" },
      { name: "Spotted Deer", count: 25, category: "Mammals" },
      { name: "Blackbuck", count: 18, category: "Mammals" },
      { name: "Nilgai", count: 12, category: "Mammals" },
      { name: "Zebra", count: 6, category: "Mammals" },
      { name: "Giraffe", count: 3, category: "Mammals" },
      { name: "Ostrich", count: 8, category: "Birds" },
      { name: "Flamingo", count: 15, category: "Birds" },
      { name: "Marsh Crocodile", count: 7, category: "Reptiles" },
      { name: "Python", count: 3, category: "Reptiles" },
    ],
    cafeterias: [
      {
        name: "Safari Grill",
        location: "Main Entrance Plaza",
        menu: "BBQ, Pakistani cuisine, beverages",
        hours: "10:00 AM - 6:00 PM",
      },
      {
        name: "Wilderness Café",
        location: "Safari Rest Area",
        menu: "Fast food, snacks, ice cream",
        hours: "10:30 AM - 5:30 PM",
      },
      {
        name: "Oasis Refreshments",
        location: "Children's Area",
        menu: "Snacks, juices, ice cream",
        hours: "11:00 AM - 5:00 PM",
      },
    ],
    shows: [
      {
        name: "Safari Tour",
        time: "10:00 AM, 12:00 PM, 2:00 PM, 4:00 PM",
        location: "Safari Entrance",
        duration: "45 minutes",
      },
      { name: "Birds of Prey Show", time: "11:30 AM", location: "Amphitheater", duration: "30 minutes" },
      { name: "Lion Feeding", time: "3:30 PM", location: "Lion Territory", duration: "20 minutes" },
      { name: "Wildlife Conservation Talk", time: "1:30 PM", location: "Education Center", duration: "40 minutes" },
    ],
    milestones: [
      { year: "1982", description: "Establishment of the safari park" },
      { year: "1990", description: "Introduction of safari tours" },
      { year: "2000", description: "Expansion of wildlife conservation area" },
      { year: "2010", description: "Development of educational programs" },
      { year: "2018", description: "Renovation of visitor facilities" },
    ],
    achievements: [
      { description: "Conservation award for native species protection" },
      { description: "Successful breeding program for endangered species" },
      { description: "Recognition for wildlife education initiatives" },
      { description: "Development of sustainable tourism practices" },
    ],
  },
  "bahawalpur-zoo": {
    name: "Bahawalpur Zoo",
    location: "Bahawalpur, Punjab, Pakistan",
    established: "1942",
    area: "25 acres",
    description:
      "Bahawalpur Zoo, also known as Shahi Bagh Zoo, is located in Bahawalpur, Punjab. It is one of the major zoos in Pakistan and houses a variety of animals and birds.",
    history:
      "Bahawalpur Zoo was established in 1942 during the princely state era of Bahawalpur. It was initially created as a royal garden (Shahi Bagh) by the Nawabs of Bahawalpur. After independence, it was developed into a full-fledged zoo. The zoo has historical significance and has been an important recreational and educational facility in the region for decades.",
    animals: [
      { name: "Bengal Tiger", count: 2, category: "Mammals" },
      { name: "Lion", count: 3, category: "Mammals" },
      { name: "Leopard", count: 1, category: "Mammals" },
      { name: "Hog Deer", count: 14, category: "Mammals" },
      { name: "Black Buck", count: 8, category: "Mammals" },
      { name: "Rhesus Monkey", count: 12, category: "Mammals" },
      { name: "Peacock", count: 10, category: "Birds" },
      { name: "Pheasant", count: 8, category: "Birds" },
      { name: "Python", count: 2, category: "Reptiles" },
      { name: "Marsh Crocodile", count: 4, category: "Reptiles" },
    ],
    cafeterias: [
      {
        name: "Royal Garden Café",
        location: "Main Entrance",
        menu: "Traditional Pakistani food, snacks, beverages",
        hours: "9:30 AM - 5:30 PM",
      },
      {
        name: "Oasis Snacks",
        location: "Central Area",
        menu: "Fast food, ice cream, cold drinks",
        hours: "10:00 AM - 5:00 PM",
      },
    ],
    shows: [
      { name: "Bird Show", time: "11:00 AM", location: "Aviary", duration: "30 minutes" },
      { name: "Big Cat Feeding", time: "2:30 PM", location: "Big Cat Enclosure", duration: "25 minutes" },
      { name: "Monkey Antics", time: "12:30 PM", location: "Primate Section", duration: "20 minutes" },
      { name: "Wildlife Education Program", time: "4:00 PM", location: "Education Center", duration: "35 minutes" },
    ],
    milestones: [
      { year: "1942", description: "Establishment of the zoo" },
      { year: "1960", description: "Expansion of animal exhibits" },
      { year: "1980", description: "Modernization of facilities" },
      { year: "2005", description: "Development of conservation programs" },
      { year: "2015", description: "Renovation of historical structures" },
    ],
    achievements: [
      { description: "Preservation of historical royal garden structures" },
      { description: "Development of educational programs for schools" },
      { description: "Conservation of native wildlife species" },
      { description: "Recognition for cultural heritage preservation" },
    ],
  },
}

export default function ZooProfilePage({ params }: { params: { slug: string } }) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [tripView, setTripView] = useState<"day" | "month" | "date">("day")
  
  // State for zoo data
  const [zooInfo, setZooInfo] = useState(zooData[params.slug as keyof typeof zooData])
  
  // Modal states
  const [historyModalState, setHistoryModalState] = useState({ isOpen: false, mode: "view" as "edit" | "view" })
  const [milestoneModalState, setMilestoneModalState] = useState({ 
    isOpen: false, 
    mode: "create" as "create" | "edit" | "view", 
    milestone: null as { year: string; description: string } | null 
  })
  const [animalModalState, setAnimalModalState] = useState({ 
    isOpen: false, 
    mode: "create" as "create" | "edit" | "view", 
    animal: null as { name: string; count: number; category: string } | null 
  })
  const [cafeteriaModalState, setCafeteriaModalState] = useState({ 
    isOpen: false, 
    mode: "create" as "create" | "edit" | "view", 
    cafeteria: null as { name: string; location: string; menu: string; hours: string } | null 
  })
  const [showModalState, setShowModalState] = useState({ 
    isOpen: false, 
    mode: "create" as "create" | "edit" | "view", 
    show: null as { name: string; time: string; location: string; duration: string } | null 
  })
  const [tripModalState, setTripModalState] = useState({ 
    isOpen: false, 
    mode: "create" as "create" | "edit" | "view", 
    trip: null as { id: string; name: string; organizer: string; participants: number; date: Date; status: string } | null 
  })
  
  // Delete confirmation state
  const [deleteConfirmState, setDeleteConfirmState] = useState({
    isOpen: false,
    title: "",
    description: "",
    itemType: "",
    itemIndex: -1
  })

  // Get zoo data based on slug
  if (!zooInfo) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Zoo Not Found</CardTitle>
            <CardDescription>The zoo you are looking for does not exist.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  // Generate random ticket data for demonstration
  const ticketData = {
    totalSold: Math.floor(Math.random() * 1000) + 500,
    revenue: Math.floor(Math.random() * 50000) + 25000,
    categories: {
      adult: Math.floor(Math.random() * 500) + 250,
      child: Math.floor(Math.random() * 300) + 150,
      senior: Math.floor(Math.random() * 100) + 50,
      student: Math.floor(Math.random() * 150) + 75,
    },
  }

  // Generate random trip data for demonstration
  const [trips, setTrips] = useState(generateTrips(15))

  function generateTrips(count: number) {
    const types = ["Educational", "Corporate", "Family", "School", "College", "Special Needs"]
    const statuses = ["Confirmed", "Pending", "Completed", "Cancelled"]

    return Array.from({ length: count }, (_, i) => ({
      id: `TRIP-${Math.floor(Math.random() * 10000)}`,
      name: `${types[Math.floor(Math.random() * types.length)]} Trip`,
      organizer: `${["ABC School", "XYZ College", "Corporate Group", "Family Group"][Math.floor(Math.random() * 4)]}`,
      participants: Math.floor(Math.random() * 50) + 10,
      date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      status: statuses[Math.floor(Math.random() * statuses.length)],
    }))
  }

  // Filter trips based on selected view
  const filteredTrips = trips.filter((trip) => {
    if (tripView === "day") {
      return trip.date.toDateString() === new Date().toDateString()
    } else if (tripView === "month") {
      return trip.date.getMonth() === new Date().getMonth() && trip.date.getFullYear() === new Date().getFullYear()
    } else if (tripView === "date" && date) {
      return trip.date.toDateString() === date.toDateString()
    }
    return true
  })

  // CRUD handlers
  const handleSaveHistory = (history: string) => {
    setZooInfo(prev => ({
      ...prev,
      history
    }))
    setHistoryModalState({ isOpen: false, mode: "view" })
  }

  const handleSaveMilestone = (milestone: { year: string; description: string }) => {
    if (milestoneModalState.mode === "create") {
      setZooInfo(prev => ({
        ...prev,
        milestones: [...prev.milestones, milestone]
      }))
    } else if (milestoneModalState.mode === "edit" && milestoneModalState.milestone) {
      const index = zooInfo.milestones.findIndex(m => 
        m.year === milestoneModalState.milestone?.year && 
        m.description === milestoneModalState.milestone?.description
      )
      if (index !== -1) {
        const updatedMilestones = [...zooInfo.milestones]
        updatedMilestones[index] = milestone
        setZooInfo(prev => ({
          ...prev,
          milestones: updatedMilestones
        }))
      }
    }
    setMilestoneModalState({ isOpen: false, mode: "create", milestone: null })
  }

  const handleSaveAnimal = (animal: { name: string; count: number; category: string }) => {
    if (animalModalState.mode === "create") {
      setZooInfo(prev => ({
        ...prev,
        animals: [...prev.animals, animal]
      }))
    } else if (animalModalState.mode === "edit" && animalModalState.animal) {
      const index = zooInfo.animals.findIndex(a => a.name === animalModalState.animal?.name)
      if (index !== -1) {
        const updatedAnimals = [...zooInfo.animals]
        updatedAnimals[index] = animal
        setZooInfo(prev => ({
          ...prev,
          animals: updatedAnimals
        }))
      }
    }
    setAnimalModalState({ isOpen: false, mode: "create", animal: null })
  }

  const handleSaveCafeteria = (cafeteria: { name: string; location: string; menu: string; hours: string }) => {
    if (cafeteriaModalState.mode === "create") {
      setZooInfo(prev => ({
        ...prev,
        cafeterias: [...prev.cafeterias, cafeteria]
      }))
    } else if (cafeteriaModalState.mode === "edit" && cafeteriaModalState.cafeteria) {
      const index = zooInfo.cafeterias.findIndex(c => c.name === cafeteriaModalState.cafeteria?.name)
      if (index !== -1) {
        const updatedCafeterias = [...zooInfo.cafeterias]
        updatedCafeterias[index] = cafeteria
        setZooInfo(prev => ({
          ...prev,
          cafeterias: updatedCafeterias
        }))
      }
    }
    setCafeteriaModalState({ isOpen: false, mode: "create", cafeteria: null })
  }

  const handleSaveShow = (show: { name: string; time: string; location: string; duration: string }) => {
    if (showModalState.mode === "create") {
      setZooInfo(prev => ({
        ...prev,
        shows: [...prev.shows, show]
      }))
    } else if (showModalState.mode === "edit" && showModalState.show) {
      const index = zooInfo.shows.findIndex(s => s.name === showModalState.show?.name)
      if (index !== -1) {
        const updatedShows = [...zooInfo.shows]
        updatedShows[index] = show
        setZooInfo(prev => ({
          ...prev,
          shows: updatedShows
        }))
      }
    }
    setShowModalState({ isOpen: false, mode: "create", show: null })
  }

  const handleSaveTrip = (trip: { id: string; name: string; organizer: string; participants: number; date: Date; status: string }) => {
    if (tripModalState.mode === "create") {
      setTrips(prev => [...prev, trip])
    } else if (tripModalState.mode === "edit" && tripModalState.trip) {
      const index = trips.findIndex(t => t.id === tripModalState.trip?.id)
      if (index !== -1) {
        const updatedTrips = [...trips]
        updatedTrips[index] = trip
        setTrips(updatedTrips)
      }
    }
    setTripModalState({ isOpen: false, mode: "create", trip: null })
  }

  const handleDeleteConfirm = () => {
    const { itemType, itemIndex } = deleteConfirmState
    
    if (itemType === "animal" && itemIndex !== -1) {
      const updatedAnimals = [...zooInfo.animals]
      updatedAnimals.splice(itemIndex, 1)
      setZooInfo(prev => ({
        ...prev,
        animals: updatedAnimals
      }))
    } else if (itemType === "cafeteria" && itemIndex !== -1) {
      const updatedCafeterias = [...zooInfo.cafeterias]
      updatedCafeterias.splice(itemIndex, 1)
      setZooInfo(prev => ({
        ...prev,
        cafeterias: updatedCafeterias
      }))
    } else if (itemType === "show" && itemIndex !== -1) {
      const updatedShows = [...zooInfo.shows]
      updatedShows.splice(itemIndex, 1)
      setZooInfo(prev => ({
        ...prev,
        shows: updatedShows
      }))
    } else if (itemType === "trip" && itemIndex !== -1) {
      const updatedTrips = [...trips]
      updatedTrips.splice(itemIndex, 1)
      setTrips(updatedTrips)
    } else if (itemType === "milestone" && itemIndex !== -1) {
      const updatedMilestones = [...zooInfo.milestones]
      updatedMilestones.splice(itemIndex, 1)
      setZooInfo(prev => ({
        ...prev,
        milestones: updatedMilestones
      }))
    } else if (itemType === "achievement" && itemIndex !== -1) {
      const updatedAchievements = [...zooInfo.achievements]
      updatedAchievements.splice(itemIndex, 1)
      setZooInfo(prev => ({
        ...prev,
        achievements: updatedAchievements
      }))
    }
    
    setDeleteConfirmState({
      isOpen: false,
      title: "",
      description: "",
      itemType: "",
      itemIndex: -1
    })
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{zooInfo.name}</h1>
          <div className="flex items-center text-muted-foreground mt-1">
            <MapPin className="h-4 w-4 mr-1" /> {zooInfo.location}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" /> Generate Report
          </Button>
          <Button className="bg-green-700 hover:bg-green-800">
            <Info className="mr-2 h-4 w-4" /> Update Information
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Established</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{zooInfo.established}</div>
            <p className="text-muted-foreground text-sm">
              {new Date().getFullYear() - Number.parseInt(zooInfo.established)} years of operation
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Area</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{zooInfo.area}</div>
            <p className="text-muted-foreground text-sm">Total land area</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Animals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{zooInfo.animals.reduce((sum, animal) => sum + animal.count, 0)}</div>
            <p className="text-muted-foreground text-sm">{zooInfo.animals.length} different species</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="history" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 lg:w-[800px]">
          <TabsTrigger value="history">
            <History className="h-4 w-4 mr-2" /> History
          </TabsTrigger>
          <TabsTrigger value="animals">
            <Paw className="h-4 w-4 mr-2" /> Animals
          </TabsTrigger>
          <TabsTrigger value="cafeteria">
            <Coffee className="h-4 w-4 mr-2" /> Cafeteria
          </TabsTrigger>
          <TabsTrigger value="tickets">
            <Ticket className="h-4 w-4 mr-2" /> Tickets
          </TabsTrigger>
          <TabsTrigger value="shows">
            <Clock className="h-4 w-4 mr-2" /> Shows
          </TabsTrigger>
          <TabsTrigger value="trips">
            <Users className="h-4 w-4 mr-2" /> Trips
          </TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>History of {zooInfo.name}</CardTitle>
                <CardDescription>Historical background and development</CardDescription>
              </div>
              <Button variant="outline" onClick={() => setHistoryModalState({ isOpen: true, mode: "edit" })}>
                <Edit className="h-4 w-4 mr-2" /> Edit History
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative h-64 w-full rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=800"
                  alt={`${zooInfo.name} Historical Photo`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <p>{zooInfo.history}</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Key Milestones</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setMilestoneModalState({ isOpen: true, mode: "create", milestone: null })}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
                    <ul className="space-y-1">
                      {zooInfo.milestones.map((milestone, index) => (
                        <li key={index} className="flex items-center justify-between text-sm group">
                          <div className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-green-600 mr-2"></span>
                            <span>{milestone.year}: {milestone.description}</span>
                          </div>
                          <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 w-6 p-0" 
                              onClick={() => setMilestoneModalState({ 
                                isOpen: true, 
                                mode: "edit", 
                                milestone 
                              })}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 w-6 p-0 text-red-500" 
                              onClick={() => setDeleteConfirmState({
                                isOpen: true,
                                title: "Delete Milestone",
                                description: `Are you sure you want to delete the milestone "${milestone.year}: ${milestone.description}"? This action cannot be undone.`,
                                itemType: "milestone",
                                itemIndex: index
                              })}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Notable Achievements</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          // Add achievement functionality would go here
                        }}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
                    <ul className="space\
