import React, { useContext } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { QuizAppContext } from "../../context";
import parse from "html-react-parser";

/**
 * Result Component
 *
 * This component displays the results for each question in the quiz.
 * It uses Material-UI's Accordion components to show each question, the correct answer,
 * and the user's answer. Icons are used to indicate whether the user's answer was correct or incorrect.
 *
 * @component
 * @example
 * // To use the Result component, ensure that it is wrapped within the QuizAppProvider
 * // and that the QuizAppContext contains the necessary state and functions.
 * return (
 *   <QuizAppProvider>
 *     <Result />
 *   </QuizAppProvider>
 * )
 *
 * @returns {JSX.Element} A box containing a list of accordions with quiz results.
 */
function Result() {
  const { answers, questions } = useContext(QuizAppContext);
  return (
    <Box sx={{ width: "100%" }}>
      {questions.map((question, index) => (
        <Accordion key={index} sx={{ marginBottom: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            sx={{ paddingLeft: 1 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", marginRight: 1 }}>
              {answers[index] === question.correct_answer ? (
                <CheckCircleIcon sx={{ color: "success.main" }} />
              ) : (
                <CancelIcon sx={{ color: "error.main" }} />
              )}
            </Box>
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              {parse(question.question)}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="textSecondary">
              Correct answer: {parse(question.correct_answer)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Your answer: {parse(answers[index])}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

export default Result;
