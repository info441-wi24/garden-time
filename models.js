import mongoose, { mongo } from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

let models = {}

console.log("connecting to mongodb")

//TODO: add your mongoDB connection string below, with database names userDemo
// mongoose.connect(`mongodb+srv://lwang27:${process.env.MONGODB_PWD}@cluster0.3rbb6cq.mongodb.net/garden_time`);
await mongoose.connect("mongodb+srv://newUser:iLoveBoba@info441a3roshni.j7onkcu.mongodb.net/garden_time")


console.log("successfully connected to mongodb")

// Add schemas and models for my database
const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    ThemePreference: String,
    created_date: Date, 
    created_tags: [String]
})

models.User = mongoose.model('User', userSchema);

const taskSchema = new mongoose.Schema({
    description: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    created_date: Date, 
    tag: String
})

models.Task = mongoose.model("Task", taskSchema);

const tagSchema = new mongoose.Schema({
    tagName: String,
    color: String,
    task: {type: mongoose.Schema.Types.ObjectId, ref: "Task"}
})

models.Task = mongoose.model("Task", taskSchema);

console.log("mongoose models created")

export default models