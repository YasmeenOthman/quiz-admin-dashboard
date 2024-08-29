import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryCard from "../../components/CategoryCard";


const serverUrl = process.env.REACT_APP_SERVER_URL;
function CategoryList() {
  const [categories, setCategories] = useState([]);

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
