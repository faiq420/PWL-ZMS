import React from "react";
import BladeLoader from "../Loaders/BladeLoader";

interface Props {
  text: string;
  clickEvent: () => void;
  disabled?: boolean;
  isCruding?: boolean;
  type?: keyof typeof types;
  beforeIcon?: any;
  afterIcon?: any;
}
const types: { [key: string]: string } = {
  white: "bg-white text-black hover:bg-[#f7f7f7]",
  blue: "bg-[#2563eb] text-white hover:bg-[#2563ebdb] disabled:bg-[#2563eb80]",
  yellow:
    "bg-[#D98310] text-black hover:bg-[#D98310db] disabled:bg-[#d98310b8]",
  lightYellow: "bg-yellow-400 hover:bg-yellow-400/90 disabled:bg-yellow-400/80",
  navyBlue:
    "bg-[#1D2731] text-white hover:bg-[#1D2731db] disabled:bg-[#283848db]",
  gray: "bg-[#1D273180] text-white hover:bg-[#1D273170] disabled:bg-[#1D273150]",
};
const ButtonComp = ({
  text,
  clickEvent,
  disabled,
  isCruding,
  type = "white",
  beforeIcon,
  afterIcon,
}: Props) => {
  return (
    <div className="w-full">
      <button
        onClick={clickEvent}
        disabled={disabled || isCruding}
        className={`${types[type]} flex gap-2 justify-center disabled:cursor-text text-nowrap flex-1 text-xs font-medium font-DMSans w-full py-3 px-4 rounded shadow hover:cursor-pointer focus:outline-none focus:ring-0 
          }`}
      >
        <span>{beforeIcon}</span>{" "}
        <span> {isCruding ? <BladeLoader /> : text}</span>
        <span>{afterIcon}</span>{" "}
      </button>
    </div>
  );
};

export default ButtonComp;
