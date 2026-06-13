"use client";

import {
  Box,
  Container,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";

interface LoadingStateProps {
  title?: string;
  description?: string;
}

export default function LoadingState({
  title = "Loading...",
  description = "Please wait while we load the content.",
}: LoadingStateProps) {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <CircularProgress />
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
