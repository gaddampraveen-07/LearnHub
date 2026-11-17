import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { ProgressBar } from '../common/ProgressBar';
import { 
  Star, 
  Clock, 
  BookOpen, 
  Bookmark, 
  CheckCircle2, 
  Play, 
  ArrowRight 
} from 'lucide-react';

export const CourseCard = ({ course, showProgress = false }) => {
  const navigate = useNavigate();
  const { 
    isEnrolled, 
    isBookmarked, 
    toggleBookmark, 
    calculateCourseProgress,
    lastAccessedLessons 
  } = useApp();

  const enrolled = isEnrolled(course.id);
  const bookmarked = isBookmarked(course.id);
  const progress = calculateCourseProgress(course);

  const totalLessons = course.sections?.reduce(
    (acc, sec) => acc + (sec.lessons?.length || 0), 0
  ) || 0;

  const handleBookmarkClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(course.id);
  };

  const levelColorMap = {
    Beginner: 'success',
    Intermediate: 'primary',
    Advanced: 'purple',
    'All Levels': 'sky'
  };

  const lastLessonId = lastAccessedLessons[course.id] || course.sections?.[0]?.lessons?.[0]?.id;

  return (
    <div 
      onClick={() => navigate(`/courses/${course.id}`)}
      className="group relative flex flex-col bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide bg-slate-900/80 backdrop-blur-md text-white border border-white/20">
            {course.category}
          </span>
        </div>

        {/* Bookmark Action Button */}
        <button
          onClick={handleBookmarkClick}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all shadow-sm ${
            bookmarked 
              ? 'bg-amber-500 text-white shadow-amber-500/20' 
              : 'bg-white/85 text-slate-700 hover:bg-white hover:text-indigo-600'
          }`}
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark course"}
          title={bookmarked ? "Bookmarked" : "Bookmark this course"}
        >
          <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
        </button>

        {/* Level Badge at bottom left of thumbnail */}
        <div className="absolute bottom-3 left-3">
          <Badge variant={levelColorMap[course.level] || 'neutral'} size="xs" className="bg-white/90 backdrop-blur-sm shadow-sm">
            {course.level}
          </Badge>
        </div>

        {/* Enrollment status indicator */}
        {enrolled && (
          <div className="absolute bottom-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/90 backdrop-blur-md text-white shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Enrolled</span>
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5">
        
        {/* Course Title */}
        <h3 className="font-bold text-slate-900 text-base line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors mb-2">
          {course.title}
        </h3>

        {/* Short description */}
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
          {course.description}
        </p>

        {/* Instructor */}
        <div className="flex items-center gap-2.5 mb-4">
          <img
            src={course.instructor.avatar}
            alt={course.instructor.name}
            className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
          />
          <span className="text-xs font-medium text-slate-700 truncate">
            {course.instructor.name}
          </span>
        </div>

        {/* Metadata row: Duration, Lessons, Rating */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100 mt-auto">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-slate-600">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1 text-slate-600">
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              {totalLessons} lessons
            </span>
          </div>

          <div className="flex items-center gap-1 font-semibold text-slate-800">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{course.rating}</span>
            <span className="text-[11px] text-slate-400 font-normal">
              ({course.reviewsCount.toLocaleString()})
            </span>
          </div>
        </div>

        {/* Progress Bar (shown on My Learning or if requested) */}
        {showProgress && enrolled && (
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex justify-between items-center text-xs font-medium mb-1.5">
              <span className="text-slate-600">Course Progress</span>
              <span className={`font-bold ${progress.isCompleted ? 'text-emerald-600' : 'text-indigo-600'}`}>
                {progress.percentage}%
              </span>
            </div>
            <ProgressBar percentage={progress.percentage} size="xs" />
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">
                {progress.completedCount} / {progress.totalLessons} completed
              </span>
              <Link
                to={`/learn/${course.id}/${lastLessonId}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 group-hover:translate-x-0.5 transition-transform"
              >
                <span>{progress.percentage > 0 ? 'Resume' : 'Start'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

