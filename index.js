const express = require('express');

const app = express();

app.use(express.json())

const PORT = 5000;

//team database
let tasks = []

const DB = "My Database";

//create a task
app.post('/tasks' , (req , res)=>{
    const task = {
        'id' : req.body.id,
        'title' : req.body.title,
        'description' : req.body.description,
        'prority' : req.body.prority,
        'emoji' : req.body.emoji
    }

    tasks.push(task);

    res.json({
        'status' : 'Success',
        'data' : task
    })

})

//To read all tasks
app.get('/tasks', (req , res) => {
    res.json({
        'status' : "Success",
        'data' : tasks
    })
})

//Read Specific task
app.post('/get_task' , (req , res)=>{
    const id = req.body.id;

    let resultTask;

    tasks.map((task) => {
        if(task.id === id) {
            resultTask = task;
        }
    })

    res.json({
        'status' : 'Success',
        'data' : resultTask
    })
})

//Delete all tasks
app.post('/delete_tasks' , (req , res) => {
    tasks = []
    res.json({
        'status' : 'Success',
        'message' : 'Successfully deleted all task' ,
        'data' : tasks
    })
})

//delete specific task
app.post('/delete_task' , (req , res) => {
    const id = req.body.id;
    let index = -1;

    tasks.map((task , i) =>{
        if(id === task.id){
            index = i;
        }
    })
    tasks.splice(index , 1)
    res.json({
        'status' : 'Success' ,
        'message' : `Successfully deleted task with id : ${id}` ,
        'data' : tasks
    })
})

//Update task
app.post('/update_task' , (req,res) => {
    const id = req.body.id ;
    const title = req.body.title ;
    const description = req.body.description ;
    const prority = req.body.prority ;
    const emoji = req.body.emoji;

    let index = -1 ;

    tasks.map((task , i) => {
        if (id === task.id){
            index = i 
        }
    })

    tasks[index] = {
        id : id ,
        title : title ,
        description : description,
        prority : prority,
        emoji : emoji
    }

    res.json({
        'status' : 'Success',
        'message' : 'Task updated Successfully',
        'data' : tasks
    })

})

app.listen(PORT , ()=>{
    console.log('Hello , Server Started running on port' , PORT);
})