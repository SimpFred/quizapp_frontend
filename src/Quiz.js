import React, { useEffect, useState } from 'react';
import Question from './Question';
import Result from './Result';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [error, setError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false); // Flagga för att kontrollera om fetch har körts
  const [correctAnswers, setCorrectAnswers] = useState(0); // Håller koll på rätta svar
  const [incorrectAnswers, setIncorrectAnswers] = useState(0); // Håller koll på felaktiga svar

  useEffect(() => {
    if (!hasFetched) {
      console.log('Fetching quiz questions');
      fetch('http://localhost:8080/api/quiz/questions')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setQuestions(data.results || data); // Justera baserat på API-svaret
          setHasFetched(true); // Sätt flaggan till true efter att fetch har körts
          console.log(data.results || data);
        })
        .catch(error => setError(error.message));
    }
  }, [hasFetched]); // Lägg till hasFetched som beroende

  // Funktion som hanterar när användaren väljer ett svar
  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correct_answer) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }

    setAnswers([...answers, answer]);
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setIsFinished(true);
      handleSaveResults(); // Anropa handleSaveResults när quizet är färdigt
    }
  };

    // Funktion som beräknar poängen
    const calculateScore = () => {
        return correctAnswers;
      };
    
      // Funktion som sparar resultaten
      const handleSaveResults = () => {
        fetch('http://localhost:8080/api/quiz/results', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: 'testuser',  // Ersätt med faktiskt användarnamn
            score: calculateScore(),
          }),
        })
          .then(response => response.json())
          .then(data => console.log('Result saved:', data))
          .catch(error => console.error('Error saving result:', error));
      };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (isFinished) {
    return (
      <Result
        answers={answers}
        questions={questions}
        correctAnswers={correctAnswers}
        incorrectAnswers={incorrectAnswers}
      />
    );
  }

  if (questions.length === 0) {
    return <p>Loading questions...</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <Question
        question={currentQuestion}
        onAnswer={handleAnswer} // Skicka handleAnswer som onAnswer-prop till Question-komponenten
      />
    </div>
  );
}

export default Quiz;