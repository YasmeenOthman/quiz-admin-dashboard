import React from "react";
import { Link } from "react-router-dom";

function HomeNav() {
  return (
    <div className="navbar-container">
      <nav className="home-nav">
        <ul className="home-nav-list">
          <li className="home-nav-list-item">
            <Link to="#stats" className="home-nav-list-item-link">Stats</Link>
          </li>
          <li className="home-nav-list-item">
            <Link to="#last-added-quizzes" className="home-nav-list-item-link">Last Added Quizzes</Link>
          </li>
          <li className="home-nav-list-item">
            <Link to="#categories" className="home-nav-list-item-link">Last Created Categories</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default HomeNav;
