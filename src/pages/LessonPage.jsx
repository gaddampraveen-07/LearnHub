import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LessonSidebar } from '../components/learning/LessonSidebar';
import { LessonContent } from '../components/learning/LessonContent';
import { getAdjacentLessons, findLesson } from '../utils/progress';
import { Menu, BookOpen, AlertCircle, ArrowLeft } from 'lucide-react';

export const LessonPage = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { 
    getCourseById, 
    recordLessonAccess, 
    isEnrolled, 
    enrollCourse 
  } = useApp();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const course = getCourseById(courseId);
  const currentLesson = course ? findLesson(course, lessonId) : null;

  // Auto enroll if user navigated directly into a lesson so progress can be tracked
  useEffect(() => {
    if (course && !isEnrolled(course.id)) {
      enrollCourse(course.id);
    }
  }, [course, isEnrolled, enrollCourse]);

  // Record access to this lesson
  useEffect(() => {
    if (course && currentLesson) {
      recordLessonAccess(course.id, currentLesson.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [course, currentLesson, recordLessonAccess]);

  if (!course) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-900 mb-2">Course Not Found</h2>
        <p className="text-xs text-slate-500 mb-6">We couldn't locate the course you requested.</p>
        <Link to="/" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold">
          Return to Catalog
        </Link>
      </div>
    );
  }

  if (!currentLesson) {
    // If lesson id doesn't match, fallback to first lesson of course
    const firstLesson = course.sections?.[0]?.lessons?.[0];
    if (firstLesson) {
      return (
        <div className="max-w-md mx-auto py-20 px-4 text-center">
          <p className="text-slate-600 mb-4">Lesson not found. Redirecting to first lesson...</p>
          <Link
            to={`/learn/${course.id}/${firstLesson.id}`}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold inline-block"
          >
            Start from Beginning
          </Link>
        </div>
      );
    }
  }

  const { prevLesson, nextLesson } = getAdjacentLessons(course, currentLesson.id);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* Mobile Top Sub-Header */}
      <div className="lg:hidden sticky top-16 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-subtle">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors"
        >
          <Menu className="w-4 h-4 text-indigo-600" />
          <span>Course Curriculum</span>
        </button>

        <span className="text-xs font-bold text-slate-500 truncate max-w-[200px]">
          {course.title}
        </span>
      </div>

      {/* Main Learning Workspace */}
      <div className="flex-1 flex w-full">
        {/* Sidebar Component */}
        <LessonSidebar
          course={course}
          currentLessonId={currentLesson.id}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Lesson View Area */}
        <main className="flex-1 min-w-0 bg-slate-50">
          <LessonContent
            course={course}
            currentLesson={currentLesson}
            prevLesson={prevLesson}
            nextLesson={nextLesson}
          />
        </main>
      </div>

    </div>
  );
};

