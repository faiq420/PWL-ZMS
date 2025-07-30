"use client";

import type React from "react";
import { useState } from "react";
import {
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Safety from "@/src/app/home/visitor-services/tabs/Safety";
import FirstAidTab from "@/src/app/home/visitor-services/tabs/FirstAid";
import Faciltiy from "@/src/app/home/visitor-services/tabs/Facility";

export function FacilitiesAndSafety() {
  const [activeTab, setActiveTab] = useState("Facilities");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-4">
      <div className="relative w-full flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={`Search ${activeTab}...`}
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-1/4">
          <Select
            value={activeTab}
            onValueChange={(value) =>
              setActiveTab(value)
            }
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {["Facilities", "First Aid", "Safety"].map((item, index) => (
                <SelectItem key={index} value={item}>{item}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {activeTab === "Facilities" && (
        <Faciltiy searchQuery={searchQuery} />
      )}

      {activeTab === "First Aid" && (
        <FirstAidTab searchQuery={searchQuery} />
      )}

      {activeTab === "Safety" && (
        <Safety searchQuery={searchQuery} />
      )}
    </div>
  );
}
