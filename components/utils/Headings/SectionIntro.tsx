import React from "react";

interface SectionIntroProps {
  title?: string;
  description?: string;
  className?: string;
  descriptionClassName?: string;
  titleClassName?: string;
}

const SectionIntro: React.FC<SectionIntroProps> = ({
  title,
  description,
  className,
  descriptionClassName,
  titleClassName,
}) => {
  return (
    <div className={`font-poppins ${className}`}>
      <h2 className={`text-2xl font-semibold tracking-tight ${titleClassName}`}>
        {title}
      </h2>
      <p
        className={`text-main-secondaryText text-xs font-medium ${descriptionClassName}`}
      >
        {description}
      </p>
    </div>
  );
};

export default SectionIntro;
