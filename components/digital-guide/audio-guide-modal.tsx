"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Headphones, Upload } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  audioGuide: any;
  onSave: (exhibit: any) => void;
  viewMode: boolean;
}

export function AudioGuideModal({
  isOpen,
  onClose,
  audioGuide,
  onSave,
  viewMode = false,
}: Props) {
  const [formData, setFormData] = useState<{
    title: string;
    duration: string;
    languages: string[];
    audioFile: string;
    transcript: string;
    narrator: string;
  }>({
    title: "",
    duration: "",
    languages: [],
    audioFile: "",
    transcript: "",
    narrator: "",
  });

  const availableLanguages = [
    { id: "english", label: "English" },
    { id: "spanish", label: "Spanish" },
    { id: "french", label: "French" },
    { id: "german", label: "German" },
    { id: "chinese", label: "Chinese" },
    { id: "japanese", label: "Japanese" },
    { id: "portuguese", label: "Portuguese" },
    { id: "arabic", label: "Arabic" },
    { id: "russian", label: "Russian" },
  ];

  useEffect(() => {
    if (audioGuide) {
      setFormData({
        ...audioGuide,
      });
    } else {
      setFormData({
        title: "",
        duration: "",
        languages: ["English"],
        audioFile: "",
        transcript: "",
        narrator: "",
      });
    }
  }, [audioGuide]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLanguageToggle = (language: any) => {
    setFormData((prev: any) => {
      const languages = [...prev.languages];
      if (languages.includes(language)) {
        return {
          ...prev,
          languages: languages.filter((lang) => lang !== language),
        };
      } else {
        return { ...prev, languages: [...languages, language] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleAudioUpload = () => {
    // In a real app, this would open a file picker
    alert("Audio upload functionality would be implemented here");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {viewMode
              ? "Audio Guide Details"
              : audioGuide
              ? "Edit Audio Guide"
              : "Add New Audio Guide"}
          </DialogTitle>
          <DialogDescription>
            {viewMode
              ? "View details about this audio guide."
              : audioGuide
              ? "Make changes to the audio guide here."
              : "Create a new audio guide for the zoo."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="col-span-3"
              disabled={viewMode}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right">
              Duration
            </Label>
            <Input
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g. 3:45"
              className="col-span-3"
              disabled={viewMode}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">Languages</Label>
            <div className="col-span-3 grid grid-cols-2 gap-2">
              {availableLanguages.map((language) => (
                <div key={language.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`language-${language.id}`}
                    checked={formData.languages?.includes(language.label)}
                    onCheckedChange={() => handleLanguageToggle(language.label)}
                    disabled={viewMode}
                  />
                  <label
                    htmlFor={`language-${language.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {language.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="narrator" className="text-right">
              Narrator
            </Label>
            <Input
              id="narrator"
              name="narrator"
              value={formData.narrator}
              onChange={handleChange}
              className="col-span-3"
              disabled={viewMode}
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="transcript" className="text-right pt-2">
              Transcript
            </Label>
            <Textarea
              id="transcript"
              name="transcript"
              value={formData.transcript}
              onChange={handleChange}
              className="col-span-3 min-h-[100px]"
              disabled={viewMode}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="audioFile" className="text-right">
              Audio File
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              {formData.audioFile ? (
                <div className="flex items-center gap-2 flex-1">
                  <Headphones className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm truncate flex-1">
                    {formData.audioFile.split("/").pop()}
                  </span>
                  {!viewMode && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAudioUpload}
                    >
                      Change
                    </Button>
                  )}
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAudioUpload}
                  className="w-full"
                  disabled={viewMode}
                >
                  <Upload className="h-4 w-4 mr-2" /> Upload Audio File
                </Button>
              )}
            </div>
          </div>

          {!viewMode && (
            <DialogFooter className="mt-4">
              <Button type="submit">
                {audioGuide ? "Save Changes" : "Create Audio Guide"}
              </Button>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
