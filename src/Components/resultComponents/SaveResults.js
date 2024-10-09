import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import validator from "validator";
import { QuizAppContext } from "../../context";

const categoryMap = {
  11: "Film",
  12: "Music",
  21: "Sport",
  15: "Video Games",
};

/**
 * SaveResults Component
 *
 * This component displays a dialog for saving quiz results. It allows the user to enter their name
 * and validates the input before sending the results to the server. The dialog is only shown if the
 * user's score is in the top 10 for the current quiz setup.
 *
 * @component
 * @example
 * // To use the SaveResults component, ensure that it is wrapped within the QuizAppProvider
 * // and that the QuizAppContext contains the necessary state and functions.
 * return (
 *   <QuizAppProvider>
 *     <SaveResults />
 *   </QuizAppProvider>
 * )
 *
 * @returns {JSX.Element} A dialog for saving quiz results.
 */
const SaveResults = () => {
  const {
    quizSetup,
    correctAnswers,
    openSaveDialog,
    handleCloseSaveDialog,
    handleResultSaved,
  } = useContext(QuizAppContext);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  /**
   * Validates the username input to ensure it does not contain forbidden SQL keywords,
   * is alphanumeric, and does not contain more than two words.
   *
   * @param {string} name - The username to validate
   * @returns {string} An error message if validation fails, otherwise an empty string
   */
  const validateUsername = (name) => {
    const sanitized = validator.escape(name);

    const forbiddenKeywords = [
      "SELECT",
      "INSERT",
      "UPDATE",
      "DELETE",
      "DROP",
      "ALTER",
      "CREATE",
      "TRUNCATE",
      "EXEC",
      "UNION",
      "FETCH",
      "DECLARE",
      "SET",
      "FROM",
      "JOIN",
    ];

    const containsForbiddenKeyword = forbiddenKeywords.some((keyword) =>
      new RegExp(`\\b${keyword}\\b`, "i").test(sanitized)
    );
    if (containsForbiddenKeyword) {
      return "Name contains invalid characters.";
    }

    const words = sanitized.trim().split(/\s+/);
    if (words.length > 2) {
      return "Name should not contain more than two words.";
    }

    if (!validator.isAlphanumeric(sanitized.replace(/\s/g, ""))) {
      return "Name contains invalid characters.";
    }

    return "";
  };

  /**
   * Handles the save action by validating the username and sending the quiz results to the server.
   * If the username is valid, it sends a POST request to save the results.
   */
  const handleSave = () => {
    const validationError = validateUsername(username);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (username) {
      fetch("http://localhost:8080/api/quiz/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          score: correctAnswers,
          category: quizSetup.category,
          numberOfQuestions: quizSetup.numQuestions,
          difficulty: quizSetup.difficulty,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          handleResultSaved();
          handleCloseSaveDialog();
        })
        .catch((error) => {
          handleCloseSaveDialog();
        });
    }
  };

  return (
    <Dialog open={openSaveDialog} onClose={handleCloseSaveDialog}>
      <DialogTitle sx={{ textAlign: "center" }}>
        You are in the top 10!!!
        <Typography variant="body2" gutterBottom>
          {" "}
          In the category {categoryMap[quizSetup.category]} with{" "}
          {quizSetup.numQuestions} questions at {quizSetup.difficulty}{" "}
          difficulty!
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" gutterBottom>
          Please enter your name if you want to save your result.
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Enter your name"
          type="text"
          fullWidth
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError("");
          }}
          error={!!error}
          helperText={error}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseSaveDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveResults;
