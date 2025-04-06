import React from 'react';

const About = ({ darkMode }) => {
  return (
    <div
      className={`sm:mx-5 mx-2 my-10 px-5 py-5 rounded-lg shadow-md border transition-all duration-300
      ${darkMode ? "bg-gray-200 text-black border-gray-200" : "bg-gray-900 text-white border-gray-700"}`}
    >
      <h1 className="text-3xl font-bold mb-4">About To-Do List App</h1>
      <p className="text-base leading-relaxed mb-4">
        Welcome to our To-Do List App! This application is designed to help you manage your tasks efficiently.
        Whether you need to keep track of daily chores or important projects, our app has got you covered.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Core Functionality</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li className="hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded-md transition">
          <strong>Add Tasks:</strong> Create new to-dos with details such as task name, description, due date, subtasks, and tags for priority and category.
        </li>
        <li className="hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded-md transition">
          <strong>Edit & Delete:</strong> Easily update or remove tasks using modals that confirm your actions.
        </li>
        <li className="hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded-md transition">
          <strong>Mark as Completed:</strong> Check off tasks to indicate completion and clear them when needed.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Enhanced User Experience</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li className="hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded-md transition">
          <strong>Responsive Design:</strong> Optimized for both mobile and desktop, ensuring a smooth experience on any device.
        </li>
        <li className="hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded-md transition">
          <strong>Dark Mode & Theming:</strong> Toggle dark mode and customize individual task themes with options like gradient textures, galaxy, deep space, dark glow, and sunset.
        </li>
        <li className="hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded-md transition">
          <strong>Real-Time Feedback:</strong> Get instant toast notifications for adding, editing, or deleting tasks.
        </li>
        <li className="hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded-md transition">
          <strong>Local Storage Persistence:</strong> Your tasks and settings are saved locally, so they remain even after closing or refreshing the browser.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Filtering & Sorting</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li className="hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded-md transition">
          Show all, active, or completed todos with easy-to-use filter controls.
        </li>
        <li className="hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded-md transition">
          Sort todos by priority level to focus on the most critical tasks.
        </li>
        <li className="hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded-md transition">
          Search functionality to quickly find specific tasks by text, priority, or category.
        </li>
        <li className="hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded-md transition">
          Option to clear completed tasks with confirmation prompts.
        </li>
      </ul>

      <p className="text-base leading-relaxed mt-4">
        Our app is built with a modular React architecture, featuring components for navigation, task management, and interactive modals.
        With a focus on responsive design and accessibility (including keyboard controls), we aim to provide you with a seamless and engaging experience.
        We hope our To-Do List App helps you stay organized and productive!
      </p>
    </div>
  );
};

export default About;
