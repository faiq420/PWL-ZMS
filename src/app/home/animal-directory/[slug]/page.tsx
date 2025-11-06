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

// Mock data for demonstration
const zoos = [
  { id: "lahore-zoo", name: "Lahore Zoo" },
  { id: "lahore-safari-park", name: "Lahore Safari Park" },
  { id: "bahawalpur-zoo", name: "Bahawalpur Zoo" },
];

type AnimalFiles = {
  Fileid: number;
  file: File | null;
  Docpath?: string;
  IsTileImage?: boolean;
  AnimalId: number;
};

export default function AnimalDetailPage() {
  const router = useRouter();
  const params = useParams();
  const helper = useHelper();
  const searchParams = useSearchParams();
  const isNewAnimal = params.slug === "new";
  const [isEditing, setIsEditing] = useState(
    isNewAnimal || searchParams.get("edit") ? true : false
  );
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  // Animal state
  const [animal, setAnimal] = useState<any>({
    Id: 0,
    Name: "",
    ScientificName: "",
    Category: "Mammals",
    CategoryId: 0,
    ConservationStatus: "Least Concern",
    ConservationStatusId: 0,
    Description: "",
    Habitat: "",
    Enclosure: 0,
    Diet: "",
    Lifespan: "",
    BirthDate: "",
    ZooIds: [],
    media: {
      images: [],
      videos: [],
      arModels: [],
    },
  });
  const [animalImages, setAnimalImages] = useState<AnimalFiles[]>([]);
  const [animalVideos, setAnimalVideos] = useState<AnimalFiles[]>([]);

  // Fetch animal data if not new
  useEffect(() => {
    if (!isNewAnimal && animal.Id == "") {
      // In a real app, fetch from API
      // For demo, use mock data
      const mockAnimal = {
        Id: params.slug,
        Name: "Bengal Tiger",
        ScientificName: "Panthera tigris tigris",
        Category: "Mammals",
        ConservationStatus: "Endangered",
        Description:
          "The Bengal tiger is the most numerous tiger subspecies. Its populations have been estimated at 2,500 in the wild.",
        Habitat: "Tropical and subtropical moist broadleaf forests",
        Diet: "Carnivore - primarily deer, wild boar, and other large mammals",
        Lifespan: "8-10 years in the wild, up to 20 in captivity",
        ZooIds: ["lahore-zoo", "bahawalpur-zoo"],
        media: {
          images: [
            {
              id: "img1",
              name: "Tiger 1",
              url: "/placeholder.svg?height=400&width=600",
              type: "image/jpeg",
            },
            {
              id: "img2",
              name: "Tiger 2",
              url: "/placeholder.svg?height=400&width=600",
              type: "image/jpeg",
            },
          ],
          videos: [
            {
              id: "vid1",
              name: "Tiger in action",
              url: "/placeholder.svg?height=400&width=600",
              type: "video/mp4",
            },
          ],
          arModels: [
            {
              id: "ar1",
              name: "Tiger 3D Model",
              url: "/placeholder.svg?height=400&width=600",
              type: "model/gltf-binary",
            },
          ],
        },
      };
      setAnimal(mockAnimal);
    }
  }, [isNewAnimal, params.slug]);

  const handleSave = async () => {
    try {
      // In a real app, save to API
      toast({
        title: isNewAnimal ? "Animal created" : "Animal updated",
        description: `${animal.Name} has been ${
          isNewAnimal ? "added to" : "updated in"
        } the directory.`,
      });

      if (isNewAnimal) {
        // Redirect to the new animal page
        router.push(
          `/home/animal-directory/${animal.Name.toLowerCase().replace(
            /\s+/g,
            "-"
          )}`
        );
      } else {
        setIsEditing(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem saving the animal data.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    try {
      // In a real app, delete from API
      toast({
        title: "Animal deleted",
        description: `${animal.name} has been removed from the directory.`,
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
    // const newFiles = Array.from(files).map((file) => ({
    //   id: `new-${Date.now()}-${file.name}`,
    //   name: file.name,
    //   url: URL.createObjectURL(file),
    //   type: file.type,
    //   file: file,
    // }));
    const temp = files.map((f) => {
      return {
        Fileid: 0,
        file: f,
        IsTileImage: false,
        AnimalId: animal.Id,
      };
    });
    if (mediaType === "images") {
      setAnimalImages([...animalImages, ...temp]);
    } else if (mediaType === "videos") {
      setAnimalVideos([...animalVideos, ...temp]);
    }
    // setAnimal((prev: any) => ({
    //   ...prev,
    //   media: {
    //     ...prev.media,
    //     [mediaType]: [...prev.media[mediaType], ...newFiles],
    //   },
    // }));
  };

  const removeFile = (
    fileId: string,
    mediaType: "images" | "videos" | "arModels"
  ) => {
    setAnimal((prev: any) => ({
      ...prev,
      media: {
        ...prev.media,
        [mediaType]: prev.media[mediaType].filter(
          (file: any) => file.id !== fileId
        ),
      },
    }));
  };

  const removeAnimalVideo = (index: number) => {
    setAnimalVideos(animalVideos.filter((_, i) => i !== index));
  };

  const DeleteAnimalVideo = (id: number, index: number) => {
    helper.xhr
      .Post("/Animal/DeleteAnimalVideo", helper.ConvertToFormData({ id }))
      .then((res) => {
        Message("success", "File removed.");
        setAnimalVideos(animalVideos.filter((_, i) => i !== index));
      });
  };

  function AddNewAnimalFile(
    productId: number,
    file: File,
    IsTileImage?: boolean,
    index?: number,
    type?: "image" | "video"
  ) {
    const formData = new FormData();
    formData.append("id", String(productId));
    formData.append("file", file);
    formData.append("IsTileImage", String(IsTileImage));
    const path =
      type === "image"
        ? "/Animal/UploadAnimalImage"
        : "/Animal/UploadAnimalVideo";
    helper.xhr
      .Post(path, formData)
      .then((res) => {
        console.log(res);
        Message("success", `File saved.`);
        if (index) {
          const files =
            type === "image" ? [...animalImages] : [...animalVideos];
          files[index] = res;
          type == "image" ? setAnimalImages(files) : setAnimalVideos(files);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {});
  }

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
          <Subheading text={isNewAnimal ? "Add New Animal" : animal.Name} />

          {/* {!isNewAnimal && !isEditing && (
            <Badge
              variant={
                animal.conservationStatus === "Endangered"
                  ? "destructive"
                  : animal.conservationStatus === "Vulnerable"
                  ? "warning"
                  : animal.conservationStatus === "Near Threatened"
                  ? "outline"
                  : "secondary"
              }
            >
              {animal.conservationStatus}
            </Badge>
          )} */}
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
              <Button
                variant="outline"
                onClick={() => {
                  if (isNewAnimal) {
                    router.push("/home/animal-directory");
                  } else {
                    setIsEditing(false);
                  }
                }}
              >
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
              <Button
                className="bg-green-700 hover:bg-green-800"
                onClick={handleSave}
              >
                <Save className="mr-2 h-4 w-4" /> Save
              </Button>
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
            Images
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="videos">
            Videos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          {isEditing || isNewAnimal ? (
            <AnimalForm animal={animal} setAnimal={setAnimal} zoos={zoos} />
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
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
                          {animal.ScientificName}
                        </div>
                        <div className="text-muted-foreground">
                          <span className="font-medium text-black">
                            Category:
                          </span>{" "}
                          {animal.Category}
                        </div>
                        <div className="text-muted-foreground">
                          <span className="font-medium text-black">
                            Conservation Status:
                          </span>{" "}
                          {animal.ConservationStatus}
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
                          {animal.Lifespan}
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
                        {animal.Description}
                      </p>
                    </div>
                    <div className="">
                      <h3 className="text-lg font-semibold mt-4 mb-2"></h3>
                      <Paragraph
                        text="Available At"
                        className="font-semibold "
                      />
                      <div className="flex flex-wrap gap-2 mt-3">
                        {animal.ZooIds.map((zooId: string) => {
                          const zoo = zoos.find((z) => z.id === zooId);
                          return zoo ? (
                            <p
                              key={zooId}
                              className="cursor-pointer bg-white px-2 py-1 text-xs shadow rounded-full border"
                              onClick={() =>
                                router.push(`/home/zoo-profiles/${zooId}`)
                              }
                            >
                              {zoo.name}
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
                accept=".jpg, .jpeg"
                multiple={true}
                label="Upload Images"
              />
              <Separator />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {animal.media.images.map((image: any) => (
                  <div key={image.id} className="relative group">
                    <div className="aspect-square relative overflow-hidden rounded-md border">
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={image.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFile(image.id, "images")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <p className="text-sm mt-1 truncate">{image.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <MediaGallery media={animal.media.images} type="images" />
          )}
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
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
                            video.Fileid == 0
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
                      {video.Fileid == 0 &&
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
                      {video.Fileid != 0 ? (
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 rounded-full"
                          onClick={() => DeleteAnimalVideo(video.Fileid, index)}
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
        </TabsContent>
      </Tabs>

      <AnimalDeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        animalName={animal.Name}
      />
    </div>
  );
}
