import React, { useEffect, useRef } from 'react';

const ConfirmModal = ({ show, onClose, onConfirm, message, darkMode }) => {

  const modalRef = useRef();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (show) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [show, onClose]);

  // Set focus on modal when it is shown
  useEffect(() => {
    if (show) {
      modalRef.current?.focus();
    }
  }, [show]);

  // Close modal if clicking on overlay
  const handleOverlayClick = (e) => {
    if (e.target.id === 'modal-overlay') onClose();
  };

  if (!show) return null;

  return (
    <div
      id="modal-overlay"
      onClick={handleOverlayClick}
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity ${show ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      role="dialog"
      aria-labelledby="confirm-modal-title"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        tabIndex="-1"
        className={`p-5 rounded-lg shadow-lg max-w-[18rem] lg:max-w-sm w-full animate-fadeIn ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="confirm-modal-title" className="text-xl mb-4">
          {message}
        </h2>
        <div className="flex justify-end">
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className={`py-2 px-4 rounded font-bold ${darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-500 hover:bg-gray-700 text-white"
              }`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
