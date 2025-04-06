import React, { useEffect, useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditModal = ({ show, onClose, onSave, currentTodo, darkMode }) => {

  const [newTodo, setNewTodo] = useState({
    text: '',
    description: '',
    dueDate: '',
    tags: { priority: '', category: '' },
    subtasks: []
  });
  const [subtaskInput, setSubtaskInput] = useState("");
  const modalRef = useRef(null);

  // Populate newTodo when currentTodo changes
  useEffect(() => {
    if (currentTodo) {
      setNewTodo({
        text: currentTodo.text || '',
        description: currentTodo.description || '',
        dueDate: currentTodo.dueDate || '',
        tags: {
          priority: currentTodo.tags?.priority || '',
          category: currentTodo.tags?.category || '',
        },
        subtasks: Array.isArray(currentTodo.subtasks) ? currentTodo.subtasks : [],
      });
    }
  }, [currentTodo]);

  useEffect(() => {
    if (show) {
      modalRef.current?.focus();
    }
  }, [show]);

  // Close modal on Escape key press
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

  const handleSave = () => {
    onSave(newTodo);
    onClose();
    toast.info('Task Edited successfully!', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark',
    });
  };

  // Handle adding subtasks from input when user leaves the field or presses Enter
  const handleAddSubtask = () => {
    if (subtaskInput.trim()) {
      setNewTodo({
        ...newTodo,
        subtasks: [...newTodo.subtasks, { text: subtaskInput.trim() }],
      });
      setSubtaskInput("");
    }
  };

  if (!show) return null;

  return (
    <div
      id="modal-overlay"
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity ${show ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div
          className={`p-5 rounded-lg shadow-lg max-w-[20rem] lg:max-w-md w-full animate-fadeIn ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <h2
            className={`text-2xl font-bold mb-6 tracking-wider ${darkMode ? "text-blue-400 border-b-2 border-blue-500" : "text-blue-600 border-b-2 border-blue-400"
              } pb-3`}
          >
            Edit Todo :-
          </h2>

          {/* Todo Text Input */}
          <input
            type="text"
            value={newTodo.text}
            onChange={(e) => setNewTodo({ ...newTodo, text: e.target.value })}
            className={`border rounded w-full py-2 px-3 mb-4 ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-300"
              }`}
            placeholder="Enter todo text"
            ref={modalRef}
          />

          {/* Description Input */}
          <textarea
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            className={`border rounded w-full py-2 px-3 mb-4 ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-300"
              }`}
            placeholder="Enter description"
          />

          {/* Due Date Picker */}
          <div className="relative">
            <DatePicker
              selected={newTodo.dueDate ? new Date(newTodo.dueDate) : null}
              onChange={(date) =>
                setNewTodo({
                  ...newTodo,
                  dueDate: date ? date.toISOString().split("T")[0] : "",
                })
              }
              dateFormat="dd/MM/yyyy"
              placeholderText="DD/MM/YYYY"
              className={`w-full my-3 px-3 py-2 border rounded focus:outline-none  
                ${newTodo.dueDate
                  ? new Date(newTodo.dueDate) < new Date()
                    ? "text-red-500"
                    : new Date(newTodo.dueDate).toDateString() === new Date().toDateString()
                      ? "text-orange-500"
                      : "text-green-500"
                  : "text-black"
                }  
                ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white border-gray-300"}`}
              wrapperClassName="w-full"
            />
          </div>

          {/* Subtask Input */}
          <textarea
            value={subtaskInput}
            onChange={(e) => setSubtaskInput(e.target.value)}
            onBlur={handleAddSubtask}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddSubtask();
              }
            }}
            className={`border rounded w-full py-2 px-3 mb-4 ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-300"
              }`}
            placeholder="Enter subtasks and press Enter"
          />

          {/* Display Existing Subtasks */}
          <div className="my-4">
            {newTodo.subtasks.map((subtask, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-2 rounded mb-1 ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-gray-200 text-black"
                  }`}
              >
                <span>{subtask.text}</span>
                <button
                  onClick={() =>
                    setNewTodo({
                      ...newTodo,
                      subtasks: newTodo.subtasks.filter((_, i) => i !== index),
                    })
                  }
                  className="text-red-500 text-sm"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>

          {/* Priority & Category Dropdowns */}
          <select
            value={newTodo.tags.priority}
            onChange={(e) =>
              setNewTodo({ ...newTodo, tags: { ...newTodo.tags, priority: e.target.value } })
            }
            className={`border rounded w-full py-2 px-3 mb-4 ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-300"
              }`}
          >
            <option value="">Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select
            value={newTodo.tags.category}
            onChange={(e) =>
              setNewTodo({ ...newTodo, tags: { ...newTodo.tags, category: e.target.value } })
            }
            className={`border rounded w-full py-2 px-3 mb-4 ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-300"
              }`}
          >
            <option value="">Category</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Home">Home</option>
          </select>

          {/* Action Buttons */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className={`px-4 py-2 rounded transition duration-300 mr-2 ${darkMode ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-blue-500 hover:bg-blue-700 text-white"
                }`}
            >
              Save
            </button>
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded transition duration-300 ${darkMode ? "bg-gray-500 hover:bg-gray-600 text-white" : "bg-gray-300 hover:bg-gray-400 text-black"
                }`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
