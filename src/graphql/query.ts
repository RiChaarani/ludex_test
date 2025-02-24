import { type QueryResolvers as IQuery } from "./generated/graphql";
import { Context } from "./context";

export const Query: IQuery<Context> = {
  hello: () => "world",
  getAllTodos: async (_, __, context) => {
    try {
      const todos = await context.prisma.todo.findMany();
      return todos.map((todo) => ({
        ...todo,
        createdAt: todo.createdAt.toISOString(),
        updatedAt: todo.updatedAt.toISOString(),
      }));
    } catch (error) {
      console.error("Error fetching all todos:", error);
      throw new Error("Failed to fetch todos");
    }
  },

  getCompletedTodos: async (_, __, context) => {
    try {
      const todos = await context.prisma.todo.findMany({ where: { completed: true } });
      return todos.map((todo) => ({
        ...todo,
        createdAt: todo.createdAt.toISOString(),
        updatedAt: todo.updatedAt.toISOString(),
      }));
    } catch (error) {
      console.error("Error fetching completed todos:", error);
      throw new Error("Failed to fetch completed todos");
    }
  },

  getIncompleteTodos: async (_, __, context) => {
    try {
      const todos = await context.prisma.todo.findMany({ where: { completed: false } });
      return todos.map((todo) => ({
        ...todo,
        createdAt: todo.createdAt.toISOString(),
        updatedAt: todo.updatedAt.toISOString(),
      }));
    } catch (error) {
      console.error("Error fetching incomplete todos:", error);
      throw new Error("Failed to fetch incomplete todos");
    }
  },

  getTodoById: async (_, { id }, context) => {
    try {
      const todo = await context.prisma.todo.findUnique({ where: { id } });
      if (!todo) {
        throw new Error("Todo not found");
      }
      return {
        ...todo,
        createdAt: todo.createdAt.toISOString(),
        updatedAt: todo.updatedAt.toISOString(),
      };
    } catch (error) {
      console.error("Error fetching todo by ID:", error);
      throw new Error("Failed to fetch todo");
    }
  },
};
