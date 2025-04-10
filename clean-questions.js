const fs = require('fs');

// Read the questions.json file
const rawData = fs.readFileSync('./questions.json');
const questions = JSON.parse(rawData);

// Clean the questions
const cleanedQuestions = questions.map(q => {
  // Clean options - remove separator lines
  const cleanOptions = {};
  for (const [key, value] of Object.entries(q.options)) {
    cleanOptions[key] = value.replace(/\s*-{10,}\s*.*$/g, '');
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