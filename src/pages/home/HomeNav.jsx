import React from "react";
import { Link } from "react-router-dom";

function HomeNav() {
  return (
    <div className="navbar-container">
      <nav className="home-nav">
        <Link to="/" className="home-logo">
          QuiziGo
        </Link>

        <ul className="home-nav-list">
          <li className="home-nav-list-item">
            <Link to="/quizzes" className="home-nav-list-item-link">
              Quizzez
            </Link>
          </li>
          <li className="home-nav-list-item">
            <Link to="/categories" className="home-nav-list-item-link">
              Categories
            </Link>
          </li>
          <li className="home-nav-list-item">
            <Link to="/create-quiz" className="home-nav-list-item-link">
              Create new Quiz
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default HomeNav;
