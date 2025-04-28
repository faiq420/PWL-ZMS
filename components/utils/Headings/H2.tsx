import React from "react";

interface Props {
  text: string;
}

const H2 = ({ text }: Props) => {
  return (
    <h2 className="text-xl md:text-3xl font-bold tracking-tighter heading-color">{text}</h2>
  );
};

export default H2;
