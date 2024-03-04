// Script that contains the schema property.

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = require('graphql');

// Creates GraphQLObjectType: TaskType which contains 2 parameters (Tawsk, fields)
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: {
    id: { type: GraphQLString },
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
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        // Code to retrieve data from the database based on args.id
        // This function should return the task object with the provided id
        // For now, let's return a hardcoded task object
        return {
          id: args.id,
          title: 'Sample Task',
          weight: 5,
          description: 'This is a sample task',
        };
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQueryType
});
