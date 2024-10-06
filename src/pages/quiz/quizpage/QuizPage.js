import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import BasicButton from "../../../components/BasicButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import "./quizpage.scss";
import QuestionTemplate from "../QuestionForm/QuestionTemplate";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function QuizPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [viewQuestion, setViewQuestion] = useState(false);

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

  // ---- Handle  Quiz deletion ------
  const deleteQuiz = async () => {
    try {
      if (window.confirm("Are you sure you want to delete this quiz?")) {
        let res = await axios.delete(`${serverUrl}/quiz/${quizId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        alert(res.data.msg);
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  // ----- Handle question deletion ---------
  const deleteQuestion = async (questionId) => {
    try {
      if (
        window.confirm(
          "This question will be permanently deleted. Are you sure?"
        )
      ) {
        await axios.delete(`${serverUrl}/question/${questionId}`);
        setQuiz((prevQuiz) => ({
          ...prevQuiz,
          questions: prevQuiz.questions.filter(
            (question) => question._id !== questionId
          ),
        }));
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  function handleViewQuestions() {
    setViewQuestion(!viewQuestion);
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1 className="quiz-title">{quiz.title}</h1>
        <div>
          <Tooltip title="Edit">
            <Link to={`/edit-quiz/${quizId}`}>
              <IconButton aria-label="edit">
                <EditIcon sx={{ color: "white" }} />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={deleteQuiz}>
              <DeleteIcon sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div className="quiz-info">
        {quiz.imageUrl ? (
          <img src={quiz.imageUrl} alt={quiz.title} className="quiz-image" />
        ) : (
          <img
            src="../images/quiz.avif"
            alt={quiz.title}
            className="quiz-image"
          />
        )}
        <p className="quiz-description">
          {" "}
          <strong>Description: </strong>
          {quiz.description}
        </p>
        <p className="quiz-category">
          <strong>Category: </strong>
          {quiz.category?.name}
        </p>
        <p className="quiz-status">
          {" "}
          <strong>Status: </strong>
          {quiz.status}
        </p>
        <p className="quiz-date">
          {" "}
          <strong> Date Created:</strong>
          {new Date(quiz.dateCreated).toLocaleDateString()}
        </p>
        <p className="quiz-created-by">
          {" "}
          <strong> Created By:</strong> {quiz.createdBy?.email}
        </p>

        <div className="quiz-btn-container">
          <BasicButton
            value="New Question"
            type="button"
            onClick={() => navigate(`/question-form/${quizId}`)}
          />
          <BasicButton
            value={!viewQuestion ? "View Questions" : "Hide Question List"}
            type="button"
            onClick={handleViewQuestions}
          />
        </div>
      </div>
      {viewQuestion ? (
        quiz.questions.length > 0 ? (
          <QuestionTemplate
            quizQuestions={quiz.questions}
            deleteQuestion={deleteQuestion}
          />
        ) : (
          <div>No questions yet</div>
        )
      ) : null}
    </div>
  );
}

export default QuizPage;
