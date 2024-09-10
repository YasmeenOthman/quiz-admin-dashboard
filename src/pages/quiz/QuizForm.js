import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import BasicButton from "../../components/BasicButton";
import BasicModal from "../../components/Modal";

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
    <>
      <h1>New Quiz</h1>

      <form>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={quizData.title}
            onChange={handleChange}
            placeholder="Quiz Title.."
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
            placeholder="Quiz Image.."
            required
          />
        </div>
        <div>
          <label>Category</label>
          <input
            type="text"
            name="categoryName"
            value={quizData.categoryName}
            onChange={handleChange}
            placeholder="Quiz Category.."
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={quizData.description}
            onChange={handleChange}
            placeholder="Quiz Description / optional.."
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
          {/* Button to submit the form and create the quiz */}
          <BasicButton value="Save Quiz" onClick={createQuiz} />
          <BasicButton value="Cancel" onClick={() => navigate("/")} />
        </div>
        {isQuizSaved && <BasicModal quizId={quizId} />}
      </form>
    </>
  );
};

export default QuizForm;
