import { OPTION } from "@/types/utils";
import React from "react";

interface Props {
  data: OPTION[];
  setradio: (value: boolean) => void;
}

const RadioButton = ({ data, setradio }: Props) => {
  return (
    <div className="grid grid-cols-4">
      {data.map((item, index) => (
        <div key={index} className="flex space-x-2 items-center">
          <input
            type="radio"
            id={String(item.value)}
            name="fav_language"
            value={String(item.value)}
            onChange={(e) => {
              setradio(e.target.value === "replication" ? true : false);
            }}
            defaultChecked={item.value === "replication" ? true : false}
          />
          <label htmlFor={String(item.value)} className="text-xs">
            {item.label}
          </label>
          <br />
        </div>
      ))}
    </div>
  );
};

export default RadioButton;
