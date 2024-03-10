import mongoose from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';
import dotenv from 'dotenv';
import passportLocalMongoose from 'passport-local-mongoose';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
dotenv.config();

let models = {};

console.log("connecting to mongodb");

// Replace this with your connection string.
await mongoose.connect(`mongodb+srv://lwang27:tCGa4JdHm2a2O6rk@cluster0.3rbb6cq.mongodb.net/garden_time`);

console.log("successfully connected to mongodb")


// Define user schema and model
const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    googleId: String,
    ThemePreference: String,
    created_date: Date,
    created_tags: [String]
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

models.User = mongoose.model('User', userSchema);

// Define task schema and model
const taskSchema = new mongoose.Schema({
    description: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    created_date: Date,
    tag: String
});

models.Task = mongoose.model("Task", taskSchema);

// Define tag schema and model
const tagSchema = new mongoose.Schema({
    tagName: String,
    color: String,
    task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" }
});

models.Tag = mongoose.model("Tag", tagSchema);




console.log("mongoose models created");

export default models;
