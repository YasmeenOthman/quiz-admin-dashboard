import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import BasicButton from "../../components/BasicButton"; // Assuming you have this component

const serverUrl = process.env.REACT_APP_SERVER_URL;

function QuizPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/quiz-login");
    }
  }, []);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const res = await axios.get(`${serverUrl}/quiz/${quizId}`);
        setQuiz(res.data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    }
    fetchQuiz();
  }, [quizId]);

  const deleteQuestion = async (questionId) => {
    // Handle question deletion logic here
    try {
      await axios.delete(`${serverUrl}/question/${questionId}`);
      setQuiz((prevQuiz) => ({
        ...prevQuiz,
        questions: prevQuiz.questions.filter(
          (question) => question._id !== questionId
        ),
      }));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{quiz.title}</h1>
      <p>{quiz.description}</p>
      {quiz.imageUrl && <img src={quiz.imageUrl} alt={quiz.title} />}
      <p>Category: {quiz.category?.name}</p>
      <p>Status: {quiz.status}</p>
      <p>Date Created: {new Date(quiz.dateCreated).toLocaleDateString()}</p>
      <p>Created By: {quiz.createdBy?.name}</p>
      <h2>Questions</h2>
      {quiz.questions.length > 0 ? (
        quiz.questions.map((question, index) => (
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
              <p>
                <strong>Correct Answer:</strong> {question.correctAnswer}
              </p>
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
              {question.explanation && (
                <p style={{ marginTop: "10px" }}>
                  <strong>Explanation:</strong> {question.explanation}
                </p>
              )}
              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <Link to={`/edit-question/${question._id}`}>
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
        ))
      ) : (
        <p>No questions available for this quiz.</p>
      )}
    </div>
  );
}

export default QuizPage;
