import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import BasicButton from "../../../components/BasicButton";
import MultipleChoiceInput from "./MultipleChoiceInput";
import TrueFalseInput from "./TruefalseInput";
import "./editquestion.scss";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const EditQuestionForm = () => {
  const location = useLocation();
  const { questionId } = useParams();

  const from = location.state?.from;
  const navigate = useNavigate();

  const [questionData, setQuestionData] = useState({
    questionText: "",
    questionType: "multiple-choice", // Default to multiple-choice
    choices: ["", "", "", ""],
    correctAnswer: "",
    explanation: "",
    quiz: "",
    equation: "",
    hasEquation: "",
  });

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/quiz-login");
    }
  }, []);

  // fetch the question data to edit

  useEffect(() => {
    async function fetchQuestionData() {
      try {
        const res = await axios.get(`${serverUrl}/question/${questionId}`);
        setQuestionData(res.data);
      } catch (error) {
        console.error("Error fetching question data:", error);
      }
    }

    fetchQuestionData();
  }, [questionId]);

  // inputs fileds changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the equation field is being updated, also set hasEquation accordingly
    if (name === "equation") {
      setQuestionData({
        ...questionData,
        [name]: value,
        hasEquation: value.trim() !== "", // Set hasEquation to true if equation is not empty
      });
    } else {
      setQuestionData({ ...questionData, [name]: value });
    }
  };

  // Handle input fileds for choices
  const handleChoiceChange = (index, value) => {
    const updatedChoices = questionData.choices.map((choice, i) =>
      i === index ? value : choice
    );
    setQuestionData({ ...questionData, choices: updatedChoices });
  };

  // correct answer
  const handleCorrectAnswerChange = (choice) => {
    setQuestionData({ ...questionData, correctAnswer: choice });
  };

  // send an update request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${serverUrl}/question/${questionId}`, questionData);
      alert("Question updated successfully!");
      navigate(`/quiz/${questionData.quiz}`);
    } catch (error) {
      console.error("Error updating question:", error);
      alert("Error updating question");
    }
  };

  // Handle cancel button click to navigate back without saving
  const handleCancel = () => {
    navigate(from ? from : `/quiz/${questionData.quiz}`);
  };

  return (
    <div className="question-form-container">
      <div className="question-form-title-container">
        <h1>Edit Question</h1>
      </div>

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
        </div>

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
            className="question-form-textarea"
          />
        </div>

        <div className="button-group">
          <BasicButton value="Update Question" type="submit" />
          <BasicButton
            value="Cancel"
            type="button"
            onClick={handleCancel}
            className="cancel-button"
            style={{
              background: "#ff7f50",
              color: "#F4F5F7",
              border: "1px solid #F4F5F7",
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default EditQuestionForm;
