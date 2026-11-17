import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CourseGrid } from '../components/courses/CourseGrid';
import { EmptyState } from '../components/common/EmptyState';
import { Bookmark, Sparkles, BookOpen } from 'lucide-react';

export const BookmarksPage = () => {
  const { courses, bookmarkedCourseIds } = useApp();

  const bookmarkedCourses = useMemo(() => {
    return courses.filter(course => bookmarkedCourseIds.includes(course.id));
  }, [courses, bookmarkedCourseIds]);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-card mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200/80 mb-2">
                <Bookmark className="w-3.5 h-3.5 fill-current" />
                <span>Saved Learning</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Course Bookmarks
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                You have {bookmarkedCourses.length} {bookmarkedCourses.length === 1 ? 'course' : 'courses'} saved for future reference.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        {bookmarkedCourses.length === 0 ? (
          <EmptyState
            icon={Bookmark}
            title="No courses bookmarked yet"
            description="Found an interesting course? Click the bookmark icon on any course card to save it here for later."
            actionLabel="Explore Courses"
            actionHref="/"
          />
        ) : (
          <CourseGrid courses={bookmarkedCourses} />
        )}

      </div>
    </div>
  );
};

