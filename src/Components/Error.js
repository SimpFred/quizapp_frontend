import React from 'react';
import { Container, Typography } from '@mui/material';

function Error({ message }) {
  return (
    <Container maxWidth="sm">
      <Typography variant="h6" color="error">Error: {message}</Typography>
    </Container>
  );
}

export default Error;