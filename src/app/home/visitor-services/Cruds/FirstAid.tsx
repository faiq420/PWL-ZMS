"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import ButtonComp from "@/components/utils/Button";
import DateInputTag from "@/components/utils/FormElements/DateInputTag";
import Dropdown from "@/components/utils/FormElements/Dropdown";
import InputTag from "@/components/utils/FormElements/InputTag";
import TextArea from "@/components/utils/FormElements/TextArea";
import Toggle from "@/components/utils/FormElements/Toggle";
import Paragraph from "@/components/utils/Headings/Paragraph";
import Subheading from "@/components/utils/Headings/Subheading";
import { facilityTypes, servicesStatus } from "@/data";
import { zoos } from "@/data/users";
import useHelper from "@/Helper/helper";
import { OPTION } from "@/types/utils";
import { ArrowLeft, Save, Trash2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  mode?: string;
  id?: string;
  tab?: string;
}

type ImagesFiles = {
  FileId: number;
  file: File | null;
  Docpath?: string;
  LocationId: number;
};

const Facility = ({ mode = "create", id = "0", tab }: Props) => {
  const helper = useHelper();
  const router = useRouter();
  const [obj, setObj] = useState({
    Id: 0,
    Name: "",
    LocationId: 0,
    Status: 0,
    Staffed: true,
    Description: "",
    LastMaintenance: "",
    ZooId: 0,
    Equipments: "",
    StaffStartTime: "",
    StaffEndTime: "",
  });
  const [statuses, setStatuses] = useState<OPTION[]>(servicesStatus);
  const [locations, setLocations] = useState<OPTION[]>([]);
  const [zooList, setZooList] = useState(
    zoos.map((z: any) => {
      return { label: z.label, value: z.value };
    })
  );
  const [imageFiles, setImageFiles] = useState<ImagesFiles[]>([]);
  const capitalize = (value: string, space = " ") => {
    const words = String(value).split(space);
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  };

  function GetHeading() {
    return `${capitalize(mode)} - ${capitalize(
      String(tab?.replace("_", " ")),
      "-"
    )} ${id != "0" ? `for ${obj.Name}` : ""}`;
  }

  function handleChange(n: string, v: string | boolean | number) {
    setObj({ ...obj, [n]: v });
  }

  function HandleSubmit() {}

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const temp = selectedFiles.map((f) => {
        return {
          FileId: 0,
          file: f,
          LocationId: obj.Id,
        };
      });
      setImageFiles([...imageFiles, ...temp]);
    }
  };

  function AddNewFile(productId: number, file: File, index?: number) {}
  const removeImage = (index: number) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  const DeleteImage = (id: number, index: number) => {
    helper.xhr.Post("/", helper.ConvertToFormData({ id })).then((res) => {
      // Message("success", "File removed.");
      setImageFiles(imageFiles.filter((_, i) => i !== index));
    });
  };
  const addImageFiles = () => {
    document.getElementById("file-upload")?.click();
  };

  return (
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
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 gap-y-3">
              <InputTag
                value={obj.Name}
                name="Name"
                setter={handleChange}
                label="Name"
              />
              <Dropdown
                activeId={obj.ZooId}
                name="ZooId"
                handleDropdownChange={handleChange}
                options={zooList}
                label="Zoo"
              />
              <Dropdown
                activeId={obj.LocationId}
                name="LocationId"
                handleDropdownChange={handleChange}
                options={locations}
                label="Location"
              />
              <Dropdown
                activeId={obj.Status}
                name="Status"
                handleDropdownChange={handleChange}
                options={statuses}
                label="Status"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <TextArea
                value={obj.Description}
                name="Description"
                setter={handleChange}
                label="Description"
                placeHolder="Write facility description..."
              />
              <TextArea
                value={obj.Equipments}
                name="Equipments"
                setter={handleChange}
                label="Equipments"
                placeHolder="Comma-seperated list of equipments"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <div className="space-y-[6px] flex flex-col justify-start">
                <Label>Staffing Hours</Label>
                <div className="flex items-center space-x-1">
                  <InputTag
                    value={obj.StaffStartTime}
                    name="StaffStartTime"
                    type="time"
                    disabled={!obj.Staffed}
                    setter={handleChange}
                  />
                  <span>-</span>
                  <InputTag
                    value={obj.StaffEndTime}
                    name="StaffEndTime"
                    disabled={!obj.Staffed}
                    type="time"
                    setter={handleChange}
                  />
                </div>
              </div>
              <div className="flex items-end">
                <Toggle
                  value={obj.Staffed}
                  name="Staffed"
                  setter={handleChange}
                  label="Is Staff Deployed"
                />
              </div>
            </div>
          </div>
          <div className="">
            <Label>Images</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {imageFiles.map((image, index) => (
                <div key={index} className="space-y-2">
                  <div className="relative aspect-square rounded-md border border-main-gray/30 overflow-hidden">
                    {image.file && image.file.type.startsWith("video/") ? (
                      <video
                        src={
                          image.FileId == 0
                            ? URL.createObjectURL(image.file)
                            : helper.GetDocument(image.Docpath || "")
                        }
                        controls
                        className="object-cover"
                        style={{ width: "100%", height: "100%" }}
                      />
                    ) : (
                      <Image
                        src={
                          image.file
                            ? URL.createObjectURL(image.file)
                            : helper.GetDocument(image.Docpath || "")
                        }
                        alt={` image ${index + 1}`}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    )}
                    {image.FileId == 0 &&
                      obj.Id != 0 &&
                      imageFiles.length > 0 && (
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute top-1 left-1 h-6 w-6 rounded-full"
                          onClick={() =>
                            image.file && AddNewFile(obj.Id, image.file, index)
                          }
                        >
                          <Save className="h-3 w-3" />
                          <span className="sr-only">Remove image</span>
                        </Button>
                      )}
                    {image.FileId != 0 ? (
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 rounded-full"
                        onClick={() => DeleteImage(image.FileId, index)}
                      >
                        <Trash2 className="h-3 w-3" />
                        <span className="sr-only">Remove image</span>
                      </Button>
                    ) : (
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 rounded-full"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove image</span>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              <input
                id="file-upload"
                type="file"
                className="hidden"
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={addImageFiles}
                className="flex flex-col items-center justify-center aspect-square rounded-md border border-dashed border-main-gray/50 bg-main-whiteBackground hover:bg-main-gray/5 transition-colors"
              >
                <Upload className="h-6 w-6 text-main-gray mb-1" />
                <span className="text-xs text-main-gray">Add Image</span>
              </button>
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
  );
};

export default Facility;
