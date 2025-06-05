import React from "react";
import "./QuizSelection.css";

const QuizSelection = () => {
  return (
    <div className="selection-container">
      <div className="header">
        <h1>QuizMaster</h1>
        <p>Choose a quiz to test your knowledge</p>
      </div>
      <div className="quiz-cards-container">
        {/* Placeholder for quiz cards */}
        <div className="quiz-card">
          <h2>Web Development</h2>
          <p>Test your HTML, CSS, and JavaScript knowledge</p>
          <span className="question-count">5 questions</span>
          <button>Start Quiz</button>
        </div>
        {/* More cards will go here */}
      </div>
    </div>
  );
};

export default QuizSelection;
