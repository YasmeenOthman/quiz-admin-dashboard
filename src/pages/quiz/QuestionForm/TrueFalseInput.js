import React from "react";

function TrueFalseInput({ handleCorrectAnswerChange, correctAnswer }) {
  return (
    <div>
      <div>
        <input
          type="radio"
          name="correctAnswer"
          value="True"
          onChange={() => handleCorrectAnswerChange("True")}
          checked={correctAnswer === "True"}
          className="form-input"
        />
        <label>True</label>
      </div>
      <div>
        <input
          type="radio"
          name="correctAnswer"
          value="False"
          onChange={() => handleCorrectAnswerChange("False")}
          checked={correctAnswer === "False"}
          className="form-input"
        />
        <label>False</label>
      </div>
    </div>
  );
}

export default TrueFalseInput;
