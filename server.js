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



// ------------------------------------------------------- Middleware

// connect to database
mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
})


// ------------------------------------------------------- Routes

// GET / test route
app.get("/", async (req, res) => {
    // res.send(`hello, friend!`);
    res.render('index.ejs');
});




// ------------------------------------------------------- Port

app.listen(port, () => {
    console.log(`Listening on port`, port);
});

