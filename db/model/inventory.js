const mongoose = require('mongoose');

const inventory = new mongoose.Schema({
    type: String,
    item: String,
    quantity: Number,
})

const Invent = mongoose.model("Invent", inventory)

module.exports = Invent;