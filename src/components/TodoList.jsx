import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, handleEdit, handleDelete, handleToggleComplete }) => {
  return (
    <div className="w-full mt-4">
      <h2 className='text-3xl'>Your To-Dos List:-</h2>
      {todos.length === 0 && <div className='my-5 text-xl'>No todos to display</div>}
      {todos.map((item, index) => (
        <TodoItem
          key={index}
          item={item}
          index={index}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleToggleComplete={handleToggleComplete}
        />
      ))}
    </div>
  );
};

export default TodoList;
