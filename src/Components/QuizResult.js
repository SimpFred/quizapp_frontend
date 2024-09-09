import React from 'react';
import { Container, Box, Button } from '@mui/material';
import Result from './Result';

function QuizResult({ answers, questions, correctAnswers, incorrectAnswers }) {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Result
          answers={answers}
          questions={questions}
          correctAnswers={correctAnswers}
          incorrectAnswers={incorrectAnswers}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => window.location.reload()}
          sx={{ mt: 3 }}
        >
          Restart Quiz
        </Button>
      </Box>
    </Container>
  );
}

export default QuizResult;