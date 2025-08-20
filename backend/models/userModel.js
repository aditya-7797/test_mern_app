const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
    user_email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", blogSchema);

module.exports = { User, Post };
