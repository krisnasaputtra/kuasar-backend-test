export const typeDefs = `#graphql
type User {
    id: ID!
    username: String!
    email: String!
    password: String!
}

input SignUpInput {
    username: String!
    email: String!
    password: String!
}

input SignInInput {
    email: String!
    password: String!
}

type AuthPayload{
    code: Int!
    success: Boolean!
    message: String!
    token: String
    user: User
}

type Query{
    hello: String!
}

type Mutation{
    signUp(input: SignUpInput!): AuthPayload!
    signIn(input: SignInInput!): AuthPayload!
}
`;
