import { gql } from 'apollo-server-express'
import * as db from '../database'

export const typeDefs = gql`
    extend type Query {
        statuss: [Status]
        status(id: ID!): Status
    }
    type Status {
        id: ID!
        slug: String
        name: String
    }
`
export const resolvers = {
    Query: {
        statuss: async () => db.default.status.findAll(),
        status: async (obj, args, context, info) =>
        db.default.status.findByPk(args.id),
    },
}