import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BasicButton from "../../../components/BasicButton";
import { useLocale } from "antd/es/locale";

function QuestionTemplate({ quizQuestions, deleteQuestion }) {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;
  return (
    <div>
      {quizQuestions.map((question, index) => (
        <details
          key={index}
          style={{
            marginBottom: "1em",
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <summary
            style={{
              fontSize: "1.2em",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {question.questionText}
          </summary>
          <div style={{ marginTop: "10px" }}>
            {question.questionType === "multiple-choice" && (
              <div>
                <strong>Choices:</strong>
                <ul style={{ paddingLeft: "20px", marginTop: "5px" }}>
                  {question.choices.map((choice, i) => (
                    <li key={i} style={{ marginBottom: "5px" }}>
                      {choice}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p>
              <strong>Correct Answer:</strong> {question.correctAnswer}
            </p>
            {question.explanation && (
              <p style={{ marginTop: "10px" }}>
                <strong>Explanation:</strong> {question.explanation}
              </p>
            )}
            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
              <Link to={`/edit-question/${question._id}`} state={{ from }}>
                <BasicButton
                  value="Edit"
                  style={{ padding: "5px 10px", border: "none" }}
                />
              </Link>
              <BasicButton
                value="Delete"
                onClick={() => deleteQuestion(question._id)}
                style={{
                  padding: "5px 10px",
                  border: "none",
                }}
              />
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}

export default QuestionTemplate;
