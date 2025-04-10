import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from './QuizContext';

const Results = () => {
  const {
    quizSubmitted,
    quizStarted,
    getResults,
    resetQuiz,
    formatTime,
    quizHistory,
    startQuiz
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
  
  // Calculate lesson-specific statistics
  const lessonStats = Object.entries(lessonGroups).map(([lesson, lessonQuestions]) => {
    const correctCount = lessonQuestions.filter(q => q.isCorrect).length;
    const lessonPercentage = Math.round((correctCount / lessonQuestions.length) * 100);
    
    return {
      lesson,
      correct: correctCount,
      total: lessonQuestions.length,
      percentage: lessonPercentage
    };
  }).sort((a, b) => b.percentage - a.percentage); // Sort by percentage
  
  const handleBackToHome = () => {
    resetQuiz();
    navigate('/');
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600 dark:text-green-400';
    if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreLabel = (percentage) => {
    if (percentage >= 90) return 'Xuất sắc';
    if (percentage >= 80) return 'Giỏi';
    if (percentage >= 70) return 'Khá';
    if (percentage >= 60) return 'Trung bình khá';
    if (percentage >= 50) return 'Trung bình';
    return 'Cần cố gắng thêm';
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="card max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Kết quả bài làm</h2>
        
        <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-lg font-medium">Bạn đạt được:</p>
              <p className="text-3xl font-bold">
                <span className={getScoreColor(percentage)}>{score}</span> / {total}
              </p>
              <p className="mt-1">
                <span className={`text-lg font-medium ${getScoreColor(percentage)}`}>
                  {getScoreLabel(percentage)}
                </span>
              </p>
              <div className="mt-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-600 dark:text-gray-400">
                  Thời gian: {formatTime(timeSpent)} 
                  {timeSpent < 60 ? ' (rất nhanh!)' : 
                   timeSpent < 300 ? ' (nhanh)' : 
                   timeSpent < 600 ? ' (khá nhanh)' : 
                   timeSpent < 1200 ? ' (bình thường)' : ' (chậm)'}
                </span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="inline-block relative w-32 h-32">
                <svg className="w-32 h-32" viewBox="0 0 100 100">
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
                  <span className={`text-2xl font-bold ${getScoreColor(percentage)}`}>{percentage}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Lesson-specific statistics */}
        {lessonStats.length > 1 && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Kết quả theo bài</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lessonStats.map(stat => (
                <div key={stat.lesson} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg flex justify-between items-center">
                  <div>
                    <div className="font-medium text-primary-dark dark:text-primary-light">Bài {stat.lesson}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.correct}/{stat.total} câu đúng</div>
                  </div>
                  <div className={`text-lg font-bold ${getScoreColor(stat.percentage)}`}>
                    {stat.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Question review */}
        <h3 className="text-xl font-semibold mb-4">Xem lại câu hỏi</h3>
        
        {Object.entries(lessonGroups).map(([lesson, lessonQuestions]) => (
          <div key={lesson} className="mb-6">
            <div className="bg-primary-light/20 dark:bg-primary-dark/30 text-primary-dark dark:text-primary-light px-3 py-2 rounded-lg mb-3">
              <h4 className="text-lg font-medium">Bài {lesson}</h4>
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
                      } else if (key === question.userAnswer) {
                        optionClasses += " bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500";
                      }
                      
                      return (
                        <div key={key} className={optionClasses}>
                          <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-2">
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
        
        <div className="flex gap-3">
          <button
            onClick={handleBackToHome}
            className="btn btn-primary flex-1 py-3 text-lg"
          >
            Về trang chủ
          </button>
          
          <button
            onClick={() => {
              resetQuiz();
              startQuiz();
              navigate('/quiz');
            }}
            className="btn btn-secondary flex-1 py-3 text-lg"
          >
            Làm lại bài
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results; 