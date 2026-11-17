import React from 'react';
import { Check } from 'lucide-react';

export const QuizQuestion = ({
  question,
  questionIndex,
  totalQuestions,
  selectedOption,
  onSelectOption
}) => {
  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-card mb-6 animate-fade-in">
      
      {/* Question Counter */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-4">
        <span className="uppercase tracking-wider text-indigo-600 font-bold">
          Question {questionIndex + 1} of {totalQuestions}
        </span>
        <span>Multiple Choice</span>
      </div>

      {/* Question Prompt */}
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-6">
        {question.question}
      </h3>

      {/* Answer Options */}
      <div className="space-y-3">
        {question.options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          const letter = optionLetters[idx] || String(idx + 1);

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectOption(idx)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl text-left border-2 transition-all ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/70 shadow-sm shadow-indigo-600/10'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 bg-white'
              }`}
            >
              {/* Option Letter Pill */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                isSelected
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}>
                {letter}
              </div>

              {/* Option Text */}
              <span className={`flex-1 text-sm ${isSelected ? 'font-semibold text-indigo-950' : 'text-slate-700'}`}>
                {option}
              </span>

              {/* Radio check indicator */}
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 bg-white'
              }`}>
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

