import React, { useState, useRef } from 'react';
import { MdOutlineEdit, MdDelete, MdColorLens, MdClose } from "react-icons/md";
import '../App.css';

const TodoItem = ({ item, handleEdit, handleDelete, handleToggleComplete, darkMode, updateTodoTheme }) => {
  const [showEditTooltip, setShowEditTooltip] = useState(false);
  const [showDeleteTooltip, setShowDeleteTooltip] = useState(false);
  const [showThemeTooltip, setShowThemeTooltip] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const editTimer = useRef(null);
  const deleteTimer = useRef(null);
  const themeTimer = useRef(null);
  // Determine theme based on item and darkMode
  const theme = item.theme || (darkMode ? "bg-gray-900 text-white" : "bg-white text-black");

  // Available themes
  const themes = {
    black: "bg-gray-900 text-white",
    white: "bg-white text-black",
    gradientTexture: "bg-[linear-gradient(135deg,#1e3c72,#2a5298)] text-white bg-fixed",
    galaxy: "bg-[linear-gradient(135deg,#667eea,#764ba2,#6b8dd6)] text-white bg-fixed",
    deepSpace: "bg-[linear-gradient(120deg,#1a1a2e,#16213e,#0f3460)] text-white bg-fixed",
    darkGlow: "bg-[linear-gradient(120deg,#232526,#414345)] text-white bg-fixed",
    sunset: "bg-[linear-gradient(120deg,#ff9a9e,#fad0c4)] text-black bg-fixed",
  };

  const handleMouseEnterEdit = () => {
    editTimer.current = setTimeout(() => setShowEditTooltip(true), 1000);
  };

  const handleMouseLeaveEdit = () => {
    clearTimeout(editTimer.current);
    setShowEditTooltip(false);
  };

  const handleEditClick = () => {
    handleEdit(item.id);
    clearTimeout(editTimer.current);
    setShowEditTooltip(false);
  };

  const handleMouseEnterDelete = () => {
    deleteTimer.current = setTimeout(() => setShowDeleteTooltip(true), 1000);
  };

  const handleMouseLeaveDelete = () => {
    clearTimeout(deleteTimer.current);
    setShowDeleteTooltip(false);
  };

  const handleDeleteClick = () => {
    handleDelete(item.id);
    clearTimeout(deleteTimer.current);
    setShowDeleteTooltip(false);
  };

  const handleMouseEnterTheme = () => {
    themeTimer.current = setTimeout(() => setShowThemeTooltip(true), 1000);
  };

  const handleMouseLeaveTheme = () => {
    clearTimeout(themeTimer.current);
    setShowThemeTooltip(false);
  };

  return (
    <div className={`todo flex flex-col sm:flex-row items-start mt-5 p-4 rounded justify-between ${theme && theme !== themes.black && theme !== themes.white ? theme : theme} ${theme === themes.black ? "shadow-white" : theme === themes.white ? "shadow-black" : ""} `} >

      {/* Left Section: Todo Details */}
      <div className="flex flex-wrap items-start w-full sm:w-1/2">
        <div className={`flex flex-1 p-3 rounded-lg shadow-sm ${item.completed ? 'opacity-50' : ''}`}>
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => handleToggleComplete(item.id)}
            className="mr-3 w-5 h-5 flex-shrink-0 mt-1"
          />

          <div className="w-full">
            <div className="flex items-start justify-between">
              <span className="text-lg font-semibold text-inherit whitespace-normal sm:whitespace-nowrap">
                {item.text}
              </span>
              {item?.dueDate ? (
                <span
                  className={`text-[10px] sm:text-xs font-medium px-1 py-1 sm:px-2 sm:py-1 rounded 
                    ${new Date(item.dueDate) < new Date()
                      ? "text-red-600 bg-red-100"
                      : new Date(item.dueDate).toDateString() === new Date().toDateString()
                        ? "text-orange-600 bg-orange-100"
                        : "text-green-600 bg-green-100"
                    } whitespace-nowrap`}
                >
                  ⏳ {item.dueDate}
                </span>
              ) : (
                <span className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded">
                  No deadline yet
                </span>
              )}
            </div>

            <div
              className={`p-1 my-3 rounded-lg shadow-inner w-full ${item?.description ? "bg-gray-100" : "bg-gray-50 border border-dashed border-gray-300 flex items-center"}`}
            >
              {item?.description ? (
                <p className="text-sm text-gray-700">{item.description}</p>
              ) : (
                <span className="text-gray-400 italic">
                  📝 Add a description for better clarity
                </span>
              )}
            </div>

            <div
              className={`p-1 border-l-4 border-blue-500 rounded-lg shadow-inner w-full ${item.subtasks && item.subtasks.length > 0
                ? "bg-gray-100"
                : "bg-gray-50 border border-dashed border-gray-300 flex items-center"}`}
            >
              {item.subtasks && item.subtasks.length > 0 ? (
                <div className="w-full">
                  <p className="text-sm font-semibold text-blue-600 mb-1">Subtasks:</p>
                  <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
                    {item.subtasks.map((sub, i) => (
                      <li key={i} className="pl-2">{sub.text}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <span className="text-gray-400 italic">📌 No subtasks yet, add some!</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Tags & Actions */}
      <div className="flex items-center">
        {/* Tags */}
        <div className="mx-2">
          {item?.tags?.priority && (
            <span
              className={`tag priority ${item.tags.priority === 'High'
                  ? 'bg-red-500 text-white'
                  : item.tags.priority === 'Medium'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-green-500 text-white'
                } rounded px-2 py-1`}
            >
              {item.tags.priority}
            </span>
          )}
          {item?.tags?.category && (
            <span
              className={`tag category ${item.tags.category === 'Work'
                  ? 'bg-blue-500 text-white'
                  : item.tags.category === 'Personal'
                    ? 'bg-purple-500 text-white'
                    : 'bg-pink-500 text-white'
                } rounded px-2 py-1 ml-2`}
            >
              {item.tags.category}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-start">
          {/* Theme Button */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnterTheme}
            onMouseLeave={handleMouseLeaveTheme}
          >
            <button
              onClick={() => setShowThemeModal(true)}
              className="bg-sky-300 hover:bg-sky-500 rounded text-white text-xl w-7 h-7 md:w-10 md:h-10 flex items-center justify-center ml-2"
            >
              <MdColorLens />
            </button>
            {showThemeTooltip && (
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 shadow-lg transition-opacity duration-300">
                Theme
              </span>
            )}
          </div>

          {/* Edit Button */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnterEdit}
            onMouseLeave={handleMouseLeaveEdit}
          >
            <button
              onClick={handleEditClick}
              aria-label="Edit Todo"
              className="bg-sky-400 hover:bg-sky-500 rounded text-white text-xl w-7 h-7 md:w-10 md:h-10 flex items-center justify-center ml-2 font-bold"
            >
              <MdOutlineEdit />
            </button>
            {showEditTooltip && (
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 shadow-lg transition-opacity duration-300">
                Edit
              </span>
            )}
          </div>

          {/* Delete Button */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnterDelete}
            onMouseLeave={handleMouseLeaveDelete}
          >
            <button
              onClick={handleDeleteClick}
              aria-label="Delete Todo"
              className="bg-red-500 hover:bg-red-700 rounded text-white text-xl w-7 h-7 md:w-10 md:h-10 flex items-center justify-center ml-2 font-bold"
            >
              <MdDelete />
            </button>
            {showDeleteTooltip && (
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 shadow-lg transition-opacity duration-300">
                Delete
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Theme Modal */}
      {showThemeModal && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowThemeModal(false)}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className={`p-6 rounded-lg shadow-lg w-[18rem] sm:w-[22rem] md:w-96 relative ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
                }`}
            >
              <h2 className="text-lg font-semibold mb-4">Select Theme :</h2>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {Object.entries(themes).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => {
                      updateTodoTheme(item.id, value);
                      setShowThemeModal(false);
                    }}
                    className={`px-4 py-2 rounded box-shadow transition ${value}`}
                  >
                    {key}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowThemeModal(false)}
                className="absolute top-2 right-3 text-xl"
              >
                <MdClose />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
