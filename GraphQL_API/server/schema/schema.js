// Script that contains the schema property.

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID, GraphQLList, GraphQLNonNull,
} = require('graphql');

// const _ = require('lodash'); // used to get data from Arrays tasks and Projects

// Task7. Adding Mutations
const Task = require('../models/task');
const Project = require('../models/project');

// Task8. Disabling Arrays:  you should find the data directly from the database
/* // taks2. Array of Task: dummy data to be used to be used in the resolve function
const tasks = [
  { id: '1', title: 'Create your first webpage', weight: 1, description: 'Create your first HTML file 0-index.html with: -Add the doctype on the first line (without any comment) -After the doctype, open and close a html tag Open your file in your browser (the page should be blank)', projectId: '1' },
  { id: '2', title: 'Structure your webpage', weight: 1, description: 'Copy the content of 0-index.html into 1-index.html Create the head and body sections inside the html tag, create the head and body tags (empty) in this order', projectId: '1' },
]; */

/* // task3. Array of Projects contains 2 different projects objects:
const projects = [
  { id: '1', title: 'Advanced HTML', weight: 1, description: 'Welcome to the Web Stack specialization. The 3 first projects will give you all basics of the Web development: HTML, CSS and Developer tools. In this project, you will learn how to use HTML tags to structure a web page. No CSS, no styling - don’t worry, the final page will be “ugly” its normal, it’s not the purpose of this project. Important note: details are important! lowercase vs uppercase / wrong letter… be careful!'},
  { id: '2', title: 'Bootstrap', weight: 1, description: 'Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS and JavaScript design templates for typography, forms, buttons, navigation, and other interface components.'},
]; */

// Schema definition
// Creates GraphQLObjectType: TaskType which contains 2 parameters (Tawsk, fields)
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    project: {
      type: ProjectType, // Lazy loading
      resolve(parent, args) {
        return Project.findById(parent.projectId);
        // return _.find(projects, { id: parent.projectId });
      },
    },
  }),
});

// ProjectType which contains 2 parameters: Name Project and fiel properties
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parent, args) {
        // return _.filter(tasks, { projectId: parent.id });
        return Task.find({ projectId: parent.id });
      },
    },
  }),
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
        // return _.find(tasks, { id: args.id }); // use lodash
        return Task.findById(args.id);
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
        // return _.find(projects, { id: args.id }); // lodash
      },
    },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parent, args) {
        return Task.find({});
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find({});
      },
    },
  },
});

// Creating Mutation object for adding a ProjectType and task
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProject: {
      type: ProjectType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        // projectId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        const project = new Project({
          title: args.title,
          weight: args.weight,
          description: args.description,
        });
          // save project in database
        return project.save();
      },
    },
    addTask: {
      type: TaskType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        projectId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        const task = new Task({
          title: args.title,
          weight: args.weight,
          description: args.description,
          projectId: args.projectId,
        });
        // save task in database
        return task.save();
      },
    },
  },
});

// Exportin Schema
const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: Mutation,
});
module.exports = schema;
