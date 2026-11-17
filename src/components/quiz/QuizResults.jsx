import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowLeft, 
  Trophy, 
  AlertTriangle,
  Lightbulb,
  Check,
  X
} from 'lucide-react';

export const QuizResults = ({ quiz, result, courseId, onRetake }) => {
  const isPassed = result.passed;
  const optionLetters = ['A', 'B', 'C', 'D'];

  useEffect(() => {
    if (isPassed) {
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [isPassed]);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-fade-in">
      
      {/* Top Banner Card */}
      <div className={`p-8 rounded-3xl border text-center mb-10 shadow-card ${
        isPassed 
          ? 'bg-gradient-to-b from-emerald-50/80 to-white border-emerald-200' 
          : 'bg-gradient-to-b from-amber-50/80 to-white border-amber-200'
      }`}>
        <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-4 shadow-inner ${
          isPassed 
            ? 'bg-emerald-100 text-emerald-600' 
            : 'bg-amber-100 text-amber-600'
        }`}>
          {isPassed ? (
            <Trophy className="w-10 h-10 stroke-[1.8]" />
          ) : (
            <AlertTriangle className="w-10 h-10 stroke-[1.8]" />
          )}
        </div>

        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${
          isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
        }`}>
          {isPassed ? 'Passed Successfully' : 'Keep Practicing'}
        </span>

        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          {isPassed ? 'Outstanding Work!' : 'Almost There!'}
        </h2>

        <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
          {isPassed 
            ? `You scored ${result.percentage}% and surpassed the passing score threshold (${quiz.passingScore}%). Great job!`
            : `You scored ${result.percentage}%. The passing threshold is ${quiz.passingScore}%. Review the explanations below and try again.`}
        </p>

        {/* Big Score Breakdown */}
        <div className="inline-flex items-center gap-6 px-6 py-3 rounded-2xl bg-white border border-slate-200/90 shadow-subtle mb-6">
          <div>
            <span className="block text-2xl font-black text-slate-900">{result.score} / {result.total}</span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Correct Answers</span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div>
            <span className={`block text-2xl font-black ${isPassed ? 'text-emerald-600' : 'text-amber-600'}`}>
              {result.percentage}%
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Final Score</span>
          </div>
        </div>

        {/* Top Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onRetake}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-600/20"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Quiz</span>
          </button>

          {courseId && (
            <Link
              to={`/courses/${courseId}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Course</span>
            </Link>
          )}
        </div>
      </div>

      {/* Question by Question Detailed Breakdown */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900">
          Question Breakdown & Explanations
        </h3>

        {quiz.questions.map((q, idx) => {
          const itemResult = result.breakdown[q.id];
          const isCorrect = itemResult?.isCorrect;

          return (
            <div
              key={q.id}
              className={`p-6 rounded-2xl border bg-white shadow-subtle ${
                isCorrect ? 'border-emerald-200/80' : 'border-rose-200/80'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Question {idx + 1}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  isCorrect ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                }`}>
                  {isCorrect ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      Correct
                    </>
                  ) : (
                    <>
                      <X className="w-3.5 h-3.5 stroke-[2.5]" />
                      Incorrect
                    </>
                  )}
                </span>
              </div>

              <h4 className="font-bold text-slate-900 text-base mb-4">
                {q.question}
              </h4>

              {/* Options list */}
              <div className="space-y-2 mb-4">
                {q.options.map((opt, optIdx) => {
                  const isUserSelection = itemResult?.selected === optIdx;
                  const isCorrectChoice = q.correctAnswer === optIdx;

                  let style = "bg-slate-50 border-slate-200 text-slate-600";
                  if (isCorrectChoice) {
                    style = "bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold";
                  } else if (isUserSelection && !isCorrectChoice) {
                    style = "bg-rose-50 border-rose-300 text-rose-900 font-semibold";
                  }

                  return (
                    <div
                      key={optIdx}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm ${style}`}
                    >
                      <span className="w-6 h-6 rounded-md bg-white/80 border border-current flex items-center justify-center font-bold text-xs shrink-0">
                        {optionLetters[optIdx]}
                      </span>
                      <span className="flex-1">{opt}</span>
                      {isCorrectChoice && (
                        <span className="text-emerald-700 font-bold text-xs uppercase tracking-wide">
                          Correct Answer
                        </span>
                      )}
                      {isUserSelection && !isCorrectChoice && (
                        <span className="text-rose-600 font-bold text-xs uppercase tracking-wide">
                          Your Answer
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Explanation Box */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block mb-0.5">Explanation:</span>
                  <p className="leading-relaxed">{q.explanation}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

