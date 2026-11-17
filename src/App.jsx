import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';

import { HomePage } from './pages/HomePage';
import { CourseDetailsPage } from './pages/CourseDetailsPage';
import { MyLearningPage } from './pages/MyLearningPage';
import { LessonPage } from './pages/LessonPage';
import { QuizPage } from './pages/QuizPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Helper component to manage conditional footer (e.g. hide footer on immersive lesson player)
const AppLayout = ({ children }) => {
  const location = useLocation();
  const isLessonPlayer = location.pathname.startsWith('/learn/');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      {!isLessonPlayer && <Footer />}
      <Toast />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
            <Route path="/my-learning" element={<MyLearningPage />} />
            <Route path="/learn/:courseId/:lessonId" element={<LessonPage />} />
            <Route path="/courses/:courseId/quiz/:quizId" element={<QuizPage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AppLayout>
      </Router>
    </AppProvider>
  );
}

export default App;

