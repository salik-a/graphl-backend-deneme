import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'
import { nanoid } from 'nanoid';

const users = [
    {
        id: nanoid(),
        name: 'Alper Salik',
        age: 25
    }
]

const typeDefs = `

    type User {
        id: ID,
        name: String,
        age: Int,
    }

    input createUserInput {
      name: String,
      age: Int,
    }

    type DeleteOutput {
      count: Int
    }
    
    type Query{
        users: [User]
    }

    type Mutation {
      createUser(data: createUserInput): User,
      updateUser(id: ID, data: createUserInput): User,
      deleteUser(id: ID): User,
      deleteAllUsers: DeleteOutput,
    }

`;

const resolvers = {
    Query: {
        users: () => users,
    },
    Mutation: {
        createUser: (parent, { data }) => {
            const newUser = {
                id: nanoid(),
                ...data
            };
            users.push(newUser);
            return newUser;
        },
        updateUser: (parent, { id, data }) => {
            const userIndex = users.findIndex(user => user.id === id)
            if (userIndex === -1) {
                throw new Error('user not found')
            }
            const updatedUser = (users[userIndex] = {
                ...users[userIndex],
                ...data
            })
            return updatedUser;
        },
        deleteUser: (parent, { id }) => {
            const userIndex = users.findIndex(user => user.id === id)
            if (userIndex === -1) {
                throw new Error('user not found')
            }
            const deletedUser = users[userIndex];
            users.splice(userIndex, 1);
            return deletedUser;
        },
        deleteAllUsers: () => {
            const length = users.length;
            users.splice(0, length);

            return {
                count: length,
            };
        }
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