import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import BasicButton from "./BasicButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ quizId }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    handleOpen(); // Open modal when quizId is passed
  }, [quizId]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Quiz Created Successfully!
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          What would you like to do next?
        </Typography>
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <BasicButton
            value="Back to Quiz Management"
            onClick={() => navigate("/")}
          />
          <BasicButton
            value="Next to Create Questions"
            onClick={() => {
              quizId
                ? navigate(`/question-form/${quizId}`)
                : alert("Please create & save the quiz first");
            }}
          />
        </div>
      </Box>
    </Modal>
  );
}
