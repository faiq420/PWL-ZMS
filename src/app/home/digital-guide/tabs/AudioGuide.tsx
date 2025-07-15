"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import ButtonComp from "@/components/utils/Button";
import CustomAudioInput from "@/components/utils/FormElements/AudioInput";
import AudioInput from "@/components/utils/FormElements/AudioInput";
import Dropdown from "@/components/utils/FormElements/Dropdown";
import InputTag from "@/components/utils/FormElements/InputTag";
import Paragraph from "@/components/utils/Headings/Paragraph";
import Subheading from "@/components/utils/Headings/Subheading";
import { zoos } from "@/data/users";
import { ArrowLeft, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  mode?: string;
  id?: string;
  tab?: string;
}
const AudioGuide = ({ mode = "create", id = "0", tab }: Props) => {
  const router = useRouter();
  const [obj, setObj] = useState({
    Id: 0,
    Title: "",
    ZooId: 0,
    LocationId: 0,
    Duration: "",
  });
  const [zooLists, setZoos] = useState(
    zoos.map((z) => {
      return { value: z.value, label: z.label };
    })
  );
  const [file, setFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const capitalize = (value: string, space = " ") => {
    const words = String(value).split(space);
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  };

  function GetHeading() {
    return `${capitalize(mode)} - ${capitalize(String(tab), "-")} ${
      id != "0" ? `for ${obj.Title}` : ""
    }`;
  }

  function handleChange(n: string, v: string | boolean | number) {
    setObj({ ...obj, [n]: v });
  }

  function HandleSubmit() {}

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file);
      setAudioURL(URL.createObjectURL(file));
    } else {
      alert("Please select a valid audio file");
    }
  };

  const handleFileChange = (file: File | null) => {
    // send to backend, preview, or store in form state
    console.log("Selected file:", file);
    setAudioFile(file);
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
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Paragraph text="Guide's Information" className="tracking-normal" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputTag
              name="Title"
              value={obj.Title}
              setter={handleChange}
              label="Guide Title"
            />
            <Dropdown
              name="Location"
              activeId={obj.LocationId}
              handleDropdownChange={handleChange}
              label="Guide Location"
              options={zooLists}
            />
            <InputTag
              name="Duration"
              value={obj.Duration}
              setter={handleChange}
              disabled
              label="Guide Duration"
            />
            <CustomAudioInput
              initialUrl="" // replace with actual backend audio URL if any
              onFileChange={handleFileChange}
            />
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
  );
};

export default AudioGuide;
