import * as React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import { format } from "date-fns";

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

  const badgeColor = status === "active" ? "success" : "error";
  const badgeText = status === "active" ? "Active" : "Inactive";

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    if (
      onDelete &&
      window.confirm("Are you sure you want to delete this quiz?")
    ) {
      onDelete(quizId);
    }
  };

  const handleEditClick = (event) => {
    event.stopPropagation();
    navigate(`/edit-quiz/${quizId}`);
  };

  const handleViewQuestionsClick = (event) => {
    event.stopPropagation();
    navigate(`/question-form/${quizId}`);
  };

  const handleReadMoreClick = (event) => {
    event.stopPropagation(); // Prevent card click event
    navigate(`/quiz/${quizId}`, { state: { from: "home" } });
  };

  const truncatedContent = (text, maxLength) => {
    if (!text) return "No Description is available.....!!";
    const words = text.split(" ");
    if (words.length > maxLength) {
      return {
        truncated: words.slice(0, maxLength).join(" ") + "...",
        needsReadMore: true,
      };
    }
    return { truncated: text, needsReadMore: false };
  };

  const { truncated, needsReadMore } = truncatedContent(description, 10);

  return (
    <Card
      sx={{
        width: 280,
        position: "relative",
        border: "1px solid #ccc",
        minHeight: 450,
      }}
      onClick={() => navigate(`/quiz/${quizId}`, { state: { from: "home" } })}
    >
      <CardMedia
        component="img"
        height="150"
        image={imageUrl ? imageUrl : "../images/quiz.avif"}
        alt="Quiz image"
      />
      <CardHeader
        title={title}
        subheader={
          <div>
            {categoryName && (
              <Typography variant="body2" color="text.secondary">
                {categoryName}
              </Typography>
            )}
            {formattedDate && (
              <Typography variant="caption" color="text.secondary">
                {formattedDate}
              </Typography>
            )}
          </div>
        }
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            minHeight: "80px",
          }}
        >
          {truncated}
          {needsReadMore && (
            <a
              onClick={handleReadMoreClick}
              style={{ color: "#2D9CDB", cursor: "pointer", marginLeft: "5px" }}
            >
              Read more
            </a>
          )}
        </Typography>
        {numberOfQuestions >= 0 && (
          <Typography variant="body2" color="text.secondary">
            Total questions: {numberOfQuestions}
          </Typography>
        )}
      </CardContent>
      <CardActions disableSpacing>
        {onDelete && (
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={handleDeleteClick}>
              <DeleteIcon sx={{ color: "coral" }} />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title="Edit">
          <IconButton aria-label="edit" onClick={handleEditClick}>
            <EditIcon sx={{ color: "#6FCF97" }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="View Questions">
          <IconButton
            aria-label="view questions"
            onClick={handleViewQuestionsClick}
          >
            <VisibilityIcon sx={{ color: "#2D9CDB" }} />
          </IconButton>
        </Tooltip>
        <Badge
          badgeContent={badgeText}
          color={badgeColor}
          sx={{ position: "absolute", top: 16, right: 30 }}
        />
      </CardActions>
    </Card>
  );
};

export default QuizCard;
