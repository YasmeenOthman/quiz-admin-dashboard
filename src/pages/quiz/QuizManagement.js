// pages/QuizManagement.jsx

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import BasicButton from "../../components/BasicButton";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const QuizManagement = () => {
  const navigate = useNavigate();
  const [quizzez, setQuizzez] = useState([]);
  const [filteredQuizzez, setFilteredQuizzez] = useState([]);
  const [decoded, setDecoded] = useState(null);
  let token = null;

  // useEffect hook to check for authentication token
  // If token is missing, the user is redirected to the login page
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/quiz-login");
    } else {
      token = localStorage.getItem("authToken");
      setDecoded(jwtDecode(token)); // Decode the JWT token to get user details
    }
  }, []);

  // useEffect hook to fetch all quizzes when the component mounts
  useEffect(() => {
    getAllQuizzez();
  }, []);

  // Function to fetch all quizzes from the server
  // The quizzes are reversed so the latest ones appear first
  async function getAllQuizzez() {
    try {
      const allQuizzez = await axios.get(`${serverUrl}/quiz`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const reversedQuizzes = allQuizzez.data.reverse();
      setQuizzez(reversedQuizzes);
      setFilteredQuizzez(reversedQuizzes);
    } catch (error) {
      console.log(error);
      // if (error.response.status === 401) {
      //   alert("Session expired,please login again ");
      //   navigate("/quiz-login");
      // }
    }
  }

  return (
    <div>
      <h1>Quiz Management</h1>
      <div>
        <Link to="/create-quiz">
          <BasicButton value="Create New Quiz" />
        </Link>
        <Link to="/quizzes">
          <BasicButton value={"Explore All Quizzez"} />
        </Link>
        <Link to="/categories">
          <BasicButton value={"Explore All Categories"} />
        </Link>
      </div>
    </div>
  );
};

export default QuizManagement;
