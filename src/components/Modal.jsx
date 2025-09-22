import React, { useState } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // do not render if closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow-lg relative w-1/2 max-w-lg">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-red-500 font-bold text-xl"
          onClick={onClose}
        >
          ×
        </button>

        {/* Modal content */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
