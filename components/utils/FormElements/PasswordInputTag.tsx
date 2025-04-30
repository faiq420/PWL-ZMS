import React, { useState, KeyboardEvent } from "react";
import styles from "./Tag.module.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react"; // if you're using lucide icons (or any icon lib)

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

const PasswordInputTag = ({
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
  const [showPassword, setShowPassword] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnterPress) {
      onEnterPress();
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={`${styles.inputGroup} space-y-[10px] flex-1`}>
      <div className="flex items-center space-x-2">
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

      <div className="relative">
        <Input
          id={name}
          name={name}
          value={value}
          type={showPassword ? "text" : "password"}
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
          className="pr-10" // extra padding for the eye icon
        />

        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {showPassword ? <EyeOff size={12} /> : <Eye size={12} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInputTag;
