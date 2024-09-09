import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button } from '@mui/material';

function Question({ question, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  // Handles when the user selects an answer
  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    onAnswer(answer);
  };

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Shuffle the answer options when the component mounts or the question changes
  useEffect(() => {
    if (question) {
      const answers = [...question.incorrect_answers, question.correct_answer];
      setShuffledAnswers(shuffleArray(answers));
    }
  }, [question]);

  // If no question is available, display a loading message
  if (!question) {
    return <Typography variant="h6">Loading question...</Typography>;
  }

  // Render the question and answer options
  return (
    <div>
      <Typography p={2} textAlign="center" variant="h5" gutterBottom dangerouslySetInnerHTML={{ __html: question.question }}></Typography>
      <Grid container spacing={3}>
        {shuffledAnswers.map((answer, index) => (
          <Grid item xs={6} key={index}>
            
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => handleAnswer(answer)}
                style={{ backgroundColor: selectedAnswer === answer ? 'lightblue' : '' }}
              >
                <Typography dangerouslySetInnerHTML={{ __html: answer }} />
              </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Question;