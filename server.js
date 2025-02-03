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

// add Middleware
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require('path');

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

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));



// ------------------------------------------------------- Routes


// Home
app.get("/", async (req, res) => {
    res.render('home.ejs');
});

// I N D U C E S

// Index
app.get("/fruits", async (req, res) => {
    const allFruits = await Fruit.find();
    // console.log(allFruits);
    // res.send('welcome to index pg');
    res.render('fruits/index.ejs', { fruits: allFruits });
});


// New
app.get("/fruits/new", async (req, res) => {
    res.render('fruits/new.ejs');
});

// Delete
app.delete("/fruits/:fruitId", async (req, res) => {
    // res.send("this the delete route");
    await Fruit.findByIdAndDelete(req.params.fruitId);
    res.redirect('/fruits');
});

// Update
app.put("/fruits/:fruitId", async (req, res) => {
    
    // handle checkbox
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }
    
    await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);

    res.redirect(`/fruits/${req.params.fruitId}`);
});

// Create
app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect("/fruits/");
});

// Edit
app.get("/fruits/:fruitId/edit", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    // console.log(foundFruit);
    // res.send(`edit ${foundFruit.name}`);
    res.render("fruits/edit.ejs", {
        fruit: foundFruit,
    });
});

// Show
app.get("/fruits/:fruitId", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    // res.send(`This route renders show page for fruit id: ${req.params.fruitId}`);
    // console.log(foundFruit);
    res.render('fruits/show.ejs', {
        fruit: foundFruit
    });
});




// ------------------------------------------------------- Port

app.listen(port, () => {
    console.log(`Listening on port`, port);
});

