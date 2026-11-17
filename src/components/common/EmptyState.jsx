import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Sparkles } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = BookOpen,
  title = "Nothing to display yet",
  description = "Explore our course catalog to find your next learning goal.",
  actionLabel = "Explore Courses",
  actionHref = "/",
  actionOnClick
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 max-w-md mx-auto rounded-2xl bg-white border border-slate-200/80 shadow-subtle my-8">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 mb-5 shadow-inner">
        <Icon className="w-8 h-8 stroke-[1.75]" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-6">
        {description}
      </p>

      {actionOnClick ? (
        <button
          onClick={actionOnClick}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-600/20 active:scale-[0.98]"
        >
          <Sparkles className="w-4 h-4" />
          {actionLabel}
        </button>
      ) : actionHref ? (
        <Link
          to={actionHref}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-600/20 active:scale-[0.98]"
        >
          <Sparkles className="w-4 h-4" />
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
};

