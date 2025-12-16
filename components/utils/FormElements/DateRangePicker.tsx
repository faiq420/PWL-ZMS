import React, { useEffect, useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import styles from "./Tag.module.css";
import { Label } from "@/components/ui/label";
import { formatISOStringDate } from "@/Helper/DateFormats";

interface DateRange {
  startDate: string;
  endDate: string;
}

interface Props {
  name: string;
  label?: string;
  setter: (name: string, value: DateRange) => void;
  value: DateRange;
  disabled?: boolean;
  isRequired?: boolean;
}

const parseDate = (date: string): Date | null => (date ? new Date(date) : null);

const formatDate = (date: Date | null): string =>
  date ? formatISOStringDate(date).split("T")[0] : "";

const DateRangePicker: React.FC<Props> = ({
  name,
  label,
  setter,
  value,
  disabled,
  isRequired,
}) => {
  const [dateRange, setDateRange] = useState<DateValueType>({
    startDate: parseDate(value.startDate),
    endDate: parseDate(value.endDate),
  });

  useEffect(() => {
    setDateRange({
      startDate: parseDate(value.startDate),
      endDate: parseDate(value.endDate),
    });
  }, [value]);

  const handleChange = (newValue: DateValueType | null) => {
    console.log(newValue)
    if (!newValue || !newValue.startDate || !newValue.endDate) {
      setDateRange({ startDate: null, endDate: null });
      setter(name, { startDate: "", endDate: "" });
      return;
    }

    const formattedValue: DateRange = {
      startDate: formatDate(newValue.startDate as Date),
      endDate: formatDate(newValue.endDate as Date),
    };

    setDateRange(newValue);
    setter(name, formattedValue);
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
        </div>
      )}

      <Datepicker
        value={dateRange}
        onChange={handleChange}
        separator="to"
        disabled={disabled}
        inputClassName={`${styles.input} w-full`}
        containerClassName="relative w-full"
        toggleClassName="
          absolute right-3 top-1/2 transform -translate-y-1/2 
          text-gray-500 hover:text-gray-700
        "
        popoverDirection="down"
        primaryColor="lime"
      
      />
    </div>
  );
};

export default DateRangePicker;
