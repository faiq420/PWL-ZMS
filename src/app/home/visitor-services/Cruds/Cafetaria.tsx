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
import Dropdown from "@/components/utils/FormElements/Dropdown";
import InputTag from "@/components/utils/FormElements/InputTag";
import MultiSelectDropdown from "@/components/utils/FormElements/MultiSelectDropdown";
import NumberInputTag from "@/components/utils/FormElements/NumberInputTag";
import Paragraph from "@/components/utils/Headings/Paragraph";
import Subheading from "@/components/utils/Headings/Subheading";
import { servicesStatus } from "@/data";
import { zoos } from "@/data/users";
import useHelper from "@/Helper/helper";
import { OPTION } from "@/types/utils";
import { ArrowLeft, Save, Trash2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";

interface Props {
  mode?: string;
  id?: string;
  tab?: string;
}

type ImagesFiles = {
  FileId: number;
  file: File | null;
  Docpath?: string;
  ObjectId: number;
};

const Cafetaria = ({ mode = "create", id = "0", tab }: Props) => {
  const helper = useHelper();
  const router = useRouter();
  const [obj, setObj] = useState({
    Id: 0,
    Name: "",
    Description: "",
    OpeningTime: "",
    ClosingTime: "",
    ZooId: 0,
    LocationId: 0,
    Status: 0,
    FoodCourtId: 0,
    IsPartOfFoodCourt: false,
    Capacity: null,
    Type: 0,
    FoodTypes: [],
  });
  const [type, setType] = useState([
    { value: 1, label: "Restaurant" },
    { value: 2, label: "Canteen" },
    { value: 3, label: "Food Cart" },
  ]);
  const [foodTypes, setFoodTypes] = useState([
    { value: 1, label: "Chinese" },
    { value: 2, label: "Thai" },
    { value: 3, label: "Indian" },
    { value: 4, label: "Pakistani" },
    { value: 5, label: "Continental" },
    { value: 6, label: "Italian" },
    { value: 7, label: "Mexican" },
    { value: 8, label: "Fast Food" },
    { value: 9, label: "BBQ" },
    { value: 10, label: "Seafood" },
    { value: 11, label: "Desserts" },
    { value: 12, label: "Beverages" },
    { value: 13, label: "Middle Eastern" },
    { value: 14, label: "Japanese" },
    { value: 15, label: "Vegan" },
  ]);

  const foodCourtReference = [
    { value: true, label: "PART OF A FOOD COURT" },
    { value: false, label: "NOT PART OF A FOOD COURT" },
  ];
  const [imageFiles, setImageFiles] = useState<ImagesFiles[]>([]);
  const [menuFiles, setMenuFiles] = useState<ImagesFiles[]>([]);
  const [statuses, setStatuses] = useState<OPTION[]>(servicesStatus);
  const [zooList, setZooList] = useState(
    zoos.map((z) => ({ value: z.value || 0, label: z.label }))
  );
  const [locations, setLocations] = useState<OPTION[]>([]);

  const capitalize = (value: string, space = " ") => {
    const words = String(value).split(space);
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join("/");
  };

  function GetHeading() {
    return `${capitalize(mode)} - ${capitalize(String(tab), "-")} ${
      id != "0" ? `for ${obj.Name}` : ""
    }`;
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
          ObjectId: obj.Id,
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

  ////////////////////////MENU FILE IMAGES
  const handleMenuFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const temp = selectedFiles.map((f) => {
        return {
          FileId: 0,
          file: f,
          ObjectId: obj.Id,
        };
      });
      setMenuFiles([...menuFiles, ...temp]);
    }
  };

  function AddMenuNewFile(productId: number, file: File, index?: number) {}
  const removeMenuImage = (index: number) => {
    setMenuFiles(menuFiles.filter((_, i) => i !== index));
  };

  const DeleteMenuImage = (id: number, index: number) => {
    helper.xhr.Post("/", helper.ConvertToFormData({ id })).then((res) => {
      // Message("success", "File removed.");
      setMenuFiles(menuFiles.filter((_, i) => i !== index));
    });
  };
  const addMenuFiles = () => {
    document.getElementById("menu-file-upload")?.click();
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
          <div className="space-y-2">
            <Paragraph text="Event Details" className="tracking-normal" />
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 gap-y-3">
              <InputTag
                name="Name"
                value={obj.Name}
                setter={handleChange}
                label="Name"
                placeHolder="Name of Food Court"
              />
              <InputTag
                name="Description"
                value={obj.Description}
                setter={handleChange}
                label="Description"
                placeHolder="Tagline"
              />{" "}
              <Dropdown
                name="Type"
                activeId={obj.Type}
                handleDropdownChange={handleChange}
                options={type}
                label="Restaurant/Canteen/Food Cart"
              />
              <Dropdown
                name="ZooId"
                activeId={obj.ZooId}
                handleDropdownChange={handleChange}
                options={zooList}
                label="Zoo"
              />
              <Dropdown //Filter out locations by selecting only food courts of the zoo if true
                name="IsPartOfFoodCourt"
                activeId={obj.IsPartOfFoodCourt}
                handleDropdownChange={handleChange}
                options={foodCourtReference}
                label="Is located in a court?"
              />
              <Dropdown
                name="LocationId"
                activeId={obj.LocationId}
                handleDropdownChange={handleChange}
                options={locations}
                label="Location"
              />
              {obj.Type !== 3 && (
                <NumberInputTag
                  name="Capacity"
                  value={obj.Capacity}
                  setter={handleChange}
                  label="Capacity"
                  placeHolder="150"
                />
              )}
              <Dropdown
                name="Status"
                activeId={obj.Status}
                handleDropdownChange={handleChange}
                options={statuses}
                label="Status"
              />
              <div className="!space-y-[6px] flex flex-col justify-between">
                <Label className="">Timings</Label>
                <div className="flex space-x-1 items-center">
                  <InputTag
                    name="OpeningTime"
                    value={obj.OpeningTime}
                    setter={handleChange}
                    type="time"
                    placeHolder="00:00"
                  />
                  <span>-</span>
                  <InputTag
                    name="ClosingTime"
                    value={obj.ClosingTime}
                    setter={handleChange}
                    type="time"
                    placeHolder="00:00"
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
                              image.file &&
                              AddNewFile(obj.Id, image.file, index)
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
          </div>
          <div className="space-y-2">
            <Paragraph text="Menu Details" className="tracking-normal" />
            <div className="w-full">
              <MultiSelectDropdown
                name="FoodTypes"
                selectedIds={obj.FoodTypes}
                handleDropdownChange={(n, v) => {
                  setObj({ ...obj, [n]: v });
                }}
                options={foodTypes}
                label="Food Categories"
              />
            </div>
            <div className="">
              <Label>Images</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {menuFiles.map((image, index) => (
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
                        menuFiles.length > 0 && (
                          <Button
                            variant="outline"
                            size="icon"
                            className="absolute top-1 left-1 h-6 w-6 rounded-full"
                            onClick={() =>
                              image.file &&
                              AddMenuNewFile(obj.Id, image.file, index)
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
                          onClick={() => DeleteMenuImage(image.FileId, index)}
                        >
                          <Trash2 className="h-3 w-3" />
                          <span className="sr-only">Remove image</span>
                        </Button>
                      ) : (
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 rounded-full"
                          onClick={() => removeMenuImage(index)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove image</span>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <input
                  id="menu-file-upload"
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handleMenuFileChange}
                />
                <button
                  type="button"
                  onClick={addMenuFiles}
                  className="flex flex-col items-center justify-center aspect-square rounded-md border border-dashed border-main-gray/50 bg-main-whiteBackground hover:bg-main-gray/5 transition-colors"
                >
                  <Upload className="h-6 w-6 text-main-gray mb-1" />
                  <span className="text-xs text-main-gray">Add Image</span>
                </button>
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
  );
};

export default Cafetaria;
