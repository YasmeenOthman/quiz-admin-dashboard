// components/EditQuizForm.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BasicButton from "../../components/BasicButton";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const EditQuizForm = () => {
  const { quizId } = useParams(); // Get quizId from URL parameters
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
    status: "active",
  });

  // Fetch quiz details by ID
  useEffect(() => {
    async function fetchQuizData() {
      try {
        const response = await axios.get(`${serverUrl}/quiz/${quizId}`);
        setQuizData(response.data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    }

    fetchQuizData();
  }, [quizId]);
  console.log(quizData);
  // Handle input changes and update the state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData({ ...quizData, [name]: value });
  };

  // Handle form submission to update the quiz
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.put(`${serverUrl}/quiz/${quizId}`, quizData);
      console.log(res.data);
      alert("Quiz updated successfully!");
      navigate("/"); // Redirect to the quiz management page
    } catch (error) {
      console.error("Error updating quiz:", error);
      alert("Error updating quiz");
    }
  };

  return (
    <div>
      <h1>Edit Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={quizData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={quizData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Category</label>
          <input
            type="text"
            name="categoryName"
            value={quizData.category.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={quizData.imageUrl}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Status</label>
          <select name="status" value={quizData.status} onChange={handleChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <BasicButton value="Save Changes" type="submit" />
          <BasicButton value="Cancel" onClick={() => navigate("/")} />
        </div>
      </form>
    </div>
  );
};

export default EditQuizForm;
