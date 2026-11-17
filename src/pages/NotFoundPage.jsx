import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, BookOpen, Home, AlertCircle } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-slate-50">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-card text-center">
        
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mx-auto mb-6 shadow-inner">
          <Compass className="w-8 h-8 stroke-[1.8]" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-1">
          404 Error
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
          Page Not Found
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-8">
          The page or course lesson you are trying to visit doesn't exist, has been moved, or is temporarily unavailable.
        </p>

        <div className="space-y-3">
          <Link
            to="/"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-colors shadow-sm shadow-indigo-600/20"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home Catalog</span>
          </Link>

          <Link
            to="/my-learning"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>Go to My Learning</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

