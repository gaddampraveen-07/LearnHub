/**
 * Flatten all lessons from a course's sections
 */
export function getAllLessons(course) {
  if (!course || !course.sections) return [];
  return course.sections.flatMap(section => section.lessons || []);
}

/**
 * Find a specific lesson in a course
 */
export function findLesson(course, lessonId) {
  const allLessons = getAllLessons(course);
  return allLessons.find(lesson => lesson.id === lessonId);
}

/**
 * Get next and previous lesson from a course
 */
export function getAdjacentLessons(course, currentLessonId) {
  const allLessons = getAllLessons(course);
  const currentIndex = allLessons.findIndex(lesson => lesson.id === currentLessonId);
  
  return {
    prevLesson: currentIndex > 0 ? allLessons[currentIndex - 1] : null,
    nextLesson: currentIndex >= 0 && currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null,
    currentIndex,
    totalLessons: allLessons.length
  };
}

/**
 * Calculate progress percentage for a course
 */
export function calculateCourseProgress(course, completedLessonsMap) {
  if (!course) return { totalLessons: 0, completedCount: 0, percentage: 0, isCompleted: false };
  
  const allLessons = getAllLessons(course);
  const totalLessons = allLessons.length;
  if (totalLessons === 0) return { totalLessons: 0, completedCount: 0, percentage: 0, isCompleted: false };

  const courseCompletedLessonIds = completedLessonsMap[course.id] || [];
  
  // Count how many of this course's lessons are completed
  const completedCount = allLessons.filter(lesson => 
    courseCompletedLessonIds.includes(lesson.id)
  ).length;

  const percentage = Math.round((completedCount / totalLessons) * 100);
  const isCompleted = completedCount === totalLessons && totalLessons > 0;

  return {
    totalLessons,
    completedCount,
    percentage,
    isCompleted
  };
}

