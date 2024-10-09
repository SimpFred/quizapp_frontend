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

  const validateUsername = (name) => {
    // Sanera strängen för att förhindra SQL-injektioner
    const sanitized = validator.escape(name);

    // Lista över förbjudna SQL-nyckelord
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

    // Kontrollera om strängen innehåller förbjudna SQL-nyckelord
    const containsForbiddenKeyword = forbiddenKeywords.some((keyword) =>
      new RegExp(`\\b${keyword}\\b`, "i").test(sanitized)
    );
    if (containsForbiddenKeyword) {
      return "Name contains invalid characters.";
    }

    // Kontrollera om strängen innehåller mer än två ord
    const words = sanitized.trim().split(/\s+/);
    if (words.length > 2) {
      return "Name should not contain more than two words.";
    }

    // Kontrollera att strängen endast innehåller alfanumeriska tecken och mellanslag
    if (!validator.isAlphanumeric(sanitized.replace(/\s/g, ""))) {
      return "Name contains invalid characters.";
    }

    return "";
  };

  const handleSave = () => {
    const validationError = validateUsername(username);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (username) {
      // Spara resultatet om användaren bekräftar
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
          handleResultSaved(); // Anropa callback-funktionen
          handleCloseSaveDialog(); // Stäng dialogen
        })
        .catch((error) => {
          handleCloseSaveDialog(); // Försök stänga dialogen även vid fel
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
            setError(""); // Rensa felmeddelandet när användaren skriver
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
