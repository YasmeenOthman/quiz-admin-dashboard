import React from "react";
import "./editquestion.scss"; // Import your CSS file

const TrueFalseInput = ({ correctAnswer, handleCorrectAnswerChange }) => {
  return (
    <div className="true-false-input-container">
      <div
        className={`true-false-option ${
          correctAnswer === "True" ? "highlight" : ""
        }`}
      >
        <input
          type="radio"
          id="true-option"
          name="trueFalse"
          value="true"
          checked={correctAnswer === "True"}
          onChange={(e) => handleCorrectAnswerChange(e.target.value)}
        />
        <label htmlFor="true-option">True</label>
      </div>

      <div
        className={`true-false-option ${
          correctAnswer === "False" ? "highlight" : ""
        }`}
      >
        <input
          type="radio"
          id="false-option"
          name="trueFalse"
          value="false"
          checked={correctAnswer === "False"}
          onChange={(e) => handleCorrectAnswerChange(e.target.value)}
        />
        <label htmlFor="false-option">False</label>
      </div>
    </div>
  );
};

export default TrueFalseInput;
