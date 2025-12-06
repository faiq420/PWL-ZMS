import React from "react";
import "./unauthorized.css";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 font-poppins">
      <div className="lock "></div>
      <div className="message text-center">
        <h1>Access to this page is restricted.</h1>
        <p>
          Please check with the site admin if you believe this is a mistake.
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
