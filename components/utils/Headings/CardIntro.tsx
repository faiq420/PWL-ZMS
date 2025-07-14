import { CardDescription, CardTitle } from "@/components/ui/card";
import React from "react";

interface CardIntroProps {
  title?: string;
  description?: string;
}

const CardIntro: React.FC<CardIntroProps> = ({
  title = "",
  description = "",
}) => {
  return (
    <div className="font-poppins">
      <CardTitle className="text-lg font-medium">{title}</CardTitle>
      <CardDescription className="text-xs text-gray-500">
        {description}
      </CardDescription>
    </div>
  );
};

export default CardIntro;
