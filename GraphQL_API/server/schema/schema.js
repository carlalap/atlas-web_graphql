// Script that contains the schema property.

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID } = require('graphql');
const _ = require('lodash');

// taks2. dummy data to be used to be used in the resolve function
const tasks = [
  { id: '1', title: 'Create your first webpage', weight: 1, description: 'Create your first HTML file 0-index.html with: -Add the doctype on the first line (without any comment) -After the doctype, open and close a html tag Open your file in your browser (the page should be blank)' },
  { id: '2', title: 'Structure your webpage', weight: 1, description: 'Copy the content of 0-index.html into 1-index.html Create the head and body sections inside the html tag, create the head and body tags (empty) in this order' }
];


// Creates GraphQLObjectType: TaskType which contains 2 parameters (Tawsk, fields)
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
  },
});

/* Creates type that represents all of the possible entry points into the GraphQL API,
 * create a root query to query for a particular task
*/
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return _.find(tasks, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
});
