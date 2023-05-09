var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

const userRoute = require("./routes/users");

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/user", userRoute);

let todos = [
    {"id": 1,
"todo": "Användarhantering",
"done": false,
"user": "68f7216c-b9ca-496d-9850-c746459c8812"}
];

//
// TODOS
//

app.get("/test/:name", (req, res) => {
    
let userName = req.params.name     
res.json({test: "hej "  + req.params.name + "!"})
})

app.get("/todo", (req, res) => {

    let leftTodo = todos.filter(todo => todo.done == false);

    res.json(leftTodo)
})

app.get("/todo/:user", (req, res) => {

    let user = req.params.user;
    let leftTodo = todos.filter(todo => todo.done == false && todo.user == user);

    res.json(leftTodo)
})

app.post("/todo", (req, res) => {
    // TA EMOT BODY, SPARA NY TODO

    let addTodo = req.body;
    console.log("body", addTodo);

    let newTodo = {
        id: todos.length + 1,
        todo: addTodo.todo,
        done: false,
        user: addTodo.user
    }

    todos.push(newTodo)

res.json(todos)   
})

app.post("/todo/done", (req, res) => {

    // FÅNGA VILKEN TODO SOM ÄR KLAR
    let doneTodo = req.body.id;
    console.log("done ID", doneTodo);
    // LETA UPP I DATAT
    let findTodo = todos.find(todo => todo.id == doneTodo);
    console.log("findTodo", findTodo);
    // ÄNDRA
    findTodo.done = true;
    // SPARA

    res.json(todos)
})

module.exports = app;
