import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./Tag.module.css";
import { components } from "react-select";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import useHelper from "@/Helper/helper";

interface Props {
  options: any;
  activeId: number | string | null | boolean;
  name: string;
  handleDropdownChange: (
    name: string,
    value: number | string //| boolean
  ) => void;
  isDisabled?: boolean;
  clearable?: boolean;
  label?: string;
  placeHolder?: string;
  isRequired?: boolean;
}

// Dynamically import Select to avoid SSR issues
const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

const DropdownWithImage = ({
  options,
  activeId,
  name,
  handleDropdownChange,
  isDisabled,
  clearable,
  label,
  placeHolder,
  isRequired,
}: Props) => {
  const helper = useHelper();
  const [defaultVal, setDefaultValue] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const defaultOption = options.find(
        (option: any) => option.value === activeId
      );
      setDefaultValue(defaultOption);
    }
  }, [options, activeId, isMounted]);

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      fontSize: 14,
      minHeight: "34px",
      height: "34px",
      maxHeight: "34px",
      padding: 0,
      display: "flex",
      outline: "none",
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      height: "34px",
      display: "flex",
      alignItems: "center",
      padding: "0 8px",
      justifyContent: "space-between",
      width: "100%",
    }),
    input: (provided: any) => ({
      ...provided,
      margin: 0,
      padding: 0,
      height: "auto",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      lineHeight: "34px",
      margin: 0,
      justifyContent: "space-between",
      width: "100%",
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      height: "34px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      fontSize: 12,
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected
        ? "#2C2C2Ce6"
        : state.isFocused
        ? "#2C2C2C10"
        : "white",
    }),
    noOptionsMessage: (provided: any) => ({
      ...provided,
      fontSize: "12px",
      color: "#999",
      padding: 4,
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      padding: 4,
      height: "20px",
      width: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }),
    clearIndicator: (provided: any) => ({
      ...provided,
      padding: 4,
      height: "20px",
      width: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    }),
  };

  const CustomMenu = (props: any) => {
    return <components.Menu {...props} className="custom-menu" />;
  };

  const CustomMenuList = (props: any) => {
    return <components.MenuList {...props} className="custom-menu-list" />;
  };

  if (!isMounted) {
    return (
      <div className={`${styles.inputGroup} space-y-[10px] flex-1`}>
        {label && (
          <Label htmlFor={name}>
            {label}
            {isRequired && <span className="text-red-900">*</span>}
          </Label>
        )}
        <div className="h-[34px] bg-[#f6f8fc] rounded"></div>
      </div>
    );
  }

  return (
    <div className={`${styles.inputGroup} space-y-[10px] flex-1`}>
      {label && (
        <Label htmlFor={name}>
          {label}
          {isRequired && <span className="text-red-900">*</span>}
        </Label>
      )}
      <Select
        className="basic-single bg-[#f6f8fc]"
        classNamePrefix="select"
        isDisabled={isDisabled}
        isClearable={clearable}
        value={defaultVal}
        isSearchable={true}
        options={options}
        placeholder={placeHolder}
        formatOptionLabel={(option: any) => (
          <div className="flex justify-between items-center">
            <span className="mr-3">{option.label}</span>
            <Image
              height={25}
              width={25}
              src={helper.GetDocument(option.ImagePath)}
              alt={option.label}
              unoptimized
            />
          </div>
        )}
        onChange={(e: any) => {
          handleDropdownChange(name, e !== null ? e.value : null);
        }}
        components={{
          Menu: CustomMenu,
          MenuList: CustomMenuList,
        }}
        styles={customStyles}
      />
    </div>
  );
};

export default DropdownWithImage;
