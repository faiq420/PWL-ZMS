import React from "react";

interface Props {
  text: string;
  className?: string;
}

const BodyText = ({ text, className }: Props) => {
  return (
    <h1
      className={`text-sm font-syne font-normal ${className}`}
    >
      {text}
    </h1>
  );
};

export default BodyText;
