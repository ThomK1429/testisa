// Require the connection.js file provided and add API routes for:

// Retrieving all notes from the database and returning them to the user as JSON.


// Saving a new note to the database using the data passed on req.body.

// Deleting a note from the database using req.params.id.

// Test that all your API routes work properly using Postman.

// Add a / route for serving an index.html file (the welcome page).

// Add a /notes route for serving a notes.html file (the page for viewing, saving, deleting notes).

// Style the index.html page and add a description of the application.

// Decide whether you'd like to attempt the easier or more difficult assignment. If you're unsure, attempt the easier version first.

// Code the front-end logic for displaying the list of notes or list of note titles if working on the bonus assignment.

// If working on the bonus assignment, code front end logic for displaying a note when it's title is clicked from the list.

// Code the front-end logic for submitting a new note.

// // Code the front-end logic for deleting a note from the database.

var mysql = require("mysql");
var connection = require("./connection");
var express = require("express");
var exphbs = require("express-handlebars");


var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// this is where I am starting the engine to direct the handlebar flow

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Here I am connecting to the mysql host 
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "notetaker_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// create route and establish connection from root source
app.get("/", function(req, res) {
  connection.query("SELECT * FROM notes;", function(err, data) {
    if (err) {
      throw err;
    }

    // Test it.
    // console.log('The solution is: ', data);

    // Test it.
    // res.send(data);

    res.render("index", {notes: data });
  });
});

// Post route -> back to home
app.post("/new", function(req, res) {
  // Test it.
  // console.log('You sent, ' + req.body.wish);

  // Test it.
  // res.send('You sent, ' + req.body.wish)
  connection.query("INSERT INTO notes (title,body) VALUES (?,?)", [req.body.title,req.body.text], function(err, result) {
    if (err) {
      throw err;
    }
     function newValue(){

     }

    res.redirect("/");
  });
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});


