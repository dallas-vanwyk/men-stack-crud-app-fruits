// server.js

// ------------------------------------------------------- Dependencies

// import and load express
const express = require('express');
const app = express();

// add dotenv, load environment variables
const dotenv = require('dotenv');
dotenv.config();

// add Mongoose
const mongoose = require('mongoose');

// define port variable
const port = process.env.PORT; // for demonstration

// import Fruit model
const Fruit = require('./models/fruit.js');

// ------------------------------------------------------- Middleware

// connect to database
mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
})

app.use(express.urlencoded({ extended: false}));





// ------------------------------------------------------- Routes

// INDUCES

// Index
// GET / test route
app.get("/", async (req, res) => {
    res.render('index.ejs');
});

// New
app.get("/fruits/new", async (req, res) => {
    res.render('fruits/new.ejs');
});

// Delete
// app.get("/", async (req, res) => {

// });

// Update
// app.get("/", async (req, res) => {

// });

// Create
app.post("/fruits", async (req, res) => {
    console.log(req.body);
    res.redirect("/fruits/new");
});

// Edit
// app.get("/", async (req, res) => {

// });

// Show
// app.get("/", async (req, res) => {

// });















// ------------------------------------------------------- Port

app.listen(port, () => {
    console.log(`Listening on port`, port);
});

