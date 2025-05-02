"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  booking: any;
  onSave: (booking: any) => void;
  viewMode: boolean;
  availableZoos: {
    id: number;
    name: string;
    location: string;
    status: string;
  }[];
}

export function BookingModal({
  isOpen,
  onClose,
  booking,
  onSave,
  viewMode,
}: Props) {
  const [formData, setFormData] = useState({
    visitorName: "",
    email: "",
    phone: "",
    zoo: "",
    date: "",
    time: "",
    adults: 0,
    children: 0,
    seniors: 0,
    familyPacks: 0,
    total: 0,
  });

  const [date, setDate] = useState<string | null>(null);
  const [zoos, setZoos] = useState([
    { value: "lahore-zoo", label: "Lahore Zoo" },
    { value: "lahore-safari-park", label: "Lahore Safari Park" },
    { value: "bahawalpur-zoo", label: "Bahawalpur Zoo" },
  ]);
  // Prices
  const prices = {
    adult: 200,
    child: 100,
    senior: 150,
    familyPack: 500,
  };

  useEffect(() => {
    if (booking) {
      // Ensure total is a number when loading existing booking
      const bookingData = {
        ...booking,
        total: typeof booking.total === "number" ? booking.total : 0,
        adults: typeof booking.adults === "number" ? booking.adults : 0,
        children: typeof booking.children === "number" ? booking.children : 0,
        seniors: typeof booking.seniors === "number" ? booking.seniors : 0,
        familyPacks:
          typeof booking.familyPacks === "number" ? booking.familyPacks : 0,
      };
      setFormData(bookingData);
      if (booking && booking.date) {
        setDate(booking.date);
      }
    } else {
      setFormData({
        visitorName: "",
        email: "",
        phone: "",
        zoo: "",
        date: "",
        time: "",
        adults: 0,
        children: 0,
        seniors: 0,
        familyPacks: 0,
        total: 0,
      });
      setDate(null);
    }
  }, [booking, isOpen]);

  const calculateTotal = () => {
    const adults = typeof formData.adults === "number" ? formData.adults : 0;
    const children =
      typeof formData.children === "number" ? formData.children : 0;
    const seniors = typeof formData.seniors === "number" ? formData.seniors : 0;
    const familyPacks =
      typeof formData.familyPacks === "number" ? formData.familyPacks : 0;

    const total =
      adults * prices.adult +
      children * prices.child +
      seniors * prices.senior +
      familyPacks * prices.familyPack;

    setFormData((prev) => ({
      ...prev,
      total,
    }));
  };

  useEffect(() => {
    calculateTotal();
  }, [
    formData.adults,
    formData.children,
    formData.seniors,
    formData.familyPacks,
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (name: string, value: string) => {
    const numValue = Number.parseInt(value) || 0;
    setFormData((prev) => ({
      ...prev,
      [name]: numValue,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (newDate: Date | undefined) => {
    const formattedDate = newDate ? newDate.toISOString() : "";
    setDate(formattedDate);
    setFormData((prev) => ({
      ...prev,
      date: formattedDate,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!viewMode) {
      onSave(formData);
    }
    onClose();
  };

  // Ensure total is always a number for display
  const displayTotal =
    typeof formData.total === "number" ? formData.total.toFixed(2) : "0.00";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {viewMode
              ? "Booking Details"
              : booking
              ? "Edit Booking"
              : "Create New Booking"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="visitorName">Visitor Name</Label>
                <Input
                  id="visitorName"
                  name="visitorName"
                  value={formData.visitorName}
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Select Zoo</Label>
                <Select
                  value={formData.zoo}
                  onValueChange={(value) => handleSelectChange("zoo", value)}
                  disabled={viewMode}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a zoo" />
                  </SelectTrigger>
                  <SelectContent>
                    {zoos.map((zoo: any, index: number) => (
                      <SelectItem value={zoo.value} key={index}>{zoo.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Visit Date</Label>
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
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="time">Visit Time</Label>
              <Input
                id="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                placeholder="e.g., 10:00 AM"
                disabled={viewMode}
                required
              />
            </div> */}

            <div className="space-y-2">
              <Label>Ticket Types</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between border rounded-md p-3">
                  <div>
                    <div className="font-medium">Adult</div>
                    <div className="text-sm text-muted-foreground">
                      Ages 18+
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="font-medium mr-4">{prices.adult}</div>
                    <div className="flex items-center space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          handleNumberChange(
                            "adults",
                            Math.max(0, formData.adults - 1).toString()
                          )
                        }
                        disabled={viewMode || formData.adults <= 0}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{formData.adults}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          handleNumberChange(
                            "adults",
                            (formData.adults + 1).toString()
                          )
                        }
                        disabled={viewMode}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between border rounded-md p-3">
                  <div>
                    <div className="font-medium">Child</div>
                    <div className="text-sm text-muted-foreground">
                      Ages 3-17
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="font-medium mr-4">{prices.child}</div>
                    <div className="flex items-center space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          handleNumberChange(
                            "children",
                            Math.max(0, formData.children - 1).toString()
                          )
                        }
                        disabled={viewMode || formData.children <= 0}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">
                        {formData.children}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          handleNumberChange(
                            "children",
                            (formData.children + 1).toString()
                          )
                        }
                        disabled={viewMode}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between border rounded-md p-3">
                  <div>
                    <div className="font-medium">Senior</div>
                    <div className="text-sm text-muted-foreground">
                      Ages 65+
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="font-medium mr-4">{prices.senior}</div>
                    <div className="flex items-center space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          handleNumberChange(
                            "seniors",
                            Math.max(0, formData.seniors - 1).toString()
                          )
                        }
                        disabled={viewMode || formData.seniors <= 0}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">
                        {formData.seniors}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          handleNumberChange(
                            "seniors",
                            (formData.seniors + 1).toString()
                          )
                        }
                        disabled={viewMode}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between border rounded-md p-3">
                  <div>
                    <div className="font-medium">Family Pack</div>
                    <div className="text-sm text-muted-foreground">
                      2 Adults + 2 Children
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="font-medium mr-4">{prices.familyPack}</div>
                    <div className="flex items-center space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          handleNumberChange(
                            "familyPacks",
                            Math.max(0, formData.familyPacks - 1).toString()
                          )
                        }
                        disabled={viewMode || formData.familyPacks <= 0}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">
                        {formData.familyPacks}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          handleNumberChange(
                            "familyPacks",
                            (formData.familyPacks + 1).toString()
                          )
                        }
                        disabled={viewMode}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex justify-between items-center">
            <div className="text-lg font-bold">Total: {displayTotal}</div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                {viewMode ? "Close" : "Cancel"}
              </Button>
              {!viewMode && (
                <Button
                  type="submit"
                  className="bg-green-700 hover:bg-green-800"
                >
                  {booking ? "Update Booking" : "Create Booking"}
                </Button>
              )}
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
