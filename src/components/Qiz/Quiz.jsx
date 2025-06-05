import React, { useState } from "react";
import { useRef } from "react";
import "../Qiz/Quiz.css";
import { data } from "../../Assets/data";
export const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setlock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct-answer");
        setlock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong-answer");
        setlock(true);
        option_array[question.ans - 1].current.classList.add("correct-answer");
      }
    }
  };
  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setlock(false);
      option_array.map((option) => {
        option.current.classList.remove("wrong-answer");
        option.current.classList.remove("correct-answer");
        return null;
      });
    }
  };
  return (
    <>
      <div className="header">
        <h1>ZapQuiz</h1>

        <p>Learn more with every question</p>
      </div>
      <div className="container">
        {result ? (
          <>
            <h2>
              your score{score} out of {data.lenght}
            </h2>
            <button>Reset</button>
          </>
        ) : (
          <>
            <h2>
              {index + 1}.{question.question}
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
            <button onClick={next}>Next</button>
            <div className="index">
              {index + 1} of {data.lenght} questions
            </div>
          </>
        )}
      </div>
    </>
  );
};
