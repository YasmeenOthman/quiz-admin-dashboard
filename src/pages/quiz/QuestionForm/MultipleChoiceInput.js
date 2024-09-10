export default function MultipleChoiceInput({
  choices,
  correctAnswer,
  onChoiceChange,
  onCorrectAnswerChange,
}) {
  return choices.map((choice, index) => (
    <div key={index}>
      <input
        type="text"
        value={choice}
        onChange={(e) => onChoiceChange(index, e.target.value)}
        placeholder={`Choice ${index + 1}`}
        required
      />
      <input
        type="radio"
        name="correctAnswer"
        onChange={() => onCorrectAnswerChange(choice)}
        checked={correctAnswer === choice}
      />
      {correctAnswer === choice && <label>Correct Answer</label>}
    </div>
  ));
}
