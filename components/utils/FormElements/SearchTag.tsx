import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

interface Props {
  setter: (value: any) => void;
  placeHolder?: string;
  value: any;
  disabled?: boolean;
}

const SearchTag: React.FC<Props> = ({
  setter,
  placeHolder = "Search...",
  value,
  disabled,
}) => {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeHolder}
        className="w-full pl-8 focus:ring-0"
        value={value}
        onChange={(e) => setter(e.target.value)}
      />
    </div>
  );
};

export default SearchTag;
