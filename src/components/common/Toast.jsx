import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toast, closeToast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-indigo-500 shrink-0" />
  };

  const borderColors = {
    success: 'border-emerald-200/80 bg-white shadow-emerald-500/5',
    error: 'border-rose-200/80 bg-white shadow-rose-500/5',
    info: 'border-indigo-200/80 bg-white shadow-indigo-500/5'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in max-w-md w-full px-4 sm:px-0">
      <div className={`flex items-center justify-between gap-3 p-4 rounded-xl border shadow-elevated ${borderColors[toast.type] || borderColors.info}`}>
        <div className="flex items-center gap-3">
          {icons[toast.type] || icons.info}
          <p className="text-sm font-medium text-slate-800 leading-snug">
            {toast.message}
          </p>
        </div>
        <button
          onClick={closeToast}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

