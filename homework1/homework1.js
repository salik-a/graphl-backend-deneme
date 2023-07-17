import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'
import { events, locations, users, participants } from './homework1Data.js'


const typeDefs = `

    type Event {
        id: Int,
        title: String,
        desc: String,
        date: String,
        form: String,
        to: String,
        location_id: Int,
        user_id: Int,
        participants: [Participant],
        location: Location,
        user: User
    } 
    type User {
        id: Int,
        username: String,
        email: String,
        events: [Event]
    } 
     type Participant {
        id: Int,
        user_id: Int,
        event_id: Int
    }
    type Location {
        id: Int,
        name: String,
        desc: String,
        lat: Float,
        lng: Float
    } 
    type Query{
        users: [User]
        user(id: Int): User

        participants: [Participant]
        participant(id: Int): Participant

        locations: [Location]
        location(id: Int): Location

        events: [Event]
        event(id: Int): Event
    }

`;

const resolvers = {
    Query: {
        users: () => users,
        user: (parent, args) => users.find(user => user.id === args.id),


        participants: () => participants,
        participant: (parent, args) => participants.find(participant => participant.id === args.id),

        locations: () => locations,
        location: (parent, args) => locations.find(location => location.id === args.id),

        events: () => events,
        event: (parent, args) => events.find(event => event.id === args.id),
        // book: (parent, args) => {
        //     const data = books.find((book) => book.id === args.id)
        //     return data;
        // },
        // author: (parent, args) => {
        //     const data = authors.find((author) => author.name === args.name)
        //     return data;
        // }
    },
    Event: {
        location: (parent) => {
            return locations.find(location => location.id === parent.location_id)
        },
        user: (parent) => {
            return users.find(user => user.id === parent.user_id)
        },
        participants: (parent) => participants.filter(participant => participant.event_id === parent.id)
    },
    User: {
        events: (parent, args) => events.filter(event => event.user_id === parent.id)
    },

}

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);

// server.listen().then(({ url }) => console.log("Apollo server is up at ", url))