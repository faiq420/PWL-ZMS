import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import makeAnimated from "react-select/animated";
import { components } from "react-select";

interface Props {
  options: any;
  selectedIds: any;
  name: string;
  handleDropdownChange: (name: string, Ids: any) => void;
  isDisabled?: boolean;
  clearable?: boolean;
  label?: string;
  keyWord?: string;
}

// Dynamically import Select to avoid SSR issues
const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

const MultiSelectDropdown = ({
  options,
  selectedIds,
  name,
  handleDropdownChange,
  isDisabled,
  clearable,
  label,
  keyWord = "value",
}: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [defaultVal, setDefaultValue] = useState<any[]>([]);
  const [domOptions, setDomOptions] = useState(options);
  const animatedComponents = makeAnimated();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      setDomOptions([...options]);
    }
  }, [options, isMounted]);

  useEffect(() => {
    if (isMounted) {
      const defaultOption = domOptions.filter((option: any) => {
        return selectedIds.includes(option.value);
      });
      setDefaultValue(defaultOption);
    }
  }, [domOptions, selectedIds, isMounted]);

  function updateData(event: any) {
    if (!isMounted) return;

    let array: any = [];
    let optArr: any = [];
    let yes = false;
    for (let i = 0; i < event.length; i++) {
      if (event[i].value == "All") {
        yes = true;
        break;
      }
    }

    if (yes == true) {
      domOptions.forEach((element: any) => {
        if (element[keyWord] !== undefined) {
          array.push(element[keyWord]);
          optArr.push(element);
        }
      });
    } else {
      event.forEach((element: any) => {
        array.push(element[keyWord]);
        optArr.push(element);
      });
    }
    if (array.length == 0) {
      setSelectAll(false);
    }
    if (array.length == options.length - 1 && !array.includes("All")) {
      setDomOptions(domOptions.filter((option: any) => option.value !== "All"));
    } else {
      setDomOptions(options);
    }
    setDefaultValue(optArr);
    handleDropdownChange(keyWord, array);
  }

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      fontSize: 12,
      padding: 0,
      display: "flex",
      minHeight: "25px",
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      display: "flex",
      minHeight: "25px",
      maxHeight: "80px",
      overflowY: "auto",
      alignItems: "center",
      padding: "0 4px",
      position: "relative",
      scrollbarWidth: "thin",
      scrollbarColor: "#c0c0c0 transparent",
    }),
    input: (provided: any) => ({
      ...provided,
      margin: 0,
      padding: 0,
      width: 1,
    }),
    singleValue: (provided: any) => ({
      ...provided,
      fontSize: 12,
      margin: 0,
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      height: "34px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
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
    option: (provided: any, state: any) => ({
      ...provided,
      fontSize: 12,
      padding: "4px 8px",
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected
        ? "#2C2C2Ce6"
        : state.isFocused
        ? "#2C2C2C10"
        : "white",
      cursor: "pointer",
      ":active": {
        backgroundColor: state.isSelected ? "#2C2C2C" : "#2C2C2C10",
      },
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
    multiValue: (provided: any) => ({
      ...provided,
      fontSize: 10,
      display: "flex",
      justifyContent: "space-between",
      width: "min-content",
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      fontSize: 10,
      padding: "0",
      margin: "0",
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      cursor: "pointer",
      height: "auto",
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
      <div className="flex-1 DMSans-family">
        {label && (
          <label
            className="text-xs text-[#1E1E1E] mb-1 font-alata font-normal leading-4"
            htmlFor={name}
          >
            {label}
          </label>
        )}
        <div className="h-[34px] bg-[#f6f8fc] rounded"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 DMSans-family">
      <label
        className="text-xs text-[#1E1E1E] mb-1 font-alata font-normal leading-4"
        htmlFor={name}
      >
        {label}
      </label>
      <Select
        closeMenuOnSelect={false}
        isMulti
        classNamePrefix="select"
        isDisabled={isDisabled}
        isClearable={clearable}
        value={defaultVal}
        isSearchable={true}
        options={domOptions}
        onChange={(e) => {
          updateData(e);
        }}
        components={{
          ...animatedComponents,
          Menu: CustomMenu,
          MenuList: CustomMenuList,
        }}
        styles={customStyles}
      />
    </div>
  );
};

export default MultiSelectDropdown;
