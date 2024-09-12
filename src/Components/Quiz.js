import React, { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';
import Question from './Question';
import QuizSetup from './QuizSetup';
import Header from './Header';
import Loading from './Loading';
import Error from './Error';
import QuizResult from './QuizResult';

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
        })
        .catch(error => setError("Failed to fetch quiz questions, please try again later."));
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
    }
  };

  const handleStartQuiz = (setup) => {
    setQuizSetup(setup);
  };

  if (!quizSetup) {
    return (
      <>
        <Header />
        <QuizSetup onStartQuiz={handleStartQuiz} />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <Error message={error} />
      </>
    );
  }

  if (isFinished) {
    return (
      <>
        <Header />
        <QuizResult
          answers={answers}
          questions={questions}
          correctAnswers={correctAnswers}
          incorrectAnswers={incorrectAnswers}
          category={quizSetup.category}
          difficulty={quizSetup.difficulty}
          numQuestions={quizSetup.numQuestions}
        />

      </>
    );
  }

  if (questions.length === 0) {
    return (
      <>
        <Header />
        <Loading />
      </>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Box sx={{ mt: 6, mb: 6, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
          <Question
            question={currentQuestion}
            onAnswer={handleAnswer}
          />
        </Box>
      </Container>
    </>
  );
}

export default Quiz;