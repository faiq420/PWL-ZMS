"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "../../lib/utils"

export function GroupVisitModal({ isOpen, onClose, groupVisit, onSave, viewMode }) {
  const [formData, setFormData] = useState({
    organization: "",
    contactPerson: "",
    email: "",
    phone: "",
    groupType: "",
    groupSize: "",
    date: "",
    time: "",
    programs: []
  });

  const [date, setDate] = useState(null);

  const availablePrograms = [
    { id: "wildlife", name: "Wildlife Conservation Workshop" },
    { id: "adaptations", name: "Animal Adaptations Tour" },
    { id: "ecosystem", name: "Ecosystem Exploration" },
    { id: "behindScenes", name: "Behind-the-Scenes Experience" }
  ];

  useEffect(() => {
    if (groupVisit) {
      setFormData(groupVisit);
      if (groupVisit.date) {
        setDate(new Date(groupVisit.date));
      }
    } else {
      setFormData({
        organization: "",
        contactPerson: "",
        email: "",
        phone: "",
        groupType: "",
        groupSize: "",
        date: "",
        time: "",
        programs: []
      });
      setDate(null);
    }
  }, [groupVisit, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setFormData(prev => ({
      ...prev,
      date: format(newDate, "yyyy-MM-dd")
    }));
  };

  const handleProgramToggle = (programName) => {
    setFormData(prev => {
      const programs = [...prev.programs];
      if (programs.includes(programName)) {
        return {
          ...prev,
          programs: programs.filter(p => p !== programName)
        };
      } else {
        return {
          ...prev,
          programs: [...programs, programName]
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!viewMode) {
      onSave(formData);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {viewMode ? "Group Visit Details" : groupVisit ? "Edit Group Visit" : "Create New Group Visit"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="organization">Organization Name</Label>
                <Input
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  disabled={viewMode}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input
                  id="contactPerson"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  disabled={viewMode}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={viewMode}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={viewMode}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Group Type</Label>
                <Select
                  value={formData.groupType}
                  onValueChange={(value) => handleSelectChange("groupType", value)}
                  disabled={viewMode}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select group type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="school">School Group</SelectItem>
                    <SelectItem value="college">College/University</SelectItem>
                    <SelectItem value="corporate">Corporate Group</SelectItem>
                    <SelectItem value="community">Community Organization</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="groupSize">Group Size</Label>
                <Input
                  id="groupSize"
                  name="groupSize"
                  type="number"
                  min="1"
                  value={formData.groupSize}
                  onChange={handleInputChange}
                  disabled={viewMode}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Preferred Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                      disabled={viewMode}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Preferred Time</Label>
                <Select
                  value={formData.time}
                  onValueChange={(value) => handleSelectChange("time", value)}
                  disabled={viewMode}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (9:00 AM - 12:00 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (1:00 PM - 4:00 PM)</SelectItem>
                    <SelectItem value="full">Full Day (9:00 AM - 4:00 PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Preferred Programs</Label>
              </div>
            </div>\
