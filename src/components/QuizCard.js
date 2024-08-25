// components/QuizCard.jsx
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

import { format } from "date-fns";

const QuizCard = ({
  title,
  description,
  imageUrl,
  dateCreated,
  numberOfQuestions,
  quizId,
}) => {
  // Format the date
  const formattedDate = format(new Date(dateCreated), "MMMM d, yyyy");

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        component="img"
        height="150"
        image={imageUrl}
        alt="Quiz image"
      />
      <CardHeader title={title} subheader={formattedDate} />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Total questions:{numberOfQuestions}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="View Questions">
          <Link to={`/question-form/${quizId}`}>
            <IconButton aria-label="view questions">
              <VisibilityIcon />
            </IconButton>
          </Link>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default QuizCard;
