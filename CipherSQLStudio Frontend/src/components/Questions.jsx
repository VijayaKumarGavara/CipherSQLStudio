import { useState, useEffect } from "react";
import { Link,  } from "react-router";
import { API_URL } from "../utils/constants";
import QuestionCard from "./QuestionCard";
import Navbar from "./Navbar";
import "../css/questions.css";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getQuestions() {
      try {
        setIsFetching(true);

        const res = await fetch(`${API_URL}/api/questions`);

        if (!res.ok) {
          throw new Error("Error while fetching questions...");
        }

        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsFetching(false);
      }
    }

    getQuestions();
  }, []);

  return (
    <>
      <Navbar />

      <div className="questions-page">
        <h1 className="page-title">SQL Practice Questions</h1>

        {isFetching && <div className="loading">Loading Questions...</div>}

        {error && <div className="error">{error}</div>}

        {!isFetching && !error && questions.length === 0 && (
          <div className="empty">No questions available.</div>
        )}

        {!isFetching && questions.length > 0 && (
          <div className="questions-list">
            {questions.map((question, index) => (
              <Link
                key={question.question_id}
                to={`/questions/${question.question_id}`}
                state={{index}}
                className="question-row-link">
                <QuestionCard question={question} index={index} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Questions;
