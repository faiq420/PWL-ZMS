import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ButtonComp from "@/components/utils/Button";
import Dropdown from "@/components/utils/FormElements/Dropdown";
import InputTag from "@/components/utils/FormElements/InputTag";
import TextArea from "@/components/utils/FormElements/TextArea";
import { Save, X } from "lucide-react";
import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const MaintenanceModal = ({ isOpen, onClose, onSubmit }: Props) => {
  const [obj, setObj] = useState({
    Id: 0,
    Title: "",
    Description: "",
    Status: "",
    Priority: "",
    AssignedTo: "",
    CompletedAt: "",
    DueDate: "",
  });

  const handleChange = (n: string, v: string | number | boolean) => {
    setObj({ ...obj, [n]: v });
  };

  const handleSubmit = () => {};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Maintenance Task</DialogTitle>
          <DialogDescription>
            Create a new maintenance task for this enclosure
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <InputTag
            name="Title"
            value={obj.Title}
            setter={handleChange}
            label="Title"
          />
          <InputTag
            type="date"
            name="DueDate"
            value={obj.DueDate}
            setter={handleChange}
            label="Due Date"
          />
          <InputTag
            value={obj.AssignedTo}
            name="AssignedTo"
            setter={handleChange}
            label="Assigned To"
          />
          <Dropdown
            label="Priority"
            name="Priority"
            activeId={obj.Priority}
            handleDropdownChange={handleChange}
            options={[
              { value: "low", label: "Low" },
              { value: "medium", label: "Medium" },
              { value: "high", label: "High" },
            ]}
          />
          <div className="col-span-1 md:col-span-2">
            <TextArea
              value={obj.Description}
              name="Description"
              setter={handleChange}
              label="Description"
              placeHolder="Provide description here..."
            />
          </div>
        </div>
        <DialogFooter>
          <div className="flex w-full justify-end gap-2">
            <div className="w-1/2 md:w-fit">
              <ButtonComp
                text="Close"
                type={"white"}
                clickEvent={onClose}
                beforeIcon={<X size={12} />}
              />
            </div>
            <div className="w-1/2 md:w-fit">
              <ButtonComp
                text="Schedule"
                type={"dark"}
                clickEvent={handleSubmit}
                beforeIcon={<Save size={12} />}
              />
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MaintenanceModal;
