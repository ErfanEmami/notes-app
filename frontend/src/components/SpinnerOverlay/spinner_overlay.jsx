import React from "react";
import styles from "./spinner_overlay.module.css";

const SpinnerOverlay = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default SpinnerOverlay;
