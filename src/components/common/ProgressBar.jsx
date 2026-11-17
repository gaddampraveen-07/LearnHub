import React from 'react';

export const ProgressBar = ({ 
  percentage = 0, 
  size = 'md', 
  showLabel = false, 
  className = '',
  color = 'indigo'
}) => {
  const safePercent = Math.min(100, Math.max(0, Math.round(percentage)));

  const heightClasses = {
    xs: 'h-1.5',
    sm: 'h-2',
    md: 'h-2.5',
    lg: 'h-3.5'
  };

  const colorClasses = {
    indigo: 'bg-indigo-600',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500'
  };

  // If 100%, switch to emerald automatically
  const barColor = safePercent === 100 ? 'bg-emerald-500' : (colorClasses[color] || 'bg-indigo-600');

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-medium text-slate-600 mb-1.5">
          <span>Progress</span>
          <span className="font-semibold text-slate-900">{safePercent}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-200/80 rounded-full overflow-hidden ${heightClasses[size] || heightClasses.md}`}>
        <div
          className={`${barColor} h-full rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${safePercent}%` }}
        />
      </div>
    </div>
  );
};

