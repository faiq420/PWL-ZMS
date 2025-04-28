import React from "react";

interface Props {
  text: string;
}

const H1 = ({ text }: Props) => {
  return (
    <h1 className="text-2xl md:text-5xl font-bold tracking-tighter heading-color">{text}</h1>
  );
};

export default H1;
