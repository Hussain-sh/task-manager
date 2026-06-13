"use client";

import { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import Link from "next/link";

export interface TaskFormData {
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: string;
}

interface TaskFormProps {
  title: string;
  buttonText: string;
  initialValues?: TaskFormData;
  onSubmit: (data: TaskFormData) => void;
  isLoading?: boolean;
  disableStatus?: boolean;
}

const defaultValues: TaskFormData = {
  title: "",
  description: "",
  status: "TODO",
  priority: "MEDIUM",
  dueDate: "",
};

export default function TaskForm({
  title,
  buttonText,
  initialValues = defaultValues,
  onSubmit,
  isLoading = false,
  disableStatus,
}: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>(initialValues);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const validateForm = () => {
    const newErrors = {
      title: "",
      description: "",
      dueDate: "",
    };

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 200) {
      newErrors.title = "Title cannot exceed 200 characters";
    }

    if (formData.description && formData.description.length > 2000) {
      newErrors.description = "Description cannot exceed 2000 characters";
    }

    if (
      formData.dueDate &&
      new Date(formData.dueDate) < new Date(new Date().toDateString())
    ) {
      newErrors.dueDate = "Due date cannot be in the past";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some(Boolean);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const payload = {
      ...formData,
      dueDate: formData.dueDate
        ? new Date(formData.dueDate).toISOString()
        : undefined,
    };

    onSubmit(payload);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: "600" }}>
            {title}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Fill in the details below.
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth
            required
          />

          <TextField
            label="Description"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            multiline
            rows={4}
            error={!!errors.description}
            helperText={errors.description}
            fullWidth
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            <TextField
              select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={disableStatus}
            >
              <MenuItem value="TODO">TODO</MenuItem>
              <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
              <MenuItem value="DONE">DONE</MenuItem>
            </TextField>

            <TextField
              select
              label="Priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <MenuItem value="LOW">LOW</MenuItem>
              <MenuItem value="MEDIUM">MEDIUM</MenuItem>
              <MenuItem value="HIGH">HIGH</MenuItem>
            </TextField>
          </Box>

          <TextField
            label="Due Date"
            name="dueDate"
            type="date"
            value={formData.dueDate || ""}
            onChange={handleChange}
            error={!!errors.dueDate}
            helperText={errors.dueDate}
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <Button component={Link} href="/" variant="outlined" size="large">
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isLoading}
            >
              {isLoading
                ? buttonText === "Create"
                  ? "Creating..."
                  : "Saving..."
                : buttonText}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
