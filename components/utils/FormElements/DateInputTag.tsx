import React from "react";
import styles from "./Tag.module.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  name: string;
  label?: string;
  setter: (name: string, value: any) => void;
  placeHolder?: string;
  value: any;
  disabled?: boolean;
  isRequired?: boolean;
  before?: string;
  after?: string;
  subfield?: string;
}

const DateInputTag = ({
  name,
  label,
  setter,
  value,
  placeHolder,
  disabled,
  isRequired,
  before,
  after,
  subfield,
}: Props) => {
  return (
    <div className={`${styles.inputGroup} space-y-[10px]`}>
      {label && (
        <Label htmlFor={name}>
          {label}
          {isRequired && <span className="text-red-900">*</span>}
        </Label>
      )}
      {subfield && (
        <span className="text-gray-400 mb-1 text-[10px] text-center">{`( ${subfield} )`}</span>
      )}
      <Input
        className={`${styles.input} appearance-auto`}
        id={name}
        type="date"
        disabled={disabled}
        name={name}
        value={value || ""}
        placeholder={placeHolder}
        min={after || undefined} 
        max={before || undefined}
        onChange={(e) => {
          setter(name, e.target.value);
        }}
      />
    </div>
  );
};

export default DateInputTag;
