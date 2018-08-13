const { GraphQLServer } = require('graphql-yoga')

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Full tutorial for GraphQL'
}]

let idCount = links.length

// The actual implementation of the GraphQL schema
const resolvers = {
    Query: {
        info: () => 'This is a API of a Hackernews Clone!',
        feed: () => links,
    },
    Mutation: {
        post: (DeviceRotationRate, args) => {
            const link = {
                id: `link-${ idCount++ }`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        }
    }
}

/*
3 - The schema and resolvers are bundled and passed to the GraphQLServer
which is imported from graphql-yoga. This tells the server what API
operations are accepted and how they should be resolved.
*/
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})

server.start(() => console.log('Server is running on http://localhost:4000'))