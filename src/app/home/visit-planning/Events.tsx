"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ButtonComp from "@/components/utils/Button";
import DateTimePicker from "@/components/utils/FormElements/DateTimePicker";
import Dropdown from "@/components/utils/FormElements/Dropdown";
import InputTag from "@/components/utils/FormElements/InputTag";
import NumberInputTag from "@/components/utils/FormElements/NumberInputTag";
import TextArea from "@/components/utils/FormElements/TextArea";
import Paragraph from "@/components/utils/Headings/Paragraph";
import Subheading from "@/components/utils/Headings/Subheading";
import { zoos } from "@/data/users";
import useHelper from "@/Helper/helper";
import { ArrowLeft, Save, SaveIcon, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
// import SelectedLocationMap from "./components/SelectedLocationMap";
// import MapLocationModal from "./components/MapLocationPickerModal";
const MapLocationModal = dynamic(() => import("./components/MapLocationPickerModal"), { ssr: false });
const SelectedLocationMap = dynamic(() => import("./components/SelectedLocationMap"), { ssr: false });

interface Props {
  mode?: string;
  id?: string;
  tab?: string;
}

const Events = ({ mode = "create", id = "0", tab }: Props) => {
  const helper = useHelper();
  const router = useRouter();
  const [zooLocations, setZooLocations] = useState([
    // { value: "other", label: "Select from Map" },
    {
      value: 1,
      label: "Monkey Sanctuary",
      longitude: 74.32546921639374,
      latitude: 31.5572786835129,
    },
    {
      value: 2,
      label: "Tiger In The House",
      longitude: 74.32584338457282,
      latitude: 31.556155325486166,
    },
    {
      value: 3,
      label: "Birds",
      longitude: 74.32634787940268,
      latitude: 31.55606468096269,
    },
    {
      value: 4,
      label: "Camel Ride",
      longitude: 74.3266816874634,
      latitude: 31.555885940210754,
    },
    {
      value: 5,
      label: "Reptile House",
      longitude: 74.32689595614303,
      latitude: 31.555983959369627,
    },
    {
      value: 6,
      label: "Peacock House",
      longitude: 74.32641779865259,
      latitude: 31.55624726522889,
    },
    {
      value: 7,
      label: "Fish Aquarium World",
      longitude: 74.3268079932071,
      latitude: 31.556450990423535,
    },
    {
      value: 8,
      label: "Rhinoceros House",
      longitude: 74.32491566234476,
      latitude: 31.556589369547982,
    },
    {
      value: 9,
      label: "Jungle Cafeteria",
      longitude: 74.32634717635591,
      latitude: 31.555398044924946,
    },
    {
      value: 10,
      label: "Masjid Of Zoo",
      longitude: 74.32603141197542,
      latitude: 31.555198161353267,
    },
  ]);
  const [selectedZooCoordinates, setSelectedZooCoordinates] = useState({
    center: { lat: 31.556430166645494, long: 74.3259238508059 },
    boundaries: [
      {
        latitude: 31.554266774603988,
        longitude: 74.3262336309792,
      },
      {
        latitude: 31.55470952300834,
        longitude: 74.32725081319379,
      },
      {
        latitude: 31.5551774846777,
        longitude: 74.3271639871757,
      },
      {
        latitude: 31.555623395726087,
        longitude: 74.32768958009103,
      },
      {
        latitude: 31.55577781781912,
        longitude: 74.32770759592938,
      },
      {
        latitude: 31.55654056459047,
        longitude: 74.32710554385227,
      },
      {
        latitude: 31.55733781625362,
        longitude: 74.32688290800516,
      },
      {
        latitude: 31.557884387092344,
        longitude: 74.3272269420558,
      },
      {
        latitude: 31.558371362675672,
        longitude: 74.32628805898318,
      },
      {
        latitude: 31.55762930362914,
        longitude: 74.32538999691351,
      },
      {
        latitude: 31.557478572164044,
        longitude: 74.32519949889954,
      },
      {
        latitude: 31.557374219468443,
        longitude: 74.32432865083186,
      },
      {
        latitude: 31.557281461419336,
        longitude: 74.32428782982888,
      },
      {
        latitude: 31.557153918950604,
        longitude: 74.32434225783285,
      },
      {
        latitude: 31.557003186717424,
        longitude: 74.32436947183481,
      },
      {
        latitude: 31.55696840232143,
        longitude: 74.32421979482388,
      },
      {
        latitude: 31.556701721520383,
        longitude: 74.3240973318149,
      },
      {
        latitude: 31.55630749633103,
        longitude: 74.32382519179367,
      },
      {
        latitude: 31.554266774603988,
        longitude: 74.3262336309792,
      },
    ],
  });
  const [showLocationSelectionModal, setShowLocationSelectionModal] =
    useState(false);
  const [obj, setObj] = useState({
    title: "",
    date: "",
    adultPrice: 0,
    childrenPrice: 0,
    seniorPrice: 0,
    maxCapacity: 0,
    type: 1,
    zoo: 0,
    id: 0,
    description: "",
    filePath: "",
    lat: 0,
    long: 0,
  });
  const [selectedLocation, setSelectedLocation] = useState<string | number>(0);
  const [imgFile, setImgFile] = useState<File | null>(null);

  const [types, setTypes] = useState([
    { value: 1, label: "Education" },
    { value: 2, label: "Corporate" },
    { value: 3, label: "Birthday" },
    { value: 4, label: "Community" },
    { value: 5, label: "Other" },
  ]);
  const capitalize = (value: string, space = " ") => {
    const words = String(value).split(space);
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  };

  function GetHeading() {
    return `${capitalize(mode)} - ${capitalize(String(tab), "-")} ${
      id != "0" ? `for ${obj.title}` : ""
    }`;
  }

  function handleChange(n: string, v: string | boolean | number) {
    setObj({ ...obj, [n]: v });
  }

  function HandleSubmit() {}

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setImgFile(selectedFile);
    }
  };

  function UpdateFile(id: number, file: File) {
    const formData = new FormData();
    formData.append("id", String(id));
    formData.append("file.file", file);
    // helper.xhr
    //   .Post("/Category/UploadCategoryImage", formData)
    //   .then((res) => {
    //     Message("success", `${file.Type} updated.`);

    //     setImgFile(null);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   })
    //   .finally(() => {});
  }

  return (
    <>
      {showLocationSelectionModal && (
        <MapLocationModal
          isOpen={showLocationSelectionModal}
          onClose={() => setShowLocationSelectionModal(false)}
          onSave={(lat, lng) => {
            setObj({ ...obj, lat, long: lng });
          }}
          center={[
            selectedZooCoordinates.center.lat,
            selectedZooCoordinates.center.long,
          ]}
          boundary={selectedZooCoordinates.boundaries.map(
            (bound: { latitude: number; longitude: number }, index: number) => {
              return [bound.latitude, bound.longitude];
            }
          )}
        />
      )}
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h4 className="text-3xl font-bold tracking-tight">
                <Subheading text={GetHeading()} />
              </h4>
            </div>
          </div>
        </div>
        <Card>
          <CardHeader></CardHeader>
          <CardContent className="space-y-10">
            <div className="space-y-2">
              <Paragraph text="Event Details" className="tracking-normal" />
              <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 gap-y-3">
                <InputTag
                  name="title"
                  value={obj.title}
                  setter={handleChange}
                  label="Event Title"
                  placeHolder="Event's Title"
                />
                <DateTimePicker
                  value={obj.date}
                  setter={handleChange}
                  name="date"
                  label="Event Date & Time"
                />
                <NumberInputTag
                  name="phone"
                  value={obj.maxCapacity}
                  setter={handleChange}
                  label="Maximum Capacity"
                  placeHolder="0"
                />
                <Dropdown
                  activeId={obj.zoo}
                  options={zoos}
                  handleDropdownChange={handleChange}
                  name="zoo"
                  label="Zoo"
                />
                <Dropdown
                  activeId={selectedLocation}
                  options={zooLocations}
                  isDisabled={obj.zoo == 0}
                  handleDropdownChange={(n, v) => {
                    if (typeof v == "number") {
                      const record = zooLocations.find((c) => {
                        return c.value == v;
                      });
                      if (record) {
                        setObj({
                          ...obj,
                          lat: record.latitude ?? 0,
                          long: record.longitude ?? 0,
                        });
                      }
                      setSelectedLocation(v);
                    } else {
                      setShowLocationSelectionModal(true);
                      console.log(v);
                    }
                  }}
                  name="zoo"
                  label="Event Location"
                />
                <Dropdown
                  activeId={obj.type}
                  options={types}
                  handleDropdownChange={handleChange}
                  name="type"
                  label="Event Type"
                />
                <div className="col-span-1 md:col-span-2">
                  <TextArea
                    name="description"
                    value={obj.description}
                    setter={handleChange}
                    label="Event Description"
                    placeHolder="Event's Description"
                  />
                </div>
                <div className="md:-mt-2 space-y-2">
                  <Label>Event Cover Image</Label>
                  {imgFile != null || obj?.filePath != "" ? (
                    <div className="relative aspect-video rounded-md border border-main-gray/30 overflow-hidden w-full">
                      <Image
                        src={
                          obj?.filePath && obj?.filePath != ""
                            ? helper.GetDocument(obj.filePath)
                            : imgFile
                            ? URL.createObjectURL(imgFile)
                            : "/placeholder.svg"
                        }
                        alt="Category image"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      {imgFile != null && (
                        <Button
                          variant="default"
                          size="icon"
                          className="absolute top-1 left-1 h-6 w-6 rounded-full"
                          onClick={() => {
                            UpdateFile(obj.id, imgFile);
                          }}
                        >
                          <SaveIcon className="h-3 w-3" />
                          <span className="sr-only">Update image</span>
                        </Button>
                      )}
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 rounded-full"
                        onClick={() => {
                          setObj({ ...obj, filePath: "" });
                          setImgFile(null);
                        }}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove image</span>
                      </Button>
                    </div>
                  ) : (
                    <>
                      <input
                        id="edit-cover-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          document.getElementById("edit-cover-upload")?.click();
                        }}
                        className="flex w-full flex-col items-center justify-center aspect-video rounded-md border border-dashed border-main-gray/50 bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <Upload className="h-6 w-6 text-main-gray mb-1" />
                        <span className="text-xs text-main-gray">
                          Add Image
                        </span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            {obj.lat != 0 && obj.long != 0 && (
              <div className="space-y-2">
                <Paragraph
                  text="Location Preview"
                  className="tracking-normal"
                />
                <SelectedLocationMap
                  coordinates={[obj.lat, obj.long]}
                  boundary={selectedZooCoordinates.boundaries.map(
                    (
                      bound: { latitude: number; longitude: number },
                      index: number
                    ) => {
                      return [bound.latitude, bound.longitude];
                    }
                  )}
                />
              </div>
            )}
            <div className="space-y-2">
              <Paragraph text="Ticket Prices" className="tracking-normal" />
              <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2">
                <div className="flex items-center justify-between border rounded-md p-3">
                  <div>
                    <div className="font-medium text-sm">Child</div>
                    <div className="text-xs text-muted-foreground">
                      Ages 3-17
                    </div>
                  </div>
                  <div className="flex items-center w-1/2 md:w-1/3">
                    <NumberInputTag
                      name="children"
                      value={obj.childrenPrice}
                      setter={handleChange}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between border rounded-md p-3">
                  <div>
                    <div className="font-medium text-sm">Adult</div>
                    <div className="text-xs text-muted-foreground">
                      Ages 18+
                    </div>
                  </div>
                  <div className="flex items-center w-1/2 md:w-1/3">
                    <NumberInputTag
                      name="adults"
                      value={obj.adultPrice}
                      setter={handleChange}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between border rounded-md p-3">
                  <div>
                    <div className="font-medium text-sm">Senior</div>
                    <div className="text-xs text-muted-foreground">
                      Ages 65+
                    </div>
                  </div>
                  <div className="flex items-center w-1/2 md:w-1/3">
                    <NumberInputTag
                      name="seniors"
                      value={obj.seniorPrice}
                      setter={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full flex justify-end">
              <div className="w-full md:w-fit flex space-x-2">
                <ButtonComp
                  text={"Cancel"}
                  type={"white"}
                  clickEvent={() => router.back()}
                  beforeIcon={<X className="h-4 w-4" />}
                />
                <ButtonComp
                  text={mode == "edit" ? "Save" : "Create"}
                  clickEvent={HandleSubmit}
                  beforeIcon={<Save className="h-4 w-4" />}
                />
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Events;
