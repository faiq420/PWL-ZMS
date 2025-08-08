"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  CalendarIcon,
  ChevronLeft,
  Download,
  Edit,
  FileText,
  Plus,
  Printer,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useHelper from "@/Helper/helper";
import { useState } from "react";
import { OPTION } from "@/types/utils";
import { inspectionStatus } from "@/data";
import { zoos } from "@/data/users";
import Subheading from "@/components/utils/Headings/Subheading";
import Paragraph from "@/components/utils/Headings/Paragraph";
import Dropdown from "@/components/utils/FormElements/Dropdown";
import DateTimePicker from "@/components/utils/FormElements/DateTimePicker";
import InputTag from "@/components/utils/FormElements/InputTag";
import TextArea from "@/components/utils/FormElements/TextArea";
import ButtonComp from "@/components/utils/Button";

type Recommendation = {
  Id: number;
  InspectionId: number;
  Recommendation: string;
};
type Medication = {
  Id: number;
  InspectionId: number;
  MedicationName: string;
  Dosage: string;
  Frequency: string;
  DurationDays: number;
};
type ImagesFiles = {
  FileId: number;
  file: File | null;
  Docpath?: string;
  ObjectId: number;
};

export default function InspectionDetailsPage() {
  const router = useRouter();
  const helper = useHelper();
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug;
  const [animals, setAnimals] = useState<OPTION[]>([]);
  const [veterinaryInspectors, setVeterinaryInspectors] = useState<OPTION[]>(
    []
  );
  const [status, setStatus] = useState(inspectionStatus);
  const [zooList, setZooList] = useState(zoos);
  const [obj, setObj] = useState({
    Id: 0,
    InspectionId: "",
    AnimalId: 0,
    ZooId: 0,
    VeterinaryInspectorId: 0,
    DateTime: "",
    Status: 0,
    FollowupDate: "",
    Reason: "",
    Findings: "",
  });
  const [vitalSigns, setVitalSigns] = useState({
    Id: 0,
    InspectionId: 0,
    HeartRate: null,
    Temperature: null,
    RespiratoryRate: null,
    Weight: null,
  });

  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    { Id: 0, InspectionId: obj.Id, Recommendation: "" },
  ]);

  const [medications, setMedications] = useState<Medication[]>([
    {
      Id: 0,
      InspectionId: obj.Id,
      MedicationName: "",
      Dosage: "",
      Frequency: "",
      DurationDays: 0,
    },
  ]);
  const [imageFiles, setImageFiles] = useState<ImagesFiles[]>([]);
  const recommendationObj = {
    InspectionId: obj.Id,
    Recommendation: "",
  };
  const MedicationObj = {
    InspectionId: obj.Id,
    MedicationName: "",
    Dosage: "",
    Frequency: "",
    DurationDays: 0,
  };

  function HandleSubmit() {}
  const capitalize = (value: string, space = " ") => {
    const words = String(value).split(space);
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  };

  function GetHeading() {
    return `${capitalize(slug == "new" ? "Create" : "Edit")} - ${capitalize(
      String("Inspection"),
      "-"
    )} ${slug != "new" ? `for ${obj.InspectionId}` : ""}`;
  }

  function handleObjChange(n: string, v: string | boolean | number) {
    setObj({ ...obj, [n]: v });
  }
  function handleVSChange(n: string, v: string | boolean | number) {
    setVitalSigns({ ...vitalSigns, [n]: v });
  }
  function handleRecommendationChange<K extends keyof Recommendation>(
    n: K,
    v: Recommendation[K],
    index: number
  ) {
    setRecommendations((prev) => {
      const updated = [...prev];
      updated[index][n] = v;
      return updated;
    });
  }
  function handleMedicationChange<K extends keyof Medication>(
    n: K,
    v: Medication[K],
    index: number
  ) {
    setMedications((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [n]: v };
      return updated;
    });
  }

  function AddRecommendation() {
    setRecommendations((prev) => [
      ...prev,
      { ...recommendationObj, Id: prev.length + 1 },
    ]);
  }
  const RemoveRecommendation = (index: number) => {
    setRecommendations(recommendations.filter((_, i) => i !== index));
  };
  const RemoveMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };
  function AddMedication() {
    setMedications((prev) => [
      ...prev,
      { ...MedicationObj, Id: prev.length + 1 },
    ]);
  }

  /////////////////IMAGES////////////////
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

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/home/veterinary-inspection">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Inspections
          </Link>
        </Button>
      </div>
      <div>
        <Subheading
          text={
            slug === "new"
              ? "New Inspection"
              : `Inspection: ${obj.InspectionId}`
          }
        />
        <p className="text-muted-foreground text-sm tracking-tight">
          {slug === "new"
            ? "Create a new veterinary inspection record"
            : "Edit the veterinary inspection record"}
        </p>
      </div>
      <Card>
        <CardHeader></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Paragraph
              text="Inspection Details"
              className="tracking-normal text-sm font-poppins"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 gap-y-3">
              <div className="col-span-1 xl:col-span-2 grid grid-cols-1 xl:grid-cols-2 gap-2 gap-y-3">
                <Dropdown
                  name="ZooId"
                  label="Zoo"
                  options={zooList}
                  handleDropdownChange={handleObjChange}
                  activeId={obj.ZooId}
                  isDisabled={slug !== "new"}
                />
                <Dropdown
                  name="AnimalId"
                  label="Animal"
                  options={animals}
                  isDisabled={slug !== "new"}
                  handleDropdownChange={handleObjChange}
                  activeId={obj.AnimalId}
                />
                <Dropdown
                  name="VeterinaryInspectorId"
                  label="Veterinary Inspector"
                  options={veterinaryInspectors}
                  handleDropdownChange={handleObjChange}
                  activeId={obj.VeterinaryInspectorId}
                />
                <DateTimePicker
                  value={obj.DateTime}
                  name="DateTime"
                  setter={handleObjChange}
                  label="Date and Time"
                />
                <Dropdown
                  name="Status"
                  label="Status"
                  options={status}
                  handleDropdownChange={handleObjChange}
                  activeId={obj.Status}
                />
                <InputTag
                  type="date"
                  value={obj.FollowupDate}
                  name="FollowupDate"
                  setter={handleObjChange}
                  label="Follow-up Date"
                />
              </div>
              <div className="space-y-3">
                <TextArea
                  value={obj.Reason}
                  name="Reason"
                  setter={handleObjChange}
                  label="Reason for Inspection"
                  placeHolder="Describe the reason for this inspection"
                />
                <TextArea
                  value={obj.Findings}
                  name="Findings"
                  setter={handleObjChange}
                  label="Findings"
                  placeHolder="Record your observations & findings"
                />
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <Paragraph
              text="Vital Signs"
              className="tracking-normal text-sm font-poppins"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 gap-y-3">
              <InputTag
                value={vitalSigns.Temperature}
                name="Temperature"
                setter={handleObjChange}
                label="Temperature (°C)"
                placeHolder="e.g 36.5"
              />
              <InputTag
                value={vitalSigns.HeartRate}
                name="HeartRate"
                setter={handleObjChange}
                label="Heart Rate (BPM)"
                placeHolder="e.g 28"
              />
              <InputTag
                value={vitalSigns.RespiratoryRate}
                name="RespiratoryRate"
                setter={handleObjChange}
                label="Respiratory Rate (BPM)"
                placeHolder="e.g 10"
              />
              <InputTag
                value={vitalSigns.Weight}
                name="Weight"
                setter={handleObjChange}
                label="Weight (Kg)"
                placeHolder="e.g 250"
              />
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Paragraph
                text="Recommendations"
                className="tracking-normal text-sm font-poppins"
              />
              <div className="w-fit">
                <ButtonComp
                  clickEvent={AddRecommendation}
                  type={"white"}
                  text="Add Recommendation"
                  beforeIcon={<Plus size={14} />}
                />
              </div>
            </div>
            <div className="space-y-2">
              {recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <InputTag
                    name={`Recommendation`}
                    placeHolder="Enter recommendation"
                    value={recommendation.Recommendation}
                    setter={(n, v) => {
                      handleRecommendationChange(
                        n as keyof Recommendation,
                        v,
                        index
                      );
                    }}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => RemoveRecommendation(index)}
                    disabled={recommendations.length === 1}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Paragraph
                text="Medications"
                className="tracking-normal text-sm font-poppins"
              />
              <div className="w-fit">
                <ButtonComp
                  clickEvent={AddMedication}
                  type={"white"}
                  text="Add Medication"
                  beforeIcon={<Plus size={14} />}
                />
              </div>
            </div>
            <div className="space-y-2">
              {medications.map((medication, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 pt-8 relative"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => RemoveMedication(index)}
                    disabled={medications.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 gap-y-3">
                    <InputTag
                      name={`MedicationName`}
                      placeHolder="Enter medication name"
                      label="Medication"
                      value={medication.MedicationName}
                      setter={(n, v) => {
                        handleMedicationChange(n as keyof Medication, v, index);
                      }}
                    />
                    <InputTag
                      name={`Dosage`}
                      placeHolder="e.g. 150mg"
                      label="Dosage"
                      value={medication.Dosage}
                      setter={(n, v) => {
                        handleMedicationChange(n as keyof Medication, v, index);
                      }}
                    />
                    <InputTag
                      name={`Frequency`}
                      placeHolder="e.g. Once Daily"
                      label="Frequency"
                      value={medication.Frequency}
                      setter={(n, v) => {
                        handleMedicationChange(n as keyof Medication, v, index);
                      }}
                    />
                    <InputTag
                      name={`DurationDays`}
                      placeHolder="e.g. 7 days"
                      label="Duration"
                      value={medication.DurationDays}
                      setter={(n, v) => {
                        handleMedicationChange(n as keyof Medication, v, index);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Paragraph
                text="Inspection Images"
                className="tracking-normal text-sm font-poppins"
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-6 gap-2">
              {imageFiles.map((image, index) => (
                <div key={index} className="space-y-2">
                  <div className="relative aspect-video rounded-md border border-main-gray/30 overflow-hidden">
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
                            image.file && AddNewFile(obj.Id, image.file, index)
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
                className="flex flex-col items-center justify-center aspect-video rounded-md border border-dashed border-main-gray/50 bg-main-ashWhite hover:bg-main-gray/5 transition-colors"
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
                beforeIcon={<Save className="h-4 w-4" />}
              />
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
