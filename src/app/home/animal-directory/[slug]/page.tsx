"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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

// Mock data for demonstration
const zoos = [
  { id: "lahore-zoo", name: "Lahore Zoo" },
  { id: "lahore-safari-park", name: "Lahore Safari Park" },
  { id: "bahawalpur-zoo", name: "Bahawalpur Zoo" },
];

export default function AnimalDetailPage() {
  const router = useRouter();
  const params = useParams();
  const isNewAnimal = params.slug === "new";
  const [isEditing, setIsEditing] = useState(isNewAnimal);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  // Animal state
  const [animal, setAnimal] = useState<any>({
    id: "",
    name: "",
    scientificName: "",
    category: "Mammals",
    conservationStatus: "Least Concern",
    description: "",
    habitat: "",
    diet: "",
    lifespan: "",
    zooIds: [],
    media: {
      images: [],
      videos: [],
      arModels: [],
    },
  });

  // Fetch animal data if not new
  useEffect(() => {
    if (!isNewAnimal && animal.id == "") {
      // In a real app, fetch from API
      // For demo, use mock data
      const mockAnimal = {
        id: params.slug,
        name: "Bengal Tiger",
        scientificName: "Panthera tigris tigris",
        category: "Mammals",
        conservationStatus: "Endangered",
        description:
          "The Bengal tiger is the most numerous tiger subspecies. Its populations have been estimated at 2,500 in the wild.",
        habitat: "Tropical and subtropical moist broadleaf forests",
        diet: "Carnivore - primarily deer, wild boar, and other large mammals",
        lifespan: "8-10 years in the wild, up to 20 in captivity",
        zooIds: ["lahore-zoo", "bahawalpur-zoo"],
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
        description: `${animal.name} has been ${
          isNewAnimal ? "added to" : "updated in"
        } the directory.`,
      });

      if (isNewAnimal) {
        // Redirect to the new animal page
        router.push(
          `/home/animal-directory/${animal.name
            .toLowerCase()
            .replace(/\s+/g, "-")}`
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

  const handleFileUpload = (
    files: File[],
    mediaType: "images" | "videos" | "arModels"
  ) => {
    // In a real app, upload files to storage
    // For demo, create URL objects
    const newFiles = Array.from(files).map((file) => ({
      id: `new-${Date.now()}-${file.name}`,
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
      file: file, // Keep reference to file for actual upload
    }));

    setAnimal((prev: any) => ({
      ...prev,
      media: {
        ...prev.media,
        [mediaType]: [...prev.media[mediaType], ...newFiles],
      },
    }));
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
          <h2 className="text-3xl font-bold tracking-tight">
            {isNewAnimal ? "Add New Animal" : animal.name}
          </h2>
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
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="ar-models">AR Models</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          {isEditing || isNewAnimal ? (
            <AnimalForm animal={animal} setAnimal={setAnimal} zoos={zoos} />
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Basic Information
                    </h3>
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium">Scientific Name:</span>{" "}
                        {animal.scientificName}
                      </div>
                      <div>
                        <span className="font-medium">Category:</span>{" "}
                        {animal.category}
                      </div>
                      <div>
                        <span className="font-medium">
                          Conservation Status:
                        </span>{" "}
                        {animal.conservationStatus}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold mt-4 mb-2">
                      Habitat & Diet
                    </h3>
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium">Habitat:</span>{" "}
                        {animal.habitat}
                      </div>
                      <div>
                        <span className="font-medium">Diet:</span> {animal.diet}
                      </div>
                      <div>
                        <span className="font-medium">Lifespan:</span>{" "}
                        {animal.lifespan}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-700">{animal.description}</p>

                    <h3 className="text-lg font-semibold mt-4 mb-2">
                      Available at
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {animal.zooIds.map((zooId: string) => {
                        const zoo = zoos.find((z) => z.id === zooId);
                        return zoo ? (
                          <Badge
                            key={zooId}
                            variant="outline"
                            className="cursor-pointer"
                            onClick={() =>
                              router.push(`/home/zoo-profiles/${zooId}`)
                            }
                          >
                            {zoo.name}
                          </Badge>
                        ) : null;
                      })}
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
                accept="image/*"
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
                {animal.media.videos.map((video: any) => (
                  <div key={video.id} className="relative group">
                    <div className="aspect-video relative overflow-hidden rounded-md border bg-gray-100 flex items-center justify-center">
                      {/* Video thumbnail or placeholder */}
                      <Image
                        src={video.url || "/placeholder.svg"}
                        alt={video.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFile(video.id, "videos")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <p className="text-sm mt-1 truncate">{video.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <MediaGallery media={animal.media.videos} type="videos" />
          )}
        </TabsContent>

        <TabsContent value="ar-models" className="space-y-4">
          {isEditing || isNewAnimal ? (
            <div className="space-y-4">
              <FileUploader
                onUpload={(files) => handleFileUpload(files, "arModels")}
                accept=".glb,.gltf"
                multiple={true}
                label="Upload AR Models (GLB/GLTF)"
              />
              <Separator />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {animal.media.arModels.map((model: any) => (
                  <div key={model.id} className="relative group">
                    <div className="aspect-square relative overflow-hidden rounded-md border bg-gray-100 flex items-center justify-center">
                      {/* Model thumbnail or placeholder */}
                      <Image
                        src={model.url || "/placeholder.svg"}
                        alt={model.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Badge>3D Model</Badge>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFile(model.id, "arModels")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <p className="text-sm mt-1 truncate">{model.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <MediaGallery media={animal.media.arModels} type="arModels" />
          )}
        </TabsContent>
      </Tabs>

      <AnimalDeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        animalName={animal.name}
      />
    </div>
  );
}
