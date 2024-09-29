import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryCard from "../../components/categorycard/CategoryCard";
import { useNavigate } from "react-router-dom";

const serverUrl = process.env.REACT_APP_SERVER_URL;
function CategoryList() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/quiz-login");
    }
  }, []);
  async function getAllCategories() {
    try {
      let res = await axios.get(`${serverUrl}/category`);
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div>
      <h1>cateogories List</h1>
      <div>
        {categories.map((category) => {
          return (
            <CategoryCard
              key={category._id}
              quizCount={category.quizzes.length}
              categoryName={category.name}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CategoryList;
