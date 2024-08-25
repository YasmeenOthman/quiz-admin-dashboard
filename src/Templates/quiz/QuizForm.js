import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BasicButton from "../../components/BasicButton";

const serverUrl = process.env.REACT_APP_SERVER_URL;
// Initial state for the quiz form
const newQuizData = {
  title: "",
  description: "",
  categoryName: "",
  imageUrl: "",
  status: "active", // Default status set to "active"
};

const QuizForm = () => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(newQuizData);
  const [quizzez, setQuizzez] = useState([]);

  // Handle input changes and update the corresponding field in quizData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData({ ...quizData, [name]: value });
  };

  // Function to create a new quiz by sending a POST request
  const createQuiz = async () => {
    try {
      // Make a POST request to the server to create a new quiz
      let quizCreated = await axios.post(`${serverUrl}/quiz`, quizData);

      setQuizzez([...quizzez, quizCreated.data]);

      // Navigate to the question form page with the new quiz ID
      navigate(`/questionForm/${quizCreated.data._id}`);
    } catch (error) {
      console.log(error.response.data.msg);
      alert("You should first create the quiz");
    }
  };

  return (
    <div>
      <h1>New Quiz</h1>

      <form>
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
          <label>image</label>
          <input
            type="text"
            name="imageUrl"
            value={quizData.imageUrl}
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
            value={quizData.categoryName}
            onChange={handleChange}
            required
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
          <BasicButton value="Prev" onClick={() => navigate("/")} />
          {/* Button to submit the form and create the quiz */}
          <BasicButton value="Next" onClick={createQuiz} />
        </div>
      </form>
    </div>
  );
};

export default QuizForm;
