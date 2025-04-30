import React from "react";
import lineStyles from "./Styles/TopBarLoader.module.css";

const TopBarLoader = () => {
  return (
    <div>
      <div className="top-28">
        {/* <Image src={logo} alt="logo" height={100} /> */}
        <div className={`${lineStyles.line}`}>
          <div className={`${lineStyles.inner}`}></div>
        </div>
      </div>
    </div>
  );
};

export default TopBarLoader;
