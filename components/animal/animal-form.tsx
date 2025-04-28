"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface Zoo {
  id: string
  name: string
}

interface AnimalFormProps {
  animal: any
  setAnimal: (animal: any) => void
  zoos: Zoo[]
}

export function AnimalForm({ animal, setAnimal, zoos }: AnimalFormProps) {
  const handleChange = (field: string, value: any) => {
    setAnimal({ ...animal, [field]: value })
  }

  const handleZooToggle = (zooId: string, checked: boolean) => {
    if (checked) {
      setAnimal({
        ...animal,
        zooIds: [...animal.zooIds, zooId],
      })
    } else {
      setAnimal({
        ...animal,
        zooIds: animal.zooIds.filter((id: string) => id !== zooId),
      })
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={animal.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Common name of the animal"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scientificName">Scientific Name</Label>
              <Input
                id="scientificName"
                value={animal.scientificName}
                onChange={(e) => handleChange("scientificName", e.target.value)}
                placeholder="Scientific name (Latin)"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={animal.category} onValueChange={(value) => handleChange("category", value)}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mammals">Mammals</SelectItem>
                  <SelectItem value="Birds">Birds</SelectItem>
                  <SelectItem value="Reptiles">Reptiles</SelectItem>
                  <SelectItem value="Amphibians">Amphibians</SelectItem>
                  <SelectItem value="Fish">Fish</SelectItem>
                  <SelectItem value="Invertebrates">Invertebrates</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="conservationStatus">Conservation Status</Label>
              <Select
                value={animal.conservationStatus}
                onValueChange={(value) => handleChange("conservationStatus", value)}
              >
                <SelectTrigger id="conservationStatus">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Extinct">Extinct</SelectItem>
                  <SelectItem value="Extinct in the Wild">Extinct in the Wild</SelectItem>
                  <SelectItem value="Critically Endangered">Critically Endangered</SelectItem>
                  <SelectItem value="Endangered">Endangered</SelectItem>
                  <SelectItem value="Vulnerable">Vulnerable</SelectItem>
                  <SelectItem value="Near Threatened">Near Threatened</SelectItem>
                  <SelectItem value="Least Concern">Least Concern</SelectItem>
                  <SelectItem value="Data Deficient">Data Deficient</SelectItem>
                  <SelectItem value="Not Evaluated">Not Evaluated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="habitat">Habitat</Label>
              <Input
                id="habitat"
                value={animal.habitat}
                onChange={(e) => handleChange("habitat", e.target.value)}
                placeholder="Natural habitat"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="diet">Diet</Label>
              <Input
                id="diet"
                value={animal.diet}
                onChange={(e) => handleChange("diet", e.target.value)}
                placeholder="Dietary habits"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lifespan">Lifespan</Label>
              <Input
                id="lifespan"
                value={animal.lifespan}
                onChange={(e) => handleChange("lifespan", e.target.value)}
                placeholder="Average lifespan"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={animal.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Detailed description of the animal"
                className="min-h-[150px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Available at Zoos</Label>
              <div className="grid grid-cols-1 gap-2 pt-1">
                {zoos.map((zoo) => (
                  <div key={zoo.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`zoo-${zoo.id}`}
                      checked={animal.zooIds.includes(zoo.id)}
                      onCheckedChange={(checked) => handleZooToggle(zoo.id, checked === true)}
                    />
                    <Label htmlFor={`zoo-${zoo.id}`} className="font-normal">
                      {zoo.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
