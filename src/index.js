const { GraphQLServer } = require('graphql-yoga')

// Defines your GraphQL schema
const typeDefs = `
type Query {
    info: String!
    feed: [Link!]!
}

type Link {
    id: ID!
    description: String!
    url: String!
}
`

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Full tutorial for GraphQL'
}]

// The actual implementation of the GraphQL schema
const resolvers = {
    Query: {
        info: () => 'This is a API of a Hackernews Clone!',
        feed: () => links,
    },
    Link: {
        id: (root) => root.id,
        description: (root) => root.description,
        url: (root) => root.url,
    }
}

/*
3 - The schema and resolvers are bundled and passed to the GraphQLServer
which is imported from graphql-yoga. This tells the server what API
operations are accepted and how they should be resolved.
*/
const server = new GraphQLServer({
    typeDefs,
    resolvers,
})

server.start(() => console.log('Server is running on http://localhost:4000'))