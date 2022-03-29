import { gql } from 'apollo-server-express'
import * as db from '../database'

export const typeDefs = gql`
    extend type Query {
        users: [User]
        user(id: ID!): User
    }
    type User {
        id: ID!
        slug: String
        name: String
    }
`
export const resolvers = {
    Query: {
        users: async () => db.default.users.findAll(),
        user: async (obj, args, context, info) =>
            db.default.users.findByPk(args.id),
    },
}