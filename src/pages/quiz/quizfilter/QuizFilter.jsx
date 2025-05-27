import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./quizfilter.scss";
const serverUrl = import.meta.env.VITE_SERVER_URL;

const QuizFilter = ({ onFilterChange }) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/quiz-login");
    }
  }, []);
  useEffect(() => {
    async function getAllCategories() {
      try {
        let categoriesRes = await axios.get(`${serverUrl}/category`);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    getAllCategories();
  }, []);

  useEffect(() => {
    handleFilterChange();
  }, [category, status, title]); // Trigger filter change whenever category, status, or title changes

  const handleFilterChange = () => {
    onFilterChange({ category, status, title });
  };

  return (
    <div className="filter-container">
      <input
        className="filter-inputs"
        type="text"
        placeholder="Filter by title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <select
        className="filter-inputs"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      >
        <option value="">All Categories</option>
        {categories &&
          categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
      </select>
      <select
        className="filter-inputs"
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
        }}
      >
        <option value="">All Statuses</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
};

export default QuizFilter;
