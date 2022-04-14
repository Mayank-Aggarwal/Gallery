import React from 'react';
import './styles.css';

const Modal = ({ onClose, modalData }) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={onClose}>x</span>
        <img src={modalData.src} alt={modalData.alt} />
      </div>
    </div>
  );
}

export default Modal