/* Script use to Connect to mongoDB Atlas database
* exec:  npm start from the package.json file
*/
const { graphqlHTTP } = require('express-graphql');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./schema/schema');

const app = express();

app.use(cors());

// Connect to the database
mongoose.connect('mongodb+srv://charlies:Pass012345@cluster0.rctegk2.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('connected to database');
});

// Use the graphqlHTTP middleware with your schema
app.use('/graphql', graphqlHTTP({
  schema, // Make sure this references the schema you've defined
  graphiql: true, // Enables the GraphiQL interface
}));

// Listening for requests on port 8080
app.listen(8080, () => {
  console.log('now listening for request on port 8080');
});
