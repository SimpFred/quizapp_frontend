import React, { useEffect, useState } from 'react';
import { Container, Box, Button, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Result from './Result';
import Loading from './Loading';
import SaveResults from './SaveResults';
import Scoreboard from './Scoreboard';

function QuizResult({ answers, questions, correctAnswers, incorrectAnswers, isLoading, category, difficulty, numQuestions}) {
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [topResults, setTopResults] = useState([]);
  const [updateScoreboard, setUpdateScoreboard] = useState(false);
  const [hasSaveDialogBeenOpened, setHasSaveDialogBeenOpened] = useState(false);

  const fetchTopResults = () => {

    fetch(`http://localhost:8080/api/quiz/top10?category=${category}&numberOfQuestions=${numQuestions}`)
      .then(response => response.json())
      .then(data => {
        if (!data) {
          return;
        }
        setTopResults(data);
        const isTop10 = data.length < 10 || correctAnswers > data[data.length - 1].score;
        if (isTop10 && !hasSaveDialogBeenOpened) {
          setOpenSaveDialog(true);
        }
      })
  };

  useEffect(() => {
    if (!isLoading) {
      fetchTopResults();
    }
  }, [isLoading, correctAnswers]);

  useEffect(() => {
    if (updateScoreboard) {
      fetchTopResults();
      setUpdateScoreboard(false);
    }
  }, [updateScoreboard]);

  const handleCloseSaveDialog = () => {
    setOpenSaveDialog(false);
  };

  const handleResultSaved = () => {
    setHasSaveDialogBeenOpened(true);
    setUpdateScoreboard(true);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          mb: 4,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Quiz Results
        </Typography>
        {isLoading ? (
          <Loading loadingText='Loading results...' />
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
                id="panel1a-header">
                <Typography variant="h6">Facit</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Result
                  answers={answers}
                  questions={questions}
                  correctAnswers={correctAnswers}
                  incorrectAnswers={incorrectAnswers}
                />
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
            <SaveResults
              correctAnswers={correctAnswers}
              open={openSaveDialog}
              onClose={handleCloseSaveDialog}
              onResultSaved={handleResultSaved}
              category={category}
              numQuestions={numQuestions}
            />
          </>
        )}
      </Box>
      <Scoreboard topResults={topResults} />
    </Container>
  );
}

export default QuizResult;