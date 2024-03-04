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

<p><img src="![alt text](images/yGraphQL.png)
" alt="" loading='lazy' style="" /></p>

  </div>
</div>

 <h2 class="gap">Tasks</h2>

    <div data-role="task27255" data-position="1" id="task-num-0">
      <div class="panel panel-default task-card " id="task-27255">
  <span id="user_id" data-id="6138"></span>

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

<p><img src="https://s3.eu-west-3.amazonaws.com/hbtn.intranet/uploads/medias/2022/1/de16a4b57a0a93d20c8a56f51bc7d48560700543.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4MYA5JM5DUTZGMZG%2F20240304%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20240304T144714Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=6ca95e6de5dac78ccfc8b2cd1ba9e696a16fa3d0c7cca16cc936a67b3a372cda" alt="" loading='lazy' style="" /></p>

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
