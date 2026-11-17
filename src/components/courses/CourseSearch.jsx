import React from 'react';
import { Search, X } from 'lucide-react';

export const CourseSearch = ({ searchQuery, setSearchQuery, placeholder = "Search courses by title, topic, or instructor..." }) => {
  return (
    <div className="relative w-full max-w-xl">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
        <Search className="w-5 h-5" />
      </div>
      
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-3.5 bg-white rounded-2xl border border-slate-200 text-slate-900 placeholder-slate-400 text-sm shadow-subtle focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
      />

      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
          aria-label="Clear search"
        >
          <div className="p-1 rounded-full hover:bg-slate-100 transition-colors">
            <X className="w-4 h-4" />
          </div>
        </button>
      )}
    </div>
  );
};

