import React from "react";

interface Props {
  title: string;
  metric: string;
}

const VitalSignCard = ({ title, metric }: Props) => {
  return (
    <div className="border rounded-lg p-4">
      <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
      <p className="text-xl font-poppins font-semibold mt-1">{metric}</p>
    </div>
  );
};

export default VitalSignCard;
