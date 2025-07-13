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
  default:
    "bg-[#229E22] text-white hover:bg-[#229E22]/80 disabled:bg-[#229E22]/60",
  outlineDefault:
    "bg-transparent border border-[#229E22] text-[#229E22] hover:bg-main-white/20 disabled:bg-main-white/10",
  jungleGreen:
    "bg-main-jungleGreen text-white hover:bg-main-jungleGreen/80 disabled:bg-main-jungleGreen/60",
  outlineJungleGreen:
    "bg-transparent border border-main-jungleGreen text-main-jungleGreen hover:bg-main-white/20 disabled:bg-main-white/10",
  forestGreen:
    "bg-main-forestGreen text-white hover:bg-main-forestGreen/80 disabled:bg-main-forestGreen/60",
  outlineForestGreen:
    "bg-transparent border border-main-forestGreen text-main-forestGreen hover:bg-main-white/20 disabled:bg-main-white/10",
  safariBrown:
    "bg-main-safariBrown text-white hover:bg-main-safariBrown/80 disabled:bg-main-safariBrown/60",
  outlineSafariBrown:
    "bg-transparent border border-main-safariBrown text-main-safariBrown hover:bg-main-white/20 disabled:bg-main-white/10",
  skyBlue:
    "bg-main-skyBlue text-white hover:bg-main-skyBlue/80 disabled:bg-main-skyBlue/60",
  outlineSkyBlue:
    "bg-transparent border border-main-skyBlue text-main-skyBlue hover:bg-main-white/20 disabled:bg-main-white/10",
  orange:
    "bg-main-orange text-white hover:bg-main-orange/80 disabled:bg-main-orange/60",
  outlineOrange:
    "bg-transparent border border-main-orange text-main-orange hover:bg-main-white/20 disabled:bg-main-white/10",
  softRed:
    "bg-main-softRed text-white hover:bg-main-softRed/80 disabled:bg-main-softRed/60",
  outlineSoftRed:
    "bg-transparent border border-main-softRed text-main-softRed hover:bg-main-white/20 disabled:bg-main-white/10",
  sunshineYellow:
    "bg-main-sunshineYellow text-white hover:bg-main-sunshineYellow/80 disabled:bg-main-sunshineYellow/60",
  outlineSunshineYellow:
    "bg-transparent border border-main-sunshineYellow text-main-sunshineYellow hover:bg-main-white/20 disabled:bg-main-white/10",
  darkGreen:
    "bg-green-700 border text-white hover:bg-green-800 disabled:bg-green-700/70",
  dark: "bg-[#171717] border text-white hover:bg-[#181818] disabled:bg-[#3c3c3c]",
  dark_custom: "bg-[#171717] border text-white hover:bg-[#181818] disabled:bg-[#8b8b8b]",
  white: "bg-white border text-black hover:bg-accent",
  danger: "bg-red-600 hover:bg-red-700 disabled:bg-red-500 text-white"
};
const ButtonComp = ({
  text,
  clickEvent,
  disabled,
  isCruding,
  type = "darkGreen",
  beforeIcon,
  afterIcon,
}: Props) => {
  return (
    <div className="w-full">
      <button
        onClick={clickEvent}
        disabled={disabled || isCruding}
        className={`${types[type]} h-9 flex gap-2 justify-center items-center disabled:cursor-text text-nowrap flex-1 text-sm font-medium font-faustina w-full py-3 px-4 rounded-md shadow hover:cursor-pointer focus:outline-none focus:ring-0 
          }`}
      >
        <span>{!isCruding && beforeIcon}</span>{" "}
        <span> {isCruding ? <BladeLoader /> : text}</span>
        <span>{!isCruding && afterIcon}</span>{" "}
      </button>
    </div>
  );
};

export default ButtonComp;
