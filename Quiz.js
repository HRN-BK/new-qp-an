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
  
  // Calculate progress
  const answeredCount = Object.keys(userAnswers).length;
  const progress = Math.round((answeredCount / quizQuestions.length) * 100);
  
  const handleSubmit = () => {
    if (answeredCount === 0) {
      alert('Vui lòng trả lời ít nhất một câu hỏi trước khi nộp bài.');
      return;
    }
    
    if (answeredCount < quizQuestions.length) {
      const confirmSubmit = window.confirm(`Bạn chỉ mới trả lời ${answeredCount} trên ${quizQuestions.length} câu hỏi. Bạn có chắc muốn nộp bài không?`);
      if (!confirmSubmit) return;
    }
    
    submitQuiz();
    navigate('/results');
  };
  
  const handleBackToHome = () => {
    if (window.confirm('Bạn có chắc muốn quay lại trang chủ? Mọi câu trả lời sẽ bị mất.')) {
      resetQuiz();
      navigate('/');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="card max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Câu hỏi {currentQuestionIndex + 1} / {quizQuestions.length}</h2>
          
          <div className="flex items-center">
            <div className="text-sm bg-primary-light/20 dark:bg-primary-dark/30 text-primary-dark dark:text-primary-light px-3 py-1 rounded-full mr-2">
              Bài {currentQuestion.lesson}
            </div>
            
            <div className="text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formatTime(timeSpent)}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4 text-sm">
          <div>
            Đã trả lời: <span className="font-medium">{answeredCount}/{quizQuestions.length}</span>
          </div>
          <div>
            Hoàn thành: <span className="font-medium">{progress}%</span>
          </div>
        </div>
        
        <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full mb-6">
          <div 
            className="h-2 bg-primary-light dark:bg-primary-dark rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-6">{currentQuestion.question}</h3>
          
          <div className="space-y-3">
            {Object.entries(currentQuestion.options).map(([key, value]) => {
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
        
        <div className="flex flex-wrap gap-2 justify-between">
          <div className="flex gap-2">
            <button
              onClick={handleBackToHome}
              className="btn bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Trang chủ
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
              Trước
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
              Tiếp
            </button>
          </div>
          
          <button
            onClick={handleSubmit}
            className="btn btn-secondary"
          >
            Nộp bài
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz; 