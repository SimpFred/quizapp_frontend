import React, { useState } from 'react';

function QuizSetup({ onStartQuiz }) {
  const [numQuestions, setNumQuestions] = useState(10);
  const [category, setCategory] = useState(11);
  const [difficulty, setDifficulty] = useState('easy');

  const handleStartQuiz = () => {
    onStartQuiz({ numQuestions, category, difficulty });
  };

  return (
    <div>
      <h2>Setup Your Quiz</h2>
      <div>
        <label>
          Number of Questions:
          <select value={numQuestions} onChange={(e) => setNumQuestions(e.target.value)}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value={11}>Music</option>
            <option value={12}>Film</option>
            <option value={21}>Sport</option>
            <option value={15}>Video Games</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Difficulty:
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="hard">Hard</option>
          </select>
        </label>
      </div>
      <button onClick={handleStartQuiz}>Start Quiz</button>
    </div>
  );
}

export default QuizSetup;