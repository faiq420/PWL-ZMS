import React from "react";

interface Props {
  text: string;
  className?: string;
}

const LargeHeading = ({ text, className }: Props) => {
  return (
    <h1
      className={`text-3xl md:text-5xl font-medium font-faustina tracking-tighter heading-color ${className}`}
    >
      {text}
    </h1>
  );
};

export default LargeHeading;
