const express = require('express');
const {graphqlHTTP} = require('express-graphql');

const app = express();

app.use('/graphql', graphqlHTTP({
}));
app.listen(8080, () => {
  console.log('now listening for request on port 8080\n');
});
