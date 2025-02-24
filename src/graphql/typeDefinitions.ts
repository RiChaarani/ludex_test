export const typeDefs = /* GraphQL */ `
  input CreateSomethingInput {
    name: String!
  }

  input CreateTodoInput {
    title: String!
  }

  input UpdateTodoTitleInput {
    id: ID!
    title: String!
  }

  input MarkTodoCompletedInput {
    id: ID!
    completed: Boolean!
  }

  input DeleteTodoInput {
    id: ID!
  }

  type Something {
    id: ID!
    name: String!
  }

  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    hello: String
    getAllTodos: [Todo!]!
    getCompletedTodos: [Todo!]!
    getIncompleteTodos: [Todo!]!
    getTodoById(id: ID!): Todo
  }

  type Mutation {
    createSomething(input: CreateSomethingInput!): Something!
    createTodo(input: CreateTodoInput!): Todo!
    updateTodoTitle(input: UpdateTodoTitleInput!): Todo!
    markTodoCompleted(input: MarkTodoCompletedInput!): Todo!
    deleteTodo(input: DeleteTodoInput!): Boolean!
  }
`;
