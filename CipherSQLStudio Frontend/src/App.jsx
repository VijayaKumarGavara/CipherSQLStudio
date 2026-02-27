import { BrowserRouter, Routes, Route, useNavigate } from "react-router";
import { useEffect } from "react";
import Questions from "./components/Questions";
import QuestionDetails from "./components/QuestionDetails";

function Redirection() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/questions");
  }, []);
  return <></>;
}
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Redirection />}></Route>
        <Route path="/questions" index element={<Questions />}></Route>
        <Route
          path="/questions/:question_id"
          element={<QuestionDetails />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
