import prisma from "../lib/prisma";
import { Prisma } from "../../generated/prisma/client"

export const getAllTasks = async (filters: {
  status?: string;
  priority?: string;
  sortBy?: string;
  order?: string;
}) => {
    const { status, priority, sortBy, order } = filters;

    const where: any = {};

    if (status) {
        where.status = status;
    }

    if (priority) {
        where.priority = priority;
    }

    const orderBy =
        sortBy && order
        ? {
            [sortBy]: order,
            }
        : undefined;

    return prisma.task.findMany({
        where,
        orderBy,
    });
};

export const findTaskById = async(id: string) => {
    return await prisma.task.findUnique({
        where: {
            id,
        },
    });
}

export const createTask = async(data: Prisma.TaskCreateInput) => {
    return prisma.task.create({
        data,
    });
}

export const updateTask = async(id: string, data: Prisma.TaskUpdateInput) => {
    return prisma.task.update({
        where: {
            id,
        },
        data
    })
}

export const deleteTask = async (id: string) => {
  return prisma.task.delete({
    where: {
      id,
    },
  });
};