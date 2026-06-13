"use client";

import ConfirmDialog from "@/components/ConfirmDialog";
import { useDeleteTask, useGetTasks } from "@/hooks/useTasks";
import { StatusFilter, Task } from "@/types/task";
import { Chip } from "@mui/material";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Button,
  Stack,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { mutate: deleteTask, isPending } = useDeleteTask();

  const handleDelete = () => {
    if (!deleteId) return;
    deleteTask(deleteId, {
      onSuccess: () => {
        toast.success("Task deleted successfully");
        setDeleteId(null);
      },
      onError: () => {
        toast.error("Failed to delete task");
      },
    });
  };

  const params: Record<string, string> = {
    sortBy: "dueDate",
    order: sortOrder,
  };

  if (statusFilter !== "ALL") {
    params.status = statusFilter;
  }

  const { data, isLoading, error } = useGetTasks(params);

  const tasks = data?.data || [];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: 2,
          mb: 3,
        }}
      >
        <Typography variant="h4">Task Manager</Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            >
              <MenuItem value="ALL">All</MenuItem>
              <MenuItem value="TODO">TODO</MenuItem>
              <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
              <MenuItem value="DONE">DONE</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Due Date</InputLabel>

            <Select
              value={sortOrder}
              label="Due Date"
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            >
              <MenuItem value="asc">Oldest first</MenuItem>
              <MenuItem value="desc">Newest first</MenuItem>
            </Select>
          </FormControl>

          <Button
            component={Link}
            href="/tasks/create"
            variant="contained"
            sx={{ textDecoration: "none" }}
          >
            Create Task
          </Button>
        </Stack>
      </Box>

      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          overflowX: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Loading tasks...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Failed to load tasks
                </TableCell>
              </TableRow>
            ) : tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No tasks found
                </TableCell>
              </TableRow>
            ) : (
              tasks.map((task: Task) => (
                <TableRow
                  key={task.id}
                  hover
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: "#fafafa",
                    },
                  }}
                >
                  <TableCell>
                    <Link
                      style={{
                        textDecoration: "underline",
                        fontWeight: 500,
                      }}
                      href={`/tasks/${task.id}`}
                    >
                      {task.title}
                    </Link>
                  </TableCell>
                  <TableCell>
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
                    />
                  </TableCell>
                  <TableCell>
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
                    />
                  </TableCell>
                  <TableCell>
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                      <Button
                        component={Link}
                        href={`/tasks/${task.id}/edit`}
                        size="small"
                        variant="outlined"
                      >
                        Edit
                      </Button>

                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => setDeleteId(task.id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmDialog
        open={!!deleteId}
        title="Delete Task"
        description="Are you sure you want to delete this task? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        isLoading={isPending}
      />
    </Container>
  );
}
