import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import BasicButton from "../../../components/BasicButton"; // Assuming you have this component
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip"; // Import Tooltip
import "./quizpage.scss"; // Import CSS file
import QuestionTemplate from "../QuestionForm/QuestionTemplate";

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

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1 className="quiz-title">{quiz.title}</h1>
        <div>
          <Tooltip title="Edit">
            <Link to={`/edit-quiz/${quizId}`}>
              <IconButton aria-label="edit">
                <EditIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={deleteQuiz}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <p className="quiz-description">{quiz.description}</p>
      {quiz.imageUrl && (
        <img src={quiz.imageUrl} alt={quiz.title} className="quiz-image" />
      )}
      <p className="quiz-category">
        <strong style={{ color: "coral" }}>Category: </strong>
        {quiz.category?.name}
      </p>
      <p className="quiz-status">
        {" "}
        <strong style={{ color: "coral" }}>Status: </strong>
        {quiz.status}
      </p>
      <p className="quiz-date">
        {" "}
        <strong style={{ color: "coral" }}> Date Created:</strong>
        {new Date(quiz.dateCreated).toLocaleDateString()}
      </p>
      <p className="quiz-created-by">
        {" "}
        <strong style={{ color: "coral" }}> Created By:</strong>{" "}
        {quiz.createdBy?.email}
      </p>

      <div>
        <BasicButton
          value="New Question"
          type="button"
          onClick={() => navigate(`/question-form/${quizId}`)}
        />
        <BasicButton
          value="View All Questions"
          type="button"
          onClick={() => navigate(`/question-form/${quizId}`)}
        />
      </div>
      <QuestionTemplate quizQuestions={quiz.questions} />
    </div>
  );
}

export default QuizPage;
