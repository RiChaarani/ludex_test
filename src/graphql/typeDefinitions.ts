export const typeDefs = /* GraphQL */ `
  input CreateSomethingInput {
    name: String!
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
  }

  type Mutation {
    createSomething(input: CreateSomethingInput!): Something!
    createTodo(title: String!): Todo!
  }
`;
