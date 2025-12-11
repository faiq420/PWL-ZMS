"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import ButtonComp from "@/components/utils/Button";
import Dropdown from "@/components/utils/FormElements/Dropdown";
import InputTag from "@/components/utils/FormElements/InputTag";
import TextArea from "@/components/utils/FormElements/TextArea";
import Paragraph from "@/components/utils/Headings/Paragraph";
import Subheading from "@/components/utils/Headings/Subheading";
import { enclosureTypes, servicesStatus } from "@/data";
import { zoos } from "@/data/users";
import useHelper from "@/Helper/helper";
import { OPTION } from "@/types/utils";
import { ArrowLeft, Plus, Save, Trash2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type ImagesFiles = {
  FileId: number;
  file: File | null;
  Docpath?: string;
};

const Page = () => {
  const { toast } = useToast();
  const helper = useHelper();
  const router = useRouter();
  const params = useParams();
  const [isCruding, setIsCruding] = useState(false);
  const slug = params.slug as string;
  const [zooList, setZooList] = useState<OPTION[]>([]);
  const [deletedFileIds, setDeletedFileIds] = useState<number[]>([]);
  const [imageFiles, setImageFiles] = useState<ImagesFiles[]>([]);
  const [locations, setLocations] = useState<OPTION[]>([]);
  const [types, setTypes] = useState<OPTION[]>([]);
  const [statuses, setStatuses] = useState<OPTION[]>([]);
  const [obj, setObj] = useState({
    EnclosureId: 0,
    EnclosureName: "",
    EnclosureDescription: "",
    ZooId: 0,
    LocationId: 0,
    Capacity: null,
    OperationalStatusId: 1,
    EnclosureTypeId: 1,
    Temperature: "",
    Humidity: "",
    Lighting: "",
    IsActive: true,
    Latitute: "",
    Longitude: "",
  });
  const [features, setFeatures] = useState<string[]>([]);

  useEffect(() => {
    helper.xhr.Get("/List/GetZooList").then((res) => {
      setZooList(
        res.map((z: any) => {
          return {
            value: z.ZooId,
            label: z.ZooTitle,
          };
        })
      );
    });
    helper.xhr.Get("/List/GetEnclosureTypes").then((res) => {
      setTypes(
        res.map((z: any) => {
          return {
            value: z.EnclosureTypeId,
            label: z.Type,
          };
        })
      );
    });
    helper.xhr.Get("/List/GetOperationalStatus").then((res) => {
      setStatuses(
        res.map((z: any) => {
          return {
            value: z.OperationalStatusId,
            label: z.Status,
          };
        })
      );
    });
  }, []);

  useEffect(() => {
    helper.xhr
      .Get(
        "/List/GetLocationsByZooId",
        helper
          .GetURLParamString({
            zooId: obj.ZooId,
          })
          .toString()
      )
      .then((res) => {
        setLocations(
          res.map((z: any) => {
            return {
              value: z.LocationId,
              label: z.LocationName,
            };
          })
        );
      });
  }, [obj.ZooId]);

  useEffect(() => {
    if (slug) {
      if (slug != "new" && isNaN(Number(slug))) {
        router.push("/home/enclosure-management");
      }
    }
  }, [slug]);

  const capitalize = (value: string, space = " ") => {
    const words = String(value).split(space);
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  };

  function GetHeading() {
    return `${capitalize(slug == "new" ? "create" : "edit")} - ${capitalize(
      "Enclosure"
    )} ${slug != "new" ? `for ${obj.EnclosureName}` : ""}`;
  }

  function handleChange(n: string, v: string | boolean | number) {
    setObj({ ...obj, [n]: v });
  }

  const verify = () => {
    const toastObj = { title: "Validation Error", description: "" };
    if (obj.EnclosureName == "") {
      toastObj.description = "Enclosure Name is required.";
    } else if (obj.ZooId == 0 || obj.LocationId == 0) {
      toastObj.description = "Zoo and Location are required.";
    }
    if (toastObj.description !== "") {
      toast(toastObj);
      return false;
    }
    return true;
  };

  const HandleSubmit = () => {
    if (verify()) {
      setIsCruding(true);
      const createObject = {
        obj: { ...obj, Capacity: obj.Capacity == 0 ? null : obj.Capacity },
        features,
        Files: imageFiles.map((img) => img.file),
      };
      const editObject = {
        obj: { ...obj, Capacity: obj.Capacity == 0 ? null : obj.Capacity },
        features,
        newFiles: imageFiles
          .filter((img) => img.file !== null)
          .map((img) => img.file),
        deleteFileIds: deletedFileIds,
      };
      helper.xhr
        .Post(
          `/Enclosure/${slug == "new" ? "AddEnclosure" : "UpdateEnclosure"}`,
          helper.ConvertToFormData(
            obj.EnclosureId == 0 ? createObject : editObject
          )
        )
        .then((response) => {
          toast({
            title: `Enclosure ${
              slug == "new" ? "created" : "updated"
            } successfully`,
            variant: "success",
          });
          setIsCruding(false);
          setTimeout(() => {
            router.back();
          }, 3000);
        })
        .catch((error) => {
          toast({
            title: `Enclosure not ${
              slug == "new" ? "created" : "updated"
            } successfully`,
            description: error.message,
            variant: "danger",
          });
          setIsCruding(false);
        });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const temp = selectedFiles.map((f) => {
        return {
          FileId: 0,
          file: f,
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
    setDeletedFileIds([...deletedFileIds, id]);
    removeImage(index);
  };
  const addImageFiles = () => {
    document.getElementById("file-upload")?.click();
  };

  const AddFeature = () => {
    setFeatures([...features, ""]);
  };
  const RemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (!isNaN(Number(slug))) {
      helper.xhr
        .Get(
          "/Enclosure/GetEnclosureForEdit",
          helper.GetURLParamString({ EnclosureId: Number(slug) }).toString()
        )
        .then((res) => {
          setObj(res);
          setFeatures(res.features);
          setImageFiles(
            res.enclosureFiles.map((file: any) => ({
              FileId: file.EnclosureFileId,
              file: null,
              Docpath: file.EnclosureFilepath,
            }))
          );
        });
    }
  }, [slug]);

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
            <Paragraph text="Details" />
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 gap-y-3">
              <InputTag
                value={obj.EnclosureName}
                name="EnclosureName"
                setter={handleChange}
                label="Enclosure Name"
              />
              <Dropdown
                activeId={obj.ZooId}
                name="ZooId"
                options={zooList}
                handleDropdownChange={handleChange}
                label="Zoo"
              />
              <Dropdown
                activeId={obj.LocationId}
                name="LocationId"
                options={locations}
                handleDropdownChange={handleChange}
                label="Location"
              />
              <Dropdown
                activeId={obj.EnclosureTypeId}
                name="EnclosureTypeId"
                options={types}
                handleDropdownChange={handleChange}
                label="Type"
              />
              <Dropdown
                activeId={obj.OperationalStatusId}
                name="OperationalStatusId"
                options={statuses}
                handleDropdownChange={handleChange}
                label="Status"
              />
              <InputTag
                value={obj.Capacity}
                name="Capacity"
                setter={(n, v) => {
                  if (!isNaN(Number(v))) {
                    handleChange(n, v == 0 ? null : v);
                  }
                }}
                label="Capacity"
              />
              <div className="col-span-1 md:col-span-2">
                <TextArea
                  value={obj.EnclosureDescription}
                  name="EnclosureDescription"
                  setter={handleChange}
                  label="Description"
                  placeHolder="Write description here..."
                />
              </div>
            </div>
          </div>
          {/* <Separator /> */}
          <div className="space-y-3 hidden">
            <Paragraph text="Environment Controls" />
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 gap-y-3">
              <InputTag
                value={obj.Temperature}
                name="Temperature"
                setter={handleChange}
                label="Temperature"
                placeHolder="30-35°C"
              />
              <InputTag
                value={obj.Humidity}
                name="Humidity"
                setter={handleChange}
                label="Humidity"
                placeHolder="60-80%"
              />
              <InputTag
                value={obj.Lighting}
                name="Lighting"
                setter={handleChange}
                label="Lighting"
                placeHolder="Simulated daylight cycle"
              />
              {/* <InputTag
                value={obj.WaterFeatures}
                name="WaterFeatures"
                setter={handleChange}
                label="Water Features"
                placeHolder="Waterfall and pond"
              /> */}
            </div>
          </div>
          {/* <Separator /> */}
          <div className="space-y-3 hidden">
            <div className="flex justify-between items-center">
              <Paragraph text="Features" />
              <div className="w-fit">
                <ButtonComp
                  clickEvent={AddFeature}
                  type={"white"}
                  text="Add Feature"
                  beforeIcon={<Plus size={14} />}
                />
              </div>
            </div>
            <div className="space-y-2">
              {features.length > 0 ? (
                features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <InputTag
                      name={`Feature`}
                      placeHolder="Enter feature"
                      value={feature}
                      setter={(n, v) => {
                        setFeatures((prev) => {
                          const updated = [...prev];
                          updated[index] = v;
                          return updated;
                        });
                      }}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => RemoveFeature(index)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-muted-foreground text-sm italic">
                  No features added yet.
                </div>
              )}
            </div>
          </div>
          {/* <Separator /> */}
          <div className="space-y-3 hidden">
            <Paragraph text="Graphic Visuals" />
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
                    {/* {image.FileId == 0 &&
                      obj.EnclosureId != 0 &&
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
                      )} */}
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
                text={slug !== "new" ? "Save" : "Create"}
                clickEvent={HandleSubmit}
                isCruding={isCruding}
                beforeIcon={<Save className="h-4 w-4" />}
              />
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
