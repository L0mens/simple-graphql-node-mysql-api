import { gql } from 'apollo-server-express'
import * as db from '../database'

export const typeDefs = gql`
    extend type Query {
        priorities: [Prioritie]
        prioritie(id: ID!): Prioritie
    }
    type Prioritie {
        id: ID!
        slug: String
        name: String
    }
`
export const resolvers = {
    Query: {
        priorities: async () => db.default.priorities.findAll(),
        prioritie: async (obj, args, context, info) =>
        db.default.priorities.findByPk(args.id),
    },
}