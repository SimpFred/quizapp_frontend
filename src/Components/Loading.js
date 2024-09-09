import React from 'react';
import { Container, Typography, CircularProgress, Box } from '@mui/material';

function Loading({ loadingText = "Loading questions..." }) {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress 
          sx={{
            animationDuration: '3s', // Justerar hastigheten på snurrningen
          }}
        />
        <Typography variant="h6" sx={{ mt: 2 }}>
          {loadingText}
        </Typography>
      </Box>
    </Container>
  );
}

export default Loading;