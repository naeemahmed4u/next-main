  
//const { ApolloServer } = require('apollo-server-express')
//const express = require('express')
const cors = require('cors')
//const path = require('path');
//const { createWriteStream, existsSync, mkdirSync } = require("fs");
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');
const {GraphQLUpload,graphqlUploadExpress} = require('graphql-upload');
//const {finished} =require('stream/promises');

const { ApolloServer, gql } = require("apollo-server-express");
//const { createWriteStream, existsSync, mkdirSync } = require("fs");
const path = require("path");
const express = require("express");

//const { graphqlUploadExpress } = require('graphql-upload');


// function generateRandomString(length) {
//   var result = ''
//   var characters =
//     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//   var charactersLength = characters.length
//   for (var i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength))
//   }
//   return result
// }

const files = [];

async function startApolloServer() {

//existsSync(path.join(__dirname, "../images")) || mkdirSync(path.join(__dirname, "../images"));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();
  const app = express()

app.use(graphqlUploadExpress());
// app.use("/images", express.static(path.join(__dirname, "../images")));
app.use("/images", express.static("images"));
// // app.use(cors())
server.applyMiddleware({ app });

await new Promise(resolve => app.listen({ port: 5000 }, resolve));
//app.listen(5000, () => {
  console.log(`🚀  Server ready at http://localhost:5000/`);
//});
  mongoose
  .connect(MONGODB, { useNewUrlParser: true },{ useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
     //return app.listen({ port: 5000 });
  })
  //  .then((res) => {
  //     console.log(`Server running at ${res.url}`);
  //  });
  
  return { server, app };
}

 


startApolloServer();

