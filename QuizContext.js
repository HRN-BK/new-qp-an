import React, { createContext, useState, useEffect } from 'react';
import questionsData from './questions.json';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [selectedLessons, setSelectedLessons] = useState([]);
  const [questionCount, setQuestionCount] = useState(10);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [availableLessons, setAvailableLessons] = useState([]);
  const [quizHistory, setQuizHistory] = useState([]);
  const [timeSpent, setTimeSpent] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  
  // Load questions and extract available lessons
  useEffect(() => {
    // Clean the questions data
    const cleanedQuestions = questionsData.map(q => {
      // Clean options - remove separator lines
      const cleanOptions = {};
      for (const [key, value] of Object.entries(q.options)) {
        cleanOptions[key] = value.replace(/\s*-{5,}\s*.*$/g, '').trim();
      }

      // Complete truncated questions
      const question = q.question.endsWith(':') || 
                    q.question.endsWith('.') || 
                    q.question.endsWith('?') ? 
                    q.question : 
                    q.question + "...";

      return {
        ...q,
        question,
        options: cleanOptions
      };
    });
    
    setAllQuestions(cleanedQuestions);
    
    // Extract unique lesson names
    const lessons = [...new Set(cleanedQuestions.map(q => q.lesson))].sort();
    setAvailableLessons(lessons);
    
    // Load quiz history from localStorage
    const savedHistory = localStorage.getItem('quizHistory');
    if (savedHistory) {
      setQuizHistory(JSON.parse(savedHistory));
    }
  }, []);
  
  // Timer for tracking time spent on quiz
  useEffect(() => {
    let interval = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTimeSpent(prevTime => prevTime + 1);
      }, 1000);
    } else if (!timerActive && timeSpent !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeSpent]);

  // Prepare quiz with selected lessons and question count
  const startQuiz = () => {
    // Filter questions by selected lessons
    let filteredQuestions = allQuestions;
    if (selectedLessons.length > 0) {
      filteredQuestions = allQuestions.filter(q => selectedLessons.includes(q.lesson));
    }
    
    // Shuffle and limit to questionCount
    const shuffled = [...filteredQuestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, questionCount);
    
    setQuizQuestions(selected);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuizStarted(true);
    setQuizSubmitted(false);
    setTimeSpent(0);
    setTimerActive(true);
  };

  // Handle user answer selection
  const selectAnswer = (questionIndex, answer) => {
    if (userAnswers[questionIndex] !== undefined) return; // Prevent changing answer
    
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: answer
    });
  };

  // Navigate to the next question
  const nextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Navigate to the previous question
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Submit the quiz and calculate results
  const submitQuiz = () => {
    setQuizSubmitted(true);
    setTimerActive(false);
    
    // Calculate results
    const results = getResults();
    
    // Save to history
    const quizRecord = {
      date: new Date().toISOString(),
      score: results.score,
      total: results.total,
      percentage: results.percentage,
      timeSpent: timeSpent,
      selectedLessons: [...selectedLessons]
    };
    
    const updatedHistory = [quizRecord, ...quizHistory].slice(0, 10); // Keep only the 10 most recent
    setQuizHistory(updatedHistory);
    localStorage.setItem('quizHistory', JSON.stringify(updatedHistory));
  };

  // Reset quiz state
  const resetQuiz = () => {
    setQuizStarted(false);
    setQuizSubmitted(false);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTimerActive(false);
    setTimeSpent(0);
  };

  // Calculate quiz results
  const getResults = () => {
    let correct = 0;
    const results = quizQuestions.map((question, index) => {
      const userAnswer = userAnswers[index];
      const isCorrect = userAnswer === question.answer;
      if (isCorrect) correct++;
      
      return {
        ...question,
        userAnswer,
        isCorrect
      };
    });
    
    return {
      score: correct,
      total: quizQuestions.length,
      percentage: quizQuestions.length > 0 ? Math.round((correct / quizQuestions.length) * 100) : 0,
      questions: results,
      timeSpent: timeSpent
    };
  };

  // Toggle lesson selection
  const toggleLesson = (lesson) => {
    if (selectedLessons.includes(lesson)) {
      setSelectedLessons(selectedLessons.filter(l => l !== lesson));
    } else {
      setSelectedLessons([...selectedLessons, lesson]);
    }
  };
  
  // Format time (seconds) to mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <QuizContext.Provider
      value={{
        availableLessons,
        selectedLessons,
        setSelectedLessons,
        toggleLesson,
        questionCount,
        setQuestionCount,
        quizQuestions,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        userAnswers,
        selectAnswer,
        nextQuestion,
        prevQuestion,
        startQuiz,
        submitQuiz,
        resetQuiz,
        quizStarted,
        quizSubmitted,
        getResults,
        quizHistory,
        timeSpent,
        formatTime
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}; 