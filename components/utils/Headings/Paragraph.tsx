import React from "react";

interface Props {
  text: string;
  className?: string;
}

const Paragraph = ({ text, className }: Props) => {
  return (
    <h1
      className={`text-xl font-medium tracking-tighter heading-color ${className}`}
    >
      {text}
    </h1>
  );
};

export default Paragraph;
