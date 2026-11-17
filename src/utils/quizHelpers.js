/**
 * Calculate quiz score based on selected answers
 */
export function calculateQuizScore(quiz, selectedAnswers) {
  if (!quiz || !quiz.questions) {
    return { score: 0, total: 0, percentage: 0, passed: false, correctAnswersMap: {} };
  }

  const total = quiz.questions.length;
  let correctCount = 0;
  const breakdown = {};

  quiz.questions.forEach((q) => {
    const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
    if (isCorrect) correctCount++;
    breakdown[q.id] = {
      selected: selectedAnswers[q.id],
      correct: q.correctAnswer,
      isCorrect,
      explanation: q.explanation
    };
  });

  const percentage = Math.round((correctCount / total) * 100);
  const passed = percentage >= (quiz.passingScore || 70);

  return {
    score: correctCount,
    total,
    percentage,
    passed,
    breakdown
  };
}

