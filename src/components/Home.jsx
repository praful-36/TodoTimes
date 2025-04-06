import React, { useEffect, useState } from 'react';
import AddTodo from './AddTodo';
import EditModal from './EditModal';
import ConfirmModal from './ConfirmModal';
import FilterControls from './FilterControls';
import TodoList from './TodoList';
import { FiSearch, FiX } from 'react-icons/fi';
import { IoMdAdd } from 'react-icons/io';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

const Home = ({ darkMode }) => {

  const [todo, setTodo] = useState({ text: '', description: '', dueDate: '', subtasks: [], tags: { priority: '', category: '' } });
  const [currentTodo, setCurrentTodo] = useState({ text: '', description: '', dueDate: '', tags: { priority: '', category: '' }, subtasks: [] });
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sortByPriority, setSortByPriority] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // Utility Functions
  const saveToLs = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleClearSearch = () => {
    setSearchQuery('');
    setShowSearch(false);
  };
  const clearSearch = () => setSearchQuery('');

  // -----------------------------
  // Load & Filter Todos
  // -----------------------------
  useEffect(() => {
    try {
      const todostring = localStorage.getItem('todos');
      if (todostring) {
        const todos = JSON.parse(todostring);
        setTodos(todos);
        setFilteredTodos(todos);
      }
    } catch (error) {
      console.error("Failed to load todos from localData", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Update filteredTodos whenever todos, filter, sortByPriority, or searchQuery changes
    const updatedFilteredTodos = todos.filter(todo => {
      if (filter !== 'all' && ((filter === 'active' && todo.completed) || (filter === 'completed' && !todo.completed))) {
        return false;
      }
      return (
        todo.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (todo.tags.priority && todo.tags.priority.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (todo.tags.category && todo.tags.category.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });

    if (sortByPriority) {
      updatedFilteredTodos.sort((a, b) => {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return (priorityOrder[a.tags.priority] || 4) - (priorityOrder[b.tags.priority] || 4);
      });
    }
    setFilteredTodos(updatedFilteredTodos);
  }, [todos, filter, sortByPriority, searchQuery]);

  // Add Todo Functionality
  const handleAdd = () => {
    if (!todo.text.trim()) {
      toast.error('Todo cannot be added empty!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
      return;
    }
    if (todos.some(t => t.text === todo.text)) {
      toast.error('Task already exists!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
      return;
    }

    const newTodo = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(), // <-- added createdAt
      ...todo,
      completed: false,
      theme: darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
    };

    const updatedTodos = [newTodo, ...todos];
    setTodos(updatedTodos);
    setTodo({ text: '', description: '', dueDate: '', subtasks: [], tags: { priority: '', category: '' } });
    saveToLs(updatedTodos);
    setShowModal(false);
    toast.success('Task added successfully!', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark',
    });
  };

  // Edit Todo Functionality
  const handleEdit = (id) => {
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) return;
    const todo = todos[index];
    setEditIndex(index);
    setCurrentTodo({
      text: todo.text || '',
      description: todo.description || '',
      dueDate: todo.dueDate || '',
      tags: {
        priority: todo.tags?.priority || '',
        category: todo.tags?.category || '',
      },
      subtasks: Array.isArray(todo.subtasks) ? todo.subtasks : [],
    });
    setIsEditModalOpen(true);
    console.log("Selected Todo for Editing:", todo);
  };

  const handleSaveEdit = (updatedTodo) => {
    const updatedTodos = [...todos];
    updatedTodos[editIndex] = {
      ...updatedTodos[editIndex], // Preserve the existing id
      ...updatedTodo
    };
    setTodos(updatedTodos);
    setIsEditModalOpen(false);
    saveToLs(updatedTodos);
  };

  // Delete Todo Functionality
  const handleDelete = (id) => {
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) return;
    setDeleteIndex(index);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    const updatedTodos = todos.filter((_, i) => i !== deleteIndex);
    setTodos(updatedTodos);
    setIsConfirmModalOpen(false);
    setDeleteIndex(null);
    saveToLs(updatedTodos);
    toast.success('Task has been deleted!', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark',
    });
  };

  // Toggle Complete Functionality
  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveToLs(updatedTodos);
  };

  // Clear Completed Todos
  const handleClearCompleted = () => {
    // Check if there are any completed todos
    const completedTodos = todos.filter(todo => todo.completed);
    if (completedTodos.length === 0) {
      toast.info('There are no completed todos to clear!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmClearCompleted = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);
    setTodos(updatedTodos);
    saveToLs(updatedTodos);
    setShowConfirmModal(false);
  };

  // Update Todo Theme Functionality
  const themes = {
    black: "bg-gray-900 text-white",
    white: "bg-white text-black",
    gradientTexture: "bg-[linear-gradient(135deg,#1e3c72,#2a5298)] text-white bg-fixed",
    galaxy: "bg-[linear-gradient(135deg,#667eea,#764ba2,#6b8dd6)] text-white bg-fixed",
    deepSpace: "bg-[linear-gradient(120deg,#1a1a2e,#16213e,#0f3460)] text-white bg-fixed",
    darkGlow: "bg-[linear-gradient(120deg,#232526,#414345)] text-white bg-fixed",
    sunset: "bg-[linear-gradient(120deg,#ff9a9e,#fad0c4)] text-black bg-fixed",
  };

  const updateTodoTheme = (id, newTheme) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        if (todo.theme === newTheme) {
          const themeName = newTheme === themes.white ? "White" : newTheme === themes.black ? "Black" : "This";
          toast.info(`${themeName} theme is already applied!`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
          return todo;
        }
        return { ...todo, theme: newTheme };
      }
      return todo;
    });
    setTodos(updatedTodos);
    saveToLs(updatedTodos);
  };

  // Loading State
  if (loading) return <div className="text-center text-xl font-semibold my-10">Loading...</div>;

  return (
    <div
      className={`container w-[95%] sm:w-full max-w-[90rem] mx-auto my-10 px-5 py-5 rounded-xl animate-fadeIn transition-all duration-300 min-h-screen
      ${darkMode ? "bg-gray-200 text-black" : "bg-gray-900"}`}
    >
      {/* Mobile Layout */}
      <div className="flex flex-col sm:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-[8px] rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300"
              aria-label="Toggle search"
            >
              <FiSearch size={20} />
            </button>
            <div className={`flex items-center ml-2 w-full overflow-hidden transition-all duration-300 ${showSearch ? 'max-h-14 opacity-100' : 'max-h-0 opacity-0'}`}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border rounded px-3 h-9 w-full focus:outline-none transition-all duration-300"
                placeholder="Search todos..."
                aria-label="Search todos"
              />
              <button
                onClick={handleClearSearch}
                className="ml-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300"
                aria-label="Clear search"
              >
                <FiX size={20} />
              </button>
            </div>
          </div>
          <button
            onClick={handleOpenModal}
            className="w-[8rem] ml-1 px-[5px] py-[6px] bg-sky-300 text-white text-sm rounded hover:bg-sky-500 flex items-center justify-center gap-1"
          >
            <IoMdAdd /> Add Todo
          </button>
        </div>
        <div className="mt-4">
          <FilterControls
            filter={filter}
            setFilter={setFilter}
            sortByPriority={sortByPriority}
            setSortByPriority={setSortByPriority}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            clearSearch={clearSearch}
            handleClearCompleted={handleClearCompleted}
            totalCount={todos.length}
            completedCount={todos.filter(todo => todo.completed).length}
          />
        </div>
      </div>

      {/* PC Layout */}
      <div className="hidden sm:flex items-center justify-between">
        <div className="flex">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300"
            aria-label="Toggle search"
          >
            <FiSearch size={20} />
          </button>
          <div className={`flex items-center ml-2 w-full overflow-hidden transition-all duration-300 ${showSearch ? 'max-h-14 opacity-100' : 'max-h-0 opacity-0'}`}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded px-3 h-9 w-full focus:outline-none transition-all duration-300"
              placeholder="Search todos..."
              aria-label="Search todos"
            />
            <button
              onClick={handleClearSearch}
              className="ml-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300"
              aria-label="Clear search"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>
        <FilterControls
          filter={filter}
          setFilter={setFilter}
          sortByPriority={sortByPriority}
          setSortByPriority={setSortByPriority}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          clearSearch={clearSearch}
          handleClearCompleted={handleClearCompleted}
          totalCount={todos.length} // This should update as todos change
          completedCount={todos.filter(todo => todo.completed).length}
        />
        <button
          onClick={handleOpenModal}
          className="px-4 py-2 bg-sky-300 text-white rounded hover:bg-sky-500 flex items-center gap-1"
        >
          <IoMdAdd /> Add Todo
        </button>
      </div>

      <AddTodo
        todo={todo}
        setTodo={setTodo}
        handleAdd={handleAdd}
        showModal={showModal}
        onClose={handleCloseModal}
        darkMode={darkMode}
      />

      <TodoList
        todos={filteredTodos}
        sortByPriority={sortByPriority} // <-- passing the sortByPriority state
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleToggleComplete={handleToggleComplete}
        darkMode={darkMode}
        updateTodoTheme={updateTodoTheme}
      />

      <EditModal
        show={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
        currentTodo={currentTodo}
        darkMode={darkMode}
      />

      <ConfirmModal
        show={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this to-do?"
        darkMode={darkMode}
      />

      <ConfirmModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmClearCompleted}
        message="Are you sure you want to clear all completed todos?"
        darkMode={darkMode}
      />
      <ToastContainer />
    </div>
  );
};

export default Home;
