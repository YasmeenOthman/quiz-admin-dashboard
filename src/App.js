import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuizForm from "./components/quiz/QuizForm";
import QuestionsForm from "./components/quiz/QuestionsForm";
import QuizManagement from "./components/quiz/QuizManagement";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuizManagement />} />
          <Route path="/create-quiz" element={<QuizForm />} />
          <Route path="/questionForm/:quizId" element={<QuestionsForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
