import React from 'react';
import { MdOutlineEdit, MdDelete } from "react-icons/md";

const TodoItem = ({ item, index, handleEdit, handleDelete, handleToggleComplete }) => {
  return (
    <div className="todo flex flex-col md:flex-row mt-5 p-4 bg-white rounded shadow justify-between">
      <div className="flex items-center w-full sm:w-1/2">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => handleToggleComplete(index)}
          className="mr-2 w-5 h-5"
        />
        <div className={`flex-1 break-words max-w-full ${item.completed ? 'line-through' : ''}`}>
          {item.text}
        </div>
      </div>

      <div className='flex'>
        <div className="tags mt-2 flex-wrap">
          {item.tags.priority && (
            <span className={`tag priority ${item.tags.priority === 'High' ? 'bg-red-500 text-white' : item.tags.priority === 'Medium' ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'} rounded px-2 py-1`}>
              {item.tags.priority}
            </span>
          )}
          {item.tags.category && (
            <span className={`tag category ${item.tags.category === 'Work' ? 'bg-blue-500 text-white' : item.tags.category === 'Personal' ? 'bg-purple-500 text-white' : 'bg-pink-500 text-white'} rounded px-2 py-1 ml-2`}>
              {item.tags.category}
            </span>
          )}
        </div>
        <div className="mt-2 flex items-start">
          <button onClick={() => handleEdit(index)} className='bg-sky-400 hover:bg-sky-500 rounded-md text-white text-lg p-3 py-1 ml-2 font-bold'>
            <MdOutlineEdit />
          </button>
          <button onClick={() => handleDelete(index)} className='bg-sky-400 hover:bg-sky-500 rounded-md text-white text-lg p-3 py-1 ml-2 font-bold'>
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
