import * as React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
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

  // Format the date
  const formattedDate = dateCreated
    ? format(new Date(dateCreated), "MMMM d, yyyy")
    : "";

  // Determine badge color based on status
  const badgeColor = status === "active" ? "success" : "error";
  const badgeText = status === "active" ? "Active" : "Inactive";

  // Function to handle delete button click
  const handleDeleteClick = (event) => {
    event.stopPropagation(); // Prevent the card click from firing
    if (
      onDelete &&
      window.confirm("Are you sure you want to delete this quiz?")
    ) {
      onDelete();
    }
  };

  // Function to handle edit button click
  const handleEditClick = (event) => {
    event.stopPropagation(); // Prevent the card click from firing
    navigate(`/edit-quiz/${quizId}`);
  };

  // Function to handle view questions button click
  const handleViewQuestionsClick = (event) => {
    event.stopPropagation(); // Prevent the card click from firing
    navigate(`/question-form/${quizId}`);
  };

  // Handle card click to navigate to the quiz page
  const handleCardClick = () => {
    navigate(`/quiz/${quizId}`, { state: { from: "home" } });
  };

  return (
    <Card
      sx={{
        width: 280,
        position: "relative",
        border: "1px solid #ccc",
        minHeight: 450,
      }}
      onClick={handleCardClick} // Navigate to quiz on card click
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
          {description ? description : "No Description is available.....!!"}
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
        {/* Badge for status */}
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
