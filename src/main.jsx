import React from "react";
import "./index.scss";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Container, Box } from "@mui/material";
import Sidebar from "./Templates/sidebar";
import Login from "./pages/login-register/Login";
import Register from "./pages/login-register/Register";
import Home from "./pages/home/Home";
import QuizList from "./pages/quiz/quizlist/QuizList";
import CategoryList from "./pages/category/CateogoryList";
import QuizForm from "./pages/quiz/create-edit-quiz/QuizForm";
import EditQuizForm from "./pages/quiz/create-edit-quiz/EditQuizForm";
import QuestionsForm from "./pages/quiz/QuestionForm/QuestionsForm";
import EditQuestionForm from "./pages/quiz/editquestion/EditQuestionForm";

import QuizPage from "./pages/quiz/quizpage/QuizPage";
import PrivateRoute from "./authRoutes/PrivateRoute";
import ProtectedRoute from "./authRoutes/ProtectedRoute";
import Unauthorized from "./authRoutes/Unauthorized";
import Users from "./pages/usersManagement/Users";
import Progress from "./pages/usersManagement/Progress";
import Statistics from "./pages/statistics/Statistics";

const Navigation = () => {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        display: "grid",
        gridTemplateColumns: "250px 1fr",
        minHeight: "100vh",
      }}
    >
      <Sidebar />
      <Box sx={{ padding: 2 }}>
        <Outlet />
      </Box>
    </Container>
  );
};

const router = createBrowserRouter([
  {
    path: "/quiz-login",
    element: <Login />,
  },
  {
    path: "/quiz-register",
    element: <Register />,
  },
  {
    path: "/",
    element: <PrivateRoute allowedRoles={["admin"]} />, // Protect all child routes
    children: [
      {
        path: "",
        element: <Navigation />, // Renders Sidebar and main content
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            ),
          },

          {
            path: "quizzes",
            element: (
              <ProtectedRoute>
                <QuizList />
              </ProtectedRoute>
            ),
          },
          {
            path: "quiz/:quizId",
            element: (
              <ProtectedRoute>
                <QuizPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "create-quiz",
            element: (
              <ProtectedRoute>
                <QuizForm />
              </ProtectedRoute>
            ),
          },
          {
            path: "question-form/:quizId",
            element: (
              <ProtectedRoute>
                <QuestionsForm />
              </ProtectedRoute>
            ),
          },
          {
            path: "edit-quiz/:quizId",
            element: (
              <ProtectedRoute>
                <EditQuizForm />
              </ProtectedRoute>
            ),
          },
          {
            path: "edit-question/:questionId",
            element: (
              <ProtectedRoute>
                <EditQuestionForm />
              </ProtectedRoute>
            ),
          },
          {
            path: "categories",
            element: (
              <ProtectedRoute>
                <CategoryList />
              </ProtectedRoute>
            ),
          },
          {
            path: "users",
            element: (
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            ),
          },
          {
            path: "users/progress",
            element: (
              <ProtectedRoute>
                <Progress />
              </ProtectedRoute>
            ),
          },
          {
            path: "statistics",
            element: (
              <ProtectedRoute>
                <Statistics />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />, // Use the Unauthorized component
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
