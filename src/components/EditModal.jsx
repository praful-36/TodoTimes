import React, { useState, useEffect } from 'react';

const EditModal = ({ show, onClose, onSave, currentTodo }) => {
  const [newTodo, setNewTodo] = useState({ text: '', tags: { priority: '', category: '' } });

  useEffect(() => {
    if (currentTodo) {
      setNewTodo({
        text: currentTodo.text,
        tags: { ...currentTodo.tags },
      });
    }
  }, [currentTodo]);

  const handleSave = () => {
    onSave(newTodo);
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-auto ${show ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg p-8 max-w-md w-full Modal">
          <h2 className="text-lg font-semibold mb-4">Edit Todo</h2>
          <input
            type="text"
            value={newTodo.text}
            onChange={(e) => setNewTodo({ ...newTodo, text: e.target.value })}
            className="border rounded w-full py-2 px-3 mb-4"
            placeholder="Enter todo text"
          />
          <select
            value={newTodo.tags.priority}
            onChange={(e) => setNewTodo({ ...newTodo, tags: { ...newTodo.tags, priority: e.target.value } })}
            className="border rounded w-full py-2 px-3 mb-4"
          >
            <option value="">Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select
            value={newTodo.tags.category}
            onChange={(e) => setNewTodo({ ...newTodo, tags: { ...newTodo.tags, category: e.target.value } })}
            className="border rounded w-full py-2 px-3 mb-4"
          >
            <option value="">Category</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Home">Home</option>
          </select>
          <div className="flex justify-end">
            <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Save</button>
            <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
