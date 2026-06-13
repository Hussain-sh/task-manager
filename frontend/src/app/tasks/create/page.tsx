// create/page.tsx
"use client";
import { useRouter } from "next/navigation";
import TaskForm, { TaskFormData } from "@/components/TaskForm";
import { useCreateTask } from "@/hooks/useTasks";
import { toast } from "react-toastify";

export default function CreateTaskPage() {
  const router = useRouter();
  const { mutate: createTask, isPending } = useCreateTask();

  const handleSubmit = (data: TaskFormData) => {
    createTask(data, {
      onSuccess: () => {
        toast.success("Task created successfully");
        router.push("/");
      },
      onError: () => {
        toast.error("Failed to create task");
      },
    });
  };

  return (
    <TaskForm
      title="Create Task"
      buttonText="Create"
      onSubmit={handleSubmit}
      isLoading={isPending}
      disableStatus
    />
  );
}
