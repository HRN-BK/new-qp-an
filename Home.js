import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from './QuizContext';

const Home = () => {
  const {
    availableLessons,
    selectedLessons,
    toggleLesson,
    questionCount,
    setQuestionCount,
    startQuiz
  } = useContext(QuizContext);
  
  const [activeTab, setActiveTab] = useState('lessons'); // 'lessons' or 'settings'
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    startQuiz();
    navigate('/quiz');
  };

  // Group lessons (C1-C15) for better organization
  const groupedLessons = availableLessons.reduce((groups, lesson) => {
    if (lesson.startsWith('C')) {
      groups.push(lesson);
    }
    return groups;
  }, []).sort();

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="card max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Ứng dụng Quiz GDQP-AN</h2>
        
        <div className="mb-6 flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('lessons')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === 'lessons'
                ? 'border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Chọn bài học
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === 'settings'
                ? 'border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Cài đặt
          </button>
        </div>
        
        {activeTab === 'lessons' && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Chọn bài học:</h3>
            
            <div className="grid grid-cols-5 gap-2 mb-4">
              {groupedLessons.map((lesson) => (
                <button
                  key={lesson}
                  onClick={() => toggleLesson(lesson)}
                  className={`p-3 rounded-lg font-medium transition-colors ${
                    selectedLessons.includes(lesson)
                      ? 'bg-primary-light dark:bg-primary-dark text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {lesson}
                </button>
              ))}
            </div>
            
            <div className="flex justify-between mb-2">
              <button 
                onClick={() => setSelectedLessons([])}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark"
              >
                Bỏ chọn tất cả
              </button>
              <button 
                onClick={() => setSelectedLessons([...groupedLessons])}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark"
              >
                Chọn tất cả
              </button>
            </div>
            
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {selectedLessons.length === 0
                ? 'Chưa có bài nào được chọn. Tất cả câu hỏi sẽ được hiển thị.'
                : `Đã chọn ${selectedLessons.length} ${selectedLessons.length === 1 ? 'bài' : 'bài'}.`}
            </p>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Số câu hỏi:</h3>
            <div className="flex flex-wrap gap-2">
              {[5, 10, 20, 30, 50, 'Tất cả'].map((count) => (
                <button
                  key={count}
                  onClick={() => setQuestionCount(count === 'Tất cả' ? Infinity : count)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    (count === 'Tất cả' && questionCount === Infinity) || count === questionCount
                      ? 'bg-primary-light dark:bg-primary-dark text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <button
          onClick={handleStartQuiz}
          className="btn btn-primary w-full py-3 text-lg"
          disabled={selectedLessons.length === 0}
        >
          Bắt đầu Quiz
        </button>
        
        {selectedLessons.length === 0 && (
          <p className="mt-2 text-sm text-red-500 dark:text-red-400">
            Hãy chọn ít nhất một bài học để bắt đầu.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home; 