import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BasicButton from "../../../components/BasicButton";

function QuestionTemplate({ quizQuestions, deleteQuestion }) {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;

  return (
    <div className="question-template-container">
      {quizQuestions.map((question, index) => (
        <details key={index} className="question-details">
          <summary className="question-summary">
            {question.questionText}
          </summary>
          <div className="question-info-container">
            {question.questionType === "multiple-choice" && (
              <div className="question-choices">
                <strong className="choices-type">Choices:</strong>
                <ul>
                  {question.choices.map((choice, i) => (
                    <li key={i}>{choice}</li>
                  ))}
                </ul>
              </div>
            )}
            <p>
              <strong className="correct-answer">Correct Answer:</strong>{" "}
              {question.correctAnswer}
            </p>
            {question.explanation && (
              <p className="question-explanation">
                <strong className="explanation">Explanation:</strong>{" "}
                {question.explanation}
              </p>
            )}
            <div className="question-actions">
              <Link to={`/edit-question/${question._id}`} state={{ from }}>
                <BasicButton
                  value="Edit"
                  style={{
                    background: "#6FCF97",
                    color: "white",
                    border: "none",
                  }}
                />
              </Link>
              <BasicButton
                value="Delete"
                onClick={() => deleteQuestion(question._id)}
                style={{ background: "coral", color: "white", border: "none" }}
              />
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}

export default QuestionTemplate;
