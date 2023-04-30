const express = require('express'); //basically handle our api
const mongoose = require('mongoose');  //handle our database
const cors = require('cors');    //

const app = express();

app.use(express.json());
app.use(cors())  ;    //when we get cross-origin errors that gonna protect from that


//connect to database
mongoose.connect("mongodb://127.0.0.1:27017/mern-todo",{
    useNewUrlParser : true,
    useUnifiedTopology : true
})
    .then(() => console.log("Connected to DB"))
    .catch(console.error);



//api routing
const Todo = require('./models/Todo');

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();

    res.json(todos);
})

app.post('/todo/new', (req,res) =>{
    const todo = new Todo({
        text: req.body.text
    });
    todo.save();
    res.json(todo);
});

app.delete('/todo/delete/:id', async(req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
})


app.get('/todo/complete/:id', async(req,res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);
})








app.listen(3001, () => console.log("Server started on port 3001"));