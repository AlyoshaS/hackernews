const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')
const Subscription = require('./resolvers/Subscription')
const Feed = require('./resolvers/Feed')


// The actual implementation of the GraphQL schema
const resolvers = {
    Query,
    Mutation,
    AuthPayload,
    Subscription,
    Feed
}

/*
3 - The schema and resolvers are bundled and passed to the GraphQLServer
which is imported from graphql-yoga. This tells the server what API
operations are accepted and how they should be resolved.
*/
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'https://us1.prisma.sh/evelyn-schmitz-6a9b55/hackernews/dev',
            secret: 'mysecret123',
            debug: true,
        }),
    }),
})

server.start(() => console.log('Server is running on http://localhost:4000'))