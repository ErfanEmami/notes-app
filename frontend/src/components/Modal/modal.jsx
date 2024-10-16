import React from 'react';
import ReactDOM from 'react-dom';

import styles from './modal.module.css'; // Import the CSS module

const Modal = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <div className={styles.modal_overlay} onClick={onClose}>
      <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
        {children}
        <button className={styles.close_button} onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body  // Render modal outside of the root DOM node
  );
};

export default Modal;
