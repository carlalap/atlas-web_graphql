# GraphQL API

Background Context

In this project, you will create an application using a query language, designed to make APIs fast, flexible and developer-friendly. In the first part, you will create the back-end part using ExpressJs and set up GraphQl with all the parts (schema, root query and resolve function). In second part, you will connect your back-end to mongoDB and test your queries to GraphQL server using Graphiql. In the last part, you will create the front-end part using ReactJS and the GraphQL Client Apollo.

<h2>Resources</h2>

<p><strong>Read or watch</strong>:</p>

<ul>
<li><a href="https://graphql.org/" title="GraphQL" target="_blank">GraphQL</a> </li>
<li><a href="https://graphql.org/learn/schema/" title="GraphQL: Schemas and Types" target="_blank">GraphQL: Schemas and Types</a></li>
<li><a href="https://graphql.org/learn/queries/" title="GraphQL: Queries and Mutations" target="_blank">GraphQL: Queries and Mutations</a> </li>
<li><a href="https://mongoosejs.com/docs/" title="Mongoose" target="_blank">Mongoose</a> </li>
<li><a href="https://www.npmjs.com/package/apollo-boost" title="Apollo-boost" target="_blank">Apollo-boost</a> </li>
<li><a href="https://www.apollographql.com/docs/react/" title="Apollo Client (React)" target="_blank">Apollo Client (React)</a></li>
</ul>

<h2>Learning Objectives</h2>

<p>At the end of this project, you are expected to be able to <a href="/rltoken/iDQXbhrFbLNwYHLI2brw1w" title="explain to anyone" target="_blank">explain to anyone</a>, <strong>without the help of Google</strong>:</p>

<ul>
<li>What GraphQL means</li>
<li>What is Graphiql</li>
<li>How to test queries using Graphiql</li>
<li>What is Apollo</li>
<li>How to connect to mongoDB</li>
<li>How to make queries from React</li>
<li>How to make GraphQL server accept request from another server</li>
</ul>

<h2>Requirements</h2>

<ul>
<li>Allowed editors: <code>vi</code>, <code>vim</code>, <code>emacs</code>, <code>Visual Studio Code</code></li>
<li>All your files will be interpreted/compiled on Ubuntu 18.04 LTS using <code>node</code> (version 12.x.x)</li>
<li>All your files should end with a new line</li>
<li>A <code>README.md</code> file, at the root of the folder of the project, is mandatory</li>
<li>Your code should use the <code>js</code> extension</li>
</ul>

<h2>Setup</h2>

<h3>Install NodeJS</h3>

<p>(in your home directory): </p>

<pre><code>sudo apt install nodejs 
</code></pre>

<pre><code>$ node -v
v12.x.x
$ npm -v
...
</code></pre>

<h3>Setup Express and GraphQL</h3>

<p>In your folder <strong>server</strong> of GraphQL server:</p>

<ul>
<li> Add package.json using:  <code>npm init</code>

<ul>
<li>Install Express in the directory and save it in the dependencies list using: <code>npm install express --save</code></li>
<li>Set up GraphQL using: <code>npm install graphql express-graphql</code></li>
</ul></li>
</ul>

<h3>Setup Apollo</h3>

<pre><code>npm i apollo-boost graphql react-apollo --save
</code></pre>

<h3>Other Useful Commands</h3>

<pre><code>npm/npx start
</code></pre>
<pre><code>service redis-server start
</code></pre>
<pre><code>redis-cli ping  //Expected output:  PONG
</code></pre>
<pre><code>service mongod start
</code></pre>
<pre><code>service mongod status
</code></pre>

<h2>Walk of the final graph</h2>

![image](images/GraphQL.png)

  </div>
</div>

 <h2 class="gap">Tasks</h2>

  <div class="panel-heading panel-heading-actions">
    <h3 class="panel-title">
      0. GraphQL Schema
    </h3>
  </div>

  <div class="panel-body">
    <span id="user_id" data-id="6138"></span>

<!-- Progress vs Score -->

  <!-- Task Body -->
  <p>The file <code>app.js</code> of the folder <strong>server</strong> is initializing the Express server with express-graphql which is a middleware, applied here to just a single route, the /graphql route:</p>

