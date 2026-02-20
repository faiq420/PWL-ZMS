"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ButtonComp from "@/components/utils/Button";
import InputTag from "@/components/utils/FormElements/InputTag";
import TextArea from "@/components/utils/FormElements/TextArea";
import Paragraph from "@/components/utils/Headings/Paragraph";
import Subheading from "@/components/utils/Headings/Subheading";
import { ArrowLeft, Save, SaveIcon, Trash2, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import useHelper from "@/Helper/helper";
import { MapContainer, Polygon, TileLayer } from "react-leaflet";
import { useToast } from "@/components/ui/use-toast";
import BoundarySelectorModal from "../../_components/BoundarySelectorModal";

interface LatLng {
  latitude: number;
  longitude: number;
}

type ZooFiles = {
  Fileid: number;
  file: File | null;
  Docpath?: string;
  ZooId: number;
};

interface Props {
  ZooId?: number;
}

const ZooCrud = ({ ZooId }: Props) => {
  const { toast } = useToast();
  const helper = useHelper();
  const router = useRouter();
  const [obj, setObj] = useState({
    ZooId: 0,
    ZooTitle: "",
    ZooLatitude: "",
    ZooLongitude: "",
    ZooOpeningTime: "",
    ZooClosingTime: "",
    ZooDescription: "",
    ZooLogoFilepath: "",
    CoverImageFilepath: "",
    IsActive: true,
  });
  const [isCruding, setIsCruding] = useState(false);
  const [iconImageSrc, setIconImageSrc] = useState<File | null>(null);
  const [bannerImageSrc, setBannerImageSrc] = useState<File | null>(null);
  const [zooImages, setZooImages] = useState<ZooFiles[]>([]);
  const [deletedFileIds, setDeletedFileIds] = useState<number[]>([]);
  const [coordinatePolygon, setCoordinatePolygon] = useState<LatLng[]>([]);
  const [showMapBoundaryPickerModal, setShowMapBoundaryPickerModal] =
    useState(false);

  const handleChange = (n: string, v: string | number) => {
    setObj({ ...obj, [n]: v });
  };

  const handleIconImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setIconImageSrc(selectedFile);
    }
  };
  const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setBannerImageSrc(selectedFile);
    }
  };

  ////////////////////zoo images///////////////
  const addZooImage = () => {
    document.getElementById("file-upload")?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const temp = selectedFiles.map((f) => {
        return {
          Fileid: 0,
          file: f,
          ZooId: obj.ZooId,
        };
      });
      setZooImages([...zooImages, ...temp]);
    }
  };

  const removeZooImage = (index: number) => {
    setZooImages(zooImages.filter((_, i) => i !== index));
  };

  const DeleteZooImage = (id: number, index: number) => {
    setDeletedFileIds([...deletedFileIds, id]);
    removeZooImage(index);
  };

  function AddNewZooFile(zooId: number, file: File, index?: number) {
    const formData = new FormData();
    formData.append("id", String(zooId));
    formData.append("file", file);

    helper.xhr
      .Post("/Zoo/UploadZooImage", formData)
      .then((res) => {
        console.log(res);
        // Message("success", `File saved.`);
        if (index) {
          const imgs = [...zooImages];
          imgs[index] = res;
          setZooImages(imgs);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {});
  }
  ////////////////////zoo images///////////////

  const verify = () => {
    const toastObj = { title: "Validation Error", description: "" };
    if (obj.ZooTitle == "") {
      toastObj.description = "Zoo Name is required.";
    } else if (obj.ZooLatitude == "" || obj.ZooLongitude == "") {
      toastObj.description = "Latitude and Longitude are required.";
    } else if (obj.ZooOpeningTime == "" || obj.ZooClosingTime == "") {
      toastObj.description = "Opening and Closing times are required.";
    }
    if (toastObj.description !== "") {
      toast(toastObj);
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (verify()) {
      const object: any = {
        obj,
        boundaries: coordinatePolygon,
        zooCoverImage: bannerImageSrc,
        zooImages: zooImages.map((x) => {
          return x.file;
        }),
        ZooLogo: iconImageSrc,
      };
      if (obj.ZooId != 0) {
        object["deletedFileIds"] = deletedFileIds;
      }
      setIsCruding(true);
      helper.xhr
        .Post(
          obj.ZooId != 0 ? `/Zoo/UpdateZoo` : `/Zoo/CreateZoo`,
          helper.ConvertToFormData(object),
        )
        .then((response) => {
          toast({
            title: `Zoo created successfully`,
            variant: "success",
          });
          setIsCruding(false);
          setTimeout(() => {
            router.back();
          }, 3000);
        })
        .catch((error) => {
          toast({
            title: `Zoo not created successfully`,
            description: error.message,
            variant: "danger",
          });
          setIsCruding(false);
        });
    }
  };

  useEffect(() => {
    if (!isNaN(Number(ZooId))) {
      helper.xhr
        .Get(
          "/Zoo/GetZooById",
          helper
            .GetURLParamString({ zooId: Number(ZooId), animalCount: 0 })
            .toString(),
        )
        .then((res) => {
          console.log(res);
          setObj({
            ...res.zoo_details,
          });
          setZooImages(
            res.zoo_details.zooFiles.map((file: any) => {
              return {
                Fileid: file.ZooFileId,
                file: null,
                Docpath: file.ZooFilepath,
                ZooId: res.zoo_details.ZooId,
              };
            }),
          );
          setCoordinatePolygon(res.boundary);
        });
    }
  }, [ZooId]);

  return (
    <div className="flex-1 space-y-4">
      {showMapBoundaryPickerModal && (
        <BoundarySelectorModal
          initialCoordinates={coordinatePolygon}
          center={{
            latitude: parseFloat(obj.ZooLatitude),
            longitude: parseFloat(obj.ZooLongitude),
          }}
          onSave={(coords) => {
            setCoordinatePolygon(coords);
            setShowMapBoundaryPickerModal(false);
          }}
          onClose={() => {
            setShowMapBoundaryPickerModal(false);
          }}
        />
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h4 className="text-3xl font-bold tracking-tight">
              <Subheading text={`${ZooId ? "Update" : "New"} Zoo Profile`} />
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
                value={obj.ZooTitle}
                name="ZooTitle"
                isRequired
                setter={handleChange}
                label="Zoo Name"
              />
              <div className="flex gap-2">
                <InputTag
                  value={obj.ZooLatitude}
                  name="ZooLatitude"
                  isRequired
                  setter={handleChange}
                  label="Latitude"
                />
                <InputTag
                  value={obj.ZooLongitude}
                  name="ZooLongitude"
                  isRequired
                  setter={handleChange}
                  label="Longitude"
                />
              </div>
              <div className="flex gap-2">
                <InputTag
                  type="time"
                  value={obj.ZooOpeningTime}
                  name="ZooOpeningTime"
                  isRequired
                  setter={handleChange}
                  label="Opening Time"
                />
                <InputTag
                  type="time"
                  value={obj.ZooClosingTime}
                  name="ZooClosingTime"
                  setter={handleChange}
                  isRequired
                  label="Closing Time"
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <TextArea
                  value={obj.ZooDescription}
                  name="ZooDescription"
                  isRequired
                  setter={handleChange}
                  label="Description"
                  placeHolder="Write description here..."
                />
              </div>
            </div>
          </div>
          <div className="space-y-3 hidden">
            <div className="flex justify-between items-center">
              <Paragraph text="Zoo Boundary" />
              <div className="w-fit">
                <ButtonComp
                  text="Select Boundary"
                  disabled={obj.ZooLatitude === ""}
                  type={"white"}
                  clickEvent={() => {
                    setShowMapBoundaryPickerModal(true);
                  }}
                />
              </div>
            </div>
            <div className="gap-y-3">
              {coordinatePolygon.length > 0 && (
                <MapContainer
                  center={[Number(obj.ZooLatitude), Number(obj.ZooLongitude)]}
                  zoom={14}
                  style={{ height: "300px", width: "100%", zIndex: 50 }}
                  scrollWheelZoom
                >
                  <TileLayer
                    attribution="Tiles © Esri — Source: USGS, Esri, TANA, DeLorme, NAVTEQ"
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
                  />
                  <Polygon
                    pathOptions={{ color: "#1b76c8", fillOpacity: 0.2 }}
                    positions={coordinatePolygon.map((r) => {
                      return [r.latitude, r.longitude];
                    })}
                  />
                </MapContainer>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Paragraph text="Media Files" />
        </CardHeader>
        <CardContent className="mt-3">
          <div className="space-y-3">
            {/* <Paragraph text="Media Files" /> */}
            <div className="md:-mt-2 space-y-2 ">
              <div className="md:flex gap-2">
                <div className="w-full md:w-1/3">
                  <Label>Logo Image</Label>
                  {iconImageSrc != null || obj?.ZooLogoFilepath != "" ? (
                    <div className="relative aspect-video rounded-md border border-main-gray/30 overflow-hidden w-full">
                      <Image
                        src={
                          obj?.ZooLogoFilepath && obj?.ZooLogoFilepath != ""
                            ? helper.GetDocument(obj.ZooLogoFilepath)
                            : iconImageSrc
                              ? URL.createObjectURL(iconImageSrc)
                              : "/placeholder.svg"
                        }
                        alt="Zoo Logo"
                        fill
                        className="object-contain"
                        unoptimized
                      />
                      {/* {iconImageSrc != null && obj.ZooId != 0 && (
                        <Button
                          variant="default"
                          size="icon"
                          className="absolute top-1 left-1 h-6 w-6 rounded-full"
                          onClick={() => {
                            // UpdateFile(obj.Id, iconImageSrc);
                          }}
                        >
                          <SaveIcon className="h-3 w-3" />
                          <span className="sr-only">Update image</span>
                        </Button>
                      )} */}
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 rounded-full"
                        onClick={() => {
                          setObj({ ...obj, ZooLogoFilepath: "" });
                          setIconImageSrc(null);
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
                        onChange={handleIconImageChange}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          document.getElementById("iconimage-upload")?.click();
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
                <div className="w-full md:w-1/3">
                  <Label>Zoo Banner Image</Label>
                  {bannerImageSrc != null || obj?.CoverImageFilepath != "" ? (
                    <div className="relative aspect-video rounded-md border border-main-gray/30 overflow-hidden w-full">
                      <Image
                        src={
                          obj?.CoverImageFilepath &&
                          obj?.CoverImageFilepath != ""
                            ? helper.GetDocument(obj.CoverImageFilepath)
                            : bannerImageSrc
                              ? URL.createObjectURL(bannerImageSrc)
                              : "/placeholder.svg"
                        }
                        alt="Zoo Banner"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      {/* {bannerImageSrc != null && obj.ZooId != 0 && (
                        <Button
                          variant="default"
                          size="icon"
                          className="absolute top-1 left-1 h-6 w-6 rounded-full"
                          onClick={() => {
                            // UpdateFile(obj.Id, bannerImageSrc);
                          }}
                        >
                          <SaveIcon className="h-3 w-3" />
                          <span className="sr-only">Update image</span>
                        </Button>
                      )} */}
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 rounded-full"
                        onClick={() => {
                          setObj({ ...obj, CoverImageFilepath: "" });
                          setBannerImageSrc(null);
                        }}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove image</span>
                      </Button>
                    </div>
                  ) : (
                    <>
                      <input
                        id="BannerImage-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleBannerImageChange}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          document
                            .getElementById("BannerImage-upload")
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
              </div>
              <div className="">
                <Label>Zoo Images</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {zooImages.map((image, index) => (
                    <div key={index} className="space-y-2">
                      <div className="relative aspect-video rounded-md border border-main-gray/30 overflow-hidden">
                        {image.file && image.file.type.startsWith("video/") ? (
                          <video
                            src={
                              image.Fileid == 0
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
                            alt={`Zoo image ${index + 1}`}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        )}
                        {/* {image.Fileid == 0 &&
                          obj.ZooId != 0 &&
                          zooImages.length > 0 && (
                            <Button
                              variant="default"
                              size="icon"
                              className="absolute top-1 left-1 h-6 w-6 rounded-full"
                              onClick={() =>
                                image.file &&
                                AddNewZooFile(obj.ZooId, image.file, index)
                              }
                            >
                              <Save className="h-3 w-3" />
                              <span className="sr-only">Remove image</span>
                            </Button>
                          )} */}
                        {image.Fileid != 0 ? (
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6 rounded-full"
                            onClick={() => DeleteZooImage(image.Fileid, index)}
                          >
                            <Trash2 className="h-3 w-3" />
                            <span className="sr-only">Remove image</span>
                          </Button>
                        ) : (
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6 rounded-full"
                            onClick={() => removeZooImage(index)}
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
                    onClick={addZooImage}
                    className="flex w-full flex-col items-center justify-center aspect-video rounded-md border border-dashed border-main-gray/50 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <Upload className="h-6 w-6 text-main-gray mb-1" />
                    <span className="text-xs text-main-gray">Add Image</span>
                  </button>
                </div>
              </div>
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
            text={`${obj.ZooId != 0 ? "Update" : "Create"}`}
            clickEvent={handleSubmit}
            beforeIcon={<Save className="h-4 w-4" />}
            isCruding={isCruding}
          />
        </div>
      </div>
    </div>
  );
};

export default ZooCrud;
