import React from "react";

interface Props {
  text: string;
  className?: string;
}

const Subheading = ({ text, className }: Props) => {
  return (
    <h2
      className={`text-xl md:text-2xl font-bold tracking-tighter heading-color ${className}`}
    >
      {text}
    </h2>
  );
};

export default Subheading;
