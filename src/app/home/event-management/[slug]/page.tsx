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
  const [zooList, setZooList] = useState<OPTION[]>([]);
  const [locations, setLocations] = useState<OPTION[]>([]);
  const [obj, setObj] = useState({
    EventId: 0,
    EventName: "",
    StartingTime: "",
    EndingTime: "",
    LogoPath: "",
    CoverImagePath: "",
    IsOccasional: false,
    FromDate: "",
    ToDate: "",
    Days: "",
    ZooId: 0,
  });
  const [zoos, setZoos] = useState<OPTION[]>([]);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const days = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ];
  const tripEvent: trip = {
    TripId: 0,
    Tagline: "",
    Description: "",
    LocationId: 0,
    BannerImage: "",
  };
  const [eventDetails, setEventDetails] = useState<trip[]>([{ ...tripEvent }]);
  const [mappedAnimals, setMappedAnimals] = useState<number[]>([]);
  const [areAnimalsIncludedInThisEvent, setAreAnimalsIncludedInThisEvent] =
    useState<boolean>(false);
  const [animals, setAnimals] = useState<OPTION[]>([]);
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
    )} ${slug != "new" ? `for ${obj.EventName}` : ""}`;
  }

  function handleChange(n: string, v: string | boolean | number) {
    setObj({ ...obj, [n]: v });
  }
  function handleDetailsChange(
    n: string,
    v: string | boolean | number,
    i: number
  ) {
    const updatedEventDetails = [...eventDetails];
    updatedEventDetails[i] = { ...updatedEventDetails[i], [n]: v };
    setEventDetails(updatedEventDetails);
  }

  const verify = () => {
    const toastObj = { title: "Validation Error", description: "" };
    // if (obj.EventName == "") {
    //   toastObj.description = "Event Name is required.";
    // } else if (obj.ZooId == 0 || obj.LocationId == 0) {
    //   toastObj.description = "Zoo and Location are required.";
    // }
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
        obj: { ...obj },
      };
      const editObject = {
        obj: { ...obj },
      };
      helper.xhr
        .Post(
          `/Event/${slug == "new" ? "AddEvent" : "UpdateEvent"}`,
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
          "/Event/GetEventForEdit",
          helper.GetURLParamString({ EventId: Number(slug) }).toString()
        )
        .then((res) => {
          setObj(res);
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

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setLogoFile(selectedFile);
    }
  };
  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setCoverImageFile(selectedFile);
    }
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
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 gap-y-3">
            <div className="hidden xl:block" />
            {obj.IsOccasional ? (
              <div />
            ) : (
              <div className="w-full">
                <Label>Logo</Label>
                {logoFile != null || obj?.LogoPath != "" ? (
                  <div className="relative aspect-video rounded-md border border-main-gray/30 overflow-hidden w-full">
                    <Image
                      src={
                        obj?.LogoPath && obj?.LogoPath != ""
                          ? helper.GetDocument(obj.LogoPath)
                          : logoFile
                          ? URL.createObjectURL(logoFile)
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
                        handleChange("LogoPath", "");
                        setLogoFile(null);
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
                      onChange={handleLogoFileChange}
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
            )}
            <div className="w-full">
              <Label>Cover Image</Label>
              {coverImageFile != null || obj?.CoverImagePath != "" ? (
                <div className="relative aspect-video rounded-md border border-main-gray/30 overflow-hidden w-full">
                  <Image
                    src={
                      obj?.CoverImagePath && obj?.CoverImagePath != ""
                        ? helper.GetDocument(obj.CoverImagePath)
                        : logoFile
                        ? URL.createObjectURL(logoFile)
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
                      handleChange("CoverImagePath", "");
                      setLogoFile(null);
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
                    onChange={handleLogoFileChange}
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
            <div className=""></div>
            <InputTag
              value={obj.EventName}
              name="EventName"
              setter={handleChange}
              label="Event Name"
              placeHolder="Name of Event"
            />
            <div className="flex gap-2">
              <InputTag
                value={obj.StartingTime}
                name="StartingTime"
                placeHolder="00:00"
                setter={handleChange}
                label="Starting Time"
                type="time"
              />
              <InputTag
                type="time"
                value={obj.EndingTime}
                placeHolder="00:00"
                name="EndingTime"
                setter={handleChange}
                label="Ending Time"
              />
            </div>
            <Dropdown
              activeId={obj.ZooId}
              name="ZooId"
              handleDropdownChange={handleChange}
              label="Zoo"
              options={zoos}
            />
            <Dropdown
              activeId={obj.IsOccasional}
              name="IsOccasional"
              handleDropdownChange={handleChange}
              label="Is Occasional"
              options={[
                { value: true, label: "Yes" },
                { value: false, label: "No" },
              ]}
            />
            {obj.IsOccasional ? (
              <DateRangePicker
                value={{ startDate: obj.FromDate, endDate: obj.ToDate }}
                name="DateRange"
                setter={(n, v) => {
                  setObj({
                    ...obj,
                    FromDate: v.startDate,
                    ToDate: v.endDate,
                  });
                }}
                label="Date Range for the event"
              />
            ) : (
              <MultiSelectDropdown
                options={days}
                name="Days"
                handleDropdownChange={(n, v) => {
                  handleChange(n, v.join(","));
                  setSelectedDays(v);
                }}
                selectedIds={selectedDays}
                label="Days for event"
              />
            )}
            <div className="h-full flex items-end">
              <Toggle
                value={areAnimalsIncludedInThisEvent}
                setter={(n, v) => {
                  setAreAnimalsIncludedInThisEvent(v);
                }}
                name=""
                label="Are Animals Included In This Event"
              />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <Paragraph text="Event Details" />
              <div className="w-fit">
                <ButtonComp
                  type={"white"}
                  text="Add"
                  clickEvent={() => {
                    setEventDetails([...eventDetails, tripEvent]);
                  }}
                />
              </div>
            </div>
            {eventDetails.map((detail, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 gap-y-3 rounded-lg border border-gray-300 p-2"
              >
                <div className="col-span-1 md:col-span-3 xl:col-span-4 flex justify-between items-start">
                  <div className="w-full md:w-1/3 xl:w-1/4">
                    <Label>Cover Image</Label>
                    {detail?.BannerImage != "" ? (
                      <div className="relative aspect-video rounded-md border border-main-gray/30 overflow-hidden w-full">
                        <Image
                          src={
                            detail?.BannerImage == ""
                              ? "/placeholder.svg"
                              : typeof detail?.BannerImage == "string"
                              ? helper.GetDocument(detail.BannerImage)
                              : URL.createObjectURL(detail.BannerImage)
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
                            handleChange("CoverImagePath", "");
                            setLogoFile(null);
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
                          onChange={handleLogoFileChange}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            document
                              .getElementById("iconimage-upload")
                              ?.click();
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
                  <p
                    className="text-xs text-red-900 hover:cursor-pointer"
                    onClick={() => {
                      setEventDetails(
                        eventDetails.filter((i, _) => _ != index)
                      );
                    }}
                  >
                    Remove
                  </p>
                </div>
                <div className="space-y-2">
                  <InputTag
                    value={detail.Tagline}
                    name="Tagline"
                    setter={(n, v) => handleDetailsChange(n, v, index)}
                    label="Tagline"
                  />
                  <Dropdown
                    activeId={detail.LocationId}
                    name="LocationId"
                    handleDropdownChange={(n, v) =>
                      handleDetailsChange(n, v, index)
                    }
                    label="Location"
                    options={locations}
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <TextArea
                    value={detail.Description}
                    name="Description"
                    setter={(n, v) => handleDetailsChange(n, v, index)}
                    label="Description"
                  />
                </div>
              </div>
            ))}
          </div>
          {areAnimalsIncludedInThisEvent && (
            <div className="space-y-3">
              <Paragraph text="Animals" />
              <MultiSelectDropdown
                options={animals}
                selectedIds={mappedAnimals}
                handleDropdownChange={(n, v) => {
                  setMappedAnimals(v);
                }}
                name=""
                label="Mapped Animal"
                // options={}
              />
            </div>
          )}
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
