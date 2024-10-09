import React, { useState, useEffect, useContext } from "react";
import { Grid2, Typography, Button } from "@mui/material";
import { QuizAppContext } from "../context";
import parse from "html-react-parser";

/**
 * Question Component
 *
 * This component displays the current quiz question and its possible answers.
 * It uses Material-UI components for styling and layout. The question and answers
 * are fetched from the QuizAppContext. The answers are shuffled and displayed as buttons.
 * When an answer is selected, it is highlighted and the onAnswer function from the context is called.
 *
 * @component
 * @example
 * // To use the Question component, ensure that it is wrapped within the QuizAppProvider
 * // and that the QuizAppContext contains the necessary state and functions.
 * return (
 *   <QuizAppProvider>
 *     <Question />
 *   </QuizAppProvider>
 * )
 *
 * @returns {JSX.Element} A container with the current quiz question and possible answers.
 */
function Question() {
  const { currentQuestion, onAnswer } = useContext(QuizAppContext);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  /**
   * Handles the selection of an answer.
   * Sets the selected answer and calls the onAnswer function from the context.
   *
   * @param {string} answer - The selected answer
   */
  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    onAnswer(answer);
  };

  /**
   * Shuffles an array.
   *
   * @param {Array} array - The array to shuffle
   * @returns {Array} The shuffled array
   */
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  /**
   * useEffect hook to shuffle the answers when the current question changes.
   */
  useEffect(() => {
    if (currentQuestion) {
      const answers = [
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
      ];
      setShuffledAnswers(shuffleArray(answers));
    }
  }, [currentQuestion]);

  if (!currentQuestion) {
    return <Typography variant="h6">Loading question...</Typography>;
  }

  return (
    <div>
      <Typography p={2} textAlign="center" variant="h5" gutterBottom>
        {parse(currentQuestion.question)}
      </Typography>
      <Grid2 container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {shuffledAnswers.map((answer, index) => (
          <Grid2 size={6} key={index}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => handleAnswer(answer)}
              style={{
                backgroundColor: selectedAnswer === answer ? "lightblue" : "",
              }}
            >
              <Typography>{parse(answer)}</Typography>
            </Button>
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
}

export default Question;
