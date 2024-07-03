import React from 'react';
import { IoMdAdd } from "react-icons/io";

const AddTodo = ({ todo, setTodo, handleAdd }) => {
  return (
    <div className="add-todos">
      <h1 className='pb-4 text-3xl'>Add ToDo's Here:-</h1>
      <div className="flex flex-col md:flex-row items-center">
        <input
          type="text"
          value={todo.text}
          onChange={(e) => setTodo({ ...todo, text: e.target.value })}
          className="border rounded w-full sm:w-3/6 h-7 px-2 mb-2"
          placeholder="Enter todo..."
        />
        <div className="flex flex-wrap items-center">
          <select
            value={todo.tags.priority}
            onChange={(e) => setTodo({ ...todo, tags: { ...todo.tags, priority: e.target.value } })}
            className="border rounded ml-2 px-2 h-8 md:mb-2 sm:mb-0 sm:mr-2 bg-white m-0"
          >
            <option value="">Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select
            value={todo.tags.category}
            onChange={(e) => setTodo({ ...todo, tags: { ...todo.tags, category: e.target.value } })}
            className="border rounded ml-2 px-2 h-8 md:mb-2 sm:mb-0 sm:mr-2 bg-white m-0"
          >
            <option value="">Category</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Home">Home</option>
          </select>
          <button onClick={handleAdd} className='bg-sky-400 hover:bg-sky-500 rounded-md text-white text-lg p-3 py-1 ml-2 md:mb-2 font-bold'>
            <IoMdAdd />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
