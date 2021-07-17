// Types
exports.User = `
type User{
    _id: ID!
    email: String!
    createdEvents: [Event!]
  }`;

exports.AuthData = `
  type AuthData {
      userId: ID!
      token: String!
      tokenExpiration: Int!
  }`;

// Inputs
exports.UserInput = `
  input UserInput {
    email:String!
    password:String!
  }`;

// Query
exports.login = `login(email:String!,password:String!): AuthData!`;

// Mutation
exports.createUser = `createUser(userInput:UserInput): User`;
