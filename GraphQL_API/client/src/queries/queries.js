// taks.11. External query file
import { gql } from 'apollo-boost';


// Defining GraphQL Queries
const getTasksQuery = gql
`{
  tasks {
    id
    title
  }
}`;

const getProjectsQuery = gql
`{
  projects {
    id
    title
  }
}`;

// Defining GraphQL Mutations
const addTaskMutation = gql
`mutation($title: String!, $weight: Int!, $description: String!, $projectId: ID!) {
    addTask(
        title: $title,
        weight: $weight,
        description: $description,
        projectId: $projectId)
        {
        title
        id
    }   
}`;

const addProjectMutation = gql
`mutation($title: String!, $weight: Int!, $description: String!)
  {
    addProject(
      title: $title,
      weight: $weight,
      description: $description
    ) {
      title
      id
    }
}`;

// Defining Detailed Task Query
const getTaskDetailQuery = gql`
    query($id: ID) {
    task(id: $id) {
        id
        title
        weight
        description
        project {
            id
            title
            description
        tasks {
            id
            title
        }
        }
    }
}`;

// Exporting Queries and Mutations
export { getTasksQuery, getProjectsQuery, addTaskMutation, addProjectMutation, getTaskDetailQuery };
