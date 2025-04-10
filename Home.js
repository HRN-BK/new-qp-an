import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from './QuizContext';

const Home = () => {
  const {
    selectedLessons,
    toggleLesson,
    questionCount,
    setQuestionCount,
    startQuiz
  } = useContext(QuizContext);
  
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    startQuiz();
    navigate('/quiz');
  };

  // Create array of lesson objects with code and title
  const lessons = [
    { code: 'C1', title: 'Một số quan điểm cơ bản của chủ nghĩa Mác – Lênin, tư tưởng Hồ Chí Minh về bảo vệ Tổ quốc' },
    { code: 'C2', title: 'Đường lối, quan điểm của Đảng, chính sách pháp luật của Nhà nước về quốc phòng, an ninh' },
    { code: 'C3', title: 'Xây dựng nền quốc phòng toàn dân và an ninh nhân dân' },
    { code: 'C4', title: 'Xây dựng lực lượng vũ trang nhân dân Việt Nam' },
    { code: 'C5', title: 'Kết hợp phát triển kinh tế – xã hội với tăng cường quốc phòng, an ninh' },
    { code: 'C6', title: 'Bảo vệ an ninh quốc gia và giữ gìn trật tự an toàn xã hội' },
    { code: 'C7', title: 'Nghệ thuật quân sự Việt Nam và truyền thống đánh giặc giữ nước của dân tộc' },
    { code: 'C8', title: 'Phòng, chống chiến lược "Diễn biến hòa bình", bạo loạn lật đổ của các thế lực thù địch' },
    { code: 'C9', title: 'Xây dựng phong trào toàn dân bảo vệ an ninh Tổ quốc' },
    { code: 'C10', title: 'Một số vấn đề cơ bản về dân quân tự vệ, dự bị động viên' },
    { code: 'C11', title: 'Biên giới quốc gia và bảo vệ chủ quyền lãnh thổ Việt Nam' },
    { code: 'C12', title: 'Chủ quyền biển đảo và chiến lược bảo vệ biển đảo Việt Nam trong tình hình mới' },
    { code: 'C13', title: 'Một số nội dung cơ bản của Luật Nghĩa vụ quân sự và công tác tuyển quân' },
    { code: 'C14', title: 'Tổ chức, biên chế, vũ khí và chiến thuật bộ binh, tiểu đội, trung đội' },
    { code: 'C15', title: 'Kỹ thuật sử dụng một số loại vũ khí, khí tài bộ binh (mô phỏng, thực hành)' }
  ];

  // Get lesson title by code
  const getLessonTitle = (code) => {
    const lesson = lessons.find(l => l.code === code);
    return lesson ? lesson.title : code;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="card max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Start a Quiz</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Select Lessons:</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {lessons.map((lesson) => (
              <button
                key={lesson.code}
                onClick={() => toggleLesson(lesson.code)}
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl font-medium flex items-center justify-center transition-colors ${
                  selectedLessons.includes(lesson.code)
                    ? 'bg-primary-light dark:bg-primary-dark text-white shadow-md'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
                aria-label={`Select lesson ${lesson.code}`}
              >
                {lesson.code}
              </button>
            ))}
          </div>
          
          {/* Display selected lesson titles */}
          {selectedLessons.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="font-medium text-gray-700 dark:text-gray-300">Selected Lessons:</h4>
              {selectedLessons.map(lessonCode => (
                <div key={lessonCode} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
                  <span className="font-semibold">{lessonCode}:</span> {getLessonTitle(lessonCode)}
                </div>
              ))}
            </div>
          )}
          
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            {selectedLessons.length === 0
              ? 'No lessons selected. All questions will be included.'
              : `Selected ${selectedLessons.length} ${selectedLessons.length === 1 ? 'lesson' : 'lessons'}.`}
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Number of Questions:</h3>
          <div className="flex flex-wrap gap-2">
            {[5, 10, 20, 50, 'All'].map((count) => (
              <button
                key={count}
                onClick={() => setQuestionCount(count === 'All' ? Infinity : count)}
                className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                  (count === 'All' && questionCount === Infinity) || count === questionCount
                    ? 'bg-primary-light dark:bg-primary-dark text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>
        
        <button
          onClick={handleStartQuiz}
          className="btn btn-primary w-full py-3 text-lg"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Home; 