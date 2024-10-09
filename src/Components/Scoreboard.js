import React, { useContext } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { QuizAppContext } from "../context";

/**
 * Scoreboard Component
 *
 * This component displays the top 10 quiz results in a table format.
 * It uses Material-UI components for styling and layout. The results are fetched
 * from the QuizAppContext.
 *
 * @component
 * @example
 * // To use the Scoreboard component, ensure that it is wrapped within the QuizAppProvider
 * // and that the QuizAppContext contains the necessary state and functions.
 * return (
 *   <QuizAppProvider>
 *     <Scoreboard />
 *   </QuizAppProvider>
 * )
 *
 * @returns {JSX.Element} A container with a table displaying the top 10 quiz results.
 */

const Scoreboard = () => {
  const { topResults } = useContext(QuizAppContext);
  return (
    <Box sx={{ mt: 4, width: "100%" }}>
      <Typography variant="h5" gutterBottom>
        Top 10 Results
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Username</TableCell>
              <TableCell align="right">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topResults.map((result, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{result.username}</TableCell>
                <TableCell align="right">{result.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Scoreboard;
