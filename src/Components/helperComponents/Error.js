import React, { useContext } from "react";
import { Container, Typography } from "@mui/material";
import { QuizAppContext } from "../../context";

function Error() {
  const { message } = useContext(QuizAppContext);
  return (
    <Container maxWidth="sm">
      <Typography variant="h6" color="error">
        Error: {message}
      </Typography>
    </Container>
  );
}

export default Error;
