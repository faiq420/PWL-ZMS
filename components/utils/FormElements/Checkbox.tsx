import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  name: string;
  label?: string;
  setter: (name: string, value: any) => void;
  value: any;
  disabled?: boolean;
  subfield?: string;
}

const Checkbox = ({
  name,
  label,
  setter,
  value,
  disabled,
  subfield,
}: Props) => {
  return (
    <div className="flex items-center space-x-[10px]">
      <input
        title="name"
        className="w-4 h-4 accent-primary cursor-pointer"
        // id={name}
        type="checkbox"
        name={name}
        checked={value}
        value={value}
        disabled={disabled ?? false}
        onChange={(e) => {
          setter(name, !value);
        }}
      />
      {label && <Label htmlFor={name}>{label}</Label>}
      {subfield && (
        <span className="text-gray-400 mb-1 text-[10px] text-center">{`( ${subfield} )`}</span>
      )}
    </div>
  );
};

export default Checkbox;
