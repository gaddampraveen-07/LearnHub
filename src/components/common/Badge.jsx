import React from 'react';

export const Badge = ({ children, variant = 'neutral', size = 'sm', className = '' }) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full transition-colors';
  
  const sizeClasses = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-0.5 text-xs font-semibold tracking-wide',
    md: 'px-3 py-1 text-sm font-medium'
  };

  const variantClasses = {
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200/80',
    primary: 'bg-indigo-50 text-indigo-700 border border-indigo-200/80',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200/80',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200/80',
    purple: 'bg-purple-50 text-purple-700 border border-purple-200/80',
    sky: 'bg-sky-50 text-sky-700 border border-sky-200/80'
  };

  return (
    <span className={`${baseClasses} ${sizeClasses[size] || sizeClasses.sm} ${variantClasses[variant] || variantClasses.neutral} ${className}`}>
      {children}
    </span>
  );
};

