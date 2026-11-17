import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { QuizQuestion } from '../components/quiz/QuizQuestion';
import { QuizResults } from '../components/quiz/QuizResults';
import { calculateQuizScore } from '../utils/quizHelpers';
import { 
  HelpCircle, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  RotateCcw
} from 'lucide-react';

export const QuizPage = () => {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  const { 
    getQuizById, 
    getCourseById, 
    getQuizResult, 
    saveQuizResult,
    markLessonComplete,
    showToast 
  } = useApp();

  const quiz = getQuizById(quizId);
  const course = getCourseById(courseId);

  // Check if previously taken
  const savedResult = getQuizResult(quizId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(Boolean(savedResult));
  const [activeResult, setActiveResult] = useState(savedResult);
  const [validationError, setValidationError] = useState('');

  // If already submitted and loaded with saved result
  useEffect(() => {
    if (savedResult && !activeResult) {
      setActiveResult(savedResult);
      setIsSubmitted(true);
    }
  }, [savedResult, activeResult]);

  if (!quiz) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-900 mb-2">Quiz Not Found</h2>
        <p className="text-xs text-slate-500 mb-6">We couldn't find the requested assessment.</p>
        <Link to="/" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold">
          Return Home
        </Link>
      </div>
    );
  }

  const questions = quiz.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = Object.keys(selectedAnswers).length;
  const isAllAnswered = answeredCount === questions.length;

  const handleSelectOption = (optionIndex) => {
    setValidationError('');
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAllAnswered) {
      setValidationError(`Please answer all ${questions.length} questions before submitting. (${answeredCount}/${questions.length} answered)`);
      return;
    }

    const result = calculateQuizScore(quiz, selectedAnswers);
    saveQuizResult(quiz.id, result);
    setActiveResult(result);
    setIsSubmitted(true);

    // If passed, mark the lesson that links to this quiz as complete
    if (result.passed && course) {
      const quizLesson = course.sections
        ?.flatMap(s => s.lessons)
        ?.find(l => l.quizId === quiz.id);

      if (quizLesson) {
        markLessonComplete(course.id, quizLesson.id);
      }
      showToast('Assessment passed! Progress recorded.', 'success');
    } else {
      showToast('Quiz submitted. Review your answers.', 'info');
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setActiveResult(null);
    setCurrentQuestionIndex(0);
    setValidationError('');
  };

  if (isSubmitted && activeResult) {
    return (
      <div className="min-h-screen bg-slate-50 py-8">
        <QuizResults
          quiz={quiz}
          result={activeResult}
          courseId={courseId}
          onRetake={handleRetake}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Top Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-card mb-6">
          <div className="flex items-center justify-between mb-4">
            <Link
              to={course ? `/courses/${course.id}` : '/'}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to {course ? course.title : 'Course'}</span>
            </Link>

            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
              Passing threshold: {quiz.passingScore}%
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            {quiz.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
            {quiz.description}
          </p>

          {/* Question Nav Pills */}
          <div className="flex items-center gap-2 pt-4 border-t border-slate-100 flex-wrap">
            <span className="text-xs font-bold text-slate-400 mr-2">Jump to:</span>
            {questions.map((q, idx) => {
              const isAnswered = selectedAnswers[q.id] !== undefined;
              const isCurrent = idx === currentQuestionIndex;

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentQuestionIndex(idx);
                    setValidationError('');
                  }}
                  className={`w-8 h-8 rounded-xl font-bold text-xs transition-all flex items-center justify-center ${
                    isCurrent
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 ring-2 ring-indigo-600/30'
                      : isAnswered
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  aria-label={`Jump to question ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}

            <div className="ml-auto text-xs font-semibold text-slate-500">
              {answeredCount} of {questions.length} answered
            </div>
          </div>
        </div>

        {/* Validation Alert */}
        {validationError && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs sm:text-sm flex items-center gap-3 animate-fade-in">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="font-semibold">{validationError}</p>
          </div>
        )}

        {/* Current Question Component */}
        {currentQuestion && (
          <QuizQuestion
            question={currentQuestion}
            questionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            selectedOption={selectedAnswers[currentQuestion.id]}
            onSelectOption={handleSelectOption}
          />
        )}

        {/* Bottom Navigation & Submit Actions */}
        <div className="flex items-center justify-between gap-4 mt-6">
          <button
            onClick={() => {
              if (currentQuestionIndex > 0) {
                setCurrentQuestionIndex(prev => prev - 1);
                setValidationError('');
              }
            }}
            disabled={currentQuestionIndex === 0}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border transition-all ${
              currentQuestionIndex > 0
                ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-subtle'
                : 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border-transparent'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {currentQuestionIndex < questions.length - 1 ? (
            <button
              onClick={() => {
                setCurrentQuestionIndex(prev => prev + 1);
                setValidationError('');
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors shadow-subtle"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className={`inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold text-white transition-all shadow-md ${
                isAllAnswered
                  ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30'
                  : 'bg-indigo-600/80 hover:bg-indigo-600'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit Assessment</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

