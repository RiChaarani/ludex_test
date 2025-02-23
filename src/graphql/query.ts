import { type QueryResolvers as IQuery } from "./generated/graphql";
import { Context } from "./context";

export const Query: IQuery<Context> = {
  hello: () => "world",
  getAllTodos: async (_, __, context) => {
    const todos = await context.prisma.todo.findMany();
    return todos.map((todo) => ({
      ...todo,
      createdAt: todo.createdAt.toISOString(),
      updatedAt: todo.updatedAt.toISOString(),
    }));
  },
  getCompletedTodos: async (_, __, context) => {
    const todos = await context.prisma.todo.findMany({ where: { completed: true } });
    return todos.map((todo) => ({
      ...todo,
      createdAt: todo.createdAt.toISOString(),
      updatedAt: todo.updatedAt.toISOString(),
    }));
  },
  getIncompleteTodos: async (_, __, context) => {
    const todos = await context.prisma.todo.findMany({ where: { completed: false } });
    return todos.map((todo) => ({
      ...todo,
      createdAt: todo.createdAt.toISOString(),
      updatedAt: todo.updatedAt.toISOString(),
    }));
  },
};
