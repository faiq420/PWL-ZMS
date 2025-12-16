"use client";
import { DeleteConfirmationDialog } from "@/components/digital-guide/delete-confirmation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";
import ButtonComp from "@/components/utils/Button";
import SearchTag from "@/components/utils/FormElements/SearchTag";
import CardIntro from "@/components/utils/Headings/CardIntro";
import { NavigateToRecord } from "@/Helper/Utility";
import {
  Clock,
  Edit,
  Headphones,
  MapPin,
  MapPinned,
  Pause,
  Play,
  Plus,
  PlusCircle,
  Trash2,
  Volume2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Nav } from "react-day-picker";

const AudioGuideTable = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [audioGuides, setAudioGuides] = useState([
    {
      id: 1,
      title: "African Elephant Exhibit",
      duration: "3:45",
      zoo: "Lahore Zoo",
      lastUpdated: "2023-05-15",
      audioFile:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      transcript:
        "Welcome to the African Elephant exhibit. The African elephant is the largest living terrestrial animal...",
      narrator: "David Attenborough",
    },
    {
      id: 2,
      title: "Big Cat Kingdom",
      duration: "4:20",
      zoo: "Lahore Zoo",
      lastUpdated: "2023-06-22",
      audioFile:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      transcript:
        "Welcome to the Big Cat Kingdom. Here you'll find our magnificent lions, tigers, and leopards...",
      narrator: "Jane Goodall",
    },
    {
      id: 3,
      title: "Penguin Colony",
      duration: "2:50",
      zoo: "Lahore Safari Park",
      lastUpdated: "2023-07-10",
      audioFile:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      transcript:
        "Welcome to our Penguin Colony. These remarkable birds have adapted to some of the harshest conditions on Earth...",
      narrator: "Chris Packham",
    },
    {
      id: 4,
      title: "Rainforest Experience",
      duration: "5:15",
      zoo: "Bahawalpur Zoo",
      lastUpdated: "2023-08-05",
      audioFile:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      transcript:
        "Welcome to the Rainforest Experience. Tropical rainforests are home to over half of the world's plant and animal species...",
      narrator: "Steve Backshall",
    },
    {
      id: 5,
      title: "Reptile House Tour",
      duration: "4:00",
      zoo: "Bahawalpur Zoo",
      lastUpdated: "2023-09-18",
      audioFile:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      transcript:
        "Welcome to the Reptile House. Reptiles are a diverse group of animals that have been on Earth for over 300 million years...",
      narrator: "Mark O'Shea",
    },
  ]);
  const [playingAudioId, setPlayingAudioId] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [deleteType, setDeleteType] = useState<
    "qrcode" | "audio" | "animal" | "schedule"
  >("qrcode");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const openDeleteDialog = (type: any, item: any) => {
    setDeleteType(type);
    setSelectedItem(item);
    setDeleteModalOpen(true);
  };

  // Handle audio playback
  const toggleAudioPlayback = (audioId: any) => {
    if (playingAudioId === audioId) {
      setPlayingAudioId(null);
      toast({
        title: "Audio Paused",
        description: "Audio guide playback has been paused.",
      });
    } else {
      setPlayingAudioId(audioId);
      toast({
        title: "Audio Playing",
        description: "Audio guide playback has started.",
      });
    }
  };

  const handleDeleteAudioGuide = () => {
    if (selectedItem) {
      setAudioGuides(
        audioGuides.filter((audio) => audio.id !== selectedItem.id)
      );
      setDeleteModalOpen(false);
      toast({
        title: "Audio Guide Deleted",
        description: `Audio guide for "${selectedItem.title}" has been deleted.`,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <DeleteConfirmationDialog
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          handleDeleteAudioGuide();
        }}
        type={deleteType}
        item={selectedItem}
      />
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardIntro
              title="Audio Guide Management"
              description="Manage audio guides for different exhibits and languages."
            />
            <div className="w-fit">
              <ButtonComp
                type={"dark"}
                text="Add Audio Guide"
                clickEvent={() => {
                  router.push(NavigateToRecord("guide", "audio", "create"));
                  // navigateToRecord({
                  //   screen: "guide",
                  //   tab: "audio",
                  //   mode: "create",
                  // });
                }}
                beforeIcon={<Plus className="w-4 h-4" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 mt-4">
          <div className="flex items-center space-x-2">
            <SearchTag
              value={searchQuery}
              setter={setSearchQuery}
              placeHolder="Search audio guides..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {audioGuides.map((audio) => (
              <div key={audio.id} className="border rounded-lg p-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 bg-gray-100 rounded-full">
                    <Headphones className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-medium flex items-start justify-between gap-2 flex-1 text-sm">
                      {audio.title}
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {audio.duration}
                      </span>
                    </h3>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <MapPin className="h-3 w-3 mr-1" /> {audio.zoo}
                    </p>
                    <div className="flex-shrink-0 flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleAudioPlayback(audio.id)}
                      >
                        {playingAudioId === audio.id ? (
                          <Pause className="h-3 w-3" />
                        ) : (
                          <Play className="h-3 w-3" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          router.push(
                            NavigateToRecord("guide", "audio", "edit", audio.id)
                          );
                        }}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDeleteDialog("audio", audio)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      {/* <span className="mx-2">•</span>
                    <Volume2 className="h-3 w-3 mr-1" /> */}
                    </div>
                    {/* <div className="flex flex-wrap gap-1 mt-2">
                    {audio.languages.map((lang) => (
                      <span
                        key={lang}
                        className="px-2 py-1 bg-gray-100 text-xs rounded-full"
                      >
                        {lang}
                      </span>
                    ))}
                  </div> */}
                  </div>
                </div>
                {playingAudioId === audio.id && (
                  <div className="mt-3">
                    {/* <div className="text-xs text-muted-foreground mb-1">
                        Now playing...
                      </div>
                      <div className="flex items-center gap-2">
                        <Slider
                          defaultValue={[45]}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                        <span className="text-xs">1:45 / {audio.duration}</span>
                      </div> */}
                    <audio controls className="w-full">
                      <source src={audio.audioFile} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AudioGuideTable;
