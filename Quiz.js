import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from './QuizContext';

const Quiz = () => {
  const {
    quizQuestions,
    currentQuestionIndex,
    userAnswers,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    submitQuiz,
    quizStarted,
    quizSubmitted,
    resetQuiz,
    timeSpent,
    formatTime
  } = useContext(QuizContext);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!quizStarted) {
      navigate('/');
    } else if (quizSubmitted) {
      navigate('/results');
    }
  }, [quizStarted, quizSubmitted, navigate]);
  
  if (!quizStarted || quizQuestions.length === 0) {
    return null;
  }
  
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const userAnswer = userAnswers[currentQuestionIndex];
  const isAnswered = userAnswer !== undefined;
  
  const handleSubmit = () => {
    submitQuiz();
    navigate('/results');
  };
  
  const handleBackToHome = () => {
    resetQuiz();
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="card max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
          <h2 className="text-lg font-medium">Question {currentQuestionIndex + 1} of {quizQuestions.length}</h2>
          
          <div className="flex items-center gap-2">
            <div className="text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full">
              {formatTime(timeSpent)}
            </div>
            {currentQuestion.lesson && (
              <div className="text-sm bg-primary-light/20 dark:bg-primary-dark/30 text-primary-dark dark:text-primary-light px-3 py-1 rounded-full">
                Lesson {currentQuestion.lesson}
              </div>
            )}
          </div>
        </div>
        
        <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full mb-6">
          <div 
            className="h-1 bg-primary-light dark:bg-primary-dark rounded-full" 
            style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
          ></div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-6">{currentQuestion.question}</h3>
          
          <div className="space-y-3">
            {Object.entries(currentQuestion.options || {}).map(([key, value]) => {
              if (!value) return null;
              
              let optionClasses = "option-card border-gray-300 dark:border-gray-600 hover:border-primary-light dark:hover:border-primary-dark";
              
              // If this option has been selected or feedback is being shown
              if (isAnswered) {
                if (key === userAnswer) {
                  if (key === currentQuestion.answer) {
                    optionClasses = "option-card border-green-500 bg-green-100 dark:bg-green-900/30";
                  } else {
                    optionClasses = "option-card border-red-500 bg-red-100 dark:bg-red-900/30";
                  }
                } else if (key === currentQuestion.answer) {
                  optionClasses = "option-card border-green-500 bg-green-100 dark:bg-green-900/30";
                }
              }
              
              return (
                <div
                  key={key}
                  onClick={() => !isAnswered && selectAnswer(currentQuestionIndex, key)}
                  className={optionClasses}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3">
                      <span className="font-medium">{key}</span>
                    </div>
                    <div className="flex-1">{value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleBackToHome}
              className="btn bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Home
            </button>
            
            <button
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0}
              className={`btn ${
                currentQuestionIndex === 0
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Previous
            </button>
            
            <button
              onClick={nextQuestion}
              disabled={currentQuestionIndex === quizQuestions.length - 1}
              className={`btn ${
                currentQuestionIndex === quizQuestions.length - 1
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Next
            </button>
          </div>
          
          <button
            onClick={handleSubmit}
            className="btn btn-secondary mt-2 sm:mt-0"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz; 