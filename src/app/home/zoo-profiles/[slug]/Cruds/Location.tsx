import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import ButtonComp from "@/components/utils/Button";
import Dropdown from "@/components/utils/FormElements/Dropdown";
import InputTag from "@/components/utils/FormElements/InputTag";
import TextArea from "@/components/utils/FormElements/TextArea";
import Paragraph from "@/components/utils/Headings/Paragraph";
import Subheading from "@/components/utils/Headings/Subheading";
import {
  ArrowLeft,
  MapPin,
  Save,
  SaveIcon,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import MapLocationModal from "../../../visit-planning/components/MapLocationPickerModal";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import useHelper from "@/Helper/helper";
import { servicesStatus } from "@/data";
import { useToast } from "@/components/ui/use-toast";

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

const Location = ({ mode = "create", id = "0", tab }: Props) => {
  const helper = useHelper();
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const [isCruding, setIsCruding] = useState(false);
  const [obj, setObj] = useState({
    LocationId: 0,
    LocationName: "",
    Description: "",
    OperationalStatusId: 1,
    BuildingTypeId: 0,
    Latitude: "",
    Longitude: "",
    ImagePath: "",
    ZooId: Number(slug),
    IsActive: true,
  });
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
  const [imageFiles, setImageFiles] = useState<ImagesFiles[]>([]);
  const [mapPinFile, setMapPinFile] = useState<File | null>(null);
  const [status, setStatus] = useState([]);
  const [buildingType, setBuildingType] = useState([
    // { value: 1, label: "Sanctuary" },
    // { value: 2, label: "Prayer Area" },
    // { value: 3, label: "Facility" },
    // { value: 4, label: "Office" },
    // { value: 5, label: "Cafeteria" },
    // { value: 6, label: "Gate" },
    // { value: 7, label: "Ticket Booth" },
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
      id != "0" ? `for ${obj.LocationName}` : ""
    }`;
  }

  function handleChange(n: string, v: string | boolean | number) {
    setObj({ ...obj, [n]: v });
  }

  const verify = () => {
    const toastObj = { title: "Validation Error", description: "" };
    if (obj.LocationName == "") {
      toastObj.description = "Location Name is required.";
    } else if (obj.BuildingTypeId == 0) {
      toastObj.description = "Building Type is required.";
    } else if (obj.Latitude == "" || obj.Longitude == "") {
      toastObj.description = "Latitude and Longitude are required.";
    }
    if (toastObj.description !== "") {
      toast(toastObj);
      return false;
    }
    return true;
  };

  function HandleSubmit() {
    if (verify()) {
      setIsCruding(true);
      helper.xhr
        .Post(
          `/Location/${
            obj.LocationId !== 0 ? "UpdateLocation" : "AddLocation"
          }`,
          helper.ConvertToFormData({
            obj,
            locationImage: mapPinFile,
          })
        )
        .then((response) => {
          if (response) {
            toast({
              title: `Location ${
                obj.LocationId !== 0 ? "updated" : "created"
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
            title: `Location not ${
              obj.LocationId !== 0 ? "updated" : "created"
            }`,
            description: error.message,
            variant: "danger",
          });
          setIsCruding(false);
        });
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const temp = selectedFiles.map((f) => {
        return {
          FileId: 0,
          file: f,
          LocationId: obj.LocationId,
        };
      });
      console.log(temp);
      setImageFiles([...imageFiles, ...temp]);
    }
  };
  const handlePinFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setMapPinFile(selectedFile);
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

  const addImageFiles = () => {
    document.getElementById("file-upload")?.click();
  };
  const addPinImage = () => {
    document.getElementById("mappin-upload")?.click();
  };

  const removeLocationImage = (index: number) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  const DeleteLocationImage = (id: number, index: number) => {
    helper.xhr
      .Post("/Location/DeleteLocationImage", helper.ConvertToFormData({ id }))
      .then((res) => {
        // Message("success", "File removed.");
        setImageFiles(imageFiles.filter((_, i) => i !== index));
      });
  };

  function AddNewLocationFile(locationId: number, file: File, index?: number) {}

  useEffect(() => {
    helper.xhr.Get("/List/GetBuildingTypes").then((res) => {
      setBuildingType(
        res.map((r: any) => {
          return { value: r.BuildingTypeId, label: r.Type };
        })
      );
    });
    helper.xhr.Get("/List/GetOperationalStatus").then((res) => {
      setStatus(
        res.map((r: any) => {
          return { value: r.OperationalStatusId, label: r.Status };
        })
      );
    });
  }, []);

  useEffect(() => {
    if (id != "0") {
      helper.xhr
        .Get(
          "/Location/GetLocationById",
          helper.GetURLParamString({ locationId: Number(id) }).toString()
        )
        .then((res) => {
          console.log(res);
          setObj(res);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [id]);

  return (
    <>
      {showLocationSelectionModal && (
        <MapLocationModal
          isOpen={showLocationSelectionModal}
          onClose={() => setShowLocationSelectionModal(false)}
          onSave={(lat, lng) => {
            setObj({ ...obj, Latitude: String(lat), Longitude: String(lng) });
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
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Paragraph
                text="Location's Details"
                className="tracking-normal"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 gap-y-3">
                <InputTag
                  name="LocationName"
                  setter={handleChange}
                  label="Location Name"
                  value={obj.LocationName}
                  placeHolder="Lion's Den"
                />
                <Dropdown
                  options={buildingType}
                  name="BuildingTypeId"
                  handleDropdownChange={handleChange}
                  label="Building Type"
                  activeId={obj.BuildingTypeId}
                />
                <Dropdown
                  options={status}
                  name="OperationalStatusId"
                  handleDropdownChange={handleChange}
                  label="Status"
                  activeId={obj.OperationalStatusId}
                />
                <div className="col-span-1 md:col-span-2">
                  <TextArea
                    name="Description"
                    setter={handleChange}
                    label="Location Description"
                    value={obj.Description}
                    placeHolder="Write details about this location here..."
                  />
                </div>
                <div className="relative space-y-3">
                  {/* <div className="w-full flex justify-end">
                    <MapPin
                      className="h-4 w-4 text-main-softRed !cursor-pointer"
                      onClick={() => {
                        setShowLocationSelectionModal(true);
                      }}
                    />
                  </div>
                  <InputTag
                    name="Name"
                    setter={handleChange}
                    label="Location's Coordinates"
                    disabled
                    value={
                      obj.Latitude != 0
                        ? obj.Latitude + ", " + obj.Longitude
                        : ""
                    }
                  /> */}
                  <InputTag
                    name="Latitude"
                    setter={handleChange}
                    label="Latitude"
                    value={obj.Latitude}
                    placeHolder="0.0000"
                  />
                  <InputTag
                    name="Longitude"
                    setter={handleChange}
                    label="Longitude"
                    value={obj.Longitude}
                    placeHolder="0.0000"
                  />
                </div>
              </div>
              <div className="md:-mt-2 space-y-2 w-full md:w-1/3">
                <Label>Map Pin Image</Label>
                {mapPinFile != null ||
                (obj?.ImagePath != "" && obj.ImagePath != null) ? (
                  <div className="relative aspect-video rounded-md border border-main-gray/30 overflow-hidden w-full">
                    <Image
                      src={
                        obj?.ImagePath && obj?.ImagePath != ""
                          ? helper.GetDocument(obj.ImagePath)
                          : mapPinFile
                          ? URL.createObjectURL(mapPinFile)
                          : "/placeholder.svg"
                      }
                      alt="Pin image"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 rounded-full"
                      onClick={() => {
                        setObj({ ...obj, ImagePath: "" });
                        setMapPinFile(null);
                      }}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove image</span>
                    </Button>
                  </div>
                ) : (
                  <>
                    <input
                      id="mappin-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handlePinFileChange}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        document.getElementById("mappin-upload")?.click();
                      }}
                      className="flex w-full flex-col items-center justify-center aspect-video rounded-md border border-dashed border-main-gray/50 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <Upload className="h-6 w-6 text-main-gray mb-1" />
                      <span className="text-xs text-main-gray">Add Image</span>
                    </button>
                  </>
                )}
              </div>
              {/* <div className="">
                <Label>Location Images</Label>
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
                            alt={`Location image ${index + 1}`}
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
                                AddNewLocationFile(obj.Id, image.file, index)
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
                            onClick={() =>
                              DeleteLocationImage(image.FileId, index)
                            }
                          >
                            <Trash2 className="h-3 w-3" />
                            <span className="sr-only">Remove image</span>
                          </Button>
                        ) : (
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6 rounded-full"
                            onClick={() => removeLocationImage(index)}
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
                  <input
                    id="mappin-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handlePinFileChange}
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
              </div> */}
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

export default Location;
