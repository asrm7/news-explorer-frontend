import React from "react";

const Modal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal__title">{title}</h2>
        <p className="modal__message">{message}</p>
        <button type="button" className="modal__close-button" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Modal;
