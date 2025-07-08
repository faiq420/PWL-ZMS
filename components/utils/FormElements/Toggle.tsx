import React from "react";
import styles from "./InputTag.module.css";

interface Props {
  name: string;
  label?: string;
  setter: (name: string, value: any) => void;
  value: any;
  isDisabled?: boolean;
}

const Toggle = ({ name, label, setter, value, isDisabled }: Props) => {
  return (
    <div>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          name={name}
          disabled={isDisabled}
          id={name}
          checked={value}
          onChange={(e) => {
            setter(name, e.target.checked);
          }}
        />
        <div className="relative w-10 h-5 bg-gray-200 peer-focus:outline-none  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
        <span className="text-xs text-[#1E1E1E] mb-1 font-alata font-normal leading-4 ml-3">
          {label}
        </span>
      </label>
    </div>
  );
};

export default Toggle;
