import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CourseCurriculum } from '../components/courses/CourseCurriculum';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import { 
  Star, 
  Clock, 
  BookOpen, 
  Bookmark, 
  CheckCircle2, 
  PlayCircle, 
  ShieldCheck, 
  Award, 
  Users, 
  ArrowRight,
  Share2
} from 'lucide-react';

export const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { 
    getCourseById, 
    isEnrolled, 
    enrollCourse, 
    isBookmarked, 
    toggleBookmark,
    calculateCourseProgress,
    lastAccessedLessons
  } = useApp();

  const course = getCourseById(courseId);

  if (!course) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Course Not Found</h2>
        <p className="text-slate-500 mb-6">The course you are looking for does not exist or has been removed.</p>
        <Link to="/" className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium">
          Browse Course Catalog
        </Link>
      </div>
    );
  }

  const enrolled = isEnrolled(course.id);
  const bookmarked = isBookmarked(course.id);
  const progress = calculateCourseProgress(course);

  const totalLessons = course.sections?.reduce(
    (acc, sec) => acc + (sec.lessons?.length || 0), 0
  ) || 0;

  const firstLessonId = course.sections?.[0]?.lessons?.[0]?.id;
  const targetLessonId = lastAccessedLessons[course.id] || firstLessonId;

  const handleEnroll = () => {
    const success = enrollCourse(course.id);
    if (success && firstLessonId) {
      // Promptly navigate or stay on page with updated state
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Top Banner / Hero */}
      <section className="bg-slate-900 text-white pt-10 pb-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            {/* Left 2 Cols: Details */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="primary" className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                  {course.category}
                </Badge>
                <Badge variant="neutral" className="bg-slate-800 text-slate-300 border-slate-700">
                  {course.level}
                </Badge>
                {enrolled && (
                  <Badge variant="success" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Enrolled
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                {course.title}
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                {course.description}
              </p>

              {/* Meta stats bar */}
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-1.5 font-bold text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{course.rating}</span>
                  <span className="text-slate-400 font-normal">
                    ({course.reviewsCount.toLocaleString()} ratings)
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-300">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>{course.enrolledCount.toLocaleString()} students</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-300">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{course.duration}</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-300">
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  <span>{totalLessons} lessons</span>
                </div>
              </div>

              {/* Instructor snippet */}
              <div className="flex items-center gap-3 pt-3">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/40"
                />
                <div>
                  <p className="text-xs text-slate-400">Created by</p>
                  <p className="text-sm font-bold text-white">{course.instructor.name}</p>
                </div>
              </div>
            </div>

            {/* Right Col: Card / Video Preview Thumbnail */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800 rounded-3xl p-4 border border-slate-700 shadow-elevated">
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 bg-slate-900">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    {firstLessonId && (
                      <Link
                        to={`/learn/${course.id}/${firstLessonId}`}
                        className="w-14 h-14 rounded-full bg-white/90 text-indigo-600 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                        aria-label="Preview course lessons"
                      >
                        <PlayCircle className="w-8 h-8 fill-current translate-x-0.5" />
                      </Link>
                    )}
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-white font-mono">
                    Free Previews Available
                  </span>
                </div>

                {/* Progress (if enrolled) */}
                {enrolled && (
                  <div className="mb-4 p-3 rounded-xl bg-slate-900/60 border border-slate-700">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-slate-400">Your Progress</span>
                      <span className="text-emerald-400 font-bold">{progress.percentage}%</span>
                    </div>
                    <ProgressBar percentage={progress.percentage} size="xs" />
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="space-y-2.5">
                  {enrolled ? (
                    <Link
                      to={`/learn/${course.id}/${targetLessonId}`}
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md transition-colors"
                    >
                      <span>Continue Learning</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <button
                      onClick={handleEnroll}
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md transition-colors"
                    >
                      <span>Enroll in Course</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => toggleBookmark(course.id)}
                    className={`w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold border transition-colors ${
                      bookmarked
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        : 'bg-slate-700/60 hover:bg-slate-700 text-slate-300 border-slate-600'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                    <span>{bookmarked ? 'Bookmarked' : 'Bookmark Course'}</span>
                  </button>
                </div>

                <div className="pt-4 border-t border-slate-700/80 mt-4 space-y-1.5 text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Full lifetime access to all lessons & code</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Interactive quiz assessments with score tracking</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main 2 Cols: Objectives & Curriculum */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Learning Objectives Box */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-card">
              <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600" />
                <span>What You Will Master in This Course</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.learningObjectives?.map((obj, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 leading-snug">
                      {obj}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Curriculum Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Course Curriculum
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {course.sections?.length || 0} sections • {totalLessons} lectures • {course.duration} total length
                  </p>
                </div>
              </div>

              <CourseCurriculum course={course} isEnrolled={enrolled} />
            </div>

            {/* Instructor Bio Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-card">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                About the Instructor
              </h3>
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-indigo-500/20 shrink-0"
                />
                <div className="space-y-1.5">
                  <h4 className="text-base font-bold text-slate-900">
                    {course.instructor.name}
                  </h4>
                  <p className="text-xs font-semibold text-indigo-600">
                    {course.instructor.role}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                    {course.instructor.bio}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Sticky Side Column: Quick Summary */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-subtle space-y-4">
              <h3 className="font-bold text-slate-900 text-base">This course includes:</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                <li className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  <span>{course.duration} on-demand video</span>
                </li>
                <li className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-indigo-500" />
                  <span>{totalLessons} in-depth articles & code lessons</span>
                </li>
                <li className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-indigo-500" />
                  <span>Self-paced interactive quiz assessments</span>
                </li>
                <li className="flex items-center gap-3">
                  <Award className="w-4 h-4 text-indigo-500" />
                  <span>Certificate of Completion</span>
                </li>
              </ul>

              <div className="pt-4 border-t border-slate-100">
                {enrolled ? (
                  <Link
                    to={`/learn/${course.id}/${targetLessonId}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    Go to Lesson
                  </Link>
                ) : (
                  <button
                    onClick={handleEnroll}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

