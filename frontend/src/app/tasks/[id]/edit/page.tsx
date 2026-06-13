"use client";

import LoadingState from "@/components/LoadingState";
import TaskForm, { TaskFormData } from "@/components/TaskForm";
import { useGetTaskById, useUpdateTask } from "@/hooks/useTasks";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function EditTaskPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const { data, isLoading } = useGetTaskById(id);
  const { mutate: updateTask, isPending } = useUpdateTask(id);

  if (isLoading) {
    return (
      <LoadingState
        title="Loading task..."
        description="Please wait while we load the task details."
      />
    );
  }

  const task = data?.data;

  const initialValues: TaskFormData = {
    title: task.title,
    description: task.description || "",
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
  };

  const handleSubmit = (data: TaskFormData) => {
    updateTask(data, {
      onSuccess: () => {
        toast.success("Task updated successfully");
        router.push("/");
      },
      onError: () => {
        toast.error("Failed to update task");
      },
    });
  };

  return (
    <TaskForm
      title="Edit Task"
      buttonText="Save Changes"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      isLoading={isPending}
    />
  );
}
