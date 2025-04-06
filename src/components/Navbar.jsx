import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);

  // Utility Functions
  const getTodos = () => {
    const todosStr = localStorage.getItem("todos");
    if (!todosStr) {
      alert("No tasks available for download!");
      return null;
    }
    return JSON.parse(todosStr);
  };

  const triggerDownload = (blob, fileName) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setIsModalOpen(false);
  };

  // Modal Handlers
  const openModal = () => {
    const todosStr = localStorage.getItem("todos");
    if (!todosStr || JSON.parse(todosStr).length === 0) {
      toast.error("No tasks available for download!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }
    setIsModalOpen(true);
  };

  // Download Functions
  const downloadTasksCSV = () => {
    const todos = getTodos();
    if (!todos) return;

    const headers = ["Task", "Subtasks", "Description", "Date"];
    const csvRows = [headers.join(",")];

    todos.forEach((todo) => {
      const escapeText = (text) => `"${(text || "").replace(/"/g, '""')}"`;
      const taskText = escapeText(todo.text);
      const subtasks = todo.subtasks?.length
        ? escapeText(todo.subtasks.map((sub) => sub.text).join("; "))
        : '""';
      const description = escapeText(todo.description);
      const dueDate = escapeText(todo.dueDate);
      csvRows.push([taskText, subtasks, description, dueDate].join(","));
    });

    const csvString = "\uFEFF" + csvRows.join("\r\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    triggerDownload(blob, "tasks.csv");
  };

  const downloadTasksJSON = () => {
    const todosStr = localStorage.getItem("todos");
    if (!todosStr) return;
    const blob = new Blob([todosStr], { type: "application/json" });
    triggerDownload(blob, "tasks.json");
  };

  const downloadTasksTXT = () => {
    const todos = getTodos();
    if (!todos) return;

    let txtContent = "Tasks List\n\n";
    todos.forEach((todo, index) => {
      txtContent += `${index + 1}. Task: ${todo.text}\n`;
      if (todo.subtasks?.length) {
        txtContent += `   Subtasks: ${todo.subtasks.map((sub) => sub.text).join(", ")}\n`;
      }
      txtContent += `   Description: ${todo.description || "N/A"}\n`;
      txtContent += `   Due Date: ${todo.dueDate || "N/A"}\n\n`;
    });

    const blob = new Blob([txtContent], { type: "text/plain;charset=utf-8;" });
    triggerDownload(blob, "tasks.txt");
  };

  const downloadTasksPDF = () => {
    const todos = getTodos();
    if (!todos) return;

    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Tasks List", 10, 10);
    doc.setFont("helvetica", "normal");

    let y = 20;
    todos.forEach((todo, index) => {
      doc.text(`${index + 1}. Task: ${todo.text}`, 10, y);
      y += 7;
      if (todo.subtasks?.length) {
        doc.text(`   Subtasks: ${todo.subtasks.map((sub) => sub.text).join(", ")}`, 10, y);
        y += 5;
      }
      doc.text(`   Description: ${todo.description || "N/A"}`, 10, y);
      y += 5;
      doc.text(`   Due Date: ${todo.dueDate || "N/A"}`, 10, y);
      y += 10;
    });

    doc.save("tasks.pdf");
  };

  return (
    <nav
      className={`flex justify-around py-2 items-center transition-all duration-300 ${darkMode ? "bg-gray-200 text-black" : "bg-gray-900 text-white"
        }`}
    >
      <div className="logo">
        <span className="text-sky-300 text-lg sm:text-2xl font-bold">TodoTimes</span>
      </div>

      <div className="right flex items-center gap-3">
        <ul className="flex gap-[5px] items-center text-sm sm:text-base mx-2">
          <li className="cursor-pointer hover:text-sky-300 transition">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item m-1 hover:text-sky-300 transition">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex items-center">
        <button
          onClick={toggleDarkMode}
          className="relative mx-2 sm:mx-4 w-12 h-6 sm:w-16 sm:h-8 bg-sky-300 rounded-full flex items-center p-1 transition-all"
        >
          <span
            className={`absolute left-0.5 top-0.5 w-5 h-5 sm:w-7 sm:h-7 bg-white rounded-full shadow-md transform transition-transform duration-300 ${darkMode ? "translate-x-6 sm:translate-x-8" : ""
              }`}
          ></span>
          <MdDarkMode
            className={`absolute left-1 sm:left-2 text-sky-300 text-sm sm:text-lg transition-opacity duration-500 ${darkMode ? "opacity-0" : "opacity-100"
              }`}
          />
          <CiLight
            className={`absolute right-1 sm:right-2 text-[#1a202c] text-sm sm:text-lg transition-opacity duration-500 ${darkMode ? "opacity-100" : "opacity-0"
              }`}
          />
        </button>

        <button
          onClick={openModal}
          className={`px-2 py-0.5 sm:px-3 sm:py-1 text-sm sm:text-base text-white rounded transition ${darkMode ? "bg-[#232c3c] hover:bg-[#1a202c]" : "bg-sky-300 hover:bg-sky-500"
            }`}
          title="Download Tasks"
        >
          Download
        </button>
      </div>

      {isModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeModal}></div>}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className={`p-6 rounded-lg shadow-lg w-[18rem] lg:w-96 relative ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
              }`}
          >
            <h2 className="text-lg font-semibold mb-4">Download Tasklist :-</h2>
            <p>Select a format:</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <button onClick={downloadTasksCSV} className="px-4 py-2 bg-blue-500 text-white box-shadow rounded hover:bg-blue-600 transition">
                CSV
              </button>
              <button onClick={downloadTasksJSON} className="px-4 py-2 bg-orange-500 text-white box-shadow rounded hover:bg-orange-600 transition">
                JSON
              </button>
              <button onClick={downloadTasksTXT} className="px-4 py-2 bg-purple-500 text-white box-shadow rounded hover:bg-purple-600 transition">
                TXT
              </button>
              <button onClick={downloadTasksPDF} className="px-4 py-2 bg-red-500 text-white box-shadow rounded hover:bg-red-600 transition">
                PDF
              </button>
            </div>
            <button onClick={closeModal} className="absolute top-2 right-3 text-xl">
              ✖
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
