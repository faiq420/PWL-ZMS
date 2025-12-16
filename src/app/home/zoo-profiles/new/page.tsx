'use client'
import React from "react";
import dynamic from "next/dynamic";
const ZooCrud = dynamic(() => import('../[slug]/Cruds/Zoo'), {
  ssr: false,
});

const NewZooPage = () => {
  return <ZooCrud />;
};

export default NewZooPage;
