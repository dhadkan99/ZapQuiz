import React, { useState, useRef } from "react";
import "../Qiz/Quiz.css";
import { data } from "../../Assets/data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setlock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const Option1 = useRef();
  const Option2 = useRef();
  const Option3 = useRef();
  const Option4 = useRef();

  const option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (lock) return;

    setlock(true);

    if (question.ans === ans) {
      e.target.classList.add("correct-answer");
      setScore((prev) => prev + 1);
    } else {
      e.target.classList.add("wrong-answer");
      const correctRef = option_array[question.ans - 1]?.current;
      if (correctRef) correctRef.classList.add("correct-answer");
    }

    setTimeout(() => {
      goNext();
    }, 1000);
  };

  const goNext = () => {
    if (index === data.length - 1) {
      setResult(true);
    } else {
      const nextIndex = index + 1;
      setIndex(nextIndex);
      setQuestion(data[nextIndex]);
      setlock(false);

      option_array.forEach((ref) => {
        if (ref.current) {
          ref.current.classList.remove("correct-answer", "wrong-answer");
        }
      });
    }
  };

  const next = () => {
    if (!lock) {
      toast.error("Please select an answer!");
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setResult(false);
    setlock(false);

    option_array.forEach((ref) => {
      if (ref.current) {
        ref.current.classList.remove("correct-answer", "wrong-answer");
      }
    });
  };

  const percent = Math.round(((index + 1) / data.length) * 100);
  const finalPercent = Math.round((score / data.length) * 100);

  return (
    <>
      <ToastContainer position="top-right" />
      <div className="quiz-bg-dark">
        <div className="header">
          <h1>ZapQuiz</h1>
          <p>Learn more with every question</p>
        </div>

        <div className="container dark">
          {result ? (
            <>
              <h2>Quiz Complete!</h2>
              <p className="sub-title">General Knowledge</p>
              <div className="score-percent">{finalPercent}%</div>
              <p className="score-summary">
                {score} out of {data.length} correct
              </p>
              <p className="feedback">
                {finalPercent >= 80
                  ? "Excellent work! 🎉"
                  : finalPercent >= 50
                  ? "Good job! 👍"
                  : "Keep practicing! 💪"}
              </p>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${finalPercent}%`,
                    backgroundColor: "#10b981",
                  }}
                ></div>
              </div>

              <button className="next-button" onClick={reset}>
                Retry Quiz
              </button>
            </>
          ) : (
            <>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>

              <h2>
                {index + 1}. {question.question}
              </h2>
              <ul>
                <li ref={Option1} onClick={(e) => checkAns(e, 1)}>
                  {question.option1}
                </li>
                <li ref={Option2} onClick={(e) => checkAns(e, 2)}>
                  {question.option2}
                </li>
                <li ref={Option3} onClick={(e) => checkAns(e, 3)}>
                  {question.option3}
                </li>
                <li ref={Option4} onClick={(e) => checkAns(e, 4)}>
                  {question.option4}
                </li>
              </ul>

              <button onClick={next} className="next-button">
                Next
              </button>
              <div className="index">
                {index + 1} of {data.length} questions
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <footer className="quiz-footer">
          <p>&copy; {new Date().getFullYear()} Dhadkan. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};
