import React from 'react';

const FilterControls = ({ filter, setFilter, sortByPriority, setSortByPriority, searchQuery, setSearchQuery, clearSearch, handleClearCompleted }) => {
  return (
    <div className="filters mt-5">
      <div className="search pb-5">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded px-2 h-8 w-full sm:w-1/2 mb-2"
          placeholder="Search todos..."
        />
        <button onClick={clearSearch} className='bg-gray-200 hover:bg-gray-300 rounded-md p-1 ml-2 filters-btn'>
          Clear Search
        </button>
      </div>

      <div className="flex flex-wrap">
        <button onClick={() => setFilter('all')} className={`filters-btn bg-gray-200 hover:bg-gray-300 rounded-md p-1 mb-2 ml-2 ${filter === 'all' ? 'bg-gray-400' : ''}`}>
          All Todos
        </button>
        <button onClick={() => setSortByPriority(!sortByPriority)} className={`filters-btn bg-gray-200 hover:bg-gray-300 rounded-md p-1 mb-2 ml-2 ${sortByPriority ? 'bg-gray-400' : ''}`}>
          Sort by Priority
        </button>
        <button onClick={() => setFilter('active')} className={`filters-btn bg-gray-200 hover:bg-gray-300 rounded-md p-1 mb-2 ml-2 ${filter === 'active' ? 'bg-gray-400' : ''}`}>
          Active
        </button>
        <button onClick={() => setFilter('completed')} className={`filters-btn bg-gray-200 hover:bg-gray-300 rounded-md p-1 mb-2 ml-2 ${filter === 'completed' ? 'bg-gray-400' : ''}`}>
          Completed
        </button>
        <button onClick={handleClearCompleted} className='filters-btn bg-gray-200 hover:bg-gray-300 rounded-md p-1 mb-2 ml-2'>
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default FilterControls;
