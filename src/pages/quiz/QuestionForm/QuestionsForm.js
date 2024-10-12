import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./questionform.scss";
import BasicButton from "../../../components/BasicButton";
import MultipleChoiceInput from "./MultipleChoiceInput";
import QuestionTemplate from "./QuestionTemplate";
import TrueFalseInput from "./TrueFalseInput";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

// Base URL for server API
const serverUrl = process.env.REACT_APP_SERVER_URL;

// Initial state structure for a new question
const initialQuestionData = {
  questionText: "",
  questionType: "multiple-choice",
  choices: ["", "", "", ""], // Assume 4 choices by default for multiple-choice
  correctAnswer: "",
  explanation: "",
  hasEquation: false,
  equation: "",
};

function QuestionsForm() {
  const { quizId } = useParams(); // Get quizId from URL parameters
  const navigate = useNavigate();
  const location = useLocation();
  const [questionData, setQuestionData] = useState(initialQuestionData); // State for the question form data
  const [quiz, setQuiz] = useState({}); // State for the quiz details
  const [quizQuestions, setQuizQuestions] = useState([]); // State for the list of questions in the quiz
  const [isCreatingQuestion, setIsCreatingQuestion] = useState(false); // State to toggle question creation form
  const [questionBody, setQuestionBody] = useState(false);
  const from = location.state?.from;

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/quiz-login");
    }
  }, []);

  // Fetch quiz details by ID
  async function getQuizById() {
    let res = await axios.get(`${serverUrl}/quiz/${quizId}`);
    setQuiz(res.data); // Set the quiz data
    setQuizQuestions(res.data.questions.reverse()); // Set the list of questions in the quiz
  }

  // Fetch quiz data when component mounts
  useEffect(() => {
    getQuizById();
  }, []);

  // Handle changes in the form input fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQuestionData({
      ...questionData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle changes in the multiple-choice options
  const handleChoiceChange = (index, value) => {
    const updatedChoices = questionData.choices.map((choice, i) =>
      i === index ? value : choice
    );
    setQuestionData({ ...questionData, choices: updatedChoices }); // Update the choices array
  };

  // Handle changes in the correct answer
  const handleCorrectAnswerChange = (value) => {
    setQuestionData({ ...questionData, correctAnswer: value }); // Update the correct answer
  };

  // Handle form submission to add a new question
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!questionData.correctAnswer) {
      alert("Please select the correct answer.");
      return;
    }

    // Check if all multiple-choice options are filled in
    if (
      questionData.questionType === "multiple-choice" &&
      questionData.choices.some((choice) => !choice)
    ) {
      alert("Please fill in all the choices.");
      return;
    }

    try {
      let {
        questionText,
        questionType,
        choices,
        correctAnswer,
        explanation,
        hasEquation,
        equation,
      } = questionData;

      let newQuestion = {
        questionText,
        questionType,
        choices,
        correctAnswer,
        explanation,
        hasEquation,
        equation,
        quizId,
      };
      const response = await axios.post(`${serverUrl}/question`, newQuestion);
      alert(response.data.msg);
      getQuizById();
      setQuestionData(initialQuestionData);
    } catch (error) {
      alert(`Error adding question: ${error.response.data.msg}`);
    }
  };

  // Delete a question by its ID
  async function deleteQuestion(id) {
    try {
      if (window.confirm("Delete the question?")) {
        let res = await axios.delete(`${serverUrl}/question/${id}`);
        // Remove the deleted question from the state
        setQuizQuestions(
          quizQuestions.filter((question) => question._id !== id)
        );
        alert(res.data.msg);
      }
    } catch (error) {
      alert(error.response.data);
    }
  }

  return (
    <div className="question-form-container">
      <div className="question-form-title-container">
        <div>
          <h1>Quiz : {quiz.title}</h1>
          <OpenInNewIcon
            onClick={() => navigate(`/quiz/${quizId}`)}
            sx={{ color: "#2D9CDB", marginLeft: "15px" }}
          />
        </div>
        {/* Toggle the form to create a new question */}
        <BasicButton
          value="Create A New Question"
          onClick={() => setIsCreatingQuestion(!isCreatingQuestion)}
          style={{ background: "white" }}
        />
      </div>

      {/* Conditional rendering of the question creation form */}
      {isCreatingQuestion && (
        <form className="question-form" onSubmit={handleSubmit}>
          <div className="inputs-label-container">
            <label className="form-label">Question Text</label>
            <input
              type="text"
              name="questionText"
              value={questionData.questionText}
              placeholder="What is ..........? "
              onChange={handleChange}
              required
              className="form-input"
            />
            <div style={{ width: "100%", fontSize: ".7rem" }} className="code">
              <label style={{ color: "coral" }} className="form-label">
                Does this question have an equation or code?
              </label>
              <input
                type="checkbox"
                name="hasEquation"
                checked={questionData.hasEquation}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Conditionally render input for code or equation */}
          {questionData.hasEquation && (
            <div className="inputs-label-container">
              <label className="form-label">Add Code or Equation</label>
              <textarea
                name="equation"
                value={questionData.equation}
                onChange={handleChange}
                placeholder="Insert code or equation here"
                className="form-input"
              />
            </div>
          )}
          <div className="inputs-label-container">
            <label className="form-label">Question Type</label>
            <select
              name="questionType"
              value={questionData.questionType}
              onChange={handleChange}
              className="form-input"
            >
              <option value="multiple-choice">Multiple Choice</option>
              <option value="true-false">True/False</option>
            </select>
          </div>
          {/* Conditional rendering for multiple-choice inputs */}
          {questionData.questionType === "multiple-choice" && (
            <div className="inputs-label-container multiple-choices-container">
              <label className="form-label">Choices</label>
              <MultipleChoiceInput
                choices={questionData.choices}
                correctAnswer={questionData.correctAnswer}
                onChoiceChange={handleChoiceChange}
                onCorrectAnswerChange={handleCorrectAnswerChange}
              />
            </div>
          )}
          {/* Conditional rendering for true/false inputs */}
          {questionData.questionType === "true-false" && (
            <div className="inputs-label-container">
              <label className="form-label">Choices</label>
              <TrueFalseInput
                handleCorrectAnswerChange={handleCorrectAnswerChange}
                correctAnswer={questionData.correctAnswer}
              />
            </div>
          )}
          <div className="inputs-label-container">
            <label className="form-label">Explanation</label>
            <textarea
              name="explanation"
              value={questionData.explanation}
              onChange={handleChange}
              className="question-form-textarea "
            />
          </div>
          <div className="button-container">
            <BasicButton value="Add Question" type="submit" />
          </div>
        </form>
      )}

      {/* Render the list of questions */}
      <div className="questions-container">
        <div className="questions-container-title">
          <h2 className="title">Questions</h2>
          <h3 className="total">Total :{quizQuestions.length} </h3>
        </div>

        {quizQuestions.length === 0 ? (
          <h3 className="no-questions-msg">No questions .....</h3>
        ) : (
          <QuestionTemplate
            quizQuestions={quizQuestions}
            deleteQuestion={deleteQuestion}
          />
        )}
      </div>
    </div>
  );
}

export default QuestionsForm;
