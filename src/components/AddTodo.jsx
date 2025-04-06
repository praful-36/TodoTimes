import React, { useEffect, useState, useRef } from 'react';
import { IoMdAdd } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddTodo = ({ todo, setTodo, handleAdd, showModal, onClose, darkMode }) => {

  const [visible, setVisible] = useState(false);
  const [subtaskText, setSubtaskText] = useState("");
  const modalRef = useRef(null);
  const focusedOnce = useRef(false);

  useEffect(() => {
    if (showModal) {
      setVisible(true);
      setTimeout(() => {
        if (!focusedOnce.current && modalRef.current) {
          modalRef.current.focus();
          focusedOnce.current = true;
        }
      }, 10);

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      setVisible(false);
      focusedOnce.current = false; // reset when modal closes
    }
  }, [showModal, onClose]);

  // Do not render if modal is not visible
  if (!showModal) return null;

  const handleAddSubtask = () => {
    if (!subtaskText.trim()) {
      toast.error("Subtask cannot be added empty!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }
    setTodo({
      ...todo,
      subtasks: [...(todo.subtasks || []), { text: subtaskText, completed: false }],
    });
    setSubtaskText("");
  };

  const handleToggleSubtask = (index) => {
    const updatedSubtasks = todo.subtasks.map((sub, i) =>
      i === index ? { ...sub, completed: !sub.completed } : sub
    );
    setTodo({ ...todo, subtasks: updatedSubtasks });
  };

  const handleRemoveSubtask = (index) => {
    const updatedSubtasks = todo.subtasks.filter((_, i) => i !== index);
    setTodo({ ...todo, subtasks: updatedSubtasks });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`p-6 rounded-lg shadow-lg w-full max-w-[20rem] lg:max-w-md relative transition-all duration-300 transform 
          ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} 
          ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        <h1 className='pb-4 text-3xl'>Add Task</h1>

        {/* Task Name Input */}
        <input
          type="text"
          value={todo.text}
          onChange={(e) => setTodo({ ...todo, text: e.target.value })}
          className={`border rounded w-full h-10 px-2 mb-3 
            ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black"}`}
          placeholder="Enter task name..."
          ref={modalRef}
        />

        {/* Task Description */}
        <textarea
          value={todo.description || ""}
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          className={`border rounded w-full h-20 px-2 
            ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
          placeholder="Enter task description..."
        />

        {/* Due Date Picker */}
        <div className="relative">
          <DatePicker
            selected={todo.dueDate ? new Date(todo.dueDate) : null}
            onChange={(date) => setTodo({ ...todo, dueDate: date ? date.toISOString().split('T')[0] : "" })}
            dateFormat="dd/MM/yyyy"
            placeholderText="DD/MM/YYY"
            className={`w-full my-3 px-3 py-2 border rounded focus:outline-none  
              ${todo.dueDate && new Date(todo.dueDate) < new Date() ? "text-red-500" :
                todo.dueDate && new Date(todo.dueDate).toDateString() === new Date().toDateString() ? "text-orange-500" :
                  "text-green-500"}  
              ${darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300"}`}
            wrapperClassName="w-full"
          />
        </div>

        {/* Priority & Category Dropdown */}
        <div className="flex gap-2 mb-4">
          <select
            value={todo.tags.priority}
            onChange={(e) => setTodo({ ...todo, tags: { ...todo.tags, priority: e.target.value } })}
            className={`border rounded px-3 py-2 w-1/2 ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black"}`}
          >
            <option value="">Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select
            value={todo.tags.category}
            onChange={(e) => setTodo({ ...todo, tags: { ...todo.tags, category: e.target.value } })}
            className={`border rounded px-3 py-2 w-1/2 ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black"}`}
          >
            <option value="">Category</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Home">Home</option>
          </select>
        </div>

        {/* Subtasks Section */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Subtasks:</h3>
          <div className="flex mb-2">
            <input
              type="text"
              value={subtaskText}
              onChange={(e) => setSubtaskText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddSubtask()}
              className={`border rounded w-full px-2 py-1 ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black"}`}
              placeholder="Add a subtask..."
            />
            <button
              onClick={handleAddSubtask}
              className="ml-2 bg-sky-300 text-white px-3 py-1 rounded"
            >
              Enter
            </button>
          </div>
          <ul>
            {todo.subtasks && todo.subtasks.map((sub, index) => (
              <li
                key={index}
                className={`flex items-center justify-between px-2 py-1 rounded mb-1 ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"}`}
              >
                <span
                  onClick={() => handleToggleSubtask(index)}
                  className={`cursor-pointer ${sub.completed ? 'line-through text-gray-400' : ''}`}
                >
                  {sub.text}
                </span>
                <button
                  onClick={() => handleRemoveSubtask(index)}
                  className="text-red-500 text-sm"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1"
          >
            <IoMdAdd /> Add
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
