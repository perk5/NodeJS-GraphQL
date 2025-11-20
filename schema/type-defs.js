const {gql} = require("apollo-server");

const typeDefs = gql`
    type User{
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: Nationality!
        friends: [User!]
        favouriteMovies: [Movie!]
    }

    type Movie{
        id: ID!
        name: String!
        yearOfPublication: Int!
        isInTheatre: Boolean!
    }

    input CreateUserInput{
        name: String!
        username: String!
        age: Int!
        nationality: Nationality = American
    }

    input UpdateUserName{
        id: ID!
        name: String!
    }
    input DeleteUserById{
        id: ID!
    }

    type Mutation{
        createUser(input: CreateUserInput!): User
        updateUser(input: UpdateUserName!): User
        deleteUser(input: DeleteUserById!): User
    }

    type Query{
        users: [User!]!
        user(id: ID!): User!
        movies: [Movie!]!
        movie(name: String!): Movie!
    }

    enum Nationality{
        American
        Indian
        Spanish
        Irish
        Chinese
    }

`

module.exports = typeDefs