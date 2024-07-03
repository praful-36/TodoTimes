import React from 'react';

const ConfirmModal = ({ show, onClose, onConfirm, message }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4">{message}</h2>
        <div className="flex justify-end">
          <button onClick={onConfirm} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
            Confirm
          </button>
          <button onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
