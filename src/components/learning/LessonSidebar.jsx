import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ProgressBar } from '../common/ProgressBar';
import { Badge } from '../common/Badge';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Circle, 
  PlayCircle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';

export const LessonSidebar = ({ course, currentLessonId, isOpen, onClose }) => {
  const { isLessonCompleted, calculateCourseProgress } = useApp();
  const progress = calculateCourseProgress(course);

  // Keep all sections expanded by default
  const [expandedSections, setExpandedSections] = useState(() => {
    const init = {};
    course.sections?.forEach((s, idx) => {
      init[s.id || idx] = true;
    });
    return init;
  });

  const toggleSection = (id) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside className={`
        fixed lg:sticky top-0 lg:top-16 z-40 lg:z-10
        h-full lg:h-[calc(100vh-4rem)] w-80 sm:w-96
        bg-white border-r border-slate-200
        flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Top Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/70">
          <Link 
            to={`/courses/${course.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors mb-2.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Course Details</span>
          </Link>

          <h2 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug mb-3">
            {course.title}
          </h2>

          {/* Course Progress Summary */}
          <div className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-subtle">
            <div className="flex items-center justify-between text-xs font-medium text-slate-600 mb-1.5">
              <span>Your Progress</span>
              <span className={`font-bold ${progress.isCompleted ? 'text-emerald-600' : 'text-indigo-600'}`}>
                {progress.percentage}%
              </span>
            </div>
            <ProgressBar percentage={progress.percentage} size="xs" />
            <div className="flex justify-between items-center text-[11px] text-slate-400 mt-2 font-medium">
              <span>{progress.completedCount} of {progress.totalLessons} completed</span>
              {progress.isCompleted && (
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Done!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Curriculum List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {course.sections?.map((section, sIdx) => {
            const isExpanded = !!expandedSections[section.id || sIdx];
            const sectionLessons = section.lessons || [];

            return (
              <div key={section.id || sIdx} className="bg-white">
                <button
                  onClick={() => toggleSection(section.id || sIdx)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-slate-50/50 hover:bg-slate-100/60 text-left transition-colors"
                >
                  <div className="pr-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Section {sIdx + 1}
                    </span>
                    <h3 className="text-xs font-bold text-slate-800 line-clamp-1">
                      {section.title}
                    </h3>
                  </div>
                  <div className="text-slate-400 shrink-0">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="py-1">
                    {sectionLessons.map((lesson, lIdx) => {
                      const isActive = lesson.id === currentLessonId;
                      const isCompleted = isLessonCompleted(course.id, lesson.id);

                      return (
                        <Link
                          key={lesson.id}
                          to={`/learn/${course.id}/${lesson.id}`}
                          onClick={() => {
                            if (window.innerWidth < 1024) onClose();
                          }}
                          className={`flex items-start gap-3 px-4 py-3 text-xs transition-all relative ${
                            isActive
                              ? 'bg-indigo-50/90 text-indigo-900 font-semibold border-l-4 border-indigo-600'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {/* Completion / Type Icon */}
                          <div className="mt-0.5 shrink-0">
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-50" />
                            ) : lesson.quizId ? (
                              <HelpCircle className="w-4 h-4 text-purple-500" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-300" />
                            )}
                          </div>

                          {/* Lesson Title & Duration */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className={`line-clamp-2 ${isActive ? 'text-indigo-900' : 'text-slate-800'}`}>
                                {lesson.title}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400 font-normal">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {lesson.duration}
                              </span>
                              {lesson.quizId && (
                                <span className="text-purple-600 font-medium">Quiz</span>
                              )}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
};

