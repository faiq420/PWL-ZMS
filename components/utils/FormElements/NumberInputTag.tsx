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
}

const NumberInputTag = ({
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
}: Props) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnterPress) {
      onEnterPress();
    }
  };

  return (
    <div className={`${styles.inputGroup} space-y-[6px] flex-1`}>
      <div className="flex items-center space-x-2">
        {label && (
          <Label htmlFor={name}>
            {label}
            {isRequired && <span className="text-red-900">*</span>}
          </Label>
        )}
        {subfield && (
          <span className="text-gray-400 mb-1 text-[10px] text-center">{`( ${subfield} )`}</span>
        )}
      </div>
      <Input
        // className={styles.input}
        id={name}
        name={name}
        value={value}
        type={'number'}
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
    </div>
  );
};

export default NumberInputTag;
