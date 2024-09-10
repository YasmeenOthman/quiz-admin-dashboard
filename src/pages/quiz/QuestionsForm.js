import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import BasicButton from "../../components/BasicButton";
import MultipleChoiceInput from "../../components/MultipleChoiceInput";

// Base URL for server API
const serverUrl = process.env.REACT_APP_SERVER_URL;

// Initial state structure for a new question
const initialQuestionData = {
  questionText: "",
  questionType: "multiple-choice",
  choices: ["", "", "", ""], // Assume 4 choices by default for multiple-choice
  correctAnswer: "",
  explanation: "",
};

function QuestionsForm() {
  const { quizId } = useParams(); // Get quizId from URL parameters
  const navigate = useNavigate();
  const location = useLocation();
  const [questionData, setQuestionData] = useState(initialQuestionData); // State for the question form data
  const [quiz, setQuiz] = useState({}); // State for the quiz details
  const [quizQuestions, setQuizQuestions] = useState([]); // State for the list of questions in the quiz
  const [isCreatingQuestion, setIsCreatingQuestion] = useState(false); // State to toggle question creation form

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
    const { name, value } = e.target;
    setQuestionData({ ...questionData, [name]: value });
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
      let { questionText, questionType, choices, correctAnswer, explanation } =
        questionData;
      let newQuestion = {
        questionText,
        questionType,
        choices,
        correctAnswer,
        explanation,
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
    <>
      <h1>Quiz : {quiz.title}</h1>
      {/* Toggle the form to create a new question */}
      <BasicButton
        value="Create A New Question"
        onClick={() => setIsCreatingQuestion(!isCreatingQuestion)}
      />
      {/* Conditional rendering of the question creation form */}
      {isCreatingQuestion && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Question Text</label>
            <input
              type="text"
              name="questionText"
              value={questionData.questionText}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Question Type</label>
            <select
              name="questionType"
              value={questionData.questionType}
              onChange={handleChange}
            >
              <option value="multiple-choice">Multiple Choice</option>
              <option value="true-false">True/False</option>
            </select>
          </div>

          {/* Conditional rendering for multiple-choice inputs */}
          {questionData.questionType === "multiple-choice" && (
            <div>
              <label>Choices</label>
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
            <div>
              <label>Choices</label>
              <div>
                <input
                  type="radio"
                  name="correctAnswer"
                  value="True"
                  onChange={() => handleCorrectAnswerChange("True")}
                  checked={questionData.correctAnswer === "True"}
                />
                <label>True</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="correctAnswer"
                  value="False"
                  onChange={() => handleCorrectAnswerChange("False")}
                  checked={questionData.correctAnswer === "False"}
                />
                <label>False</label>
              </div>
            </div>
          )}

          <div>
            <label>Explanation</label>
            <textarea
              name="explanation"
              value={questionData.explanation}
              onChange={handleChange}
            />
          </div>
          <BasicButton value="Add Question" type="submit" />
        </form>
      )}
      {/* Render the list of questions */}
      <h2>Questions</h2>
      {quizQuestions.length === 0 ? (
        <h3>No questions</h3>
      ) : (
        <>
          {" "}
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
                <div
                  style={{ marginTop: "10px", display: "flex", gap: "10px" }}
                >
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
        </>
      )}
    </>
  );
}

export default QuestionsForm;
