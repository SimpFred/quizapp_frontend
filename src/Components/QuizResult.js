import React, { useEffect, useState } from 'react';
import { Container, Box, Button, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Result from './Result';
import Loading from './Loading';
import SaveResults from './SaveResults'; // Importera SaveResults-komponenten

function QuizResult({ answers, questions, correctAnswers, incorrectAnswers, isLoading }) {
  const [isTop10, setIsTop10] = useState(false);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // Kontrollera om användaren är i topp 10
      fetch('http://localhost:8080/api/quiz/top10')
        .then(response => response.json())
        .then(topResults => {
          const isTop10 = topResults.length < 10 || correctAnswers > topResults[topResults.length - 1].score;
          setIsTop10(isTop10);
          if (isTop10) {
            setOpenSaveDialog(true);
          }
        })
        .catch(error => console.error('Error fetching top 10 results:', error));
    }
  }, [isLoading, correctAnswers]);

  const handleCloseSaveDialog = () => {
    setOpenSaveDialog(false);
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
            /> {/* Visa SaveResults-komponenten som en dialog */}
          </>
        )}
      </Box>
    </Container>
  );
}

export default QuizResult;