import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';

const SaveResults = ({ correctAnswers, open, onClose, onResultSaved }) => {
  const [username, setUsername] = useState('');

  const handleSave = () => {
    if (username) {
      // Spara resultatet om användaren bekräftar
      fetch('http://localhost:8080/api/quiz/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          score: correctAnswers,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Result saved:', data);
          onResultSaved();
          onClose();
        })
        .catch(error => console.error('Error saving result:', error));
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ textAlign: "center" }}>You are not in the top 10!!!</DialogTitle>
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
          onChange={(e) => setUsername(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
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