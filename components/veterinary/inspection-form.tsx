"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Plus, Trash2, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

interface InspectionFormProps {
  inspection?: any;
  isEditing?: boolean;
}

export const InspectionForm = ({
  inspection,
  isEditing = false,
}: InspectionFormProps) => {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(
    inspection?.date ? new Date(inspection.date) : new Date()
  );
  const [recommendations, setRecommendations] = useState<string[]>(
    inspection?.recommendations || [""]
  );
  const [medications, setMedications] = useState<any[]>(
    inspection?.medications || [
      { name: "", dosage: "", frequency: "", duration: "" },
    ]
  );

  const addRecommendation = () => {
    setRecommendations([...recommendations, ""]);
  };

  const updateRecommendation = (index: number, value: string) => {
    const updatedRecommendations = [...recommendations];
    updatedRecommendations[index] = value;
    setRecommendations(updatedRecommendations);
  };

  const removeRecommendation = (index: number) => {
    setRecommendations(recommendations.filter((_, i) => i !== index));
  };

  const addMedication = () => {
    setMedications([
      ...medications,
      { name: "", dosage: "", frequency: "", duration: "" },
    ]);
  };

  const updateMedication = (index: number, field: string, value: string) => {
    const updatedMedications = [...medications];
    updatedMedications[index] = {
      ...updatedMedications[index],
      [field]: value,
    };
    setMedications(updatedMedications);
  };

  const removeMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, you would handle form submission here
    // For now, we'll just redirect back

    if (isEditing) {
      // In a real implementation, you would save changes here
      router.push(`/home/veterinary-inspection/${inspection.slug}`);
    } else {
      // In a real implementation, you would create a new inspection here
      router.push("/home/veterinary-inspection");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <Label htmlFor="animal">Animal</Label>
            <Select defaultValue={inspection?.animal || ""}>
              <SelectTrigger>
                <SelectValue placeholder="Select an animal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Zara">Zara (African Elephant)</SelectItem>
                <SelectItem value="Raja">Raja (Bengal Tiger)</SelectItem>
                <SelectItem value="Leo">Leo (African Lion)</SelectItem>
                <SelectItem value="Bubbles">
                  Bubbles (Bottlenose Dolphin)
                </SelectItem>
                <SelectItem value="Koko">Koko (Western Gorilla)</SelectItem>
                <SelectItem value="Melman">
                  Melman (Reticulated Giraffe)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="inspector">Inspector</Label>
            <Select defaultValue={inspection?.inspector || ""}>
              <SelectTrigger>
                <SelectValue placeholder="Select an inspector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dr. Sarah Johnson">
                  Dr. Sarah Johnson
                </SelectItem>
                <SelectItem value="Dr. Michael Chen">
                  Dr. Michael Chen
                </SelectItem>
                <SelectItem value="Dr. Emily Rodriguez">
                  Dr. Emily Rodriguez
                </SelectItem>
                <SelectItem value="Dr. David Kim">Dr. David Kim</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              defaultValue={
                inspection?.time ? inspection.time.slice(0, 5) : "10:00"
              }
            />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Location or enclosure"
              defaultValue={inspection?.location || ""}
            />
          </div>

          <div>
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              placeholder="e.g. 45 minutes"
              defaultValue={inspection?.duration || ""}
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select defaultValue={inspection?.status || "scheduled"}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="reason">Reason for Inspection</Label>
            <Textarea
              id="reason"
              placeholder="Describe the reason for this inspection"
              rows={2}
              defaultValue={inspection?.reason || ""}
            />
          </div>

          <div>
            <Label htmlFor="findings">Findings</Label>
            <Textarea
              id="findings"
              placeholder="Record your observations and findings"
              rows={5}
              defaultValue={inspection?.findings || ""}
            />
          </div>

          <div>
            <Label htmlFor="followup">Follow-up Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {inspection?.followupDate ? (
                    inspection.followupDate
                  ) : (
                    <span>Select follow-up date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <div className="flex items-center justify-between mb-4">
          <Label>Vital Signs</Label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="temperature">Temperature</Label>
            <Input
              id="temperature"
              placeholder="e.g. 36.2°C"
              defaultValue={inspection?.vitalSigns?.temperature || ""}
            />
          </div>

          <div>
            <Label htmlFor="heartRate">Heart Rate</Label>
            <Input
              id="heartRate"
              placeholder="e.g. 28 BPM"
              defaultValue={inspection?.vitalSigns?.heartRate || ""}
            />
          </div>

          <div>
            <Label htmlFor="respiratoryRate">Respiratory Rate</Label>
            <Input
              id="respiratoryRate"
              placeholder="e.g. 10 BPM"
              defaultValue={inspection?.vitalSigns?.respiratoryRate || ""}
            />
          </div>

          <div>
            <Label htmlFor="weight">Weight</Label>
            <Input
              id="weight"
              placeholder="e.g. 3,420 kg"
              defaultValue={inspection?.vitalSigns?.weight || ""}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <div className="flex items-center justify-between mb-4">
          <Label>Recommendations</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addRecommendation}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Recommendation
          </Button>
        </div>

        <div className="space-y-2">
          {recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                value={recommendation}
                onChange={(e) => updateRecommendation(index, e.target.value)}
                placeholder="Enter recommendation"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeRecommendation(index)}
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

      <div>
        <div className="flex items-center justify-between mb-4">
          <Label>Medications</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addMedication}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Medication
          </Button>
        </div>

        <div className="space-y-4">
          {medications.map((medication, index) => (
            <div key={index} className="border rounded-lg p-4 relative">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
                onClick={() => removeMedication(index)}
                disabled={medications.length === 1}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`med-name-${index}`}>Medication Name</Label>
                  <Input
                    id={`med-name-${index}`}
                    value={medication.name}
                    onChange={(e) =>
                      updateMedication(index, "name", e.target.value)
                    }
                    placeholder="Enter medication name"
                  />
                </div>

                <div>
                  <Label htmlFor={`med-dosage-${index}`}>Dosage</Label>
                  <Input
                    id={`med-dosage-${index}`}
                    value={medication.dosage}
                    onChange={(e) =>
                      updateMedication(index, "dosage", e.target.value)
                    }
                    placeholder="e.g. 150mg"
                  />
                </div>

                <div>
                  <Label htmlFor={`med-frequency-${index}`}>Frequency</Label>
                  <Input
                    id={`med-frequency-${index}`}
                    value={medication.frequency}
                    onChange={(e) =>
                      updateMedication(index, "frequency", e.target.value)
                    }
                    placeholder="e.g. Once daily"
                  />
                </div>

                <div>
                  <Label htmlFor={`med-duration-${index}`}>Duration</Label>
                  <Input
                    id={`med-duration-${index}`}
                    value={medication.duration}
                    onChange={(e) =>
                      updateMedication(index, "duration", e.target.value)
                    }
                    placeholder="e.g. 7 days"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label htmlFor="images">Upload Images</Label>
        <div className="border-2 border-dashed rounded-lg p-6 text-center">
          <div className="flex flex-col items-center">
            <Plus className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              Drag and drop image files or{" "}
              <span className="text-primary font-medium">browse</span>
            </p>
            <Input
              id="images"
              type="file"
              multiple
              className="mt-4 w-full max-w-xs"
              accept="image/*"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="button" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" className="bg-green-700 hover:bg-green-800">
          {isEditing ? "Save Changes" : "Create Inspection"}
        </Button>
      </div>
    </form>
  );
};
