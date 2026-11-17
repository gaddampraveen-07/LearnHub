import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  ChevronDown, 
  ChevronUp, 
  PlayCircle, 
  FileText, 
  HelpCircle, 
  Lock, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const CourseCurriculum = ({ course, isEnrolled = false }) => {
  const { isLessonCompleted } = useApp();
  // Keep all sections expanded by default for easy browsing
  const [expandedSections, setExpandedSections] = useState(() => {
    const init = {};
    course.sections?.forEach((s, idx) => {
      init[s.id || idx] = true;
    });
    return init;
  });

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const sections = course.sections || [];

  return (
    <div className="space-y-4">
      {sections.map((section, sIndex) => {
        const isExpanded = !!expandedSections[section.id || sIndex];
        const sectionLessons = section.lessons || [];

        return (
          <div 
            key={section.id || sIndex}
            className="border border-slate-200 rounded-2xl bg-white overflow-hidden transition-all shadow-subtle"
          >
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.id || sIndex)}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-slate-50/70 hover:bg-slate-50 transition-colors border-b border-slate-100"
            >
              <div className="flex-1 pr-4">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-1">
                  Section {sIndex + 1}
                </span>
                <h4 className="font-bold text-slate-900 text-base sm:text-lg">
                  {section.title}
                </h4>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
                  {sectionLessons.length} {sectionLessons.length === 1 ? 'lesson' : 'lessons'}
                </span>
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>
            </button>

            {/* Section Lessons List */}
            {isExpanded && (
              <div className="divide-y divide-slate-100">
                {sectionLessons.map((lesson, lIndex) => {
                  const completed = isLessonCompleted(course.id, lesson.id);
                  const canAccess = isEnrolled || lesson.isPreview;

                  const LessonItemWrapper = canAccess ? Link : 'div';
                  const wrapperProps = canAccess 
                    ? { to: `/learn/${course.id}/${lesson.id}` } 
                    : {};

                  return (
                    <LessonItemWrapper
                      key={lesson.id}
                      {...wrapperProps}
                      className={`flex items-center justify-between p-4 transition-colors ${
                        canAccess 
                          ? 'hover:bg-indigo-50/40 cursor-pointer group' 
                          : 'opacity-70 cursor-not-allowed bg-slate-50/30'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 flex-1 pr-4">
                        {/* Status Icon */}
                        {completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        ) : lesson.quizId ? (
                          <HelpCircle className="w-5 h-5 text-purple-500 shrink-0" />
                        ) : lesson.videoUrl ? (
                          <PlayCircle className={`w-5 h-5 shrink-0 ${canAccess ? 'text-indigo-600 group-hover:scale-110 transition-transform' : 'text-slate-400'}`} />
                        ) : (
                          <FileText className="w-5 h-5 text-slate-400 shrink-0" />
                        )}

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-semibold text-slate-400">
                              {sIndex + 1}.{lIndex + 1}
                            </span>
                            <span className={`text-sm font-medium ${completed ? 'text-slate-600' : 'text-slate-900 group-hover:text-indigo-600 transition-colors'}`}>
                              {lesson.title}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Meta Badges */}
                      <div className="flex items-center gap-2.5 shrink-0">
                        {lesson.isPreview && !isEnrolled && (
                          <Badge variant="primary" size="xs">
                            Free Preview
                          </Badge>
                        )}
                        {lesson.quizId && (
                          <Badge variant="purple" size="xs">
                            Quiz
                          </Badge>
                        )}
                        <span className="flex items-center gap-1 text-xs text-slate-500 font-mono">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {lesson.duration}
                        </span>
                        {!canAccess && (
                          <Lock className="w-4 h-4 text-slate-400 ml-1" />
                        )}
                      </div>
                    </LessonItemWrapper>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

