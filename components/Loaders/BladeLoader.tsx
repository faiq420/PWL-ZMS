import React from "react";
import styles from "./Styles/BladeLoader.module.css";

const BladeLoader = () => {
  return (
    <div>
      <div className={`${styles.spinner}`}>
        <div className={`${styles.spinnerBlade}`}></div>
        <div className={`${styles.spinnerBlade}`}></div>
        <div className={`${styles.spinnerBlade}`}></div>
        <div className={`${styles.spinnerBlade}`}></div>
        <div className={`${styles.spinnerBlade}`}></div>
        <div className={`${styles.spinnerBlade}`}></div>
        <div className={`${styles.spinnerBlade}`}></div>
        <div className={`${styles.spinnerBlade}`}></div>
        <div className={`${styles.spinnerBlade}`}></div>
        <div className={`${styles.spinnerBlade}`}></div>
        <div className={`${styles.spinnerBlade}`}></div>
        <div className={`${styles.spinnerBlade}`}></div>
      </div>
    </div>
  );
};

export default BladeLoader;
