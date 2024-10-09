import React from "react";
import { Container, Typography, CircularProgress, Box } from "@mui/material";

/**
 * Loading Component
 *
 * This component displays a loading spinner and a customizable loading message.
 * It uses Material-UI's Container, Typography, CircularProgress, and Box components
 * to style and position the loading elements.
 *
 * @component
 * @example
 * // To use the Loading component, simply include it in your render method.
 * // You can optionally pass a custom loading message.
 * return (
 *   <Loading loadingText="Fetching data..." />
 * )
 *
 * @param {Object} props - The component props
 * @param {string} [props.loadingText="Loading questions..."] - The loading message to display
 * @returns {JSX.Element} A container with a loading spinner and message.
 */
function Loading({ loadingText = "Loading questions..." }) {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress
          sx={{
            animationDuration: "3s", // Justerar hastigheten på snurrningen
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
