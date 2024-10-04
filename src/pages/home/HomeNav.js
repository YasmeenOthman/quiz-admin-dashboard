import React from "react";
import { Link } from "react-router-dom";

function HomeNav() {
  return (
    <div className="navbar-container">
      <nav className="home-nav">
        <h1> QuiziGo</h1>
        <ul className="home-nav-list">
          {/* <h1 className="home-welcome-message"> Home page</h1> */}

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
