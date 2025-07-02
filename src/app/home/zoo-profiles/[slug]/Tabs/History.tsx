"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BodyText from "@/components/utils/Headings/BodyText";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { HistoryModal } from "@/components/modals/history-modal";
import { MilestoneModal } from "@/components/modals/milestone-modal";
import { DeleteConfirmation } from "@/components/modals/delete-confirmation";
import { AchievementModal } from "@/components/modals/achievement-modal";
import Paragraph from "@/components/utils/Headings/Paragraph";

type objType = {
  name: string;
  history: string;
  imagePath: string;
  id: string | number;
  milestones: any;
  achievements: any;
};

interface Props {
  data: objType;
}

const HistoryTab = ({ data }: Props) => {
  const [historyModal, setHistoryModal] = useState({
    isOpen: false,
    mode: "edit" as "edit" | "view",
  });
  const [milestoneModal, setMilestoneModal] = useState({
    isOpen: false,
    mode: "create" as "create" | "edit" | "view",
    data: null as any,
  });
  const [achievementModal, setAchievementModal] = useState({
    isOpen: false,
    mode: "create" as "create" | "edit" | "view",
    data: null as any,
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    type: "",
    index: -1,
    title: "",
    description: "",
  });
  const [zooData, setZooData] = useState({
    ...data,
  });

  const handleUpdateHistory = (data: any) => {
    setZooData((prev: any) => ({
      ...prev,
      history: data.history,
      imagePath: data.image,
    }));
    setHistoryModal({ isOpen: false, mode: "edit" });
  };

  // Milestones
  const handleAddMilestone = (milestone: any) => {
    setZooData((prev: any) => ({
      ...prev,
      milestones: [...prev.milestones, milestone],
    }));
    setMilestoneModal({ isOpen: false, mode: "create", data: null });
  };

  const handleAddAchievement = (achievements: any) => {
    setZooData((prev: any) => ({
      ...prev,
      achievements: [...prev.achievements, achievements],
    }));
    setAchievementModal({ isOpen: false, mode: "create", data: null });
  };

  const handleEditMilestone = (milestone: any, index: number) => {
    setZooData((prev: any) => ({
      ...prev,
      milestones: prev.milestones.map((m: any, i: number) =>
        i === index ? milestone : m
      ),
    }));
    setMilestoneModal({ isOpen: false, mode: "edit", data: null });
  };

  const handleEditAchievement = (achievement: any, index: number) => {
    setZooData((prev: any) => ({
      ...prev,
      achievements: prev.achievements.map((m: any, i: number) =>
        i === index ? achievement : m
      ),
    }));
    setAchievementModal({ isOpen: false, mode: "edit", data: null });
  };

  const handleDeleteMilestone = (index: number) => {
    setZooData((prev: any) => ({
      ...prev,
      milestones: prev.milestones.filter((_: any, i: number) => i !== index),
    }));
    setDeleteConfirmation({
      isOpen: false,
      type: "",
      index: -1,
      title: "",
      description: "",
    });
  };

  const handleDeleteAchievement = (index: number) => {
    setZooData((prev: any) => ({
      ...prev,
      achievements: prev.achievements.filter(
        (_: any, i: number) => i !== index
      ),
    }));
    setDeleteConfirmation({
      isOpen: false,
      type: "",
      index: -1,
      title: "",
      description: "",
    });
  };

  return (
    <>
      <HistoryModal
        isOpen={historyModal.isOpen}
        mode={historyModal.mode}
        history={zooData.history}
        image={zooData.imagePath}
        onClose={() => setHistoryModal({ isOpen: false, mode: "edit" })}
        onSave={handleUpdateHistory}
      />

      <MilestoneModal
        isOpen={milestoneModal.isOpen}
        mode={milestoneModal.mode}
        milestone={milestoneModal.data?.milestone}
        data={milestoneModal.data}
        onClose={() =>
          setMilestoneModal({ isOpen: false, mode: "create", data: null })
        }
        onAdd={handleAddMilestone}
        onEdit={handleEditMilestone}
      />

      <AchievementModal
        isOpen={achievementModal.isOpen}
        mode={achievementModal.mode}
        achievement={achievementModal.data?.achievement}
        data={achievementModal.data}
        onClose={() =>
          setAchievementModal({ isOpen: false, mode: "create", data: null })
        }
        onAdd={handleAddAchievement}
        onEdit={handleEditAchievement}
      />

      <DeleteConfirmation
        isOpen={deleteConfirmation.isOpen}
        onClose={() =>
          setDeleteConfirmation({
            isOpen: false,
            type: "",
            index: -1,
            title: "",
            description: "",
          })
        }
        title={deleteConfirmation.title}
        description={deleteConfirmation.description}
        onConfirm={() => {
          if (deleteConfirmation.type === "milestone") {
            handleDeleteMilestone(deleteConfirmation.index);
          } else if (deleteConfirmation.type === "achievement") {
            handleDeleteAchievement(deleteConfirmation.index);
          }
        }}
      />
      <Card>
        <CardHeader className="flex flex-row items-center justify-end mb-2">
          {/* <div>
            <CardTitle>
              <Paragraph text={`History of ${data.name}`} className="font-semibold tracking-normal" />
            </CardTitle>
            <CardDescription>
              <BodyText text="Historical background and development" />
            </CardDescription>
          </div> */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setHistoryModal({ isOpen: true, mode: "edit" })}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit History
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative h-64 w-full rounded-lg overflow-hidden">
            <Image
              src={zooData.imagePath}
              alt={`${zooData.name} Historical Photo`}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <BodyText text={zooData.history} />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium font-faustina">Key Milestones</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setMilestoneModal({
                        isOpen: true,
                        mode: "create",
                        data: null,
                      })
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add
                  </Button>
                </div>
                <ul className="space-y-1 font-syne">
                  {zooData.milestones.map((milestone: any, index: number) => (
                    <li
                      key={index}
                      className="flex items-center justify-between text-sm group cursor-default"
                    >
                      <div className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-green-600 mr-2"></span>
                        <span>
                          {milestone.year}: {milestone.description}
                        </span>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() =>
                            setMilestoneModal({
                              isOpen: true,
                              mode: "edit",
                              data: { milestone, index },
                            })
                          }
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-red-500"
                          onClick={() =>
                            setDeleteConfirmation({
                              isOpen: true,
                              type: "milestone",
                              index,
                              title: "Delete Milestone",
                              description:
                                "Are you sure you want to delete this milestone? This action cannot be undone.",
                            })
                          }
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium font-faustina">
                    Notable Achievements
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setAchievementModal({
                        isOpen: true,
                        mode: "create",
                        data: null,
                      })
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add
                  </Button>
                </div>
                <ul className="space-y-1 font-syne">
                  {zooData.achievements.map(
                    (achievement: any, index: number) => {
                      return (
                        <li
                          key={index}
                          className="flex items-center justify-between text-sm group cursor-default"
                        >
                          <div className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-green-600 mr-2"></span>
                            <span>
                              {achievement.year}: {achievement.description}
                            </span>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => {
                                // console.log(achievement)
                                setAchievementModal({
                                  isOpen: true,
                                  mode: "edit",
                                  data: { achievement, index },
                                });
                              }}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-red-500"
                              onClick={() =>
                                setDeleteConfirmation({
                                  isOpen: true,
                                  type: "achievement",
                                  index,
                                  title: "Delete Achievement",
                                  description:
                                    "Are you sure you want to delete this achievement? This action cannot be undone.",
                                })
                              }
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default HistoryTab;
