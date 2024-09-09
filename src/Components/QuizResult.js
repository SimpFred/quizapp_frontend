import React from 'react';
import { Container, Box, Button, Typography, CircularProgress, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Result from './Result';
import Loading from './Loading';

function QuizResult({ answers, questions, correctAnswers, incorrectAnswers, isLoading }) {
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
         <Loading loadingText='Loading results...'/>
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
          </>
        )}
      </Box>
    </Container>
  );
}

export default QuizResult;