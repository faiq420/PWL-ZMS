import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t py-6 md:py-0 bg-white text-main-navyBlue">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6 md:h-16">
        <p className="text-sm">
          © {new Date().getFullYear()} Punjab Wildlife & Parks. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
