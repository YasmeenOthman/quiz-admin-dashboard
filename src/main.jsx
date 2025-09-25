import React, { useState } from "react";
import "./index.scss";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
// import { Container, Box } from "@mui/material";
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
import SideNav from "./ui/SideNav";
import {
  Container,
  Box,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navigation = () => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* ----- AppBar for mobile ----- */}
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Quiz Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* ----- Sidebar ----- */}
      {/* Permanent drawer on desktop */}
      {!isMobile && <SideNav variant="permanent" />}

      {/* Temporary drawer on mobile */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: 250,
              backgroundColor: "#04305a",
              color: "#F4F5F7",
            },
          }}
        >
          <SideNav variant="temporary" onNavigate={handleDrawerToggle} />
        </Drawer>
      )}

      {/* ----- Main Content ----- */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          mt: isMobile ? "64px" : 0, // push below AppBar on mobile
          width: "100%",
        }}
      >
        <Outlet />
      </Box>
    </Box>
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
