import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Container, Box } from "@mui/material";
import Sidebar from "./Templates/sidebar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import QuizList from "./pages/quiz/quizlist/QuizList";
import CategoryList from "./pages/category/CateogoryList";
import QuizForm from "./pages/quiz/create-edit-quiz/QuizForm";
import EditQuizForm from "./pages/quiz/create-edit-quiz/EditQuizForm";

import QuizManagement from "./pages/quiz/QuizManagement";
import QuestionsForm from "./pages/quiz/QuestionForm/QuestionsForm";
import EditQuestionForm from "./pages/quiz/EditQuestionForm";
import QuizPage from "./pages/quiz/QuizPage";

import PrivateRoute from "./authRoutes/PrivateRoute";
import Unauthorized from "./authRoutes/Unauthorized";

const Navigation = () => {
  return (
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
        {/* Outlet renders the matched child route element */}
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
            path: "/home",
            element: <Home />,
          },
          {
            path: "",
            element: <QuizManagement />,
          },
          {
            path: "quizzes",
            element: <QuizList />,
          },
          {
            path: "quiz/:quizId",
            element: <QuizPage />,
          },
          {
            path: "create-quiz",
            element: <QuizForm />,
          },
          {
            path: "question-form/:quizId",
            element: <QuestionsForm />,
          },
          {
            path: "edit-quiz/:quizId",
            element: <EditQuizForm />,
          },
          {
            path: "edit-question/:questionId",
            element: <EditQuestionForm />,
          },
          {
            path: "categories",
            element: <CategoryList />,
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
