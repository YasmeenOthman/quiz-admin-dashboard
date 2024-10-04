// components/EditQuizForm.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BasicButton from "../../../components/BasicButton";
import "./editquiz.scss";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const EditQuizForm = () => {
  const { quizId } = useParams(); // Get quizId from URL parameters
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    category: { name: "" },
    imageUrl: "",
    status: "active",
  });

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/quiz-login");
    }
  }, []);

  // Fetch quiz details by ID
  async function fetchQuizData() {
    try {
      const response = await axios.get(`${serverUrl}/quiz/${quizId}`);
      setQuizData(response.data);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  }
  useEffect(() => {
    fetchQuizData();
  }, [quizId]);

  // Handle input changes and update the state
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoryName") {
      setQuizData({
        ...quizData,
        category: { ...quizData.category, name: value },
      });
    } else {
      setQuizData({ ...quizData, [name]: value });
    }
  };

  // Handle form submission to update the quiz
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.put(`${serverUrl}/quiz/${quizId}`, quizData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setQuizData(res.data);

      alert("Quiz updated successfully!");
      navigate("/home"); // Redirect to the quiz management page
    } catch (error) {
      console.error("Error updating quiz:", error);
      alert(`Error updating quiz ${error.response.data.error}`);
    }
  };

  return (
    <div className="edit-quiz-form-container">
      <div className="edit-quiz-form-title-container">
        <h1>Edit Quiz</h1>
      </div>
      <form onSubmit={handleSubmit} className="edit-quiz-form">
        <div className="edit-inputs-label-container">
          <label className="edit-form-label">Title</label>
          <input
            type="text"
            name="title"
            value={quizData.title}
            onChange={handleChange}
            required
            className="edit-form-input"
          />
        </div>
        <div className="edit-inputs-label-container">
          <label className="edit-form-label">Description</label>
          <textarea
            name="description"
            value={quizData.description}
            onChange={handleChange}
            className="edit-form-textarea"
          />
        </div>
        <div className="edit-inputs-label-container">
          <label className="edit-form-label">Category</label>
          <input
            type="text"
            name="categoryName"
            value={quizData.category?.name || ""}
            onChange={handleChange}
            required
            className="edit-form-input"
          />
        </div>
        <div className="edit-inputs-label-container">
          <label className="edit-form-label">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={quizData.imageUrl}
            onChange={handleChange}
            className="edit-form-input"
          />
        </div>
        <div className="edit-inputs-label-container">
          <label className="edit-form-label">Status</label>
          <select
            name="status"
            value={quizData.status}
            onChange={handleChange}
            className="edit-form-input edit-form-select"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="edit-form-btn-container">
          <BasicButton value="Save Changes" type="submit" />
          <BasicButton value="Cancel" onClick={() => navigate("/home")} />
        </div>
      </form>
    </div>
  );
};

export default EditQuizForm;
