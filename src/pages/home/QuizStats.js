import React, { useState } from "react";
import SummaryCard from "../../components/summarycard/SummaryCard";
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

      <div
        className="quiz-stats-row"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <SummaryCard
          title="Participants"
          value={stats.participants}
          Icon={GroupIcon}
        />
        <SummaryCard
          title="Average Score"
          value={stats.averageScore}
          Icon={BarChartIcon}
        />
        <SummaryCard
          title="Average Time"
          value={stats.averageTime}
          Icon={TimerIcon}
        />
        <SummaryCard
          title="Quiz Name"
          value={selectedQuiz ? selectedQuiz.title : "N/A"}
          Icon={QuizIcon}
        />
      </div>
    </div>
  );
}

export default QuizStats;
