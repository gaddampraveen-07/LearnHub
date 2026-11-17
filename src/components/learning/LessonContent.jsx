import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { VideoPlayer } from './VideoPlayer';
import { CourseCompletionModal } from './CourseCompletionModal';
import { Badge } from '../common/Badge';
import { 
  CheckCircle2, 
  Circle, 
  ArrowLeft, 
  ArrowRight, 
  HelpCircle, 
  FileText,
  Clock,
  Sparkles,
  Share2
} from 'lucide-react';

export const LessonContent = ({ course, currentLesson, prevLesson, nextLesson }) => {
  const navigate = useNavigate();
  const { 
    isLessonCompleted, 
    toggleLessonCompletion, 
    recordLessonAccess,
    calculateCourseProgress,
    showToast
  } = useApp();

  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const completed = isLessonCompleted(course.id, currentLesson.id);

  const handleToggleComplete = () => {
    toggleLessonCompletion(course.id, currentLesson.id);
    
    // Check if toggling to complete makes the course 100% complete
    const wasCompleted = completed;
    if (!wasCompleted) {
      const progress = calculateCourseProgress(course);
      // If this was the last remaining incomplete lesson:
      if (progress.completedCount + 1 >= progress.totalLessons) {
        setShowCompletionModal(true);
      } else {
        showToast('Lesson marked as completed!', 'success');
      }
    }
  };

  const handleNext = () => {
    if (nextLesson) {
      recordLessonAccess(course.id, nextLesson.id);
      navigate(`/learn/${course.id}/${nextLesson.id}`);
    }
  };

  const handlePrev = () => {
    if (prevLesson) {
      recordLessonAccess(course.id, prevLesson.id);
      navigate(`/learn/${course.id}/${prevLesson.id}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 px-4 sm:px-6">
      
      {/* Top Breadcrumb & Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span>{course.title}</span>
          <span>•</span>
          <span className="flex items-center gap-1 text-slate-700">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {currentLesson.duration}
          </span>
        </div>

        {/* Mark as Complete quick button */}
        <button
          onClick={handleToggleComplete}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
            completed
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          {completed ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Completed</span>
            </>
          ) : (
            <>
              <Circle className="w-4 h-4 text-slate-400" />
              <span>Mark as Complete</span>
            </>
          )}
        </button>
      </div>

      {/* Main Lesson Title */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-6">
        {currentLesson.title}
      </h1>

      {/* Video Stream or Interactive Banner */}
      <div className="mb-8">
        <VideoPlayer 
          videoUrl={currentLesson.videoUrl} 
          title={currentLesson.title} 
          duration={currentLesson.duration} 
        />
      </div>

      {/* Quiz Banner Card if Lesson links to a Quiz */}
      {currentLesson.quizId && (
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-elevated flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <span className="text-xs font-bold tracking-wider uppercase text-purple-200">
                Interactive Assessment
              </span>
              <h3 className="text-lg font-bold text-white">
                Test Your Knowledge for this Section
              </h3>
              <p className="text-xs text-purple-100 mt-0.5">
                4 comprehensive questions with detailed explanations.
              </p>
            </div>
          </div>

          <Link
            to={`/courses/${course.id}/quiz/${currentLesson.quizId}`}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-indigo-700 font-bold text-sm hover:bg-purple-50 transition-colors shadow-md text-center shrink-0"
          >
            Launch Quiz
          </Link>
        </div>
      )}

      {/* Lesson Text Body */}
      <article className="prose prose-slate max-w-none mb-12">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-subtle space-y-4">
          {currentLesson.content ? (
            <div className="text-slate-700 leading-relaxed space-y-4 text-sm sm:text-base">
              {currentLesson.content.split('\n\n').map((block, idx) => {
                if (block.startsWith('### ')) {
                  return <h2 key={idx} className="text-xl font-bold text-slate-900 mt-4 mb-2">{block.replace('### ', '')}</h2>;
                }
                if (block.startsWith('#### ')) {
                  return <h3 key={idx} className="text-base font-bold text-slate-800 mt-3 mb-1">{block.replace('#### ', '')}</h3>;
                }
                if (block.startsWith('> ')) {
                  return (
                    <blockquote key={idx} className="border-l-4 border-indigo-500 bg-indigo-50/50 p-4 rounded-r-xl text-slate-800 italic my-3 text-sm">
                      {block.replace('> ', '')}
                    </blockquote>
                  );
                }
                if (block.startsWith('```')) {
                  const cleaned = block.replace(/```[a-z]*\n?/g, '').trim();
                  return (
                    <div key={idx} className="my-4">
                      <pre>
                        <code>{cleaned}</code>
                      </pre>
                    </div>
                  );
                }
                return <p key={idx} className="text-slate-700">{block}</p>;
              })}
            </div>
          ) : (
            <p className="text-slate-500 italic">No additional notes provided for this lesson.</p>
          )}
        </div>
      </article>

      {/* Bottom Sticky-like Action Controls */}
      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Previous Lesson Button */}
        <button
          onClick={handlePrev}
          disabled={!prevLesson}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border transition-all ${
            prevLesson
              ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-subtle'
              : 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border-transparent'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Lesson</span>
        </button>

        {/* Center Completion Button */}
        <button
          onClick={handleToggleComplete}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-sm ${
            completed
              ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/20'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-600/20'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{completed ? 'Completed (Undo)' : 'Mark as Complete'}</span>
        </button>

        {/* Next Lesson Button */}
        <button
          onClick={handleNext}
          disabled={!nextLesson}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border transition-all ${
            nextLesson
              ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-subtle'
              : 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border-transparent'
          }`}
        >
          <span>Next Lesson</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Completion Modal */}
      <CourseCompletionModal
        course={course}
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
      />
    </div>
  );
};

