import React from "react";
import TodoItem from "./TodoItem";
import "../App.css";

const TodoList = ({ todos, sortByPriority, handleEdit, handleDelete, handleToggleComplete, darkMode, updateTodoTheme, }) => {
  let sortedTodos = [...todos];
  sortedTodos.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  if (sortByPriority) {
    const priorityOrder = { High: 3, Medium: 2, Low: 1 };
    sortedTodos.sort(
      (a, b) =>
        (priorityOrder[b?.tags?.priority] || 0) - (priorityOrder[a?.tags?.priority] || 0)
    );
  }

  return (
    <div className="w-full mt-4">
      <h2 className={`text-3xl transition-all ${darkMode ? "text-black" : "text-white"}`}>
        Your To-Dos List:
      </h2>
      {sortedTodos.length === 0 && (
        <div className="my-5 text-xl text-gray-500 animate-fadeIn">
          No todos to display. Add one to get started!
        </div>
      )}
      {sortedTodos.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleToggleComplete={handleToggleComplete}
          updateTodoTheme={updateTodoTheme}
          darkMode={darkMode}
          className="animate-fadeIn"
        />
      ))}
    </div>
  );
};


export default TodoList;
