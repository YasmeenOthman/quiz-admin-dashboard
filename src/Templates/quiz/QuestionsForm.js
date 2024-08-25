import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BasicButton from "../../components/Button";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const initialQuestionData = {
  questionText: "",
  questionType: "multiple-choice",
  choices: ["", "", "", ""], // Assume 4 choices by default for multiple-choice
  correctAnswer: "",
  explanation: "",
};

function QuestionsForm() {
  const { quizId } = useParams();
  const [questionData, setQuestionData] = useState(initialQuestionData);
  const [quiz, setQuiz] = useState({});
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [isCreatingQuestion, setIsCreatingQuestion] = useState(false);

  async function getQuizById() {
    let res = await axios.get(`${serverUrl}/quiz/${quizId}`);
    setQuiz(res.data);
    setQuizQuestions(res.data.questions);
  }

  useEffect(() => {
    getQuizById();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({ ...questionData, [name]: value });
  };

  const handleChoiceChange = (index, value) => {
    const updatedChoices = questionData.choices.map((choice, i) =>
      i === index ? value : choice
    );
    setQuestionData({ ...questionData, choices: updatedChoices });
  };

  const handleCorrectAnswerChange = (value) => {
    setQuestionData({ ...questionData, correctAnswer: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if correctAnswer is selected
    if (!questionData.correctAnswer) {
      alert("Please select the correct answer.");
      return;
    }

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
    try {
      const response = await axios.post(
        `http://localhost:4000/api/question`,
        newQuestion
      );
      console.log("Question added:", response.data);

      // Add the new question to the list of quiz questions
      setQuizQuestions([...quizQuestions, response.data]);

      // Clear the form
      setQuestionData(initialQuestionData);
    } catch (error) {
      console.error("Error adding question:", error.response.data);
    }
  };

  return (
    <>
      <h1>Quiz : {quiz.title}</h1>
      <BasicButton
        value="Create A New Question"
        onClick={() => setIsCreatingQuestion(!isCreatingQuestion)}
      />

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

          {questionData.questionType === "multiple-choice" && (
            <div>
              <label>Choices</label>
              {questionData.choices.map((choice, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={choice}
                    onChange={(e) => handleChoiceChange(index, e.target.value)}
                    placeholder={`Choice ${index + 1}`}
                    required
                  />
                  <input
                    type="radio"
                    name="correctAnswer"
                    onChange={() => handleCorrectAnswerChange(choice)}
                    checked={
                      questionData.correctAnswer &&
                      questionData.correctAnswer === choice
                    }
                  />
                  {questionData.correctAnswer &&
                    questionData.correctAnswer === choice && (
                      <label>Correct Answer</label>
                    )}
                </div>
              ))}
            </div>
          )}

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

          <input type="submit" value="Add Question" />
        </form>
      )}
      {/* Render questions */}
      <h2>Questions</h2>
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
            style={{ fontSize: "1.2em", fontWeight: "bold", cursor: "pointer" }}
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
              <BasicButton
                value="Edit"
                style={{ padding: "5px 10px", border: "none" }}
              />

              <BasicButton
                value="Delete"
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
  );
}

export default QuestionsForm;
