import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container, Box } from "@mui/material";
import QuizForm from "./pages/quiz/QuizForm";
import QuestionsForm from "./pages/quiz/QuestionsForm";
import QuizManagement from "./pages/quiz/QuizManagement";
import EditQuizForm from "./pages/quiz/EditQuizForm";
import QuizList from "./pages/quiz/QuizList";
import EditQuestionForm from "./pages/quiz/EditQuestionForm";
import Sidebar from "./Templates/sidebar";
import QuizPage from "./pages/quiz/QuizPage";
import CategoryList from "./pages/category/CateogoryList";
import Login from "./pages/login/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Container
          disableGutters
          maxWidth={false}
          sx={{
            display: "grid",
            gridTemplateColumns: "250px 1fr",
            height: "100vh",
          }}
        >
          <Sidebar />
          <Box sx={{ padding: 2 }}>
            <Routes>
              <Route path="/quiz-login" element={<Login />} />
              <Route path="/" element={<QuizManagement />} />
              <Route path="/quizzes" element={<QuizList />} />
              <Route path="/quiz/:quizId" element={<QuizPage />} />
              <Route path="/create-quiz" element={<QuizForm />} />
              <Route
                path="/question-form/:quizId"
                element={<QuestionsForm />}
              />
              <Route path="/edit-quiz/:quizId" element={<EditQuizForm />} />
              <Route
                path="/edit-question/:questionId"
                element={<EditQuestionForm />}
              />
              <Route path="/categories" element={<CategoryList />} />
            </Routes>
          </Box>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
