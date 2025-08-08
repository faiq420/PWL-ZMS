import React from "react";

interface EnvironmentalControls {
  Icon: any;
  Title: string;
  Metric: string;
  iconColor?: string;
  bgColor?: string;
}

const EnvironmentControls = ({
  Icon,
  Title,
  Metric,
  iconColor = "text-primary",
  bgColor = "bg-primary/10",
}: EnvironmentalControls) => {
  return (
    <div className="flex items-center space-x-4">
      <div className={`${bgColor} p-3 rounded-full`}>
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
      <div>
        <h3 className="font-medium">{Title}</h3>
        <p className="text-sm text-muted-foreground">{Metric}</p>
      </div>
    </div>
  );
};

export default EnvironmentControls;
