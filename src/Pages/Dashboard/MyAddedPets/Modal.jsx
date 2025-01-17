// Modal.jsx
import React from 'react';

const Modal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h4>{title}</h4>
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className="btn btn-success">Yes</button>
          <button onClick={onCancel} className="btn btn-danger">No</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
