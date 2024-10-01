import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

function Result({ answers, questions, correctAnswers, incorrectAnswers }) {
  return (
    <Box sx={{ width: '100%' }}>
      {questions.map((question, index) => (
        <Accordion key={index} sx={{ marginBottom: 1}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            sx={{ paddingLeft: 1 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 1 }}>
              {answers[index] === question.correct_answer ? (
                <CheckCircleIcon sx={{ color: 'success.main' }} />
              ) : (
                <CancelIcon sx={{ color: 'error.main' }} />
              )}
            </Box>
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: question.question }}
              sx={{ marginRight: 2 }}
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