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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { compressFile } from "@/Helper/Utility";
import { OPTION } from "@/types/utils";
import {
  ArrowLeft,
  Plus,
  PlusCircle,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type ImagesFiles = {
  FileId: number;
  file: File | null;
  Docpath?: string;
};

type trip = {
  EventId: number;
  TripId: number;
  TripTitle: string;
  TripDescription: string;
  LocationId: number;
  TripCoverImage: null | File;
  TripCoverFilepath: string;
};

type ticketDetails = {
  TicketDetailId?: number;
  Category: string;
  AdditionalInformation: string;
  Amount: number;
};

const Page = () => {
  const { toast } = useToast();
  const helper = useHelper();
  const router = useRouter();
  const params = useParams();
  const [isCruding, setIsCruding] = useState(false);
  const slug = params.slug as string;
  const [eventImages, setEventImages] = useState<ImagesFiles[]>([]);
  const [locations, setLocations] = useState<OPTION[]>([]);
  const [obj, setObj] = useState({
    EventId: 0,
    EventTitle: "",
    EventStartingTime: "",
    EventClosingTime: "",
    EventLogoFilepath: "",
    EventCoverFilepath: "",
    EventDescription: "",
    EventDays: "",
    TagLine: "",
    ZooId: 0,
    LocationId: 0,
    IsOccasional: false,
  });
  const [tickets, setTickets] = useState<
    { Title: string; Details: ticketDetails[] }[]
  >([]);
  const [hasNestedTrip, setHasNestedTrip] = useState<boolean>(false);
  const [zoos, setZoos] = useState<OPTION[]>([]);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [deletedFiles, setDeletedFiles] = useState<number[]>([]);
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
    TripTitle: "",
    TripDescription: "",
    LocationId: 0,
    TripCoverImage: null,
    TripCoverFilepath: "",
    EventId: 0,
  };
  const [eventDetails, setEventDetails] = useState<trip[]>([{ ...tripEvent }]);
  const [mappedAnimals, setMappedAnimals] = useState<number[]>([]);
  const [areAnimalsIncludedInThisEvent, setAreAnimalsIncludedInThisEvent] =
    useState<boolean>(false);
  const [animals, setAnimals] = useState<OPTION[]>([]);
  useEffect(() => {
    if (slug) {
      if (slug != "new" && isNaN(Number(slug))) {
        router.push("/home/trip-management");
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
      "Trip"
    )} ${slug != "new" ? `for ${obj.EventTitle}` : ""}`;
  }

  function handleChange(n: string, v: string | boolean | number) {
    setObj({ ...obj, [n]: v });
  }
  function handleDetailsChange(
    n: string,
    v: string | boolean | number | File,
    i: number
  ) {
    const updatedEventDetails = [...eventDetails];
    updatedEventDetails[i] = { ...updatedEventDetails[i], [n]: v };
    setEventDetails(updatedEventDetails);
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

      case obj.LocationId === 0 && !hasNestedTrip:
        return fail("Select a location.");

      case obj.EventDescription === "":
        return fail("Description is required.");

      case obj.EventLogoFilepath === "" && logoFile == null:
        return fail("Logo is required.");

      case obj.EventCoverFilepath === "" && coverImageFile == null:
        return fail("Cover image is required.");

      case eventImages.length === 0:
        return fail("Event images are required.");

      case hasNestedTrip && eventDetails.length === 0:
        return fail("Event details are required.");
    }

    // Nested validation — FIRST failure only
    if (hasNestedTrip) {
      for (let i = 0; i < eventDetails.length; i++) {
        const d = eventDetails[i];
        const index = (i + 1).toString().padStart(2, "0");

        switch (true) {
          case d.TripTitle === "":
            return fail(`Title in event detail #${index} is required.`);

          case d.LocationId === 0:
            return fail(`Location in event detail #${index} is required.`);

          case d.TripDescription === "":
            return fail(`Description in event detail #${index} is required.`);

          case d.TripCoverImage === null && d.TripCoverFilepath === "":
            return fail(`Banner image in event detail #${index} is required.`);
        }
      }
    }
    // for (let i = 0; i < eventDetails.length; i++) {
    //   const d = tickets[i];
    //   const index = (i + 1).toString().padStart(2, "0");

    //   if (d.Title === "")
    //     return fail(`Title in tickets #${index} is required.`);

    //   d.Details.forEach((ticketDetail, i) => {
    //     if (ticketDetail.Category == "") {
    //       return fail(`Category ${i + 1} in tickets #${index} is required.`);
    //     }
    //   });
    // }

    return true;
  };

  const HandleSubmit = async () => {
    if (verify()) {
      setIsCruding(true);
      const createObject: any = {
        obj: {
          ...obj,
          LocationId: obj.LocationId == 0 ? null : obj.LocationId,
        },
        EventImages: await Promise.all(
          eventImages.map(async (x) =>
            x.file ? await compressFile(x.file) : null
          )
        ),
        AnimalIds: mappedAnimals,
      };
      const editObject: any = {
        obj: { ...obj },
        EventImages: await Promise.all(
          eventImages
            .filter((x) => x.file != null)
            .map(async (image) =>
              image.file ? await compressFile(image.file) : null
            )
        ),
        AnimalIds: mappedAnimals,
        DeletedFileIds: deletedFiles,
      };
      console.log(coverImageFile, logoFile);
      if (coverImageFile) {
        const compressedCover = coverImageFile
          ? await compressFile(coverImageFile)
          : null;
        slug == "new"
          ? (createObject.EventCoverImage = compressedCover)
          : (editObject.EventCoverImage = compressedCover);
      }
      if (logoFile) {
        const compressedLogo = logoFile ? await compressFile(logoFile) : null;
        slug == "new"
          ? (createObject.EventLogoImage = compressedLogo)
          : (editObject.EventLogoImage = compressedLogo);
      }
      helper.xhr
        .Post(
          `/Event/${slug == "new" ? "CreateEvent" : "UpdateEvent"}`,
          helper.ConvertToFormData(obj.EventId == 0 ? createObject : editObject)
        )
        .then(async (response) => {
          console.log(response);
          if (typeof response == "number") {
            const details = eventDetails.map((x) => {
              return { ...x, EventId: response };
            });
            console.log(details, "details");
            const tripsAddedorUpdated = await AddOrUpdateTrip(details);
            console.log(tripsAddedorUpdated);
            toast({
              title: `Trip event ${
                slug == "new" ? "created" : "updated"
              } successfully`,
              variant: "success",
            });
            setIsCruding(false);
            setTimeout(() => {
              router.back();
            }, 3000);
          }
        })
        .catch((error) => {
          toast({
            title: `Trip event not ${
              slug == "new" ? "created" : "updated"
            } successfully`,
            description: error.message,
            variant: "danger",
          });
          setIsCruding(false);
        });
    }
  };

  const AddOrUpdateTrip = async (details: any[]) => {
    // 1️⃣ Prepare payloads properly

    const payloads = await Promise.allSettled(
      details.map(async (x) => {
        const payload: { obj: trip; TripCoverImage?: File } = { obj: x };

        if (x.TripCoverImage instanceof File) {
          payload.TripCoverImage = await compressFile(x.TripCoverImage);
        }

        return payload;
      })
    );
    console.log(payloads, "payloads");
    const fulfilledPayloads = payloads
      .filter(
        (
          p
        ): p is PromiseFulfilledResult<{ obj: trip; TripCoverImage?: File }> =>
          p.status === "fulfilled"
      )
      .map((p) => p.value);
    console.log(fulfilledPayloads, "fulfilledPayloads");
    const results = await Promise.allSettled(
      fulfilledPayloads.map((payload) =>
        helper.xhr.Post(
          `/Event/${
            slug === "new" || payload.obj.TripId === 0
              ? "AddTrip"
              : "UpdateTrip"
          }`,
          helper.ConvertToFormDataV2({ ...payload })
        )
      )
    );

    return results
      .filter((r) => r.status === "fulfilled")
      .map((r: any) => r.value);
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
            EventLogoFilepath: res.data.EventLogoFilepath,
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
          setSelectedDays(res.data.EventDays.split(","));
          setMappedAnimals(res.data.animalIds);
          setMappedAnimals(res.data.animalIds.map((x: any) => x.AnimalId));
          setEventDetails(
            res.data.trips.map((x: any) => {
              return {
                TripTitle: x.TripTitle,
                LocationId: x.LocationId,
                TripId: x.TripId,
                TripDescription: x.TripDescription,
                TripCoverFilepath: x.TripCoverFilepath,
                TripCoverImage: null,
                EventId: res.data.EventId,
              };
            })
          );
          setAreAnimalsIncludedInThisEvent(res.data.animalIds.length > 0);
          setHasNestedTrip(res.data.trips.length > 0);
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
        "/List/GetAnimalsByZooId",
        helper
          .GetURLParamString({
            zooId: obj.ZooId,
          })
          .toString()
      )
      .then((res) => {
        setAnimals(
          res.map((z: any) => {
            return {
              value: z.AnimalId,
              label: z.AnimalName,
            };
          })
        );
      });
  }, [obj.ZooId]);
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
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 gap-y-3">
            <div className="hidden xl:block" />
            <div className="w-full">
              <Label>Logo</Label>
              {logoFile != null ||
              (obj?.EventLogoFilepath != null &&
                obj?.EventLogoFilepath != "") ? (
                <div className="relative aspect-video rounded-md border border-main-gray/30 overflow-hidden w-full">
                  <Image
                    src={
                      obj?.EventLogoFilepath && obj?.EventLogoFilepath != ""
                        ? helper.GetDocument(obj.EventLogoFilepath)
                        : logoFile
                        ? URL.createObjectURL(logoFile)
                        : "/placeholder.svg"
                    }
                    alt="Trip event logo"
                    fill
                    className="object-contain"
                    unoptimized
                  />

                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 rounded-full"
                    onClick={() => {
                      handleChange("EventLogoFilepath", "");
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
            <div className="w-full">
              <Label>Cover Image</Label>
              {coverImageFile != null ||
              (obj?.EventCoverFilepath != "" &&
                obj?.EventCoverFilepath != null) ? (
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
                    id="coverimage-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleCoverFileChange}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById("coverimage-upload")?.click();
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
              value={obj.EventTitle}
              name="EventTitle"
              setter={handleChange}
              label="Event Name"
              placeHolder="Name of Event"
              isRequired
            />
            <div className="flex gap-2">
              <InputTag
                value={obj.EventStartingTime}
                name="EventStartingTime"
                placeHolder="00:00"
                setter={handleChange}
                label="Starting Time"
                type="time"
                isRequired
              />
              <InputTag
                type="time"
                value={obj.EventClosingTime}
                placeHolder="00:00"
                name="EventClosingTime"
                setter={handleChange}
                label="Ending Time"
                isRequired
              />
            </div>
            {/* {obj.IsOccasional ? (
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
            ) : ( */}
            <InputTag
              value={obj.TagLine}
              name="TagLine"
              setter={handleChange}
              label="Tagline"
              placeHolder="Explore.."
            />
            <MultiSelectDropdown
              options={days}
              name="EventDays"
              handleDropdownChange={(n, v) => {
                console.log(n, v.join(","));
                handleChange(n, v.join(","));
                setSelectedDays(v);
              }}
              selectedIds={selectedDays}
              label="Days for trip"
            />
            <Dropdown
              activeId={obj.ZooId}
              name="ZooId"
              handleDropdownChange={handleChange}
              label="Zoo"
              options={zoos}
              isRequired
            />
            {!hasNestedTrip && (
              <Dropdown
                activeId={obj.LocationId}
                name="LocationId"
                clearable
                handleDropdownChange={(n, v) => {
                  handleChange(n, v ?? 0);
                }}
                label="Location"
                options={locations}
              />
            )}
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
            {/* )} */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 gap-y-3">
            <Toggle
              value={areAnimalsIncludedInThisEvent}
              setter={(n, v) => {
                setAreAnimalsIncludedInThisEvent(v);
              }}
              name=""
              label="Are Animals Included In This Event"
            />
            <Toggle
              value={hasNestedTrip}
              isDisabled={obj.LocationId !== 0}
              setter={(n, v) => {
                setHasNestedTrip(v);
                if (v) setObj({ ...obj, LocationId: 0 });
              }}
              name=""
              label="Has trips within it"
            />
          </div>
          {areAnimalsIncludedInThisEvent ? (
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
          ) : null}
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
      {hasNestedTrip && (
        <Card>
          <CardHeader></CardHeader>
          <CardContent>
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
              <div className="space-y-4">
                {eventDetails.map((detail, index) => (
                  <div key={index} className="">
                    <div>
                      <div className="w-full">
                        <p
                          className="text-xs text-red-900 hover:cursor-pointer text-right"
                          onClick={() => {
                            setEventDetails(
                              eventDetails.filter((i, _) => _ != index)
                            );
                          }}
                        >
                          Remove
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-[30%_30%_38%] gap-2 gap-y-3">
                        <div className="">
                          <Label>Cover Image</Label>
                          {detail?.TripCoverImage != null ||
                          detail?.TripCoverFilepath != "" ? (
                            <div className="relative aspect-video rounded-md border border-main-gray/30 overflow-hidden w-full">
                              <Image
                                src={
                                  detail?.TripCoverImage == null &&
                                  detail?.TripCoverFilepath == ""
                                    ? "/placeholder.svg"
                                    : detail?.TripCoverFilepath !== ""
                                    ? helper.GetDocument(
                                        detail?.TripCoverFilepath
                                      )
                                    : detail?.TripCoverImage
                                    ? URL.createObjectURL(
                                        detail?.TripCoverImage
                                      )
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
                                  const updateEventDetails = [...eventDetails];
                                  updateEventDetails[index] = {
                                    ...updateEventDetails[index],
                                    TripCoverImage: null,
                                    TripCoverFilepath: "",
                                  };
                                  setEventDetails(updateEventDetails);
                                }}
                              >
                                <X className="h-3 w-3" />
                                <span className="sr-only">Remove image</span>
                              </Button>
                            </div>
                          ) : (
                            <>
                              <input
                                id={`coverimage-upload${1}`}
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    const selectedFile = e.target.files[0];
                                    const updateEventDetails = [
                                      ...eventDetails,
                                    ];
                                    updateEventDetails[index] = {
                                      ...updateEventDetails[index],
                                      TripCoverImage: selectedFile,
                                      TripCoverFilepath: "",
                                    };
                                    setEventDetails(updateEventDetails);
                                  }
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  document
                                    .getElementById(`coverimage-upload${1}`)
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
                        <div className="space-y-2">
                          <InputTag
                            value={detail.TripTitle}
                            name="TripTitle"
                            setter={(n, v) => handleDetailsChange(n, v, index)}
                            label="Title"
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
                        <TextArea
                          value={detail.TripDescription}
                          name="TripDescription"
                          setter={(n, v) => handleDetailsChange(n, v, index)}
                          label="Description"
                        />
                      </div>
                    </div>
                    {index < eventDetails.length - 1 && (
                      <hr className="w-full h-[1px] bg-main-borderColor mt-4" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {/* <Card>
        <CardHeader></CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <Paragraph text="Ticket Pricing" />
              <div className="w-fit">
                <ButtonComp
                  type={"white"}
                  text="Add"
                  clickEvent={() => {
                    setTickets([...tickets, { Title: "", Details: [] }]);
                  }}
                />
              </div>
            </div>
            <div className="space-y-4">
              {tickets.map((ticket, index) => (
                <div className="" key={index}>
                  <div className="w-full md:w-1/3 xl:w-1/4">
                    <InputTag
                      value={ticket.Title}
                      name="Title"
                      placeHolder="Day safari"
                      setter={(n, v) => {
                        const updatedTickets = [...tickets];
                        updatedTickets[index] = {
                          ...updatedTickets[index],
                          [n]: v,
                        };
                        setTickets(updatedTickets);
                      }}
                      label="Title"
                    />
                  </div>
                  <Table className="border text-xs mt-2">
                    <TableHeader>
                      <TableHead>S.No</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Additional Information</TableHead>
                    </TableHeader>
                    <TableBody>
                      {ticket.Details.map((detail, detailIndex) => (
                        <TableRow key={detailIndex}>
                          <TableCell className="w-8">
                            {(detailIndex + 1).toString().padStart(2, "0")}.
                          </TableCell>
                          <TableCell className="px-2 py-1 w-[250px]">
                            <InputTag
                              value={detail.Category}
                              name="Category"
                              placeHolder="Child/Adult"
                              setter={(n, v) => {
                                const updatedDetails = [...ticket.Details];
                                updatedDetails[detailIndex] = {
                                  ...updatedDetails[detailIndex],
                                  [n]: v,
                                };
                                const updatedTickets = [...tickets];
                                updatedTickets[index] = {
                                  ...updatedTickets[index],
                                  Details: updatedDetails,
                                };
                                setTickets(updatedTickets);
                              }}
                            />
                          </TableCell>
                          <TableCell className="px-2 py-1 w-20">
                            <InputTag
                              value={detail.Amount}
                              name="Amount"
                              type="number"
                              setter={(n, v) => {
                                const updatedDetails = [...ticket.Details];
                                updatedDetails[detailIndex] = {
                                  ...updatedDetails[detailIndex],
                                  [n]: v,
                                };
                                const updatedTickets = [...tickets];
                                updatedTickets[index] = {
                                  ...updatedTickets[index],
                                  Details: updatedDetails,
                                };
                                setTickets(updatedTickets);
                              }}
                            />
                          </TableCell>
                          <TableCell className="px-2 py-1">
                            <InputTag
                              value={detail.AdditionalInformation}
                              name="AdditionalInformation"
                              placeHolder="Between the age of 03 to 12 years."
                              setter={(n, v) => {
                                const updatedDetails = [...ticket.Details];
                                updatedDetails[detailIndex] = {
                                  ...updatedDetails[detailIndex],
                                  [n]: v,
                                };
                                const updatedTickets = [...tickets];
                                updatedTickets[index] = {
                                  ...updatedTickets[index],
                                  Details: updatedDetails,
                                };
                                setTickets(updatedTickets);
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableCell className="" colSpan={4}>
                        <div
                          onClick={() => {
                            const updatedTickets = [...tickets];
                            updatedTickets[index] = {
                              ...updatedTickets[index],
                              Details: [
                                ...updatedTickets[index]["Details"],
                                {
                                  Category: "",
                                  AdditionalInformation: "",
                                  Amount: 0,
                                },
                              ],
                            };
                            setTickets(updatedTickets);
                          }}
                          className="flex items-center gap-2 cursor-pointer w-fit"
                        >
                          <PlusCircle size={12} />
                          <p>Add Ticket Category</p>
                        </div>
                      </TableCell>
                    </TableBody>
                  </Table>
                  {index < tickets.length - 1 && (
                    <hr className="w-full h-[1px] bg-main-borderColor mt-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card> */}
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
