// models/fruit.js

const mongoose = require('mongoose');

// create schema
const fruitSchema = new mongoose.Schema({
    name: String,
    isReadyToEat: Boolean,
})

// create model
const Fruit = mongoose.model('Fruit', fruitSchema);

// export model
module.exports = Fruit;