<pre><code> const express = require(&#39;express&#39;);
const {graphqlHTTP} = require(&#39;express-graphql&#39;);

const app = express();

app.use(&#39;/graphql&#39;,graphqlHTTP({
}));
app.listen(4000,()=&gt;{
  console.log(&#39;now listening for request on port 4000&#39;);
});
</code></pre>

<p>when you run the command: <code>nodemon app</code></p>

<pre><code>khaoula@khaoula-HP-Laptop-15-dw3xxx:~/Holberton/GraphQL_playlist/server$ nodemon app
[nodemon] 2.0.14
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
now listening for request on port 4000
</code></pre>

<p>You will obtain in the browser <a href="/rltoken/KohFJj0zeWT_A7T56rY-tQ" title="http://localhost:4000/graphql" target="_blank">http://localhost:4000/graphql</a> the following error:</p>

![image](images/error_task0.png)

<p>From the message you can understand that we must pass an object which contains the schema property.</p>

<p>Create the file <code>schema.js</code>, in which:</p>

<ul>
<li>require graphql</li>
<li>add <strong>GraphQLObjectType</strong> object using <strong>the object destructuring syntax</strong> (const {prop1, prop2, prop3,&hellip;, propN} = object and object in our case is graphql)</li>
<li>create a new GraphQLObjectType: <strong>TaskType</strong> which contains 2 parameters:

<ul>
<li> name: Task</li>
<li> fields property: object contains a set of properties. In our case, fields will contain:

<ul>
<li> id of type GraphQLString</li>
<li>title of type GraphQLString</li>
<li> weight of type GraphQLInt</li>
<li>description of type GraphQLString</li>
</ul></li>
</ul></li>
</ul>

<p><strong>Note:</strong>  Don&rsquo;t forget to import these types using the object destructuring syntax that contains GraphQLObjectType.</p>

  </div>

<div class="panel-heading panel-heading-actions">
    <h3 class="panel-title">
      1. Root Query
    </h3>

  </div>

  <div class="panel-body">
    <span id="user_id" data-id="6138"></span>

  <!-- Progress vs Score -->

  <!-- Task Body -->
  <p>Root field is at the top level of every GraphQL server. It is a type that represents all of the possible entry points into the GraphQL API, it’s often called the Root type or the Query type.
The objective of this task is to create a root query to query for a particular task.
Create <strong>RootQuery</strong>: a new GraphQLObjectType in the <code>schema.js</code> file which contains the following parameters:</p>

<ul>
<li>name: RootQueryType</li>
<li>fields property will contain the field <strong>task</strong>, which will contain:

<ul>
<li>type: TaskType</li>
<li>args (any type of arguments can be added): in our case we will for a particular task using the id
of type GraphQLString which should be the argument</li>
</ul></li>
<li>resolve function where you write code get whichever data needed from the database. In this task,
we will create an empty function of prototype: <strong>resolve(parent,args)</strong></li>
</ul>

<p>At the end of the file, make sure you export your GraphQLSchema with your RootQuery and be sure you have imported it using the object destructuring syntax.</p>

<p>In <code>app.js</code> file, require the schema.js file and add schema in an object we pass to the graphqlHTTP() constructor to correct the error related to the schema in the middleware.</p>

  </div>

<div class="panel-heading panel-heading-actions">
    <h3 class="panel-title">
      2. Resolve function and test query in graphiql
    </h3>
  </div>

  <div class="panel-body">
    <span id="user_id" data-id="6138"></span>

  <!-- Progress vs Score -->

  <!-- Task Body -->
  <p>In this task, You will create a dummy data to be used in the resolve function.

In the file <code>schema.js</code>, create an array tasks contains these 2 different task objects:</p>

<ul>
<li> {id: ’1’, title: ’Create your first webpage’, weight: 1, description: ’Create your first HTML file 0-index.html with:   -Add the doctype on the first line (without any comment)  -After the doctype, open and close a html tag Open your file in your browser (the page should be blank)’}</li>
<li> {id: ’2’, title: ’Structure your webpage’, weight: 1, description: ’Copy the content of 0-index.html into
1-index.html  Create the head and body sections  inside the html tag, create the head and body tags (empty) in this order’}</li>
</ul>

<p>Install and require the module: <strong>lodash</strong> to avoid using Vanilla JavaScript and make the code easier.
In the resolve function, use the id from args parameter to find the task of a given id from the tasks array using lodash and return it.</p>

<p>In the file <code>app.js</code>, add the property <strong>graphiql: true</strong> to the graphqlHTTP constructor to be able to use <strong>GraphiQL</strong>: a great tool to test GraphQL API obtained in the link <a href="/rltoken/KohFJj0zeWT_A7T56rY-tQ" title="http://localhost:4000/graphql" target="_blank">http://localhost:4000/graphql</a>.
Before adding graphiql: true, you will get the following error:</p>

![image](images/error_task2-0.png)

After adding the property. when you visit the <a href="/rltoken/KohFJj0zeWT_A7T56rY-tQ" title="http://localhost:4000/graphql" target="_blank">http://localhost:4000/graphql</a> URL, you will see GraphiQL in action:</p>

![image](images/task2-1.png)

<p>When you click <strong>Docs</strong> in the top right of Graphiql, you will see in Root types: <code>query: RootQueryType</code>.</p>

<p>the following figure shows that:</p>

![image](images/task2-2.png)

<p>This panel is going to tell you about the GraphQL server that you are making queries to. In our case, it
will give an idea about the properties used in the object Task and show how to make a request for a Task using the id.</p>

<p>In a file <code>graphiql2</code>, Write the query in GraphiQL that will give you the title, the weight and the description of the task of <strong>id: &ldquo;2&rdquo;</strong> and return the following result:</p>

![image](images/task2_testqueryingraphiql.png)

  </div>

<div class="panel-heading panel-heading-actions">
    <h3 class="panel-title">
      3. GraphQL ID type and Project Type
    </h3>
  </div>

  <div class="panel-body">
    <span id="user_id" data-id="6138"></span>

  <!-- Progress vs Score -->

  <!-- Task Body -->
  <p>In the previous tasks, you used the type string to the id but to be a bit more flexible, you can use a type  called <strong>GraphQLID</strong>. So, the id must be an ID type not necessarily a string and you can write
the id without the quotations in your request and it still works.</p>

<p>Change the type of id to GraphQLID and do all the necessary changement to your code.</p>

<p>Create a new GraphQLObjectType: <strong>ProjectType</strong> which contains 2 parameters:</p>

<ul>
<li> name: Project</li>
<li> fields property: object contains a set of properties. In our case, fields will contain:

<ul>
<li> id of type GraphQLID</li>
<li> title of type GraphQLString</li>
<li> weight of type GraphQLInt</li>
<li> description of type GraphQLString</li>
</ul></li>
</ul>

<p>Do the same steps that you did with the type TaskType in the RootQueryType with the new field project of type <strong>ProjectType</strong>. In the resolve function, use the id to find a project.</p>

<p>To test your queries in GraphiQL, create an array <strong>projects</strong> contains these 2 different project objects:</p>

<ul>
<li> {id: ’1’, title: ’Advanced HTML’, weight: 1, description: ’Welcome to the Web Stack specialization.
The 3 first projects will give you all basics of the Web development: HTML, CSS and Developer tools.
In this project, you will learn how to use HTML tags to structure a web page. No CSS, no styling -
don’t worry, the final page will be “ugly” it’s normal, it’s not the purpose of this project. Important note: details are important! lowercase vs uppercase / wrong letter&hellip; be careful!’}</li>
<li> {id: ’2’, title: ’Bootstrap’, weight: 1, description: ’Bootstrap is a free and open-source CSS framework
directed at responsive, mobile-first front-end web development. It contains CSS and JavaScript design templates for typography, forms, buttons, navigation, and other interface components.’}</li>
</ul>

<p><strong>Note</strong>: In the RootQueryType of Documentation Explorer, the field <strong>project(id: ID): Project</strong> will be added.</p>

  </div>

 <div class="panel-heading panel-heading-actions">
    <h3 class="panel-title">
      4. Type relations
    </h3>
  </div>

  <div class="panel-body">
    <span id="user_id" data-id="6138"></span>

  <!-- Progress vs Score -->

  <!-- Task Body -->
  <p>From the final graph in the description, you can conclude that there is a relation between Project and task. So, each task will be related to a project and each project can contain 0 to multiple tasks. </p>

<p>Add to the 2 objects of array tasks the property <strong>projectId</strong> with the value <strong>’1’</strong> to the both.</p>

<p>Add the object project to the fields of TaskType:</p>

<ul>
<li> Specify the type to TaskType</li>
<li> Add the resolve function which will find from projects the one who has an id property equal to projectId in the parent object.</li>
</ul>

<p>To test that in GraphiQL, in a file <code>graphiql4_1</code>, write the query that will give you the title, the weight,
the description of the task of id: &ldquo;2&rdquo; and the title of the project. </p>

<p>Add the object tasks to the field of ProjectType:</p>

<ul>
<li> Specify the type to a list of type TaskType (you should use GraphQLList)</li>
<li> Add the resolve function which will filter from tasks array the tasks with the criteria projectId equal
to id in the parent object in the resolve function.</li>
</ul>

<p>To test that in GraphiQL, in a file <code>graphiql4_2</code>, write the query that will give you the title, the weight, the
description of the project of id: &ldquo;1&rdquo; and the title of their tasks.</p>

<p><strong>Important remark</strong>: You have to wrap the fields property inside a function. Why?</p>

<p>If you use the fields property just as an object and your write in your code TaskType before ProjectType then you test the query of the file <code>graphiql4_2</code>, you will get an error (<code>TypeError: Failed to fetch</code>) and in the terminal, you will get the error <code>TaskType is not defined</code>.
You will get this error because code is running from top to bottom and changing the orders is not going to solve the problem. Nevertheless when we wrap the fields inside a function, the code still running from top to bottom but the function will not be executed until the whole file finishes running. So, when you execute the code inside the function, it knows what TaskType is because it has already been run previously and vice versa.</p>

  </div>

<div class="panel-heading panel-heading-actions">
    <h3 class="panel-title">
      5. More on root queries: projects and tasks
    </h3>
  </div>

  <div class="panel-body">
    <span id="user_id" data-id="6138"></span>

  <!-- Progress vs Score -->

  <!-- Task Body -->
  <p>In this task, you will be able to write in GraphiQL the query that will result all the projects and all the
tasks.</p>

<p>In the fields of the RootQueryType, create two new fields tasks and projects of types GraphQLList of
TaskType and PojectType respectively. In the resolve functions of each field, return all the tasks and all the projects.</p>

<p>To test that in GraphiQL, in a file <code>graphiql5</code>, write the query that will give you the id, the title, the weight,
the description of all the projects and the title and the description of their tasks. The result of your
query will be like in the following figure:</p>

![image](images/task5_image.png)

<p>You can also test the output of the query that will give all the tasks.</p>

  </div>

<div class="panel-heading panel-heading-actions">
    <h3 class="panel-title">
      6. Connecting to mongoDB Atlas and create mongoose models
    </h3>
  </div>

  <div class="panel-body">
    <span id="user_id" data-id="6138"></span>

  <!-- Progress vs Score -->

  <!-- Task Body -->
  <p>You will add in this task a database instead of using examples.</p>

<p>Open this link: <a href="https://www.mongodb.com/" title="www.mongodb.com" target="_blank">www.mongodb.com</a> and create an account. Add a new database user, well save the username and the password then create a new database.</p>

<p>To use mongoDB in your application:</p>

<p>install a new package mongoose by using the following command: <code>npm install mongoose –save</code>.</p>

<p>In the file <code>app.js</code>:</p>

<ul>
<li> Require mongoose in the const <strong>mongoose</strong></li>
<li> Connect to mongoDB Atlas database using the string generated in the cluster in MongoDB Atlas.</li>
<li> Add this code:</li>
</ul>

<pre><code>  mongoose.connection.once(’open’, () =&gt;
  console.log(’connected to database’);
  );
</code></pre>

<p>⇒ an event listener returns a the message &ldquo;connected to database&rdquo; to the console once the connection is open.</p>

<p>Before start putting data in the database, You need to create a model and schema for each data type to be stored inside the database.</p>

<p>Create a new folder <strong>models</strong>. Inside the folder create two files <code>task.js</code> and <code>project.js</code>.</p>

<p>In the file <code>task.js</code>:</p>

<ul>
<li> Require mongoose</li>
<li> Create a constant Schema contains mongoose.Schema</li>
<li> Create a schema for the task: <strong>taskSchema</strong>, then add the properties in the example tasks in the file <code>schema.js</code> with the adequate type (String, Number &hellip;) except the id because MongoDB is automatically going to create a new ID.</li>
<li> Make sure you export the model, you define the model which will be the collection in MongoDB <strong>&ldquo;Task&rdquo;</strong> and base it to the particular schema <strong>&ldquo;taskSchema&rdquo;</strong></li>
</ul>

<p>In the file <code>project.js</code>: Do the same steps you did with the previous file. Just modify the properties, the name of schema to <strong>&ldquo;projectSchema&rdquo;</strong> and the collection name to <strong>&ldquo;Project&rdquo;</strong>.</p>

<p><strong>Note</strong>: mongoose schema: you are going to create for your data that is being stored in a database.
The schema used previously in the code for graphQL is defining the graph and the object types on that graph.</p>

  </div>

<div class="list-group">
  <!-- Task URLs -->
    <!-- Technical information -->
     <div class="list-group-item">
        <p><strong>Repo:</strong></p>
        <ul>
          <li>GitHub repository: <code>atlas-web_graphql</code></li>
            <li>Directory: <code>GraphQL_API</code></li>
            <li>File: <code>server/app.js, server/models/task.js, server/models/project.js</code></li>
        </ul>
      </div>

   <!-- Self-paced manual review -->
  </div>

<div class="panel-heading panel-heading-actions">
    <h3 class="panel-title">
      7. Mutation
    </h3>
  </div>

  <div class="panel-body">
    <span id="user_id" data-id="6138"></span>

  <!-- Progress vs Score -->

  <!-- Task Body -->
  <p>In this task, we will get an idea about mutations by using them to add project and task. </p>

<p>In the file <code>schema.js</code>, create a new GraphQLObjectType <strong>Mutation</strong> with the name <strong>Mutation</strong> then create a field called <strong>addProject</strong>. So when you use addProject mutation, you will be able to add a project to the database.</p>

<p>addProject property is going to be an object of the fields of <strong>const Mutation</strong>  where their properties are:</p>

<ul>
<li> type: ProjectType</li>
<li> args
When a user makes a mutation query from the front-end then he is expected to send some kind
of data or arguments. Here to add a project your are expected to pass the title, the weight and the
description throught to the graphQL server.
Add these arguments and precise to each one the propertie type.</li>
<li> resolve function where you should create new Project which will be imported from the models of the previous task and precise title, weight and description. Then, save the instance of the Project data type to the database (here you can understand the importance of mongoose) and return the results.</li>
</ul>

<p>Export the mutation after the query at the bottom of the file.</p>

<p>To prevent users from making mutation without passing through any required fields, you should use the <strong>GraphQLNonNull</strong> type. Add new GraphQLNonNull to all the arguments of the mutation.</p>

<p><strong>Remark</strong>: When you make a mutation, the ID will randomly generated that is why you wouldn’t add it in the arguments. </p>

<p>To test your code you should try some examples in graphiql. In a file <code>graphiql7_1</code>, write the
query that will give you the following output:</p>

<p><img src="https://s3.eu-west-3.amazonaws.com/hbtn.intranet/uploads/medias/2022/1/6e2219f9e02149850bd3d27e33fcfe70a5ec09df.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4MYA5JM5DUTZGMZG%2F20240311%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20240311T150633Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=3590caccbf8e664dc0e35b7e6207b26b7bb0f72655a42811b3037299b2a3e1fe" alt="" loading='lazy' style="" /></p>

<p>Do the same steps with the field <strong>addTask</strong> to add new task. and write in the file <code>graphiql7_2</code> the query which will give you the following output (the projectId should be one ID from the project(s) created previously)</p>

<p><img src="https://s3.eu-west-3.amazonaws.com/hbtn.intranet/uploads/medias/2022/1/fce933a3da786f97d159623192384d3b3dfcab31.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4MYA5JM5DUTZGMZG%2F20240311%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20240311T150633Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=ab4f3923346c062a1a2dcaae0ebc2d96bb61d37fabd08afa48b195338148e7e3" alt="" loading='lazy' style="" /></p>

<p>You should always check the updates of data in mongodb.</p>

  </div>

<div class="panel-heading panel-heading-actions">
    <h3 class="panel-title">
      8. Updating the resolve functions
    </h3>
  </div>

  <div class="panel-body">
    <span id="user_id" data-id="6138"></span>

  <!-- Progress vs Score -->

  <!-- Task Body -->
  <p>In this task, instead of selecting data from the examples previously created in the task 2 and 3, you should find the data directly from the database. </p>

<p>In the file <code>schema.js</code>, delete the 2 arrays of data: tasks and projects. In the resolve functions, delete any line of code using these two arrays and replace them by the code doing the same goal but by using the models: <strong>Project</strong> and <strong>Task</strong>.</p>

  </div>

  <div class="list-group">
    <!-- Task URLs -->

  <!-- Technical information -->
   <div class="list-group-item">
       <p><strong>Repo:</strong></p>
      <ul>
         <li>GitHub repository: <code>atlas-web_graphql</code></li>
           <li>Directory: <code>GraphQL_API</code></li>
            <li>File: <code>server/schema/schema.js</code></li>
        </ul>
      </div>

  <!-- Self-paced manual review -->

  </div>

 <div class="panel-heading panel-heading-actions">
    <h3 class="panel-title">
      9. Add the front-end part and setup Apollo Client
    </h3>
  </div>

  <div class="panel-body">
    <span id="user_id" data-id="6138"></span>

  <!-- Progress vs Score -->

  <!-- Task Body -->
  <p>Once the objective of this project in not to learn ReactJs, you will get the access to the project <a href="https://s3.eu-west-3.amazonaws.com/hbtn.intranet/uploads/misc/2022/2/386bd2caeab79e068071bb2bb2638549f932d4b5.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4MYA5JM5DUTZGMZG%2F20240311%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20240311T150633Z&X-Amz-Expires=345600&X-Amz-SignedHeaders=host&X-Amz-Signature=d8614c1ff7563b3e4a3e056bc0ec53540e91b7dc49942f5247d8922aaa889c3a" title="client.zip" target="_blank">client.zip</a> with the different components. </p>

<p>In the folder client, run your react project by using the following commands:</p>

<ul>
<li> <code>npm install</code> </li>
<li> <code>npm start</code></li>
</ul>

<p>To consume the APIs in the front-end part, you will use <strong>GraphQL Client Apollo</strong>: you can think about it as the thing that is in charge with the passage of data between the front-end and the server.</p>

<p>Install apollo-boost, graphql and react-apollo in your project using the command in the description.</p>

<p><strong>apollo-boost</strong> is a package contains several different packages including Apollo-client.</p>

<p><strong>graphql</strong> is the js implementation of GraphQL</p>

<p><strong>react-apollo</strong> is the layer to bind apollo with react.</p>

<p>In the file <code>App.js</code>:</p>

<ul>
<li>Import ApolloClient from apollo -boost</li>
<li>setup an apollo client (uri:’http://localhost:4000/graphql’). Once you create your client, hook it up to your app by passing it to the ApolloProvider imported from react-apollo (before the first div tag).</li>
</ul>

  </div>

<div class="panel-heading panel-heading-actions">
    <h3 class="panel-title">
      10. Making queries from React
    </h3>
  </div>

  <div class="panel-body">
    <span id="user_id" data-id="6138"></span>

  <!-- Progress vs Score -->

  <!-- Task Body -->
  <p>In this task, you will make a queries from the different components of React application. </p>

<p>To make a query from <strong>TaskList</strong> component, in the file <code>client/src/components/TaskList.js</code>:</p>

<ul>
<li> Import gql from  apollo-boost in order to construct the query because GraphQL query language in not Javascript. So, when we construct it you need the help of another package to help pass it all.</li>
<li> Create a query and store it in a constant <strong>getTasksQuery</strong> that will give the id and the title of all the tasks (the syntax of the query is the same syntax of the queries tested in graphiql).</li>
<li> Bind the query to the component to be able to access the data that comes from the query by importing <strong>graphql</strong> from the package <strong>react-apollo</strong> and modify the export to be like the following prototype:</li>
</ul>

<p><code>export default graphql(the query name)(the component name);</code></p>

<p>Before moving to the other queries. When you add <code>console.log(props);</code> before the return, it is not going to work and you will get some errors in the console. These errors are related to the non ability to fetch the data from the server and the reason is because of access control allow origin. By default, GraphQL sever is not accepting requests from an other server (here front-end and back-end are coming from different servers).</p>

<p>To solve this problem: </p>

<p>In Express GraphQL server, install the package CORS:  <code>npm install cors -save</code> .</p>

<p>In the file <code>server/app.js</code>: </p>

<ul>
<li>Require cors in a constant <strong>cors</strong></li>
<li>Add the line of code <code>app.use(cors());</code> </li>
</ul>

<p>When you refresh your browser, you can see two objects in the console: </p>

<ul>
<li> the first one with <code>loading: true</code> and there is no data.</li>
<li> the second one with <code>loading: false</code> and you can check the data returned by the query in the component.</li>
</ul>

<p>Once your objective here is to create the query. You should only add to the the file <code>client/src/components/TaskList.js</code> this function:</p>

<pre><code>function displayTasks() {
    console.log(props.data);
    var data = props.data;

    if (data.loading) {
      return ( &lt; div &gt; Loading tasks... &lt; /div&gt;);
      }
      else {
        return data.tasks.map(task =&gt; {
            return ( &lt; li key = {
                task.id
              }
              onClick = {
                (e) =&gt; {
                  setState({
                    selected: task.id
                  });
                }
              } &gt; {
                task.title
              } &lt; /li&gt;);
            })
        }
     }
</code></pre>

<p>In the empty braces inside the <strong>ul</strong> tag, call the previous function.</p>

<p>In the file <code>client/src/components/AddTask.js</code>, Create a query and store it in a constant <strong>getProjectsQuery</strong> that will give the id and the title of all the projects and from the previous part, redo finish the other steps. Then to add all the projects to the options of the Project field, call after the option inside the select tag the function <strong>displayProjects()</strong>:</p>

<pre><code>function displayProjects() {
    //  console.log(props);
    var data = props.data;
    if (data.loading) {
      return ( &lt; option &gt; Loading projects... &lt; /option&gt;);
      }
      else {
        return data.projects.map(project =&gt; {
            return ( &lt; option key = {
                project.id
              }
              value = {
                project.id
              } &gt; {
                project.title
              } &lt; /option&gt;);
            })
        }
      }
</code></pre>

  </div>

 <div class="panel-heading panel-heading-actions">
    <h3 class="panel-title">
      11. External query file
    </h3>
  </div>

  <div class="panel-body">
    <span id="user_id" data-id="6138"></span>

  <!-- Progress vs Score -->

  <!-- Task Body -->
  <p>To avoid getting messy by defining the queries inside the component files especially when there is multiple queries in different components, you should externalize the queries into a separate file.</p>

<p>Go into <strong>src</strong>, create the file <code>queries.js</code> inside the new folder <strong>queries</strong>.</p>

<p>In the file <code>client/src/queries/queries.js</code>:</p>

<ul>
<li>Import <strong>gql</strong></li>
<li>Paste all the queries created in the components</li>
<li>Export the queries </li>
</ul>

<p>In the files of the components:</p>

<ul>
<li>Delete the queries</li>
<li>Detete the line of code to import gql</li>
<li>import the adequate query from the new file. </li>
</ul>

  </div>

  <div class="list-group">
    <!-- Task URLs -->

  <!-- Technical information -->
   <div class="list-group-item">
      <p><strong>Repo:</strong></p>
      <ul>
       <li>GitHub repository: <code>atlas-web_graphql</code></li>
         <li>Directory: <code>GraphQL_API</code></li>
         <li>File: <code>client/src/queries/queries.js, client/src/components/TaskList.js, client/src/components/AddTask.js</code></li>
        </ul>
      </div>

<div class="panel-heading panel-heading-actions">
    <h3 class="panel-title">
      12. Query variables and composing queries
    </h3>
  </div>

  <div class="panel-body">
    <span id="user_id" data-id="6138"></span>

   <!-- Progress vs Score -->

  <!-- Task Body -->
  <p>In the file <code>client/src/queries/queries.js</code>, Create a query and store it in a constant <strong>addTaskMutation</strong> that will add a project using the mutation with three parameters: title, weight and description and will return the title and the id back.  In the mutation add query variables (example: <strong>$variable</strong>: <strong>String!</strong> or <strong>Int!</strong> or <strong>ID!</strong>) and affect to each parameter the adequate variable.
Don&rsquo;t forget to export the new queries.</p>

<p><strong>Remark:</strong> The mutation query to add a project should be written like the query tested in graphiql. Only you must add the variables.  </p>

<p>In the file <code>client/src/components/AddTask.js</code>, import the mutation to be used when you submit the form. But now there are 2 different queries inside the component . So, at the bottom, you must bind both of these different queries to the component.</p>

<p>Use compose method to bind the queries. To do that:</p>

<ul>
<li> Import  <strong>flowRight as compose</strong> from the package <strong>lodash</strong></li>
<li> Use the word compose to bind the queries and give to each query a name property which will be the name of the query.</li>
</ul>

<p>When you check your browser, you will get an error related to the function <strong>displayProjects</strong> and when you check the <strong>props</strong> in the console, you will observe some modifications. Modify your variable <strong>data</strong> in the function to solve the problem and recheck the select field.</p>

<p>In the form tag, affect the function <strong>submitForm</strong> to onSubmit. Complete the function by using <strong>addTaskMutation</strong> and specify the variables. Then add <strong>refetchQueries</strong> array contains the query to get all the tasks in order to be sure that the task added will not need a refresh to be added to the list of tasks.</p>

<pre><code>const submitForm = (e) =&gt; {
        e.preventDefault();
        props./*......( { 
                  variables: {......
                    .....Add your 
                    ..... code 
                    },
                    ......
            });
                */
      }
</code></pre>

<p>Write the mutation query <strong>addProjectMutation</strong> to add a project. From the steps of the previous part complete the file <code>client/src/components/AddProject.js</code> and affect to onSubmit the function <strong>submitForm1</strong> contains the refetchQueries array.</p>

  </div>

  <div class="list-group">
   <!-- Task URLs -->

  <!-- Technical information -->
   <div class="list-group-item">
        <p><strong>Repo:</strong></p>
        <ul>
          <li>GitHub repository: <code>atlas-web_graphql</code></li>
            <li>Directory: <code>GraphQL_API</code></li>
            <li>File: <code>client/src/queries/queries.js, client/src/components/AddTask.js, client/src/components/AddProject.js</code></li>
        </ul>
      </div>

<div class="panel-heading panel-heading-actions">
    <h3 class="panel-title">
      13. Tasks details query
    </h3>
  </div>

  <div class="panel-body">
    <span id="user_id" data-id="6138"></span>

  <!-- Progress vs Score -->

  <!-- Task Body -->
  <p>In the file <code>client/src/queries/queries.js</code>, create a query <strong>getTaskDetailQuery</strong> which will return the id, the title, the weight, the description and the project (id, title, weight, description and tasks: id, title, weight) of a task with the parameter id. Export the new query.</p>

<p>The objective of this task is to write the query. So, just copy and paste the following code in the file <code>client/src/components/TaskDetails.js</code></p>

<pre><code>import {
  graphql
} from &#39;react-apollo&#39;;
import {
  getTaskDetailQuery
} from &#39;../queries/queries&#39;;

function TaskDetails(props) {
  console.log(props);

  function displayTaskDetails() {
    const {
      task
    } = props.data;
    if (task) {
      return ( &lt;div&gt;
        &lt;h2&gt; Title of task: {
          task.title
        } &lt;/h2&gt; 
        &lt;p&gt; Weight of the task: {
          task.weight
        } &lt;/p&gt; 
        &lt;p&gt; Title of the project: {
          task.project.title
        } &lt;/p&gt; 
        &lt;p&gt; All tasks of the project: &lt;/p&gt; 
        &lt;ul className = &quot;other-tasks&quot; &gt; {
          task.project.tasks.map(item =&gt; {
            return &lt;li key = {
              item.id
            } &gt; {
              item.title
            } &lt; /li&gt;
          })
        } &lt;/ul&gt; 
        &lt;/div&gt;
      )
    } else {
      return ( 
        &lt;div&gt; No task selected... &lt;/div&gt;
      )
    }
  }
  return ( &lt;
    div id = &quot;task-details&quot; &gt; {
      displayTaskDetails()
    } &lt; /
    div &gt;
  );
}


export default graphql(getTaskDetailQuery, {
  options: (props) =&gt; {
    return {
      variables: {
        id: props.taskId
      }
    }
  }
})(TaskDetails);
</code></pre>

<p>In the file <code>client/src/components/TaskList.js</code>, in the component <strong>TaskDetails</strong> add <code>taskId = {state.selected}</code></p>

  </div>

 <div class="list-group">
  <!-- Task URLs -->

  <!-- Technical information -->
   <div class="list-group-item">
       <p><strong>Repo:</strong></p>
        <ul>
          <li>GitHub repository: <code>atlas-web_graphql</code></li>
            <li>Directory: <code>GraphQL_API</code></li>
            <li>File: <code>client/src/queries/queries.js, client/src/components/TaskList.js, client/src/components/TaskDetails.js</code></li>
        </ul>
      </div>
