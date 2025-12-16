"use client";
import { DeleteConfirmationDialog } from "@/components/digital-guide/delete-confirmation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ButtonComp from "@/components/utils/Button";
import CardIntro from "@/components/utils/Headings/CardIntro";
import { NavigateToRecord } from "@/Helper/Utility";
import { useToast } from "@/hooks/use-toast";
import { Edit, PlusCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  mode?: string;
  id?: string;
  tab?: string;
}

const DailyScheduleTable = ({ mode, id, tab }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const [deleteType, setDeleteType] = useState<"animal" | "schedule">(
    "schedule"
  );
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      time: "10:00 AM",
      title: "Elephant Feeding",
      location: "African Savanna Zone",
      description: "Watch our elephants enjoy their morning meal",
      status: "upcoming",
      notificationSent: false,
      notifyTime: "30min",
    },
    {
      id: 2,
      time: "11:00 AM",
      title: "Tiger Feeding",
      location: "Asian Forest Zone",
      description: "See our tigers being fed by expert keepers",
      status: "upcoming",
      notificationSent: false,
      notifyTime: "30min",
    },
    {
      id: 3,
      time: "12:00 PM",
      title: "Conservation Talk",
      location: "Education Center",
      description: "Learn about our wildlife conservation efforts",
      status: "upcoming",
      notificationSent: false,
      notifyTime: "1hour",
    },
    {
      id: 4,
      time: "1:30 PM",
      title: "Penguin Parade",
      location: "Polar Zone",
      description: "Watch our penguins parade around their habitat",
      status: "upcoming",
      notificationSent: false,
      notifyTime: "1hour",
    },
    {
      id: 5,
      time: "2:30 PM",
      title: "Reptile Encounter",
      location: "Reptile House",
      description: "Get up close with some fascinating reptiles",
      status: "upcoming",
      notificationSent: false,
      notifyTime: "30min",
    },
  ]);

  const openDeleteDialog = (type: any, item: any) => {
    setDeleteType(type);
    setSelectedItem(item);
    setDeleteModalOpen(true);
  };

  const handleDeleteSchedule = () => {
    if (selectedItem) {
      setSchedules(
        schedules.filter((schedule) => schedule.id !== selectedItem.id)
      );
      setDeleteModalOpen(false);
      toast({
        title: "Schedule Event Removed",
        description: `"${selectedItem.title}" has been removed from the daily schedule.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <DeleteConfirmationDialog
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          handleDeleteSchedule();
        }}
        type={deleteType}
        item={selectedItem}
      />
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardIntro
                title="Daily Schedule"
                description="Manage and display daily activities and events"
              />
            </div>
            <div className="w-fit">
              <ButtonComp
                type={"dark"}
                clickEvent={() => {
                  router.push(
                    NavigateToRecord("guide", "dailySchedule", "create")
                  );
                }}
                text="Add Schedule"
                beforeIcon={<PlusCircle className="mr-2 h-4 w-4" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-poppins font-medium">
              Today's Schedule
            </h3>
            {/* <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" /> Change Date
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setModalMode("create");
                      setSelectedItem(null);
                      setScheduleModalOpen(true);
                    }}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" /> Add Event
                  </Button>
                </div> */}
          </div>

          <div className="space-y-4">
            {schedules.map((schedule) => (
              <div key={schedule.id} className="flex gap-4 border rounded-lg p-4">
                <div className="flex-shrink-0 w-24 text-center flex flex-col font-poppins justify-center">
                  <div className="text-base font-medium">{schedule.time}</div>
                  <div
                    className={`mt-1 px-2 py-1 rounded-full text-[10px] font-normal ${
                      schedule.status === "completed"
                        ? "bg-gray-100 text-gray-800"
                        : schedule.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {schedule.status === "completed"
                      ? "Completed"
                      : schedule.status === "active"
                      ? "In Progress"
                      : "Upcoming"}
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center font-poppins">
                  <h3 className="font-semibold">{schedule.title}</h3>
                  <div className="text-xs text-muted-foreground">
                    {schedule.location}
                  </div>
                  <p className="text-xs mt-2">{schedule.description}</p>
                </div>
                <div className="flex-shrink-0 flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // setModalMode("edit");
                      // setSelectedItem(schedule);
                      // setScheduleModalOpen(true);
                      router.push(
                        NavigateToRecord("guide", "dailySchedule", "edit", schedule.id)
                      );
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openDeleteDialog("schedule", event)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyScheduleTable;
