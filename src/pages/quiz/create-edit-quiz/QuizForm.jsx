import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./quizform.scss";
import BasicButton from "../../../components/BasicButton";
import BasicModal from "../../../components/Modal";

const serverUrl = import.meta.env.VITE_SERVER_URL;
// Initial state for the quiz form
const newQuizData = {
  title: "",
  description: "",
  categoryName: "",
  imageUrl: "",
  status: "active", // Default status set to "active"
};

const QuizForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(newQuizData);
  const [quizzez, setQuizzez] = useState([]);
  const [quizId, setQuizId] = useState(null);
  const [isQuizSaved, setIsQuizSaved] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/quiz-login");
    }
  }, []);
  // Extract the category name from the query parameter, if available
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    if (category) {
      setQuizData((prevState) => ({
        ...prevState,
        categoryName: category,
      }));
    }
  }, [location.search]);
  // Handle input changes and update the corresponding field in quizData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData({ ...quizData, [name]: value });
  };

  // Function to create a new quiz by sending a POST request
  const createQuiz = async () => {
    try {
      // Make a POST request to the server to create a new quiz
      let quizCreated = await axios.post(`${serverUrl}/quiz`, quizData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setQuizzez([...quizzez, quizCreated.data]);
      alert(quizCreated.data.msg);
      setQuizId(quizCreated.data.quiz._id);
      setIsQuizSaved(true);
    } catch (error) {
      console.log(error.response.data.msg);
      alert("All the quiz field are required");
    }
  };

  return (
    <div className="quiz-form-container">
      <div className="quiz-form-title-container">
        <Link to="/home" className="home-logo">
          QuiziGo
        </Link>
        <h4>Create New Quiz</h4>
      </div>

      <form className="quiz-form">
        <div className="inputs-label-container">
          <label className="form-label">Title : </label>
          <input
            type="text"
            name="title"
            value={quizData.title}
            onChange={handleChange}
            placeholder="Quiz Title.."
            required
            className="form-input"
          />
        </div>
        <div className="inputs-label-container">
          <label className="form-label">Image : </label>
          <input
            type="text"
            name="imageUrl"
            value={quizData.imageUrl}
            onChange={handleChange}
            placeholder="Quiz Image.."
            required
            className="form-input"
          />
        </div>
        <div className="inputs-label-container">
          <label className="form-label">Category : </label>
          <input
            type="text"
            name="categoryName"
            value={quizData.categoryName}
            onChange={handleChange}
            placeholder="Quiz Category.."
            required
            className="form-input"
          />
        </div>
        <div className="inputs-label-container">
          <label className="form-label">Description : </label>
          <textarea
            name="description"
            value={quizData.description}
            onChange={handleChange}
            placeholder="Quiz Description / optional.."
            className="form-textarea"
          />
        </div>
        <div className="inputs-label-container">
          <label className="form-label">Status :</label>
          <select
            name="status"
            value={quizData.status}
            onChange={handleChange}
            className="form-input form-select"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="form-btn-container">
          <BasicButton value="Save Quiz" onClick={createQuiz} />
          <BasicButton
            value="Cancel"
            onClick={() => navigate("/home")}
            style={{
              background: "#ff7f50",
              color: "#F4F5F7",
              border: "1px solid #F4F5F7",
            }}
          />
        </div>
        {isQuizSaved && <BasicModal quizId={quizId} />}
      </form>
    </div>
  );
};

export default QuizForm;
