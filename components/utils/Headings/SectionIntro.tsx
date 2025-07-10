import React from "react";

interface SectionIntroProps {
  title?: string;
  description?: string;
}

const SectionIntro: React.FC<SectionIntroProps> = ({ title, description }) => {
  return (
    <div className="font-poppins">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="text-main-secondaryText text-xs font-medium">
        {description}
      </p>
    </div>
  );
};

export default SectionIntro;
