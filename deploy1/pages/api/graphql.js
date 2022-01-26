// const mongoose = require('mongoose');
// const typeDefs = require('./graphql/typeDefs');
// const resolvers = require('./graphql/resolvers');
// const { MONGODB } = require('./config.js');
// const {GraphQLUpload,graphqlUploadExpress} = require('graphql-upload');

// const { ApolloServer, gql } = require("apollo-server-express");

// const path = require("path");
// const express = require("express");


// const files = [];

// async function startApolloServer() {



//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//   });
//   await server.start();
//   const handler = server.createHandler({ path: "/api/graphql-data" });
//   const app = express()

// app.use(graphqlUploadExpress());
// app.use("/images", express.static("images"));
// server.applyMiddleware({ app });

// await new Promise(resolve => app.listen({ port: 3000 }, resolve));

//   console.log(`🚀  Server ready at http://localhost:3000/`);

//   mongoose
//   .connect(MONGODB, { useNewUrlParser: true },{ useUnifiedTopology: true })
//   .then(() => {
//     console.log('MongoDB Connected');
//   })
    
//   return { server, app };
// }

 
// startApolloServer();
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // export default handler;

import { ApolloServer, gql } from 'apollo-server-micro'


const typeDefs = gql`
  type Query {
    sayHello: String
  }
`

const resolvers = {
  Query: {
    sayHello(parent, args, context) {
      return 'Hello World!'
    },
  },
}

export const config = {
  api: {
    bodyParser: false,
  },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })
// await apolloServer.start();
export default apolloServer.createHandler({ path: '/api/graphql' })
