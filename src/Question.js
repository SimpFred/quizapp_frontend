// src/Question.js
import React, { useState } from 'react';

function Question({ question, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Hanterar när användaren väljer ett svar
  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    onAnswer(answer);
  };

  // Om inget fråga är tillgänglig, visa en laddningsmeddelande
  if (!question) {
    return <p>Loading question...</p>;
  }

  // Kombinera felaktiga svar och rätt svar i en enda lista
  const answers = [...question.incorrect_answers, question.correct_answer];

  // Rendera frågan och svarsalternativ
  return (
    <div>
      <h2 dangerouslySetInnerHTML={{ __html: question.question }}></h2>
      <ul>
        {answers.map((answer, index) => (
          <li key={index}>
            <button
              onClick={() => handleAnswer(answer)}
              style={{ backgroundColor: selectedAnswer === answer ? 'lightblue' : '' }}
              dangerouslySetInnerHTML={{ __html: answer }}
            >
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Question;