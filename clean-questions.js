const fs = require('fs');

// Read the questions.json file
const rawData = fs.readFileSync('./questions.json');
const questions = JSON.parse(rawData);

// Chỉ lấy các bài C1, C2, C3 và C15
const allowedLessons = ['C1', 'C2', 'C15'];
const filteredQuestions = questions.filter(q => allowedLessons.includes(q.lesson));

// Clean the questions
const cleanedQuestions = filteredQuestions.map(q => {
  // Clean options - remove separator lines
  const cleanOptions = {};
  for (const [key, value] of Object.entries(q.options)) {
    cleanOptions[key] = value.replace(/\s*-{10,}\s*.*$/g, '').trim();
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

// Write the cleaned data back to a new file
fs.writeFileSync('./cleaned-questions.json', JSON.stringify(cleanedQuestions, null, 2));

console.log('Questions cleaned and saved to cleaned-questions.json');
console.log(`Total questions: ${cleanedQuestions.length}`);
console.log(`C1: ${cleanedQuestions.filter(q => q.lesson === 'C1').length} questions`);
console.log(`C2: ${cleanedQuestions.filter(q => q.lesson === 'C2').length} questions`);
console.log(`C3: ${cleanedQuestions.filter(q => q.lesson === 'C3').length} questions`);
console.log(`C15: ${cleanedQuestions.filter(q => q.lesson === 'C15').length} questions`); 
