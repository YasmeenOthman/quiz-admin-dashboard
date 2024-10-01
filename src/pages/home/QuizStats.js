import React, { useState } from "react";
import GroupIcon from "@mui/icons-material/Group";
import BarChartIcon from "@mui/icons-material/BarChart";
import TimerIcon from "@mui/icons-material/Timer";
import QuizIcon from "@mui/icons-material/Quiz";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./quizstats.scss"; // Add styling here

function QuizStats({ quizzes }) {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [stats, setStats] = useState({
    participants: 0,
    averageScore: 0,
    averageTime: 0,
  });

  const handleQuizSelect = (event) => {
    const selected = quizzes.find((quiz) => quiz._id === event.target.value);
    setSelectedQuiz(selected);
    // If you need to fetch the stats dynamically:
    // fetchQuizStats(selected._id);
  };

  // Define the array of stat objects
  const statsArray = [
    {
      icon: <GroupIcon />,
      title: "Participants",
      value: stats.participants,
      gradient: "linear-gradient(to left, #4b46a8,#43C6AC)",
    },
    {
      icon: <BarChartIcon />,
      title: "Average Score",
      value: stats.averageScore,
      gradient: "linear-gradient(to left, #FF7E5F, #FEB47B)",
    },
    {
      icon: <TimerIcon />,
      title: "Average Time",
      value: stats.averageTime,
      gradient: "linear-gradient(to left, #D4FC79, #96E6A1)",
    },
    {
      icon: <QuizIcon />,
      title: "Quiz Name",
      value: selectedQuiz ? selectedQuiz.title : "N/A",
      gradient: "linear-gradient(to left, #6A82FB, #FC5C7D)",
    },
  ];

  return (
    <div className="quiz-stats-section">
      <div className="quiz-stats-header">
        <h2 className="quiz-stats-title">Quiz Stats</h2>
        <Select
          value={selectedQuiz ? selectedQuiz._id : ""}
          onChange={handleQuizSelect}
          displayEmpty
          className="quiz-select-dropdown"
        >
          <MenuItem value="" disabled>
            Select Quiz
          </MenuItem>
          {quizzes.map((quiz) => (
            <MenuItem key={quiz._id} value={quiz._id}>
              {quiz.title}
            </MenuItem>
          ))}
        </Select>
      </div>

      {/* Iterate over the statsArray and render the cards */}
      <div className="quiz-stats-row">
        {statsArray.map((stat, index) => (
          <div className="quiz-stat-card" key={index}>
            <div
              style={{ backgroundImage: stat.gradient }}
              className="quiz-stat-card-icon"
            >
              {stat.icon}
            </div>
            <div className="quiz-stat-card-data">
              <h5 className="quiz-stat-card-title">{stat.title}</h5>
              <h3 className="quiz-stat-card-value">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizStats;
