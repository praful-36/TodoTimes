import React, { useEffect, useState } from 'react';
import EditModal from './EditModal';
import ConfirmModal from './ConfirmModal';
import AddTodo from './AddTodo';
import FilterControls from './FilterControls';
import TodoList from './TodoList';

const Home = () => {
  const [todo, setTodo] = useState({ text: '', tags: { priority: '', category: '' } });
  const [todos, setTodos] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortByPriority, setSortByPriority] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    const todostring = localStorage.getItem('todos');
    if (todostring) {
      const todos = JSON.parse(todostring);
      setTodos(todos);
      setFilteredTodos(todos); // Initialize filteredTodos with all todos
    }
  }, []);

  useEffect(() => {
    // Update filteredTodos whenever todos or searchQuery changes
    const updatedFilteredTodos = todos.filter(todo => {
      if (filter !== 'all' && ((filter === 'active' && todo.completed) || (filter === 'completed' && !todo.completed))) {
        return false;
      }
      return todo.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (todo.tags.priority && todo.tags.priority.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (todo.tags.category && todo.tags.category.toLowerCase().includes(searchQuery.toLowerCase()));
    });

    if (sortByPriority) {
      updatedFilteredTodos.sort((a, b) => {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return (priorityOrder[a.tags.priority] || 4) - (priorityOrder[b.tags.priority] || 4);
      });
    }

    setFilteredTodos(updatedFilteredTodos);
  }, [todos, filter, sortByPriority, searchQuery]);

  const saveToLs = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const handleAdd = () => {
    if (todo.text.trim()) {
      const updatedTodos = [...todos, { ...todo, completed: false }];
      setTodos(updatedTodos);
      setTodo({ text: '', tags: { priority: '', category: '' } });
      saveToLs(updatedTodos);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setCurrentTodo({
      text: todos[index].text,
      tags: { ...todos[index].tags },
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    const updatedTodos = todos.filter((_, i) => i !== deleteIndex);
    setTodos(updatedTodos);
    setIsConfirmModalOpen(false);
    setDeleteIndex(null);
    saveToLs(updatedTodos);
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
    saveToLs(updatedTodos);
  };

  const handleSaveEdit = (updatedTodo) => {
    const updatedTodos = [...todos];
    updatedTodos[editIndex] = updatedTodo;
    setTodos(updatedTodos);
    setIsEditModalOpen(false);
    saveToLs(updatedTodos);
  };

  const handleClearCompleted = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);
    setTodos(updatedTodos);
    saveToLs(updatedTodos);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="container w-80 mx-auto sm:mx-auto my-10 px-5 py-5 bg-gray-200 rounded-xl md:w-1/2 sm:w-full" style={{ boxShadow: "6px 6px 13px white inset, 5px 5px 12px #101010" }}>
      <AddTodo todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <FilterControls filter={filter} setFilter={setFilter} sortByPriority={sortByPriority} setSortByPriority={setSortByPriority} searchQuery={searchQuery} setSearchQuery={setSearchQuery} clearSearch={clearSearch} handleClearCompleted={handleClearCompleted} />
      <TodoList todos={filteredTodos} handleEdit={handleEdit} handleDelete={handleDelete} handleToggleComplete={handleToggleComplete} />

      <EditModal
        show={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
        currentTodo={currentTodo}
      />

      <ConfirmModal
        show={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this to-do?"
      />
    </div>
  );
};

export default Home;
