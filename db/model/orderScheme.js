const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    cus_id: String,
    invent_id: String,
    item: String,
    quantity: Number
})

const Order = mongoose.model("Order", orderSchema)
module.exports = Order;