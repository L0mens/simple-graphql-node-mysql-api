import '@babel/polyfill'
import express from 'express'
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()



async function startApolloServer() {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        
            modules: [
                require('./GraphQL/tickets'),
                require('./GraphQL/users'),
                require('./GraphQL/status'),
                require('./GraphQL/priorities'),
            ],
        
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();
    server.applyMiddleware({ app });
    await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
startApolloServer();
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cors())

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen({ port: 5000 }, () =>
//     console.log(`🚀 Server ready at http://localhost:5000`),
// )
