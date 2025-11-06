"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import TextArea from "../utils/FormElements/TextArea";
import InputTag from "../utils/FormElements/InputTag";
import Dropdown from "../utils/FormElements/Dropdown";
import { animalGroups, conservationStatus } from "@/data";
import { useState } from "react";
import { OPTION } from "@/types/utils";
import Checkbox from "../utils/FormElements/Checkbox";

interface Zoo {
  id: string;
  name: string;
}

interface AnimalFormProps {
  animal: any;
  setAnimal: (animal: any) => void;
  zoos: Zoo[];
}

export function AnimalForm({ animal, setAnimal, zoos }: AnimalFormProps) {
  const [enclosures, setEnclosures] = useState<OPTION[]>([]);
  const handleChange = (field: string, value: any) => {
    setAnimal({ ...animal, [field]: value });
  };

  const handleZooToggle = (zooId: string, checked: boolean) => {
    if (checked) {
      setAnimal({
        ...animal,
        ZooIds: [...animal.ZooIds, zooId],
      });
    } else {
      setAnimal({
        ...animal,
        ZooIds: animal.ZooIds.filter((id: string) => id !== zooId),
      });
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <InputTag
              value={animal.Name}
              name="Name"
              setter={handleChange}
              label="Name"
              placeHolder="Common name of the animal"
              isRequired
            />
            <InputTag
              value={animal.ScientificName}
              name="ScientificName"
              setter={handleChange}
              label="Scientific Name"
              placeHolder="Scientific name (Latin)"
              isRequired
            />
            <Dropdown
              activeId={animal.CategoryId}
              options={animalGroups}
              handleDropdownChange={handleChange}
              name="CategoryId"
              label="Category"
              isRequired
            />
            <Dropdown
              isRequired
              activeId={animal.ConservationStatusId}
              options={conservationStatus}
              handleDropdownChange={handleChange}
              name="ConservationStatusId"
              label="Conservation Status"
            />
            <Dropdown
              isRequired
              activeId={animal.Enclosure}
              options={conservationStatus}
              handleDropdownChange={handleChange}
              name="Enclosure"
              label="Enclosure"
            />
            <InputTag
              value={animal.Habitat}
              name="Habitat"
              setter={handleChange}
              label="Habitat"
              placeHolder="Natural habitat"
              isRequired
            />
            <InputTag
              value={animal.Diet}
              name="Diet"
              setter={handleChange}
              label="Diet"
              placeHolder="Dietary habits"
              isRequired
            />
            <InputTag
              value={animal.Lifespan}
              name="Lifespan"
              setter={handleChange}
              label="Life span"
              placeHolder="Average lifespan"
              isRequired
            />
          </div>

          <div className="space-y-4 flex flex-col">
            <div className="space-y-[6px] flex flex-col justify-start">
              <Label>Available at Zoos</Label>
              <div className="grid grid-cols-1 gap-2 pt-1">
                {zoos.map((zoo) => (
                  <div key={zoo.id} className="flex items-center space-x-2">
                    <Checkbox
                      name="Id"
                      value={animal.ZooIds.includes(zoo.id)}
                      setter={(n, checked) =>
                        handleZooToggle(zoo.id, checked === true)
                      }
                      label={zoo.name}
                    />
                  </div>
                ))}
              </div>
            </div>
            <TextArea
              name="Description"
              value={animal.Description}
              setter={handleChange}
              label="Description"
              placeHolder="Detailed description of the animal"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
