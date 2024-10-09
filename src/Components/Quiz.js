import React, { useContext, useEffect } from "react";
import { Container, Box } from "@mui/material";
import Question from "../components/Question";
import QuizSetup from "../components/QuizSetup";
import Header from "../components/Header";
import Loading from "../components/helperComponents/Loading";
import Error from "../components/helperComponents/Error";
import QuizResult from "../components/resultComponents/QuizResult";
import { QuizAppContext } from "../context";

/**
 * Quiz Component
 *
 * This component manages the quiz flow, including fetching questions, displaying the quiz setup,
 * handling errors, and showing the quiz results. It uses the QuizAppContext to manage state.
 *
 * @component
 * @example
 * // To use the Quiz component, ensure that it is wrapped within the QuizAppProvider
 * // and that the QuizAppContext contains the necessary state and functions.
 * return (
 *   <QuizAppProvider>
 *     <Quiz />
 *   </QuizAppProvider>
 * )
 *
 * @returns {JSX.Element} The quiz component with different states (setup, loading, error, question, result).
 */
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

  /**
   * useEffect hook to fetch quiz questions when the quiz setup changes
   * and questions have not been fetched yet.
   */
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

  // If quiz setup is not defined, show the quiz setup component
  if (!quizSetup) {
    return (
      <>
        <Header />
        <QuizSetup />
      </>
    );
  }

  // If there is an error, show the error component
  if (error) {
    return (
      <>
        <Header />
        <Error />
      </>
    );
  }

  // If the quiz is finished, show the quiz result component
  if (isFinished) {
    return (
      <>
        <Header />
        <QuizResult />
      </>
    );
  }

  // If questions are still being fetched, show the loading component
  if (questions.length === 0) {
    return (
      <>
        <Header />
        <Loading />
      </>
    );
  }

  // Show the current question
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
