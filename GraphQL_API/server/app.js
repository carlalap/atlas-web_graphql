/* Script use to Connect to mongoDB Atlas database
* exec:  npm start from the package.json file
*/
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const cors = require('cors');

const app = express();

// Allow cross-origin requests
app.use(cors());

// its connect to the database
const mongoDB = 'mongodb+srv://charlies:Pass012345@cluster0.rctegk2.mongodb.net/';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
// Database connection success/error handling
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.once('open', () => {
  console.log('connected to database');
});

/* // Connect to the database
mongoose.connect('mongodb+srv://charlies:Pass012345@cluster0.rctegk2.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); */

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

// Listening for requests on port 8080
app.listen(4000, () => {
  console.log('now listening for request on port 4000\n');
});
