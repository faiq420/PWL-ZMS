"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Edit, Trash2, Save, X } from "lucide-react";
import Image from "next/image";
import { AnimalDeleteDialog } from "@/components/animal/animal-delete-dialog";
import { AnimalForm } from "@/components/animal/animal-form";
import { FileUploader } from "@/components/animal/file-uploader";
import { MediaGallery } from "@/components/animal/media-gallery";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import Paragraph from "@/components/utils/Headings/Paragraph";
import Subheading from "@/components/utils/Headings/Subheading";
import useHelper from "@/Helper/helper";
import Checkbox from "@/components/utils/FormElements/Checkbox";
import { Message } from "@/Helper/ToastMessages";
import { OPTION } from "@/types/utils";
import { zoos } from "@/data/users";
import ButtonComp from "@/components/utils/Button";
import { compressFile } from "@/Helper/Utility";

type AnimalFiles = {
  AnimalFileId: number;
  file: File | null;
  Docpath?: string;
};

export default function AnimalDetailPage() {
  const router = useRouter();
  const params = useParams();
  const helper = useHelper();
  const searchParams = useSearchParams();
  const [zooList, setZooList] = useState([]);
  const isNewAnimal = params.slug === "new";
  const [isEditing, setIsEditing] = useState(
    isNewAnimal || searchParams.get("edit") ? true : false
  );
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  const [animal, setAnimal] = useState<{
    AnimalId: number;
    AnimalName: string;
    AnimalScientificName: string;
    AnimalCategoryId: number;
    AnimalCategoryName?: string;
    ConservationStatusId: number;
    ConservationStatusName?: string;
    AnimalDescription: string;
    Habitat: string;
    HealthStatusId: number;
    HealthStatusName?: string;
    Diet: string;
    LifeSpan: string;
    CoverImageFilepath: string;
    IsAvailable: boolean;
  }>({
    AnimalId: 0,
    AnimalName: "",
    AnimalScientificName: "",
    AnimalCategoryId: 0,
    ConservationStatusId: 0,
    AnimalDescription: "",
    Habitat: "",
    HealthStatusId: 0,
    Diet: "",
    LifeSpan: "",
    CoverImageFilepath: "",
    IsAvailable: true,
  });
  const [activeAnimalCategory, setActiveAnimalCategory] = useState("");
  const [activeAnimalConservation, setActiveAnimalConservation] = useState("");
  const [zooEnclosureMapping, setZooEnclosureMapping] = useState<
    {
      ZooId: number;
      EnclosureId: number;
      Count: number;
    }[]
  >([]);
  const [isCruding, setIsCruding] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [animalImages, setAnimalImages] = useState<AnimalFiles[]>([]);
  const [deletedImages, setDeletedImages] = useState<number[]>([]);
  const [animalVideos, setAnimalVideos] = useState<AnimalFiles[]>([]);
  const [enclosuresByZoo, setEnclosuresByZoo] = useState<{
    [key: number]: any[];
  }>({});
  useEffect(() => {
    if (!isNewAnimal && animal.AnimalId == 0) {
      helper.xhr
        .Get(
          "/Animal/GetAnimalById",
          helper.GetURLParamString({ animalId: Number(params.slug) }).toString()
        )
        .then((res) => {
          setAnimal({
            ...animal,
            AnimalId: res.animal.AnimalId,
            AnimalName: res.animal.AnimalName,
            AnimalDescription: res.animal.AnimalDescription,
            AnimalScientificName: res.animal.AnimalScientificName,
            AnimalCategoryId: res.animal.AnimalCategoryId,
            ConservationStatusId: res.animal.ConservationStatusId,
            Habitat: res.animal.Habitat,
            Diet: res.animal.Diet,
            LifeSpan: res.animal.LifeSpan,
            CoverImageFilepath: res.animal.CoverImageFilepath,
          });
          setActiveAnimalCategory(res.animal.CategoryName);
          setActiveAnimalConservation(res.animal.Status);
          setAnimalImages(
            res.animal.animalFiles.map((img: any) => ({
              AnimalFileId: img.AnimalFileId,
              file: null,
              Docpath: img.AnimalFilepath,
            }))
          );
          const mapping: {
            ZooId: number;
            EnclosureId: number;
            Count: number;
          }[] = res.animal.animalMapping.map((am: any) => {
            return {
              ...am,
              Count: res.animal.count.find(
                (y: any) => y.EnclosureId == am.EnclosureId
              ).Count,
            };
          });

          setZooEnclosureMapping(mapping);
        });
    }
  }, [isNewAnimal, params.slug]);

  useEffect(() => {
    helper.xhr.Get("/List/GetZooList").then((res) => {
      console.log(res);
      setZooList(
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
    helper.xhr.Get("/List/GetEnclosuresByZoo").then((res) => {
      setEnclosuresByZoo(res);
    });
  }, []);

  const verify = () => {
    const toastObj = { title: "Validation Error", description: "" };
    console.log(animal);
    if (animal.AnimalName == "") {
      toastObj.description = "Animal Name is required.";
    } else if (animal.AnimalScientificName == "") {
      toastObj.description = "Scientific Name is required.";
    } else if (animal.AnimalCategoryId == 0) {
      toastObj.description = "Animal Category is required.";
    } else if (animal.ConservationStatusId == 0) {
      toastObj.description = "Conservation Status is required.";
    } else if (animal.Habitat == "") {
      toastObj.description = "Habitat is required.";
    } else if (animal.Diet == "") {
      toastObj.description = "Diet is required.";
    } else if (animal.LifeSpan == "") {
      toastObj.description = "Life span is required.";
    } else if (animal.CoverImageFilepath == "" && !coverImage) {
      toastObj.description = "Cover image is required.";
      // } else if (animalImages.length < 8) {
      //   toastObj.description = "At least 8 images are required.";
    }
    if (toastObj.description !== "") {
      toast(toastObj);
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (verify()) {
      setIsCruding(true);
      const createObj = {
        obj: animal,
        images: await Promise.all(
          animalImages
            .filter((x) => x.file != null)
            .map(async (image) =>
              image.file ? await compressFile(image.file) : null
            )
        ),
        animalCoverImage: coverImage ? await compressFile(coverImage) : null,
        dto: zooEnclosureMapping,
      };
      const editObj = {
        id: animal.AnimalId,
        obj: animal,
        images: animalImages
          .filter((img) => img.file)
          .map(async (image) =>
            image.file ? await compressFile(image.file) : null
          ),
        animalCoverImage: coverImage ? await compressFile(coverImage) : null,
        dto: zooEnclosureMapping,
        deletedFileIds: deletedImages,
      };
      helper.xhr
        .Post(
          `/Animal/${isNewAnimal ? "CreateAnimal" : "UpdateAnimal"}`,
          helper.ConvertToFormData(isNewAnimal ? createObj : editObj)
        )
        .then((res) => {
          toast({
            title: isNewAnimal ? "Animal created" : "Animal updated",
            description: `${animal.AnimalName} has been ${
              isNewAnimal ? "added to" : "updated in"
            } the directory.`,
          });
          if (isNewAnimal) {
            // Redirect to the new animal page
            router.back();
          } else {
            setIsEditing(false);
          }
        })
        .catch((e) => {
          toast({
            title: "Error",
            description: "There was a problem saving the animal data.",
            variant: "destructive",
          });
        })
        .finally(() => setIsCruding(false));
    }
  };

  const handleDelete = async () => {
    try {
      toast({
        title: "Animal deleted",
        description: `${animal.AnimalName} has been removed from the directory.`,
      });
      router.push("/home/animal-directory");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem deleting the animal.",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = (files: File[], mediaType: "images" | "videos") => {
    const temp = files.map((f) => {
      return {
        AnimalFileId: 0,
        file: f,
        IsTileImage: false,
        AnimalId: animal.AnimalId,
      };
    });
    if (mediaType === "images") {
      setAnimalImages([...animalImages, ...temp]);
    } else if (mediaType === "videos") {
      setAnimalVideos([...animalVideos, ...temp]);
    }
  };

  const removeAnimalImage = (index: number) => {
    setAnimalImages(animalImages.filter((_, i) => i !== index));
  };

  const DeleteAnimalImage = (id: number, index: number) => {
    setDeletedImages([...deletedImages, id]);
    removeAnimalImage(index);
  };

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/home/animal-directory")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Subheading
            text={isNewAnimal ? "Add New Animal" : animal.AnimalName}
          />
        </div>
        <div className="flex space-x-2">
          {!isNewAnimal && !isEditing && (
            <>
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </>
          )}
          {(isNewAnimal || isEditing) && (
            <>
              <ButtonComp
                clickEvent={() => {
                  if (isNewAnimal) {
                    router.push("/home/animal-directory");
                  } else {
                    setIsEditing(false);
                  }
                }}
                beforeIcon={<X className="h-4 w-4" />}
                text="Cancel"
                type={"white"}
              />
              <ButtonComp
                clickEvent={handleSave}
                text="Save"
                isCruding={isCruding}
              />
            </>
          )}
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="w-full">
          <TabsTrigger className="flex-1" value="details">
            Details
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="images">
            Graphics
          </TabsTrigger>
          {/* <TabsTrigger className="flex-1" value="videos">
            Videos
          </TabsTrigger> */}
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          {isEditing || isNewAnimal ? (
            <AnimalForm
              zooEnclosureMapping={zooEnclosureMapping}
              setZooEnclosureMapping={setZooEnclosureMapping}
              animal={animal}
              setAnimal={setAnimal}
              zoos={zooList}
              enclosuresByZoo={enclosuresByZoo}
              coverImage={coverImage}
              setCoverImage={setCoverImage}
            />
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4 font-poppins">
                    <div className="">
                      <Paragraph
                        text="Basic Information"
                        className="font-semibold"
                      />
                      <div className="space-y-1 text-sm mt-3">
                        <div className="text-muted-foreground">
                          <span className="font-medium text-black">
                            Scientific Name:
                          </span>{" "}
                          {animal.AnimalScientificName}
                        </div>
                        <div className="text-muted-foreground">
                          <span className="font-medium text-black">
                            Category:
                          </span>{" "}
                          {activeAnimalCategory}
                        </div>
                        <div className="text-muted-foreground">
                          <span className="font-medium text-black">
                            Conservation Status:
                          </span>{" "}
                          {activeAnimalConservation}
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <Paragraph
                        text="Habitat & Diet"
                        className="font-semibold"
                      />
                      <div className="space-y-1 text-sm mt-3">
                        <div className="text-muted-foreground">
                          <span className="font-medium text-black">
                            Habitat:
                          </span>{" "}
                          {animal.Habitat}
                        </div>
                        <div className="text-muted-foreground">
                          <span className="font-medium text-black">Diet:</span>{" "}
                          {animal.Diet}
                        </div>
                        <div className="text-muted-foreground">
                          <span className="font-medium text-black">
                            Lifespan:
                          </span>{" "}
                          {animal.LifeSpan}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="">
                      <Paragraph
                        text="Description"
                        className="font-semibold "
                      />
                      <p className="text-muted-foreground text-sm mt-3">
                        {animal.AnimalDescription}
                      </p>
                    </div>
                    <div className="">
                      <h3 className="text-lg font-semibold mt-4 mb-2"></h3>
                      <Paragraph
                        text="Available At"
                        className="font-semibold "
                      />
                      <div className="flex flex-wrap gap-2 mt-3">
                        {zooEnclosureMapping
                          .flatMap((mapping) => mapping.ZooId)
                          .map((zooId: number) => {
                            const zoo = zooList.find(
                              (z: OPTION) => z.value === zooId
                            ) as OPTION | undefined;
                            return zoo ? (
                              <p
                                key={zooId}
                                className="cursor-pointer bg-white px-2 py-1 text-xs shadow rounded-full border"
                                onClick={() =>
                                  router.push(`/home/zoo-profiles/${zooId}`)
                                }
                              >
                                {zoo.label}
                              </p>
                            ) : null;
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="images" className="space-y-4">
          {isEditing || isNewAnimal ? (
            <div className="space-y-4">
              <FileUploader
                onUpload={(files) => handleFileUpload(files, "images")}
                accept=".jpg, .jpeg, .png"
                multiple={true}
                label="Upload Images"
              />
              <Separator />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {animalImages.map((image: AnimalFiles, index: number) => (
                  <div key={image.AnimalFileId} className="relative group">
                    <div className="aspect-square relative overflow-hidden rounded-md border">
                      <Image
                        src={
                          image.file
                            ? URL.createObjectURL(image.file)
                            : helper.GetDocument(image.Docpath || "")
                        }
                        alt={`Animal Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {image.AnimalFileId != 0 ? (
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 rounded-full"
                        onClick={() =>
                          DeleteAnimalImage(image.AnimalFileId, index)
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
                        onClick={() => removeAnimalImage(index)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove image</span>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <MediaGallery
              media={animalImages.map((image) => ({
                AnimalFileId: image.AnimalFileId,
                Docpath: image.Docpath || "/placeholder.svg",
              }))}
              type="images"
            />
          )}
        </TabsContent>

        {/* <TabsContent value="videos" className="space-y-4">
          {isEditing || isNewAnimal ? (
            <div className="space-y-4">
              <FileUploader
                onUpload={(files) => handleFileUpload(files, "videos")}
                accept="video/*"
                multiple={true}
                label="Upload Videos"
              />
              <Separator />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {animalVideos.map((video, index) => (
                  <div key={index} className="space-y-2">
                    <div className="relative aspect-square rounded-md border border-main-gray/30 overflow-hidden">
                      {video.file && video.file.type.startsWith("video/") ? (
                        <video
                          src={
                            video.AnimalFileId == 0
                              ? URL.createObjectURL(video.file)
                              : helper.GetDocument(video.Docpath || "")
                          }
                          controls
                          className="object-cover"
                          style={{ width: "100%", height: "100%" }}
                        />
                      ) : (
                        <Image
                          src={
                            video.file
                              ? URL.createObjectURL(video.file)
                              : helper.GetDocument(video.Docpath || "")
                          }
                          alt={`Animal video ${index + 1}`}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      )}
                      {video.AnimalFileId == 0 &&
                        animal.Id != 0 &&
                        animalVideos.length > 0 && (
                          <Button
                            // variant="success"
                            size="icon"
                            className="absolute top-1 left-1 h-6 w-6 rounded-full"
                            onClick={() =>
                              video.file &&
                              AddNewAnimalFile(
                                animal.Id,
                                video.file,
                                video.IsTileImage,
                                index,
                                "video"
                              )
                            }
                          >
                            <Save className="h-3 w-3" />
                            <span className="sr-only">Remove image</span>
                          </Button>
                        )}
                      {video.AnimalFileId != 0 ? (
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 rounded-full"
                          onClick={() => DeleteAnimalVideo(video.AnimalFileId, index)}
                        >
                          <Trash2 className="h-3 w-3" />
                          <span className="sr-only">Remove image</span>
                        </Button>
                      ) : (
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 rounded-full"
                          onClick={() => removeAnimalVideo(index)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove image</span>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <MediaGallery media={animal.media.videos} type="videos" />
          )}
        </TabsContent> */}
      </Tabs>

      <AnimalDeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        animalName={animal.AnimalName}
      />
    </div>
  );
}
