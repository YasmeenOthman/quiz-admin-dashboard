// components/EditQuestionForm.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BasicButton from "../../components/BasicButton";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const EditQuestionForm = () => {
  const { questionId } = useParams(); // Retrieve questionId from the URL
  const navigate = useNavigate();

  // Define the state to hold the question data
  const [questionData, setQuestionData] = useState({
    questionText: "",
    questionType: "multiple-choice",
    choices: ["", "", "", ""], // Assuming 4 choices for multiple-choice
    correctAnswer: "",
    explanation: "",
    quiz: "", // Track the quiz ID this question belongs to
  });

  // Fetch question details by ID when component mounts
  useEffect(() => {
    async function fetchQuestionData() {
      try {
        const res = await axios.get(`${serverUrl}/question/${questionId}`);
        setQuestionData(res.data); // Set fetched data to state
      } catch (error) {
        console.error("Error fetching question data:", error);
      }
    }

    fetchQuestionData();
  }, [questionId]);

  // Handle input changes and update the state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({ ...questionData, [name]: value });
  };

  // Handle choice changes for multiple-choice questions
  const handleChoiceChange = (index, value) => {
    const updatedChoices = questionData.choices.map((choice, i) =>
      i === index ? value : choice
    );
    setQuestionData({ ...questionData, choices: updatedChoices });
  };

  // Handle selection of the correct answer
  const handleCorrectAnswerChange = (value) => {
    setQuestionData({ ...questionData, correctAnswer: value });
  };

  // Handle form submission to update the question
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${serverUrl}/question/${questionId}`, questionData);
      alert("Question updated successfully!");
      navigate(`/question-form/${questionData.quiz}`); // Redirect to quiz page
    } catch (error) {
      console.error("Error updating question:", error);
      alert("Error updating question");
    }
  };

  return (
    <div>
      <h1>Edit Question</h1>
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
                  checked={questionData.correctAnswer === choice}
                />
                {questionData.correctAnswer === choice && (
                  <label>Correct Answer</label>
                )}
              </div>
            ))}
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

        <BasicButton value="Save Changes" type="submit" />
        <BasicButton
          value="Cancel"
          type="button"
          onClick={() => navigate(`/question-form/${questionData.quiz}`)}
        />
      </form>
    </div>
  );
};

export default EditQuestionForm;
