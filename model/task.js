const mongoose = require('mongoose');

const {schema} = mongoose;

const taskSchema = new mongoose.Schema({
    id : Number ,
    title : String ,
    description : String ,
    priority : String ,
    emoji : String  
})

const Task = mongoose.model('Task' , taskSchema)

module.exports = Task;