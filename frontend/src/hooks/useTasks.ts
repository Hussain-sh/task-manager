import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getTasks, getTaskById, createTask, updateTask, deleteTask } from "@/lib/task.service"
import { UpdateTaskInput } from "@/types/task"

export const useGetTasks = (params?: Record<string, string>) => {
  return useQuery({
    queryKey: ["tasks", params],
    queryFn: () => getTasks(params),
  })
}

export const useGetTaskById = (id: string) => {
  return useQuery({
    queryKey: ["tasks", id],
    queryFn: () => getTaskById(id),
  })
}

export const useCreateTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
  })
}

export const useUpdateTask = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: UpdateTaskInput) => updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
  })
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
  })
}