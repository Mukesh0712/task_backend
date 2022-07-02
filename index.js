const express = require('express');

const mongoose = require("mongoose");

require('dotenv').config()

const app = express();

const Task = require('./model/task')

app.use(express.json())

const PORT = process.env.PORT || 5000 ;

//team database

mongoose.connect(process.env.MONGODB_URI , () =>{
    console.log("Connected to MongoDB Database ... ")
})

//create a task

/*app.post('/tasks' , (req , res)=>{
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

})*/

app.post('/tasks' , async(req , res) => {
    const task = new Task({
        id : req.body.id ,
        title : req.body.title ,
        description : req.body.description ,
        priority : req.body.priority ,
        emoji : req.body.emoji
    })

    const savedTask = await task.save();



    res.json({
        'status' : 'Success' ,
        'data' : savedTask
    })
})

//To read all tasks

/* app.get('/tasks', (req , res) => {
    res.json({
        'status' : "Success",
        'data' : tasks
    })
})
*/

app.get('/tasks' , async(req , res) => {

    const allTasks = await Task.find();

    res.json({
        'status' : "Success" ,
        'data' : allTasks
    })
})

//Read Specific task

/*app.post('/get_task' , (req , res)=>{
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
})*/

app.post('/get_task' , async(req,res) => {

    const id = req.body.id;

    const specificTask = await Task.findOne({id : id});

    res.json({
        'status' : "Success" ,
        'data' : specificTask
    })
})

//Delete all tasks

/*app.post('/delete_tasks' , (req , res) => {
    tasks = []
    res.json({
        'status' : 'Success',
        'message' : 'Successfully deleted all task' ,
        'data' : tasks
    })
})*/

app.post('/delete_tasks' , async(req , res) => {

    const result = await Task.deleteMany();

    res.json({
        'status' : "Success" ,
        'message' : "Successfully deleted all task" ,
        'data' : result
    })
})

//Delete specific task

/*app.post('/delete_task' , (req , res) => {
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
})*/

app.post('/delete_task' , async(req , res) => {

    const id = req.body.id;

    const result = await Task.deleteOne({id : id});

    res.json({
        'staus' : "Success" ,
        'message' : `Successfully deleted task with id : ${id}` ,
        'data' : result
    })
})

//Update task

/*app.post('/update_task' , (req,res) => {
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

})*/

app.post('/update_task' , async(req , res) => {

    const id = req.body.id ;
    const title = req.body.title ;
    const description = req.body.description ;
    const priority = req.body.priority ;
    const emoji = req.body.emoji ;

    const updateResult = await Task.updateOne({id : id} ,{
        $set: {
            title : title ,
            description : description ,
            priority : priority ,
            emoji : emoji
        }
    });

    res.json({
        'status' : "Success" ,
        'message' : 'Task updated Successfully',
        'data' : updateResult
    })
})

app.listen(PORT , ()=>{
    console.log('Hello , Server Started running on port' , PORT);
})