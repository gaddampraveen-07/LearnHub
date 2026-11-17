import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProgressBar } from '../components/common/ProgressBar';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Play, 
  RotateCcw, 
  ArrowRight, 
  Trophy, 
  Sparkles,
  Search
} from 'lucide-react';
import { findLesson } from '../utils/progress';

export const MyLearningPage = () => {
  const { 
    courses, 
    enrolledCourseIds, 
    calculateCourseProgress, 
    lastAccessedLessons,
    resetCourseProgress 
  } = useApp();

  const [activeTab, setActiveTab] = useState('all'); // 'all', 'in-progress', 'completed'
  const [searchQuery, setSearchQuery] = useState('');

  // Get enrolled courses list
  const enrolledCourses = useMemo(() => {
    return courses.filter(course => enrolledCourseIds.includes(course.id));
  }, [courses, enrolledCourseIds]);

  // Derive stats
  const stats = useMemo(() => {
    let completedCoursesCount = 0;
    let totalCompletedLessonsCount = 0;

    enrolledCourses.forEach(c => {
      const p = calculateCourseProgress(c);
      if (p.isCompleted) completedCoursesCount++;
      totalCompletedLessonsCount += p.completedCount;
    });

    return {
      totalEnrolled: enrolledCourses.length,
      completedCourses: completedCoursesCount,
      inProgressCourses: enrolledCourses.length - completedCoursesCount,
      totalCompletedLessons: totalCompletedLessonsCount
    };
  }, [enrolledCourses, calculateCourseProgress]);

  // Filtered by tab and search
  const filteredCourses = useMemo(() => {
    return enrolledCourses.filter(course => {
      const progress = calculateCourseProgress(course);

      let matchesTab = true;
      if (activeTab === 'in-progress') matchesTab = !progress.isCompleted;
      if (activeTab === 'completed') matchesTab = progress.isCompleted;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || course.title.toLowerCase().includes(q) || course.instructor.name.toLowerCase().includes(q);

      return matchesTab && matchesSearch;
    });
  }, [enrolledCourses, activeTab, searchQuery, calculateCourseProgress]);

  if (enrolledCourses.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          icon={BookOpen}
          title="No courses enrolled yet"
          description="You haven't enrolled in any courses. Explore our high-impact catalog to start learning today."
          actionLabel="Explore Course Catalog"
          actionHref="/"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Stats Banner */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-card mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Student Dashboard</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                My Learning
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Track your active courses, lesson milestones, and course certificates.
              </p>
            </div>

            {/* Quick Stats Chips */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <div className="text-center">
                <span className="block text-xl sm:text-2xl font-black text-slate-900">{stats.totalEnrolled}</span>
                <span className="text-[11px] font-semibold text-slate-500">Enrolled</span>
              </div>
              <div className="text-center border-x border-slate-200 px-3">
                <span className="block text-xl sm:text-2xl font-black text-indigo-600">{stats.inProgressCourses}</span>
                <span className="text-[11px] font-semibold text-slate-500">In Progress</span>
              </div>
              <div className="text-center">
                <span className="block text-xl sm:text-2xl font-black text-emerald-600">{stats.completedCourses}</span>
                <span className="text-[11px] font-semibold text-slate-500">Completed</span>
              </div>
            </div>
          </div>

          {/* Tab Filter and Search Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'all'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                All Courses ({enrolledCourses.length})
              </button>

              <button
                onClick={() => setActiveTab('in-progress')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'in-progress'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                In Progress ({stats.inProgressCourses})
              </button>

              <button
                onClick={() => setActiveTab('completed')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'completed'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                Completed ({stats.completedCourses})
              </button>
            </div>

            {/* Quick Filter Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter enrolled..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Enrolled Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center">
            <p className="text-slate-500 text-sm">No courses matching your filter.</p>
            <button
              onClick={() => { setActiveTab('all'); setSearchQuery(''); }}
              className="mt-3 text-indigo-600 font-bold text-xs hover:underline"
            >
              Reset filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const progress = calculateCourseProgress(course);
              const lastId = lastAccessedLessons[course.id] || course.sections?.[0]?.lessons?.[0]?.id;
              const lastLesson = findLesson(course, lastId);

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all flex flex-col overflow-hidden"
                >
                  {/* Thumbnail Banner */}
                  <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-900/80 backdrop-blur-md text-white border border-white/20">
                        {course.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3">
                      {progress.isCompleted ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500 text-white shadow-sm">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>100% Completed</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white shadow-sm">
                          <span>{progress.percentage}% Done</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-slate-900 text-base line-clamp-2 mb-2">
                      {course.title}
                    </h3>

                    <p className="text-xs text-slate-500 mb-4 line-clamp-1">
                      Instructor: <span className="font-semibold text-slate-700">{course.instructor.name}</span>
                    </p>

                    {/* Progress Bar & Counter */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center text-xs font-semibold text-slate-600 mb-1.5">
                        <span>Course Completion</span>
                        <span className={progress.isCompleted ? 'text-emerald-600' : 'text-indigo-600'}>
                          {progress.completedCount} / {progress.totalLessons} lessons
                        </span>
                      </div>
                      <ProgressBar percentage={progress.percentage} size="sm" />
                    </div>

                    {/* Last Accessed Lesson Pill */}
                    {lastLesson && (
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs mb-6">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                          {progress.isCompleted ? 'Final Lesson' : 'Next Up'}
                        </span>
                        <p className="font-semibold text-slate-800 line-clamp-1">
                          {lastLesson.title}
                        </p>
                      </div>
                    )}

                    {/* Bottom Actions */}
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <Link
                        to={`/learn/${course.id}/${lastId}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{progress.percentage > 0 ? 'Continue' : 'Start Learning'}</span>
                      </Link>

                      <button
                        onClick={() => resetCourseProgress(course.id)}
                        className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                        title="Reset progress"
                        aria-label="Reset course progress"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
