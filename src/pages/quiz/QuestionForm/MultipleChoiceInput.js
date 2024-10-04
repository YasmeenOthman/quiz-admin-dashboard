export default function MultipleChoiceInput({
  choices,
  correctAnswer,
  onChoiceChange,
  onCorrectAnswerChange,
}) {
  return choices.map((choice, index) => (
    <div key={index} className="multiple-choices-inputs-container">
      <input
        type="text"
        value={choice}
        onChange={(e) => onChoiceChange(index, e.target.value)}
        placeholder={`Choice ${index + 1}`}
        required
        className="form-input multiple-choices-input"
      />
      <input
        type="radio"
        name="correctAnswer"
        onChange={() => onCorrectAnswerChange(choice)}
        checked={correctAnswer === choice}
        className="correct-answer"
      />
      {correctAnswer === choice && (
        <label className="correct-answer-label">Correct Answer</label>
      )}
    </div>
  ));
}
