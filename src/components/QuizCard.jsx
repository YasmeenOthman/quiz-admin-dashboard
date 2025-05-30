import React from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import "./QuizCard.scss";

const QuizCard = ({
  title,
  description,
  imageUrl,
  dateCreated,
  numberOfQuestions,
  quizId,
  categoryName,
  status,
  onDelete,
}) => {
  const navigate = useNavigate();

  const formattedDate = dateCreated
    ? format(new Date(dateCreated), "MMMM d, yyyy")
    : "";

  const badgeClass = status === "active" ? "badge active" : "badge inactive";

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      onDelete(quizId);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/edit-quiz/${quizId}`);
  };

  const handleViewQuestions = (e) => {
    e.stopPropagation();
    navigate(`/question-form/${quizId}`);
  };

  const handleReadMore = (e) => {
    e.stopPropagation();
    navigate(`/quiz/${quizId}`, { state: { from: "home" } });
  };

  const { truncated, needsReadMore } = (() => {
    if (!description)
      return {
        truncated: "No Description is available.",
        needsReadMore: false,
      };
    const words = description.split(" ");
    if (words.length > 10) {
      return {
        truncated: words.slice(0, 10).join(" ") + "...",
        needsReadMore: true,
      };
    }
    return { truncated: description, needsReadMore: false };
  })();

  return (
    <div
      className="quiz-card"
      onClick={() => navigate(`/quiz/${quizId}`, { state: { from: "home" } })}
    >
      <img
        src={imageUrl || "/images/quiz.avif"}
        alt="Quiz"
        className="quiz-card-image"
      />

      <div className="quiz-card-content">
        <h3 className="quiz-card-title">{title}</h3>
        <div className="quiz-card-meta">
          {categoryName && <span>{categoryName}</span>}
          {formattedDate && <span>{formattedDate}</span>}
        </div>
        <p className="quiz-card-description">
          {truncated}
          {needsReadMore && (
            <span className="read-more" onClick={handleReadMore}>
              Read more
            </span>
          )}
        </p>
        <p className="quiz-card-questions">
          Total questions: {numberOfQuestions}
        </p>
      </div>

      <div className="quiz-card-footer">
        <button className="btn delete" onClick={handleDelete} title="Delete Quiz">
          <FaTrashAlt />
        </button>
        <button className="btn edit" onClick={handleEdit} title="Edit Quiz">
          <FaEdit />
        </button>
        <button className="btn view" onClick={handleViewQuestions} title="View Questions">
          <MdOutlineRemoveRedEye />
        </button>
        <span className={badgeClass}>
          {status === "active" ? "Active" : "Inactive"}
        </span>
      </div>
    </div>
  );
};

export default QuizCard;
