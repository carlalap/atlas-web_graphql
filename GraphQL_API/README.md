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

<p><img src="https://s3.eu-west-3.amazonaws.com/hbtn.intranet/uploads/medias/2022/1/37d8fe34bd79f0d9ded519b452e97b1afa7c8556.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4MYA5JM5DUTZGMZG%2F20240305%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20240305T141403Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=d36ea030b63cdcd1520502f0db33716b3ba5b633cb5f9c6f29b1d48223493db7" alt="" loading='lazy' style="" />
After adding the property. when you visit the <a href="/rltoken/KohFJj0zeWT_A7T56rY-tQ" title="http://localhost:4000/graphql" target="_blank">http://localhost:4000/graphql</a> URL, you will see GraphiQL in action:</p>

<p><img src="https://s3.eu-west-3.amazonaws.com/hbtn.intranet/uploads/medias/2022/1/aafcfa4f93c4ce33ee2bdcf9de0bc96281496b56.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4MYA5JM5DUTZGMZG%2F20240305%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20240305T141403Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=aea72d3e6d9186a1e745d47b6976162f94f5507e31373a1d0b499d6980aabb6d" alt="" loading='lazy' style="" /></p>

<p>When you click <strong>Docs</strong> in the top right of Graphiql, you will see in Root types: <code>query: RootQueryType</code>.</p>

<p>the following figure shows that:</p>

<p><img src="https://s3.eu-west-3.amazonaws.com/hbtn.intranet/uploads/medias/2022/1/32e95d38ff2300949783d43bc80c431420d3be5c.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4MYA5JM5DUTZGMZG%2F20240305%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20240305T141403Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=81a1fbaf69288dc1aae97440bd73ecbdbbbf17a0702cadd4a0a4ac4f7611baa9" alt="" loading='lazy' style="" /></p>

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

<p><img src="https://s3.eu-west-3.amazonaws.com/hbtn.intranet/uploads/medias/2022/1/b69d72d3c154338d8d9ad09eb53b784bca4aabbe.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4MYA5JM5DUTZGMZG%2F20240305%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20240305T141403Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=d5f384de75daf6925853aaf052d3ad8ec0924308ec51f9a9bf3b77d33345f1ce" alt="" loading='lazy' style="" /></p>

<p>You can also test the output of the query that will give all the tasks.</p>

  </div>
