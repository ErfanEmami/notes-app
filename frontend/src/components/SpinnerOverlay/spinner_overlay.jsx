import React from "react";
import ReactDOM from 'react-dom';

import styles from "./spinner_overlay.module.css";

const SpinnerOverlay = () => {
  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
    </div>,
    document.body  // Render spinner outside of the root DOM node
  );
};

export default SpinnerOverlay;
