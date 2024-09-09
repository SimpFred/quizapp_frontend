import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Result({ answers, questions, correctAnswers, incorrectAnswers }) {
  return (
    <Box sx={{ width: '100%' }}>
      {questions.map((question, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: question.question }}
              sx={{ marginRight: 2 }} // Lägg till marginal till höger
            />
          </AccordionSummary>
          <AccordionDetails>
          <Typography variant="body2" color="textSecondary">
              Correct answer: {question.correct_answer}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Your answer: {answers[index]}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

export default Result;