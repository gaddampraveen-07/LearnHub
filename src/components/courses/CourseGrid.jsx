import React from 'react';
import { CourseCard } from './CourseCard';
import { EmptyState } from '../common/EmptyState';
import { Search } from 'lucide-react';

export const CourseGrid = ({ courses, showProgress = false, onClearFilters }) => {
  if (!courses || courses.length === 0) {
    return (
      <EmptyState
        icon={Search}
        title="No courses found"
        description="We couldn't find any courses matching your search criteria. Try adjusting your query or resetting filters."
        actionLabel="Reset Filters"
        actionOnClick={onClearFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {courses.map((course) => (
        <CourseCard 
          key={course.id} 
          course={course} 
          showProgress={showProgress} 
        />
      ))}
    </div>
  );
};

