import { type MutationResolvers as IMutation } from "./generated/graphql";
import { Context } from "./context";
import { GraphQLError } from "graphql";

export const Mutation: IMutation<Context> = {
  createSomething: async (_, { input }, { prisma }) => {
    const something = await prisma.something.create({
      data: {
        name: input.name,
      },
    });

    return {
      id: something.id,
      name: something.name,
    };
  },

  createTodo: async (_, { input }, { prisma }) => {
    if (!input.title || input.title.trim() === "") {
      throw new GraphQLError("Title cannot be empty", {
        extensions: {
          code: "BAD_USER_INPUT",
          field: "title",
        },
      });
    }
    try {
      const todo = await prisma.todo.create({
        data: {
          title: input.title,
          completed: false,
        },
      });

      return {
        ...todo,
        createdAt: todo.createdAt.toISOString(),
        updatedAt: todo.updatedAt.toISOString(),
      };
    } catch (error) {
      console.error("Error creating todo:", error);
      throw new Error("Failed to create todo");
    }
  },

  updateTodoTitle: async (_, { input }, { prisma }) => {
    if (!input.id || input.id.trim() === "") {
      throw new GraphQLError("ID cannot be empty", {
        extensions: {
          code: "BAD_USER_INPUT",
          field: "id",
        },
      });
    }
    if (!input.title || input.title.trim() === "") {
      throw new GraphQLError("Title cannot be empty", {
        extensions: {
          code: "BAD_USER_INPUT",
          field: "title",
        },
      });
    }
    const existingTodo = await prisma.todo.findUnique({
      where: { id: input.id },
    });

    if (!existingTodo) {
      throw new GraphQLError("Todo not found", {
        extensions: {
          code: "NOT_FOUND",
          field: "id",
        },
      });
    }
    try {
      const todo = await prisma.todo.update({
        where: { id: input.id },
        data: { title: input.title },
      });

      return {
        ...todo,
        createdAt: todo.createdAt.toISOString(),
        updatedAt: todo.updatedAt.toISOString(),
      };
    } catch (error) {
      console.error("Error updating todo title:", error);
      throw new Error("Failed to update todo title");
    }
  },

  markTodoCompleted: async (_, { input }, { prisma }) => {
    if (!input.id || input.id.trim() === "") {
      throw new GraphQLError("ID cannot be empty", {
        extensions: {
          code: "BAD_USER_INPUT",
          field: "id",
        },
      });
    }

    if (typeof input.completed !== "boolean") {
      throw new GraphQLError("Completed must be a boolean", {
        extensions: {
          code: "BAD_USER_INPUT",
          field: "completed",
        },
      });
    }

    const existingTodo = await prisma.todo.findUnique({
      where: { id: input.id },
    });

    if (!existingTodo) {
      throw new GraphQLError("Todo not found", {
        extensions: {
          code: "NOT_FOUND",
          field: "id",
        },
      });
    }

    try {
      const todo = await prisma.todo.update({
        where: { id: input.id },
        data: { completed: input.completed },
      });

      return {
        ...todo,
        createdAt: todo.createdAt.toISOString(),
        updatedAt: todo.updatedAt.toISOString(),
      };
    } catch (error) {
      console.error("Error marking todo as completed:", error);
      throw new Error("Failed to mark todo as completed");
    }
  },

  deleteTodo: async (_, { input }, { prisma }) => {
    if (!input.id || input.id.trim() === "") {
      throw new GraphQLError("ID cannot be empty", {
        extensions: {
          code: "BAD_USER_INPUT",
          field: "id",
        },
      });
    }

    const existingTodo = await prisma.todo.findUnique({
      where: { id: input.id },
    });

    if (!existingTodo) {
      throw new GraphQLError("Todo not found", {
        extensions: {
          code: "NOT_FOUND",
          field: "id",
        },
      });
    }

    try {
      await prisma.todo.delete({
        where: { id: input.id },
      });

      return true;
    } catch (error) {
      console.error("Error deleting todo:", error);
      throw new Error("Failed to delete todo");
    }
  },
};
