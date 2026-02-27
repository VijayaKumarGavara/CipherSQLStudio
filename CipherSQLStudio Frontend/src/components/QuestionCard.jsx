import "../css/questioncard.css";

const QuestionCard = ({ question, index }) => {
  return (
    <div className="question-row">
      <div className="row-left">
        <span className="row-number">{index + 1}.</span>
        <span className="row-title">{question.question_title}</span>
      </div>

      <div className={`row-level ${question.question_level.toLowerCase()}`}>
        {question.question_level}
      </div>
    </div>
  );
};

export default QuestionCard;
