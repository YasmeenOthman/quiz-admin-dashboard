import React from "react";

function App() {
  return (
    <div className="App">
      hellos
      {/* <BrowserRouter>
        <Container
          disableGutters
          maxWidth={false}
          sx={{
            display: "grid",
            gridTemplateColumns: "250px 1fr",
            height: "100vh",
          }}
        >
          {isAuthenticated() && <Sidebar />}
          <Box sx={{ padding: 2 }}>
            <Routes>
              <Route path="/quiz-login" element={<Login />} />
              <Route path="/quiz-register" element={<Register />} />
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
      </BrowserRouter> */}
    </div>
  );
}

export default App;
