import React, { useState } from "react";
import DatePicker from "react-datepicker";
import styles from "./Tag.module.css";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePickerStyles.css"; // ✅ Import the custom styles

interface Props {
  name: string;
  label?: string;
  setter: (name: string, value: any) => void;
  value: any;
  disabled?: boolean;
  isRequired?: boolean;
}

const DateTimePicker: React.FC<Props> = ({
  name,
  label,
  setter,
  value,
  disabled,
  isRequired,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <div className={`${styles.inputGroup} flex flex-col space-y-1`}>
      {label && (
        <label
          className="text-xs text-[#1E1E1E] font-alata font-normal leading-4"
          htmlFor={name}
        >
          {label}
          {isRequired && <span className="text-red-900"> *</span>}
        </label>
      )}

      <DatePicker
        selected={value || selectedDate}
        onChange={(date: Date | null) => setter(name, date)}
        showTimeInput
        disabled={disabled}
        name={name}
        dateFormat="Pp"
        timeInputLabel="Enter time:"
        className={`${styles.input} w-full flex-1`}
        popperClassName="custom-datepicker" // ✅ Apply popup styles
      />
    </div>
  );
};

export default DateTimePicker;
