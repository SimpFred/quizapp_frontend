import React, { useContext, useEffect } from "react";
import { Container, Box } from "@mui/material";
import Question from "../components/Question";
import QuizSetup from "../components/QuizSetup";
import Header from "../components/Header";
import Loading from "../components/helperComponents/Loading";
import Error from "../components/helperComponents/Error";
import QuizResult from "../components/resultComponents/QuizResult";
import { QuizAppContext } from "../context";

function Quiz() {
  const {
    questions,
    setQuestions,
    hasFetched,
    setHasFetched,
    error,
    setError,
    isFinished,
    quizSetup,
  } = useContext(QuizAppContext);

  useEffect(() => {
    if (quizSetup && !hasFetched) {
      fetch(
        `http://localhost:8080/api/quiz/questions?amount=${quizSetup.numQuestions}&category=${quizSetup.category}&difficulty=${quizSetup.difficulty}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setQuestions(data.results || data);
          setHasFetched(true);
        })
        .catch((error) =>
          setError("Failed to fetch quiz questions, please try again later.")
        );
    }
  }, [quizSetup, hasFetched]);

  if (!quizSetup) {
    return (
      <>
        <Header />
        <QuizSetup />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <Error />
      </>
    );
  }

  if (isFinished) {
    return (
      <>
        <Header />
        <QuizResult />
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

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Box
          sx={{
            mt: 6,
            mb: 6,
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        >
          <Question />
        </Box>
      </Container>
    </>
  );
}

export default Quiz;
