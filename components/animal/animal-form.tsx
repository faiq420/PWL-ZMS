"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import TextArea from "../utils/FormElements/TextArea";
import InputTag from "../utils/FormElements/InputTag";
import Dropdown from "../utils/FormElements/Dropdown";
// import { animalGroups, conservationStatus } from "@/data";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { OPTION } from "@/types/utils";
import Checkbox from "../utils/FormElements/Checkbox";
import useHelper from "@/Helper/helper";
import Image from "next/image";
import { Button } from "../ui/button";
import { Upload, X } from "lucide-react";

interface AnimalFormProps {
  animal: any;
  setAnimal: (animal: any) => void;
  zooEnclosureMapping: { ZooId: number; EnclosureId: number; Count: number }[];
  setZooEnclosureMapping: Dispatch<
    SetStateAction<{ ZooId: number; EnclosureId: number; Count: number }[]>
  >;
  zoos: any;
  enclosuresByZoo: any;
  coverImage: File | null;
  setCoverImage: Dispatch<SetStateAction<File | null>>;
}

export function AnimalForm({
  animal,
  setAnimal,
  zooEnclosureMapping,
  zoos,
  setZooEnclosureMapping,
  enclosuresByZoo,
  coverImage,
  setCoverImage,
}: AnimalFormProps) {
  const helper = useHelper();
  const [enclosures, setEnclosures] = useState<OPTION[]>([]);
  const [conservationStatus, setConservationStatus] = useState<OPTION[]>([]);
  const [animalGroups, setAnimalGroups] = useState<OPTION[]>([]);
  const handleChange = (field: string, value: any) => {
    setAnimal({ ...animal, [field]: value });
  };

  const handleZooToggle = (zooId: number, checked: boolean) => {
    const rec = zooEnclosureMapping.find((mapping) => mapping.ZooId === zooId);
    if (rec) {
      if (checked) {
        setZooEnclosureMapping((prev) =>
          prev.map((mapping) =>
            mapping.ZooId === zooId
              ? { ...mapping, EnclosureId: rec.EnclosureId }
              : mapping
          )
        );
      } else {
        setZooEnclosureMapping(
          zooEnclosureMapping.filter((x) => {
            return x.ZooId !== zooId;
          })
        );
      }
    } else {
      if (checked) {
        setZooEnclosureMapping((prev) => [
          ...prev,
          { ZooId: zooId, EnclosureId: 0, Count: 0 },
        ]);
      }
    }
  };

  useEffect(() => {
    helper.xhr.Get("/List/GetAnimalCategoryList").then((res) => {
      setAnimalGroups(
        res.map((item: any) => ({
          value: item.AnimalCategoryId,
          label: item.CategoryName,
        }))
      );
    });
    helper.xhr.Get("/List/GetConservationStatus").then((res) => {
      setConservationStatus(
        res.map((item: any) => ({
          value: item.ConservationStatusId,
          label: item.Status,
        }))
      );
    });
  }, []);

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setCoverImage(selectedFile);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <InputTag
              value={animal.AnimalName}
              name="AnimalName"
              setter={handleChange}
              label="Name"
              placeHolder="Common name of the animal"
              isRequired
            />
            <InputTag
              value={animal.AnimalScientificName}
              name="AnimalScientificName"
              setter={handleChange}
              label="Scientific Name"
              placeHolder="Scientific name (Latin)"
              isRequired
            />
            <Dropdown
              activeId={animal.AnimalCategoryId}
              options={animalGroups}
              handleDropdownChange={handleChange}
              name="AnimalCategoryId"
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
              value={animal.LifeSpan}
              name="LifeSpan"
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
                {zoos.map((zoo: any) => (
                  <div key={zoo.value} className="flex items-center space-x-2">
                    <Checkbox
                      name="Id"
                      value={
                        zooEnclosureMapping.find(
                          (mapping) => mapping.ZooId === zoo.value
                        ) !== undefined
                          ? true
                          : false
                      }
                      disabled={!enclosuresByZoo[zoo.value]}
                      setter={(n, checked) =>
                        handleZooToggle(zoo.value, checked)
                      }
                      label={zoo.label}
                    />
                  </div>
                ))}
              </div>
            </div>
            {zooEnclosureMapping.length > 0 && (
              <div className="space-y-2">
                {zooEnclosureMapping
                  .sort((a, b) => a.ZooId - b.ZooId)
                  .map((mapping) => (
                    <div key={mapping.ZooId} className="rounded p-1 space-y-2">
                      <Dropdown
                        activeId={mapping.EnclosureId}
                        clearable={true}
                        options={enclosuresByZoo[mapping.ZooId] || []}
                        handleDropdownChange={(n, v) => {
                          setZooEnclosureMapping((prev) => {
                            return prev.map((m) =>
                              m.ZooId === mapping.ZooId
                                ? { ...m, EnclosureId: Number(v ?? 0) }
                                : m
                            );
                          });
                        }}
                        name={`EnclosureId_${mapping.ZooId}`}
                        label={`Enclosure in ${
                          zoos.find(
                            (zoo: OPTION) => zoo.value === mapping.ZooId
                          )?.label
                        } `}
                      />
                      <InputTag
                        name="Count"
                        type="number"
                        value={mapping.Count}
                        label="Animal Count"
                        setter={(n, v) => {
                          setZooEnclosureMapping((prev) => {
                            return prev.map((m) =>
                              m.ZooId === mapping.ZooId ? { ...m, [n]: v } : m
                            );
                          });
                        }}
                      />
                    </div>
                    // <div
                    //   key={mapping.ZooId}
                    //   className="flex items-center space-x-2"
                    // >
                    //   <Label>{mapping.ZooId}</Label>
                    //   <InputTag
                    //     value={mapping.EnclosureId}
                    //     name={`EnclosureId_${mapping.ZooId}`}
                    //     setter={handleChange}
                    //     label="Enclosure ID"
                    //     placeHolder="Enclosure ID"
                    //   />
                    // </div>
                  ))}
              </div>
            )}
            <TextArea
              name="AnimalDescription"
              value={animal.AnimalDescription}
              setter={handleChange}
              label="Description"
              placeHolder="Detailed description of the animal"
            />
            <div className="w-full">
              <Label>Map Pin Image</Label>
              {coverImage != null || animal?.CoverImageFilepath != "" ? (
                <div className="relative aspect-video rounded-md border border-main-gray/30 overflow-hidden w-full">
                  <Image
                    src={
                      animal?.CoverImageFilepath &&
                      animal?.CoverImageFilepath != ""
                        ? helper.GetDocument(animal.CoverImageFilepath)
                        : coverImage
                        ? URL.createObjectURL(coverImage)
                        : "/placeholder.svg"
                    }
                    alt="Category image"
                    fill
                    className="object-contain"
                    unoptimized
                  />

                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 rounded-full"
                    onClick={() => {
                      handleChange("CoverImageFilepath", "");
                      setCoverImage(null);
                    }}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove image</span>
                  </Button>
                </div>
              ) : (
                <>
                  <input
                    id="iconimage-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleCoverImageChange}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById("iconimage-upload")?.click();
                    }}
                    className="flex w-full flex-col items-center justify-center aspect-video rounded-md border border-dashed border-main-gray/50 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <Upload className="h-6 w-6 text-main-gray mb-1" />
                    <span className="text-xs text-main-gray">Add Image</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
