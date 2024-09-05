// src/Result.js
import React from 'react';

function Result({ answers, questions, correctAnswers, incorrectAnswers }) {
  const score = answers.reduce((score, answer, index) => {
    if (answer === questions[index].correct_answer) {
      return score + 1;
    }
    return score;
  }, 0);

  return (
    <div>
      <h1>Quiz Finished!</h1>
      <p>Your score: {score} / {questions.length}</p>
      <p>Correct Answers: {correctAnswers}</p>
      <p>Incorrect Answers: {incorrectAnswers}</p>
      <h2>Answers:</h2>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            <p>Question: <span dangerouslySetInnerHTML={{ __html: question.question }}></span></p>
            <p>Your answer: <span dangerouslySetInnerHTML={{ __html: answers[index] }}></span></p>
            <p>Correct answer: <span dangerouslySetInnerHTML={{ __html: question.correct_answer }}></span></p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Result;
