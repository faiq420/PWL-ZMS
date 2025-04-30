import React from "react";

interface Props {
  text: string;
  className?: string;
}

const Heading = ({ text, className }: Props) => {
  return (
    <h1
      className={`text-2xl md:text-3xl font-faustina font-semibold tracking-tighter heading-color ${className}`}
    >
      {text}
    </h1>
  );
};

export default Heading;
