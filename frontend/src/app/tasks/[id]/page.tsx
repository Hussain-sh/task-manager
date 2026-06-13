"use client";

import LoadingState from "@/components/LoadingState";
import { useDeleteTask, useGetTaskById } from "@/hooks/useTasks";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useState } from "react";

export default function TaskDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const { data, isLoading } = useGetTaskById(id);
  const { mutate: deleteTask, isPending } = useDeleteTask();
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (isLoading) {
    return (
      <LoadingState
        title="Loading task..."
        description="Please wait while we load the task details."
      />
    );
  }

  const task = data?.data;

  if (!task) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h6">Task not found</Typography>
      </Container>
    );
  }

  const handleDelete = () => {
    deleteTask(task.id, {
      onSuccess: () => {
        toast.success("Task deleted successfully");
        router.push("/");
      },
      onError: () => {
        toast.error("Failed to delete task");
      },
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        component={Link}
        href="/"
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
      >
        Back to Tasks
      </Button>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 3,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "600" }}>
            {task.title}
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              component={Link}
              href={`/tasks/${task.id}/edit`}
              variant="outlined"
            >
              Edit
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={() => setConfirmOpen(true)}
              disabled={isPending}
            >
              Delete
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Description
            </Typography>
            <Typography variant="body1">
              {task.description || "No description provided"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Status
              </Typography>
              <Chip
                label={task.status}
                color={
                  task.status === "DONE"
                    ? "success"
                    : task.status === "IN_PROGRESS"
                      ? "warning"
                      : "default"
                }
                size="small"
                sx={{ mt: 0.5 }}
              />
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary">
                Priority
              </Typography>
              <Chip
                label={task.priority}
                color={
                  task.priority === "HIGH"
                    ? "error"
                    : task.priority === "MEDIUM"
                      ? "warning"
                      : "success"
                }
                size="small"
                sx={{ mt: 0.5 }}
              />
            </Box>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">
              Due Date
            </Typography>
            <Typography variant="body1">
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "No due date"}
            </Typography>
          </Box>

          <Divider />

          <Box sx={{ display: "flex", gap: 4 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Created At
              </Typography>
              <Typography variant="body1">
                {new Date(task.createdAt).toLocaleString()}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary">
                Updated At
              </Typography>
              <Typography variant="body1">
                {new Date(task.updatedAt).toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
      <ConfirmDialog
        open={confirmOpen}
        title="Delete Task"
        description="Are you sure you want to delete this task? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
        isLoading={isPending}
      />
    </Container>
  );
}
