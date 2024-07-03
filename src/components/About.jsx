import React from 'react';

const About = () => {
  return (
    <div className="about-container w-80 md:w-1/2 mx-7 sm:mx-auto my-4 p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-md">
      <h1 className="about-header text-3xl font-bold mb-4">About To-Do List App</h1>
      <p className="about-paragraph mb-4">
        Welcome to our To-Do List App! This application is designed to help you manage your tasks efficiently. Whether you need to keep track of daily chores or important projects, our app has got you covered.
      </p>
      <h2 className="about-sub-header text-2xl font-semibold mb-3">Features</h2>
      <ul className="about-list list-disc list-inside mb-4">
        <li className="about-list-item mb-2">Add new to-dos to keep track of tasks.</li>
        <li className="about-list-item mb-2">Edit existing to-dos to update task details.</li>
        <li className="about-list-item mb-2">Delete to-dos that are no longer needed.</li>
        <li className="about-list-item mb-2">Save your to-dos to ensure your tasks are never lost.</li>
        <li className="about-list-item mb-2">Search to-dos to quickly find specific tasks.</li>
        <li className="about-list-item mb-2">Add tags like priority level (high, medium, low) and category (personal, work, home) for better organization.</li>
        <li className="about-list-item mb-2">Check off completed to-dos to mark them as done.</li>
        <li className="about-list-item mb-2">Toggle dark mode for a comfortable viewing experience in low light.</li>
      </ul>
      <h2 className="about-sub-header text-2xl font-semibold mb-3">Additional Features</h2>
      <ul className="about-list list-disc list-inside mb-4">
        <li className="about-list-item mb-2">Show all todos.</li>
        <li className="about-list-item mb-2">Show active todos.</li>
        <li className="about-list-item mb-2">Sort todos by priority level.</li>
        <li className="about-list-item mb-2">Show completed todos.</li>
        <li className="about-list-item mb-2">Clear completed todos.</li>
      </ul>
      <p className="about-paragraph">
        Our app is user-friendly and provides a clean interface to ensure you can focus on what matters most. We hope our To-Do List App helps you stay organized and productive!
      </p>
    </div>
  );
};

export default About;
