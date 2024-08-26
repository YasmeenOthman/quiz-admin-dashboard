import * as React from "react";
import { Link } from "react-router-dom";
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
import Tooltip from "@mui/material/Tooltip"; // Import Tooltip
import Badge from "@mui/material/Badge"; // Import Badge
import { format } from "date-fns";

const QuizCard = ({
  title,
  description,
  imageUrl,
  dateCreated,
  numberOfQuestions,
  quizId,
  categoryName,
  status, // New prop for quiz status
  onDelete,
}) => {
  // Format the date
  const formattedDate = format(new Date(dateCreated), "MMMM d, yyyy");

  // Determine badge color based on status
  const badgeColor = status === "active" ? "success" : "error";
  const badgeText = status === "active" ? "Active" : "Inactive";

  return (
    <Card sx={{ maxWidth: 300, position: "relative" }}>
      <CardMedia
        component="img"
        height="150"
        image={imageUrl}
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

            <Typography variant="caption" color="text.secondary">
              {formattedDate}
            </Typography>
          </div>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        {numberOfQuestions >= 0 && (
          <Typography variant="body2" color="text.secondary">
            Total questions: {numberOfQuestions}
          </Typography>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <Link to={`/edit-quiz/${quizId}`}>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title="View Questions">
          <Link to={`/question-form/${quizId}`}>
            <IconButton aria-label="view questions">
              <VisibilityIcon />
            </IconButton>
          </Link>
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
