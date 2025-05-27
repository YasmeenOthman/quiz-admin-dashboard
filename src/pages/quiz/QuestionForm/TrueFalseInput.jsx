import React from "react";

function TrueFalseInput({ handleCorrectAnswerChange, correctAnswer }) {
  return (
    <div className="true-false-container">
      <div className="true-answer-option">
        <input
          type="radio"
          name="correctAnswer"
          value="True"
          onChange={() => handleCorrectAnswerChange("True")}
          checked={correctAnswer === "True"}
          className="correct-answer"
        />
        <label>True</label>
      </div>
      <div className="false-answer-option">
        <input
          type="radio"
          name="correctAnswer"
          value="False"
          onChange={() => handleCorrectAnswerChange("False")}
          checked={correctAnswer === "False"}
          className="correct-answer"
        />
        <label>False</label>
      </div>
    </div>
  );
}

export default TrueFalseInput;
