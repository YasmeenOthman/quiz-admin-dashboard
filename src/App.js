import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuizForm from "./Templates/quiz/QuizForm";
import QuestionsForm from "./Templates/quiz/QuestionsForm";
import QuizManagement from "./Templates/quiz/QuizManagement";
import EditQuizForm from "./Templates/quiz/EditQuizForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuizManagement />} />
          <Route path="/create-quiz" element={<QuizForm />} />
          <Route path="/question-form/:quizId" element={<QuestionsForm />} />
          <Route path="/edit-quiz/:quizId" element={<EditQuizForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
