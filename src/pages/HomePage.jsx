import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { categories } from '../data/courses';
import { CourseGrid } from '../components/courses/CourseGrid';
import { CourseCard } from '../components/courses/CourseCard';
import { CourseSearch } from '../components/courses/CourseSearch';
import { CategoryFilter } from '../components/courses/CategoryFilter';
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight,
  Flame
} from 'lucide-react';

export const HomePage = () => {
  const { courses } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category') || 'All Categories';
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectCategory = (category) => {
    if (category === 'All Categories') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  // Filter courses based on search query and category
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory = 
        selectedCategory === 'All Categories' || course.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.instructor.name.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q) ||
        course.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [courses, selectedCategory, searchQuery]);

  // Featured courses: top 3 by rating and enrollment
  const featuredCourses = useMemo(() => {
    return [...courses].sort((a, b) => b.rating - a.rating).slice(0, 3);
  }, [courses]);

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 pt-12 pb-20 border-b border-slate-200/80">
        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            
            {/* Pill tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200/80 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Engineering & Design Curriculum</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
              Learn What Matters. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                Taught by True Masters.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
              Skip the generic tutorials. Master modern production software engineering, UI/UX systems, and machine learning with project-based courses and hands-on assessments.
            </p>

            {/* Main Search Input */}
            <div className="flex justify-center mb-10">
              <CourseSearch
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeholder="Search 12+ premium tracks, instructors, or topics..."
              />
            </div>

            {/* Platform Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200/60 max-w-2xl mx-auto">
              <div className="text-center">
                <span className="block text-2xl font-black text-slate-900">12+</span>
                <span className="text-xs font-semibold text-slate-500">Curated Courses</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-black text-indigo-600">99.4%</span>
                <span className="text-xs font-semibold text-slate-500">Student Satisfaction</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-black text-slate-900">45k+</span>
                <span className="text-xs font-semibold text-slate-500">Lessons Completed</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-black text-emerald-600">100%</span>
                <span className="text-xs font-semibold text-slate-500">Free Client State</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      {!searchQuery && selectedCategory === 'All Categories' && (
        <section className="py-12 border-b border-slate-200/80 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <Flame className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Highest Rated Courses
                  </h2>
                  <p className="text-xs text-slate-500">Hand-picked bestsellers with top student reviews</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Catalog Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Explore All Courses
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Showing {filteredCourses.length} of {courses.length} courses
                {selectedCategory !== 'All Categories' && ` in "${selectedCategory}"`}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>

            {/* Quick Filter Reset */}
            {(searchQuery || selectedCategory !== 'All Categories') && (
              <button
                onClick={handleClearFilters}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors self-start md:self-auto"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="mb-8">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />
          </div>

          {/* Course Grid */}
          <CourseGrid
            courses={filteredCourses}
            onClearFilters={handleClearFilters}
          />

        </div>
      </section>

    </div>
  );
};

