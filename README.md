# Mobile Quiz Application

A responsive, mobile-friendly quiz web application that uses JSON data for questions.

## Features

- **Practice Modes**: Select specific lessons and number of questions to practice
- **Quiz Interface**: Mobile-optimized with one question per page
- **Results Screen**: View score and review correct/incorrect answers
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on all devices

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone this repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

5. Open your browser and go to `http://localhost:3000`

## How to Use

1. **Home Screen**: 
   - Select lessons you want to practice (or leave unselected for all)
   - Choose how many questions you want to answer
   - Click "Start Quiz" to begin

2. **Quiz Screen**:
   - Answer questions by clicking on an option
   - Navigate between questions using "Previous" and "Next" buttons
   - Return to home using the "Home" button
   - Submit your quiz at any time with "Submit Quiz"

3. **Results Screen**:
   - View your score and percentage
   - Review all questions grouped by lesson
   - See which answers were correct and incorrect
   - Return to home to start a new quiz

## Customizing Questions

Questions are loaded from the `src/questions.json` file. You can add, edit, or remove questions in this file.

Each question should follow this format:

```json
{
  "lesson": "C15",
  "question": "What is the definition of national defense?",
  "options": {
    "A": "Answer A",
    "B": "Answer B",
    "C": "Answer C",
    "D": "Answer D"
  },
  "answer": "A"
}
```

## Customizing Theme

You can modify the theme colors in the `tailwind.config.js` file.

## License

This project is open source.

## Acknowledgments

- Built with React and Tailwind CSS 