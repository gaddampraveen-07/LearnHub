import React from 'react';

export const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
      {categories.map((cat) => {
        const isActive = selectedCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
              isActive
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/25 ring-2 ring-indigo-600/20'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};

