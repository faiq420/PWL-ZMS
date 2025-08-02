"use client";

import type React from "react";
import { useState } from "react";
import { Search } from "lucide-react";
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
import SearchTag from "../utils/FormElements/SearchTag";
import {
  initialFacilities,
  initialFirstAid,
  initialSafety,
} from "@/src/app/home/visitor-services/tabs/demoData";

export function FacilitiesAndSafety() {
  const [activeTab, setActiveTab] = useState("Facilities");
  const tabs = ["Facilities", "First_Aid", "Safety"];
  const [searchQuery, setSearchQuery] = useState({
    Facilities: "",
    First_Aid: "",
    Safety: "",
  });
  const [facilities, setFacilities] = useState(initialFacilities);
  const [firstAids, setFirstAids] = useState(initialFirstAid);
  const [safety, setSafety] = useState(initialSafety);
  const handleSearchQueryChange = (v: string) => {
    setSearchQuery({ ...searchQuery, [activeTab]: v });
  };

  const handleFacilityDelete = (id: number) => {
    setFacilities(facilities.filter((x) => x.id != id));
  };
  const handleFirstAidDelete = (id: number) => {
    setFirstAids(firstAids.filter((x) => x.id != id));
  };
  const handleSafetyDelete = (id: number) => {
    setSafety(safety.filter((x) => x.id != id));
  };

  const filteredFacilities = facilities.filter((facility) => {
    const matchesSearch = facility.name
      .toLowerCase()
      .includes(searchQuery.Facilities.toLowerCase());

    return matchesSearch;
  });
  const filteredFirstAids = firstAids.filter((aid) => {
    const matchesSearch = aid.name
      .toLowerCase()
      .includes(searchQuery.First_Aid.toLowerCase());

    return matchesSearch;
  });
  const filteredSafeties = safety.filter((s) => {
    const matchesSearch = s.name
      .toLowerCase()
      .includes(searchQuery.Safety.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="space-y-4">
      <div className="relative w-full flex gap-4">
        <SearchTag
          value={searchQuery[activeTab as keyof typeof searchQuery]}
          setter={handleSearchQueryChange}
          placeHolder={`Search ${activeTab.replace("_", " ")}`}
        />
        <div className="w-1/4">
          <Select
            value={activeTab}
            onValueChange={(value) => setActiveTab(value)}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {tabs.map((item, index) => (
                <SelectItem key={index} value={item}>
                  {item.replace('_',' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {activeTab === "Facilities" && (
        <Faciltiy
          facilityDelete={handleFacilityDelete}
          data={filteredFacilities}
        />
      )}

      {activeTab === "First_Aid" && (
        <FirstAidTab
          aidDelete={handleFirstAidDelete}
          data={filteredFirstAids}
        />
      )}

      {activeTab === "Safety" && <Safety data={filteredSafeties} safetyDelete={handleSafetyDelete} />}
    </div>
  );
}
