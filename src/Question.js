import React, { useState, useEffect } from 'react';

function Question({ question, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  // Handles when the user selects an answer
  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    onAnswer(answer);
  };

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Shuffle the answer options when the component mounts or the question changes
  useEffect(() => {
    if (question) {
      const answers = [...question.incorrect_answers, question.correct_answer];
      setShuffledAnswers(shuffleArray(answers));
    }
  }, [question]);

  // If no question is available, display a loading message
  if (!question) {
    return <p>Loading question...</p>;
  }

  // Render the question and answer options
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