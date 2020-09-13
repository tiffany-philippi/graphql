import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typedefs';
import resolvers from './resolvers';
import { createConnection } from 'typeorm';

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app });
createConnection();

app.get('/', (req, res) => {
  res.send("Hello");
});
app.listen(4000, () => {
  console.log(`Power GraphQL server is running`);
})