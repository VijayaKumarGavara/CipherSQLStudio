import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import ResultTable from "./ResultTable";
import { API_URL } from "../utils/constants";

function QuestionDetailPage() {
  const { question_id } = useParams();
  const location = useLocation();
  const question_no = location?.state?.index;
  const [question, setQuestion] = useState(null);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [expected, setExpected] = useState(null);
  const [success, setSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [hints, setHints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hintLoading, setHintLoading] = useState(false);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await fetch(`${API_URL}/api/questions/${question_id}`);

        if (!res.ok) {
          console.log(res);
          throw new Error("Error while getting the Question Details.");
        }

        const data = await res.json();
        setQuestion(data.question);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchQuestion();
  }, [question_id]);

  const handleRun = async () => {
    try {
      setLoading(true);
      setSuccess(null);
      setResult(null);
      setExpected(null);
      setErrorMessage(null);

      const res = await fetch(`${API_URL}/api/query/execute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question_id,
          query,
        }),
      });

      const data = await res.json();
      if (!data.error) {
        setSuccess(data.success);
        setResult(data.actualOutput);
        setExpected(data.expectedOutput);
      } else {
        setSuccess(null);
        setErrorMessage(`${data?.message}: ${data?.error}`);
      }
    } catch (error) {
      console.error("Execution error:", error.message);
      setErrorMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleHint = async () => {
    try {
      setHintLoading(true);
      const res = await fetch(`${API_URL}/api/hint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question_id,
        }),
      });

      const data = await res.json();
      setHints(data.hints);
    } catch (error) {
      console.error("Hint error:", error.message);
    } finally {
      setHintLoading(false);
    }
  };

  if (!question) return <p>Loading...</p>;

  return (
    <>
      <div className="question-detail-page">
        <div className="left-panel">
          <div className="question-header">
            <h2 className="question-title">
              {question_no + 1}. {question.question_title}{" "}
              <span
                className={`row-level ${question.question_level.toLowerCase()}`}>
                {question.question_level}
              </span>
            </h2>
            <p>{question.question_description}</p>
          </div>

          <div className="tables-section">
            {question.tables_involved.map((table) => (
              <div key={table._id} className="table-card">
                <h4 className="table-name">{table.table_name}</h4>
                <div className="table-columns">
                  {table.columns.map((col) => (
                    <div key={col.column_name} className="column-row">
                      <span className="column-name">{col.column_name}</span>
                      <span className="column-type">({col.data_type})</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="hint-section">
            <button
              className="hint-btn"
              onClick={handleHint}
              disabled={hintLoading}>
              {hintLoading ? "Generating..." : "Get Hints"}
            </button>

            {hints.length > 0 && (
              <div className="hint-box">
                {hints.map((hint, index) => (
                  <p className="hint">
                    {index + 1}. {hint}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="right-panel">
          <div className="editor-section">
            <Editor
              defaultLanguage="sql"
              defaultValue="-- Write your SQL query here"
              value={query}
              onChange={(value) => setQuery(value)}
              theme="vs-dark"
              height="100%"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />

            <div className="run-btn-wrapper">
              <button
                className="run-btn"
                onClick={handleRun}
                disabled={loading}>
                {loading ? "Running..." : "Run"}
              </button>
            </div>
          </div>

          <div className="result-section">
            {success !== null && (
              <div
                className={`status-banner ${success ? "success" : "failure"}`}>
                {success ? "Correct" : "Wrong Answer"}
              </div>
            )}

            {result && (
              <>
                <h4>Your Output</h4>
                <ResultTable data={result} />
              </>
            )}

            {expected && !success && (
              <>
                <h4>Expected Output</h4>
                <ResultTable data={expected} />
              </>
            )}

            {errorMessage && (
              <>
                <h4>SQL Error</h4>
                <div className="error-box">{errorMessage}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default QuestionDetailPage;
