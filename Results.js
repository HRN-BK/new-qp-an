import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from './QuizContext';

const Results = () => {
  const {
    quizSubmitted,
    quizStarted,
    getResults,
    resetQuiz,
    formatTime
  } = useContext(QuizContext);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!quizStarted || !quizSubmitted) {
      navigate('/');
    }
  }, [quizStarted, quizSubmitted, navigate]);
  
  if (!quizSubmitted) {
    return null;
  }
  
  const results = getResults();
  const { score, total, percentage, questions, timeSpent } = results;
  
  // Group questions by lesson
  const lessonGroups = questions.reduce((groups, question) => {
    const { lesson } = question;
    if (!groups[lesson]) {
      groups[lesson] = [];
    }
    groups[lesson].push(question);
    return groups;
  }, {});
  
  const handleBackToHome = () => {
    resetQuiz();
    navigate('/');
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600 dark:text-green-400';
    if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="card max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
        
        <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <p className="text-lg font-medium">You scored:</p>
              <p className="text-3xl font-bold">
                <span className={getScoreColor(percentage)}>{score}</span> / {total}
              </p>
              <p className="text-sm mt-1">
                Correct: <span className="text-green-600 dark:text-green-400">{score}</span> | 
                Incorrect: <span className="text-red-600 dark:text-red-400">{total - score}</span>
              </p>
              <p className="text-sm mt-1">
                Time: <span className="font-medium">{formatTime(timeSpent)}</span>
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-block relative w-24 h-24">
                <svg className="w-24 h-24" viewBox="0 0 100 100">
                  <circle 
                    className="text-gray-300 dark:text-gray-700" 
                    strokeWidth="8" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="40" 
                    cx="50" 
                    cy="50" 
                  />
                  <circle 
                    className={`${getScoreColor(percentage)}`}
                    strokeWidth="8" 
                    strokeDasharray={`${2.51 * percentage}, 251.2`} 
                    strokeLinecap="round" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="40" 
                    cx="50" 
                    cy="50" 
                    transform="rotate(-90 50 50)" 
                  />
                </svg>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <span className={`text-xl font-bold ${getScoreColor(percentage)}`}>{percentage}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-4">Review Questions</h3>
        
        {Object.entries(lessonGroups).map(([lesson, lessonQuestions]) => (
          <div key={lesson} className="mb-6">
            <div className="bg-primary-light/20 dark:bg-primary-dark/30 text-primary-dark dark:text-primary-light px-3 py-2 rounded-lg mb-3">
              <h4 className="text-lg font-medium">Lesson {lesson}</h4>
            </div>
            
            <div className="space-y-4">
              {lessonQuestions.map((question, index) => (
                <div key={index} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
                  <p className="font-medium mb-3">{question.question}</p>
                  
                  <div className="space-y-2">
                    {Object.entries(question.options).map(([key, value]) => {
                      let optionClasses = "py-2 px-3 rounded-lg flex items-start";
                      
                      if (key === question.answer) {
                        optionClasses += " bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500";
                      } else if (key === question.userAnswer && key !== question.answer) {
                        optionClasses += " bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500";
                      }
                      
                      return (
                        <div key={key} className={optionClasses}>
                          <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-2 flex-shrink-0">
                            <span className="text-sm font-medium">{key}</span>
                          </div>
                          <div className="flex-1">{value}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <button
          onClick={handleBackToHome}
          className="btn btn-primary w-full py-3 text-lg"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Results; 