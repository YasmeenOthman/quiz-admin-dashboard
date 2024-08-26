import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuizForm from "./pages/quiz/QuizForm";
import QuestionsForm from "./pages/quiz/QuestionsForm";
import QuizManagement from "./pages/quiz/QuizManagement";
import EditQuizForm from "./pages/quiz/EditQuizForm";
import QuizList from "./pages/quiz/QuizList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuizManagement />} />
          <Route path="/quizzez" element={<QuizList />} />
          <Route path="/create-quiz" element={<QuizForm />} />
          <Route path="/question-form/:quizId" element={<QuestionsForm />} />
          <Route path="/edit-quiz/:quizId" element={<EditQuizForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
