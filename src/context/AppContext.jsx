import React, { createContext, useContext, useState, useEffect } from 'react';
import { sampleCourses } from '../data/courses';
import { sampleQuizzes } from '../data/quizzes';
import { calculateCourseProgress, getAllLessons } from '../utils/progress';

const AppContext = createContext();

const STORAGE_KEYS = {
  ENROLLED: 'learnhub_enrolled_courses_v1',
  BOOKMARKS: 'learnhub_bookmarks_v1',
  COMPLETED_LESSONS: 'learnhub_completed_lessons_v1',
  LAST_ACCESSED: 'learnhub_last_accessed_v1',
  QUIZ_RESULTS: 'learnhub_quiz_results_v1'
};

export const AppProvider = ({ children }) => {
  // 1. Enrolled Courses
  const [enrolledCourseIds, setEnrolledCourseIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ENROLLED);
      // Default to 1 enrolled course so My Learning is immediately engaging on first visit
      return saved ? JSON.parse(saved) : ['course-react-fullstack'];
    } catch {
      return ['course-react-fullstack'];
    }
  });

  // 2. Bookmarked Courses
  const [bookmarkedCourseIds, setBookmarkedCourseIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return saved ? JSON.parse(saved) : ['course-uiux-pro', 'course-system-design'];
    } catch {
      return ['course-uiux-pro', 'course-system-design'];
    }
  });

  // 3. Completed Lessons: { [courseId]: [lessonId1, lessonId2] }
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
      return saved ? JSON.parse(saved) : {
        'course-react-fullstack': ['les-react-101']
      };
    } catch {
      return { 'course-react-fullstack': ['les-react-101'] };
    }
  });

  // 4. Last Accessed Lesson per Course: { [courseId]: lessonId }
  const [lastAccessedLessons, setLastAccessedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LAST_ACCESSED);
      return saved ? JSON.parse(saved) : {
        'course-react-fullstack': 'les-react-102'
      };
    } catch {
      return { 'course-react-fullstack': 'les-react-102' };
    }
  });

  // 5. Quiz Results: { [quizId]: { score, total, percentage, passed, breakdown, completedAt } }
  const [quizResults, setQuizResults] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Toast / notification system
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
    }, 3500);
  };

  const closeToast = () => setToast(null);

  // Sync state changes with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ENROLLED, JSON.stringify(enrolledCourseIds));
    } catch (e) {
      console.warn("Storage sync failed:", e);
    }
  }, [enrolledCourseIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarkedCourseIds));
    } catch (e) {
      console.warn("Storage sync failed:", e);
    }
  }, [bookmarkedCourseIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(completedLessons));
    } catch (e) {
      console.warn("Storage sync failed:", e);
    }
  }, [completedLessons]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LAST_ACCESSED, JSON.stringify(lastAccessedLessons));
    } catch (e) {
      console.warn("Storage sync failed:", e);
    }
  }, [lastAccessedLessons]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.QUIZ_RESULTS, JSON.stringify(quizResults));
    } catch (e) {
      console.warn("Storage sync failed:", e);
    }
  }, [quizResults]);

  // Actions
  const enrollCourse = (courseId) => {
    if (enrolledCourseIds.includes(courseId)) {
      showToast('You are already enrolled in this course!', 'info');
      return false;
    }
    setEnrolledCourseIds(prev => [...prev, courseId]);
    
    // Set initial last accessed to first lesson of this course
    const course = sampleCourses.find(c => c.id === courseId);
    if (course) {
      const allLessons = getAllLessons(course);
      if (allLessons.length > 0) {
        setLastAccessedLessons(prev => ({
          ...prev,
          [courseId]: allLessons[0].id
        }));
      }
    }
    
    showToast('Successfully enrolled! Happy learning.', 'success');
    return true;
  };

  const isEnrolled = (courseId) => {
    return enrolledCourseIds.includes(courseId);
  };

  const toggleBookmark = (courseId) => {
    setBookmarkedCourseIds(prev => {
      if (prev.includes(courseId)) {
        showToast('Removed course from bookmarks.', 'info');
        return prev.filter(id => id !== courseId);
      } else {
        showToast('Course bookmarked!', 'success');
        return [...prev, courseId];
      }
    });
  };

  const isBookmarked = (courseId) => {
    return bookmarkedCourseIds.includes(courseId);
  };

  const markLessonComplete = (courseId, lessonId) => {
    setCompletedLessons(prev => {
      const existing = prev[courseId] || [];
      if (!existing.includes(lessonId)) {
        return {
          ...prev,
          [courseId]: [...existing, lessonId]
        };
      }
      return prev;
    });
  };

  const markLessonIncomplete = (courseId, lessonId) => {
    setCompletedLessons(prev => {
      const existing = prev[courseId] || [];
      return {
        ...prev,
        [courseId]: existing.filter(id => id !== lessonId)
      };
    });
  };

  const toggleLessonCompletion = (courseId, lessonId) => {
    const isCompleted = (completedLessons[courseId] || []).includes(lessonId);
    if (isCompleted) {
      markLessonIncomplete(courseId, lessonId);
    } else {
      markLessonComplete(courseId, lessonId);
    }
  };

  const isLessonCompleted = (courseId, lessonId) => {
    return Boolean(completedLessons[courseId]?.includes(lessonId));
  };

  const recordLessonAccess = (courseId, lessonId) => {
    setLastAccessedLessons(prev => ({
      ...prev,
      [courseId]: lessonId
    }));
  };

  const saveQuizResult = (quizId, result) => {
    setQuizResults(prev => ({
      ...prev,
      [quizId]: {
        ...result,
        completedAt: new Date().toISOString()
      }
    }));
  };

  const getQuizResult = (quizId) => {
    return quizResults[quizId] || null;
  };

  const resetCourseProgress = (courseId) => {
    setCompletedLessons(prev => {
      const updated = { ...prev };
      delete updated[courseId];
      return updated;
    });
    showToast('Course progress reset.', 'info');
  };

  const getCourseById = (courseId) => {
    return sampleCourses.find(c => c.id === courseId) || null;
  };

  const getQuizById = (quizId) => {
    return sampleQuizzes[quizId] || null;
  };

  const value = {
    courses: sampleCourses,
    quizzes: sampleQuizzes,
    enrolledCourseIds,
    bookmarkedCourseIds,
    completedLessons,
    lastAccessedLessons,
    quizResults,
    toast,
    showToast,
    closeToast,
    enrollCourse,
    isEnrolled,
    toggleBookmark,
    isBookmarked,
    markLessonComplete,
    markLessonIncomplete,
    toggleLessonCompletion,
    isLessonCompleted,
    recordLessonAccess,
    saveQuizResult,
    getQuizResult,
    resetCourseProgress,
    getCourseById,
    getQuizById,
    calculateCourseProgress: (course) => calculateCourseProgress(course, completedLessons)
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

