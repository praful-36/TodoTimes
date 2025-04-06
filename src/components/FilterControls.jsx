import React from 'react';

const FilterControls = ({ filter, setFilter, setSortByPriority, handleClearCompleted, totalCount }) => {

  const baseButtonClass =
    'filters-btn bg-gray-200 hover:bg-gray-300 rounded-md cursor-pointer transition duration-300 text-md sm:text-sm px-[5px] sm:px-5 py-[5px] sm:py-2 sm:mx-0';
  const activeClass = 'bg-gray-400';

  return (
    <div className="filters">
      <div className="flex flex-col items-center sm:flex-row sm:flex-wrap sm:gap-3 space-y-3 sm:space-y-0">
        <div className="flex justify-center sm:justify-normal gap-3 w-full sm:w-auto">
          {[
            { label: 'All Todos', type: 'all' },
            { label: 'Sort by Priority', type: 'sortByPriority' },
            { label: 'Active', type: 'active' },
          ].map(({ label, type }, index) => (
            <button
              key={index}
              onClick={() =>
                type === 'sortByPriority'
                  ? setSortByPriority((prev) => !prev)
                  : setFilter(type)
              }
              className={`${baseButtonClass} ${filter === type ? activeClass : ''}`}
              aria-label={`Show ${label.toLowerCase()} todos`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setFilter('completed')}
            className={`${baseButtonClass} ${filter === 'completed' ? activeClass : ''}`}
            aria-label="Show completed todos"
          >
            Completed
          </button>
          <button
            onClick={handleClearCompleted}
            className={`${baseButtonClass} ${totalCount === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Clear completed todos"
            aria-disabled={totalCount === 0 ? "true" : "false"}
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
