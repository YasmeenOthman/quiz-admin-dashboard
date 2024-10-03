import * as React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
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
  const navigate = useNavigate(); // Create a navigate function

  // Format the date
  const formattedDate = dateCreated
    ? format(new Date(dateCreated), "MMMM d, yyyy")
    : "";

  // Determine badge color based on status
  const badgeColor = status === "active" ? "success" : "error";
  const badgeText = status === "active" ? "Active" : "Inactive";

  return (
    <Card
      sx={{
        width: 280,
        position: "relative",
        border: "1px solid #ccc",
        minHeight: 450,
      }}
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
            <IconButton aria-label="delete" onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title="Edit">
          <IconButton
            aria-label="edit"
            onClick={() => navigate(`/edit-quiz/${quizId}`)} // Use navigate for routing
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="View Questions">
          <IconButton
            aria-label="view questions"
            onClick={() =>
              navigate(`/question-form/${quizId}`, {
                state: { from: "quizManagement" },
              })
            } // Use navigate for routing
          >
            <VisibilityIcon />
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
