import React, { useContext } from "react";
import { Container, Typography } from "@mui/material";
import { QuizAppContext } from "../../context";

/**
 * Error Component
 *
 * This component displays an error message retrieved from the QuizAppContext.
 * It uses Material-UI's Container and Typography components to style the error message.
 *
 * @component
 * @example
 * // To use the Error component, ensure that it is wrapped within the QuizAppProvider
 * // and that the QuizAppContext contains an error message.
 * return (
 *   <QuizAppProvider>
 *     <Error />
 *   </QuizAppProvider>
 * )
 *
 * @returns {JSX.Element} A container with an error message.
 */
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
