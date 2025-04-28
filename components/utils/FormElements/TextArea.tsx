import React from "react";
import styles from "./Tag.module.css";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
interface Props {
  name: string;
  label?: string;
  setter: (name: string, value: any) => void;
  placeHolder?: string;
  range?: number;
  value: any;
  isRequired?: boolean;
  subfield?: string;
}

const TextArea = ({
  name,
  label,
  setter,
  value,
  placeHolder,
  range,
  isRequired,
  subfield,
}: Props) => {
  return (
    <div className={`${styles.inputGroup} space-y-[10px] h-full`}>
      {label && (
        <Label htmlFor={name}>
          {label}
          {isRequired && <span className="text-red-900">*</span>}
        </Label>
      )}
      {subfield && (
        <span className="text-gray-400 mb-1 text-[10px] text-center">{`( ${subfield} )`}</span>
      )}
      <Textarea
        className={`flex-1 max-h-52`}
        id={name}
        name={name}
        value={value}
        placeholder={placeHolder}
        onChange={(e) => {
          if (e.target.value.length < (range ?? 100000)) {
            setter(name, e.target.value);
          } else {
            e.preventDefault();
          }
        }}
      />
    </div>
  );
};

export default TextArea;
