// src/Question.js
import React, { useState, useEffect } from 'react';

function Question({ question, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  // Hanterar när användaren väljer ett svar
  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    onAnswer(answer);
  };

  // Funktion för att blanda en array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Blanda svarsalternativen när komponenten mountas eller frågan ändras
  useEffect(() => {
    if (question) {
      const answers = [...question.incorrect_answers, question.correct_answer];
      setShuffledAnswers(shuffleArray(answers));
    }
  }, [question]);

  // Om inget fråga är tillgänglig, visa en laddningsmeddelande
  if (!question) {
    return <p>Loading question...</p>;
  }

  // Rendera frågan och svarsalternativ
  return (
    <div>
      <h2 dangerouslySetInnerHTML={{ __html: question.question }}></h2>
      <ul>
        {shuffledAnswers.map((answer, index) => (
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