import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Trophy, CheckCircle, ArrowRight, X, Sparkles, BookOpen } from 'lucide-react';

export const CourseCompletionModal = ({ course, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback if canvas is restricted
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-elevated border border-slate-100 text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Trophy */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-500 mb-6 shadow-inner">
          <Trophy className="w-10 h-10 stroke-[1.8]" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Course 100% Completed</span>
        </div>

        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
          Outstanding Achievement!
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto mb-6">
          You've completed every single lesson in <span className="font-semibold text-slate-900">{course.title}</span>. Your dedication to continuous learning is inspiring!
        </p>

        {/* Instructor congrats pill */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-center gap-3 text-left mb-6">
          <img
            src={course.instructor.avatar}
            alt={course.instructor.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20"
          />
          <div>
            <p className="text-xs font-bold text-slate-800">{course.instructor.name}</p>
            <p className="text-[11px] text-slate-500">"Congratulations on mastering these skills! Keep building."</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/my-learning"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-600/25"
          >
            <BookOpen className="w-4 h-4" />
            <span>My Learning</span>
          </Link>

          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-200 transition-colors"
          >
            Review Lessons
          </button>
        </div>
      </div>
    </div>
  );
};

