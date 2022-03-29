import { gql } from 'apollo-server-express'
import * as db from '../database'


export const typeDefs = gql`
    extend type Query {
        tickets: [Ticket]
        ticket(id: ID!): Ticket
    }
    type Ticket {
        id: ID!
        subject: String
        priority_id: Int
        status_id: Int
        user_id: Int
        user: User
        assigned_to_user_id: Int
    }
`
export const resolvers = {
    Query: {
        tickets: async () => db.default.tickets.findAll(),
        ticket: async (obj, args, context, info) =>
        db.default.tickets.findByPk(args.id),
    },
    
    Ticket: {
        user: async (obj, args, context, info) => db.default.users.findByPk(obj.user_id),
    },
    
}