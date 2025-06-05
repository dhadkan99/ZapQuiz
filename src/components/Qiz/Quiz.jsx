import React, { useState } from "react";
import "../Qiz/Quiz.css";
import { data } from "../../Assets/data";
export const Quiz = () => {
  let [index, setindex] = useState(0);
  let [question, setQuestion] = useState(data[index]);

  const checkAns = (e, ans) => {
    if (question.ans === ans) {
      e.target.classList.add("correct-answer");
    } else {
      e.target.classList.add("wrong-answer");
    }
  };
  return (
    <>
      <div className="header">
        <h1>ZapQuiz</h1>
        <p>Learn more with every question</p>
      </div>
      <div className="container">
        <h2>
          {index + 1}.{question.question}
        </h2>
        <ul>
          <li onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
          <li onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
          <li onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
          <li onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
        </ul>
        <button>Next</button>
        <div className="index">1 of 5 questions</div>
      </div>
    </>
  );
};
