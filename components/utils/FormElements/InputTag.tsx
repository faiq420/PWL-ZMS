import React, { KeyboardEvent } from "react";
import styles from "./Tag.module.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
interface Props {
  name: string;
  label?: string;
  setter: (name: string, value: any) => void;
  placeHolder?: string;
  range?: number;
  value: any;
  disabled?: boolean;
  type?: string;
  subfield?: string;
  isRequired?: boolean;
  onEnterPress?: () => void;
  error?: string;
}

const InputTag = ({
  name,
  label,
  setter,
  value,
  placeHolder,
  range,
  disabled,
  type,
  subfield,
  isRequired,
  onEnterPress,
  error = "",
}: Props) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnterPress) {
      onEnterPress();
    }
  };

  return (
    <div
      className={`${styles.inputGroup} ${label ? "space-y-[6px]" : ""} flex-1`}
    >
      {label && (
        <div className="flex items-center space-x-2 text-[10px]">
          {label && (
            <Label htmlFor={name}>
              {label}
              {isRequired && <span className="text-red-900">*</span>}
            </Label>
          )}
          {subfield && (
            <span className="text-gray-400 text-[10px] text-center">{`( ${subfield} )`}</span>
          )}
        </div>
      )}
      <Input
        className={`${styles.input} ${error !== "" && "!border-red-600"}`}
        id={name}
        name={name}
        value={value ?? ""}
        type={type ?? "text"}
        placeholder={placeHolder}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          if (e.target.value.length <= (range ?? 100000)) {
            setter(name, e.target.value);
          } else {
            e.preventDefault();
          }
        }}
      />
      {error !== "" && (
        <span className="text-xs self-end text-red-400 !m-0">{error}</span>
      )}
    </div>
  );
};

export default InputTag;
