import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t py-3 md:py-0 bg-white text-main-navyBlue">
      <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-6 md:h-12">
        <div></div>
        <p className="text-sm">
          © {new Date().getFullYear()} Punjab Wildlife & Parks. All rights
          reserved.
        </p>
        <Image src={"/ppf_logo.png"} alt="PPF" height={30} width={30} />
      </div>
    </footer>
  );
};

export default Footer;
