import React, { useContext, useState } from "react";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { QuizAppContext } from "../context";

/**
 * QuizSetup Component
 *
 * This component allows the user to set up the quiz by selecting the number of questions,
 * category, and difficulty. It uses Material-UI components for styling and layout.
 * The selected settings are stored in the QuizAppContext.
 *
 * @component
 * @example
 * // To use the QuizSetup component, ensure that it is wrapped within the QuizAppProvider
 * // and that the QuizAppContext contains the necessary state and functions.
 * return (
 *   <QuizAppProvider>
 *     <QuizSetup />
 *   </QuizAppProvider>
 * )
 *
 * @returns {JSX.Element} A container with form controls to set up the quiz.
 */
function QuizSetup() {
  const { setQuizSetup } = useContext(QuizAppContext);
  const [numQuestions, setNumQuestions] = useState(10);
  const [category, setCategory] = useState(12);
  const [difficulty, setDifficulty] = useState("easy");

  /**
   * Handles the start quiz action by setting the quiz setup in the context.
   */
  const handleStartQuiz = () => {
    setQuizSetup({ numQuestions, category, difficulty });
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
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Setup Your Quiz
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel id="num-questions-label">Number of Questions</InputLabel>
          <Select
            labelId="num-questions-label"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            label="Number of Questions"
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
          >
            <MenuItem value={12}>Music</MenuItem>
            <MenuItem value={11}>Film</MenuItem>
            <MenuItem value={21}>Sport</MenuItem>
            <MenuItem value={15}>Video Games</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="difficulty-label">Difficulty</InputLabel>
          <Select
            labelId="difficulty-label"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            label="Difficulty"
          >
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleStartQuiz}
          sx={{ mt: 3 }}
        >
          Start Quiz
        </Button>
      </Box>
    </Container>
  );
}

export default QuizSetup;
