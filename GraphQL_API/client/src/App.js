/* task.9 Add the front-end part and setup Apollo Client
* import ApolloClient from 'apollo-boost';
*/
import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// components
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import AddProject from './components/AddProject';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

function App() {
  return (
    // Wrap the App component with the ApolloProvider and pass the client
    <ApolloProvider client={ client }>
      <div id="main">
        <div id = "bg" > </div> 
        <h1> Holberton school tasks </h1> 
        <TaskList/>
        <AddProject/>
        <AddTask/>
      </div>
    </ApolloProvider>
   );
}

export default App;