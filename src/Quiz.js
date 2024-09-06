import React, { useEffect, useState } from 'react';
import Question from './Question';
import Result from './Result';
import QuizSetup from './QuizSetup';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [error, setError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [quizSetup, setQuizSetup] = useState(null);

  useEffect(() => {
    if (quizSetup && !hasFetched) {
      console.log('Fetching quiz questions');
      fetch(`http://localhost:8080/api/quiz/questions?amount=${quizSetup.numQuestions}&category=${quizSetup.category}&difficulty=${quizSetup.difficulty}`)

        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setQuestions(data.results || data);
          setHasFetched(true);
          console.log(data.results || data);
        })
        .catch(error => setError(error.message));
    }
  }, [quizSetup, hasFetched]);

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
      handleSaveResults();
    }
  };

  const handleSaveResults = () => {
    fetch('http://localhost:8080/api/quiz/results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'testuser',  // Replace with actual username
        score: correctAnswers,
      }),
    })
      .then(response => response.json())
      .then(data => console.log('Result saved:', data))
      .catch(error => console.error('Error saving result:', error));
  };

  const handleStartQuiz = (setup) => {
    setQuizSetup(setup);
  };

  if (!quizSetup) {
    return <QuizSetup onStartQuiz={handleStartQuiz} />;
  }

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
        onAnswer={handleAnswer}
      />
    </div>
  );
}

export default Quiz;