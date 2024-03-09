/* Script use to Connect to mongoDB Atlas database
* exec:  npm start from the package.json file
*/
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const app = express();

app.use(cors());

// Connect to the database
mongoose.connect('mongodb+srv://charlies:Pass012345@cluster0.rctegk2.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Database connection success/error handling
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.once('open', () => {
  console.log('connected to database');
});

// Use the graphqlHTTP middleware with your schema
app.use('/graphql', graphqlHTTP({
  schema, // Make sure this references the schema you've defined
  graphiql: true, // Enables the GraphiQL interface
}));

/* app.use('/graphql', graphqlHTTP({
})); */

// Listening for requests on port 8080
app.listen(4000, () => {
  console.log('now listening for request on port 4000\n');
});
