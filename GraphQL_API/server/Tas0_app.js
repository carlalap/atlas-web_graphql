/* Script use it from task0 to task5
* run npm start
*/
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema'); // check path file

const app = express();

// add schema in an object we pass to the graphqlHTTP()
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // Enables GraphiQL, a graphical interactive in-browser GraphQL IDE
}));

// Listening for requests on port 4000 (update Dockerfile)
app.use('/graphql', graphqlHTTP({
}));
app.listen(4000, () => {
  console.log('now listening for request on port 4000\n');
});
