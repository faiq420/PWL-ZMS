"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import ButtonComp from "@/components/utils/Button";
import DateRangePicker from "@/components/utils/FormElements/DateRangePicker";
import Dropdown from "@/components/utils/FormElements/Dropdown";
import InputTag from "@/components/utils/FormElements/InputTag";
import MultiSelectDropdown from "@/components/utils/FormElements/MultiSelectDropdown";
import TextArea from "@/components/utils/FormElements/TextArea";
import Toggle from "@/components/utils/FormElements/Toggle";
import Paragraph from "@/components/utils/Headings/Paragraph";
import Subheading from "@/components/utils/Headings/Subheading";
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

type trip = {
  TripId: number;
  Tagline: string;
  Description: string;
  LocationId: number;
  BannerImage: string | File;
};

const Page = () => {
  const { toast } = useToast();
  const helper = useHelper();
  const router = useRouter();
  const params = useParams();
  const [isCruding, setIsCruding] = useState(false);
  const slug = params.slug as string;
  const [locations, setLocations] = useState<OPTION[]>([]);
  const [dateRange, setDateRange] = useState({
    FromDate: "",
    ToDate: "",
  });
  const [obj, setObj] = useState({
    EventId: 0,
    EventTitle: "",
    EventDescription: "",
    EventStartingTime: "",
    EventClosingTime: "",
    EventCoverFilepath: "",
    IsOccasional: true,
    EventDays: "",
    ZooId: 0,
    LocationId: 0,
    TagLine: "",
  });
  const [zoos, setZoos] = useState<OPTION[]>([]);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [eventImages, setEventImages] = useState<ImagesFiles[]>([]);
  const [deletedFiles, setDeletedFiles] = useState<number[]>([]);
  useEffect(() => {
    if (slug) {
      if (slug != "new" && isNaN(Number(slug))) {
        router.push("/home/event-management");
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
      "Event"
    )} ${slug != "new" ? `for ${obj.EventTitle}` : ""}`;
  }

  function handleChange(n: string, v: string | boolean | number) {
    setObj({ ...obj, [n]: v });
  }

  const verify = () => {
    const toastObj = {
      title: "Validation Error",
      description: "",
    };

    const fail = (message: string) => {
      toastObj.description = message;
      toast(toastObj);
      return false;
    };

    switch (true) {
      case obj.EventTitle === "":
        return fail("Trip event name is required.");

      case obj.EventStartingTime === "" || obj.EventClosingTime === "":
        return fail("Starting and ending time are required.");

      case obj.EventDays === "":
        console.log(obj.EventDays);
        return fail("Days are required.");

      case obj.ZooId === 0:
        return fail("Select a zoo.");

      case obj.LocationId === 0:
        return fail("Select a location.");

      case obj.EventDescription === "":
        return fail("Description is required.");

      case obj.EventCoverFilepath === "" && coverImageFile == null:
        return fail("Cover image is required.");

      case eventImages.length === 0:
        return fail("Event images are required.");
    }

    // Nested validation — FIRST failure only

    return true;
  };

  const HandleSubmit = () => {
    if (verify()) {
      setIsCruding(true);
      const createObject: any = {
        obj: {
          ...obj,
          LocationId: obj.LocationId == 0 ? null : obj.LocationId,
        },
        EventImages: eventImages.map((image) => image.file),
      };
      const editObject: any = {
        obj: { ...obj },
        EventImages: eventImages
          .filter((x) => x.file != null)
          .map((image) => image.file),
        DeletedFileIds: deletedFiles,
      };
      if (coverImageFile) {
        slug == "new"
          ? (createObject.EventCoverImage = coverImageFile)
          : (editObject.EventCoverImage = coverImageFile);
      }
      helper.xhr
        .Post(
          `/Event/${
            slug == "new" ? "CreateOccasionalEvent" : "UpdateOccasionalEvent"
          }`,
          helper.ConvertToFormData(obj.EventId == 0 ? createObject : editObject)
        )
        .then((response) => {
          toast({
            title: `Event ${
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
            title: `Event not ${
              slug == "new" ? "created" : "updated"
            } successfully`,
            description: error.message,
            variant: "danger",
          });
          setIsCruding(false);
        });
    }
  };

  useEffect(() => {
    if (!isNaN(Number(slug))) {
      helper.xhr
        .Get(
          "/Event/GetEventById",
          helper.GetURLParamString({ id: Number(slug) }).toString()
        )
        .then((res) => {
          setObj({
            EventId: res.data.EventId,
            EventTitle: res.data.EventTitle,
            EventStartingTime: res.data.EventStartingTime,
            EventClosingTime: res.data.EventClosingTime,
            EventCoverFilepath: res.data.EventCoverFilepath,
            EventDescription: res.data.EventDescription,
            EventDays: res.data.EventDays,
            TagLine: res.data.TagLine,
            ZooId: res.data.ZooId,
            LocationId: res.data.LocationId,
            IsOccasional: res.data.IsOccasional,
          });
          setEventImages(
            res.data.files.map((x: any) => {
              return {
                FileId: x.EventFileId,
                file: null,
                Docpath: x.EventFilepath,
              };
            })
          );
          setDateRange({
            FromDate: res.data.EventDays.split(",")[0],
            ToDate:
              res.data.EventDays.split(",")[
                res.data.EventDays.split(",").length - 1
              ],
          });
        });
    }
  }, [slug]);

  useEffect(() => {
    helper.xhr.Get("/List/GetZooList").then((res) => {
      setZoos(
        res.map((z: any) => {
          return {
            value: Number(z.ZooId),
            label: z.ZooTitle,
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
        console.log(res);
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

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setCoverImageFile(selectedFile);
    }
  };

  const removeEventImage = (index: number) => {
    setEventImages(eventImages.filter((_, i) => i !== index));
  };

  const DeleteEventImage = (id: number, index: number) => {
    setDeletedFiles([...deletedFiles, id]);
    removeEventImage(index);
  };

  const addEventImage = () => {
    document.getElementById("file-upload")?.click();
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
      setEventImages([...eventImages, ...temp]);
    }
  };

  const GetDateRange = (from: string, to: string): string[] => {
    const start = new Date(from);
    const end = new Date(to);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error("Invalid date format. Expected YYYY-MM-DD.");
    }
    if (start > end) {
      throw new Error("Start date cannot be greater than end date.");
    }

    const result: string[] = [];

    const current = new Date(start);
    while (current <= end) {
      const yyyy = current.getFullYear();
      const mm = String(current.getMonth() + 1).padStart(2, "0");
      const dd = String(current.getDate()).padStart(2, "0");

      result.push(`${yyyy}-${mm}-${dd}`);

      current.setDate(current.getDate() + 1);
    }

    return result;
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
        <CardContent className="space-y-3">
          <div className="w-full flex justify-center">
            <div className="w-full md:w-1/3 xl:w-1/4">
              <Label>Cover Image</Label>
              {coverImageFile != null || obj?.EventCoverFilepath != "" ? (
                <div className="relative aspect-video rounded-md border border-main-gray/30 overflow-hidden w-full">
                  <Image
                    src={
                      obj?.EventCoverFilepath && obj?.EventCoverFilepath != ""
                        ? helper.GetDocument(obj.EventCoverFilepath)
                        : coverImageFile
                        ? URL.createObjectURL(coverImageFile)
                        : "/placeholder.svg"
                    }
                    alt="Cover image"
                    fill
                    className="object-cover"
                    unoptimized
                  />

                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 rounded-full"
                    onClick={() => {
                      handleChange("EventCoverFilepath", "");
                      setCoverImageFile(null);
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
                    onChange={handleCoverFileChange}
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
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 gap-y-3">
            <InputTag
              value={obj.EventTitle}
              name="EventTitle"
              setter={handleChange}
              label="Event Name"
              placeHolder="Name of Event"
            />
            <InputTag
              value={obj.TagLine}
              name="TagLine"
              setter={handleChange}
              label="Tagline"
              placeHolder="Every day is paw-ty when you have a furry little companion."
            />
            <Dropdown
              activeId={obj.ZooId}
              name="ZooId"
              handleDropdownChange={(n, v) => {
                setObj({ ...obj, ZooId: Number(v), LocationId: 0 });
              }}
              label="Zoo"
              options={zoos}
            />
            <Dropdown
              activeId={obj.LocationId}
              name="LocationId"
              handleDropdownChange={handleChange}
              label="Location"
              options={locations}
            />
            <DateRangePicker
              value={{
                startDate: dateRange.FromDate,
                endDate: dateRange.ToDate,
              }}
              name="DateRange"
              setter={(n, v) => {
                setDateRange({
                  FromDate: v.startDate,
                  ToDate: v.endDate,
                });
                setObj({
                  ...obj,
                  EventDays: GetDateRange(v.startDate, v.endDate).join(","),
                });
              }}
              label="Date Range for the event"
            />
            <div className="flex gap-2">
              <InputTag
                value={obj.EventStartingTime}
                name="EventStartingTime"
                placeHolder="00:00"
                setter={handleChange}
                label="Starting Time"
                type="time"
              />
              <InputTag
                type="time"
                value={obj.EventClosingTime}
                placeHolder="00:00"
                name="EventClosingTime"
                setter={handleChange}
                label="Ending Time"
              />
            </div>
            <div className="col-span-1 md:col-span-3 xl:col-span-4">
              <TextArea
                isRequired
                value={obj.EventDescription}
                name="EventDescription"
                setter={handleChange}
                label="Description"
                placeHolder="Write description for the trip event here..."
              />
            </div>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      <Card>
        <CardHeader></CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Paragraph text="Event Images" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {eventImages.map((image, index) => (
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
                        alt={`Event image ${index + 1}`}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    )}
                    {image.FileId != 0 ? (
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 rounded-full"
                        onClick={() => DeleteEventImage(image.FileId, index)}
                      >
                        <Trash2 className="h-3 w-3" />
                        <span className="sr-only">Remove image</span>
                      </Button>
                    ) : (
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 rounded-full"
                        onClick={() => removeEventImage(index)}
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
                accept="image/*,video/*"
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={addEventImage}
                className="flex w-full flex-col items-center justify-center aspect-square rounded-md border border-dashed border-main-gray/50 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <Upload className="h-6 w-6 text-main-gray mb-1" />
                <span className="text-xs text-main-gray">Add Image</span>
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
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
    </div>
  );
};

export default Page;
