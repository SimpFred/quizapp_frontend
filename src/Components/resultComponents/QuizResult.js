import React, { useContext, useEffect } from "react";
import {
  Container,
  Box,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Result from "./Result";
import Loading from "../helperComponents/Loading";
import SaveResults from "./SaveResults";
import Scoreboard from "../Scoreboard";
import { QuizAppContext } from "../../context";

/**
 * QuizResult Component
 *
 * This component displays the results of the quiz, including the number of correct and incorrect answers,
 * a facit (answer key), and options to restart the quiz or save the results. It also fetches and displays
 * the top 10 results for the current quiz setup.
 *
 * @component
 * @example
 * // To use the QuizResult component, ensure that it is wrapped within the QuizAppProvider
 * // and that the QuizAppContext contains the necessary state and functions.
 * return (
 *   <QuizAppProvider>
 *     <QuizResult />
 *   </QuizAppProvider>
 * )
 *
 * @returns {JSX.Element} A container with the quiz results and options.
 */
function QuizResult() {
  const {
    correctAnswers,
    incorrectAnswers,
    isLoading,
    quizSetup,
    updateScoreboard,
    setTopResults,
    setUpdateScoreboard,
    setOpenSaveDialog,
    hasSaveDialogBeenOpened,
  } = useContext(QuizAppContext);

  /**
   * Fetches the top 10 results for the current quiz setup from the server.
   * If the user's score is in the top 10 and the save dialog has not been opened,
   * it opens the save dialog.
   */
  const fetchTopResults = () => {
    fetch(
      `http://localhost:8080/api/quiz/top10?category=${quizSetup.category}&numberOfQuestions=${quizSetup.numQuestions}&difficulty=${quizSetup.difficulty}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          return;
        }
        setTopResults(data);
        const isTop10 =
          data.length < 10 || correctAnswers > data[data.length - 1].score;
        if (correctAnswers > 0 && isTop10 && !hasSaveDialogBeenOpened) {
          setOpenSaveDialog(true);
        }
      });
  };

  /**
   * useEffect hook to fetch the top results when the component mounts
   * or when the loading state changes.
   */
  useEffect(() => {
    if (!isLoading) {
      fetchTopResults();
    }
  }, [isLoading, correctAnswers]);

  /**
   * useEffect hook to fetch the top results when the scoreboard needs to be updated.
   * This is triggered when the user saves their result.
   */
  useEffect(() => {
    if (updateScoreboard) {
      fetchTopResults();
      setUpdateScoreboard(false);
    }
  }, [updateScoreboard]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          mb: 4,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Quiz Results
        </Typography>
        {isLoading ? (
          <Loading loadingText="Loading results..." />
        ) : (
          <>
            <Typography variant="body1" gutterBottom>
              Correct Answers: {correctAnswers}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Incorrect Answers: {incorrectAnswers}
            </Typography>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6">Facit</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Result />
              </AccordionDetails>
            </Accordion>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => window.location.reload()}
              sx={{ mt: 3 }}
            >
              Restart Quiz
            </Button>
            <SaveResults />
          </>
        )}
      </Box>
      <Scoreboard />
    </Container>
  );
}

export default QuizResult;
