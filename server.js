const express = require('express');
require('./db/connect')
const User = require("./db/model/userSchema");
const Order = require("./db/model/orderScheme");
const Inventory = require("./db/model/inventory")

const app = express()

app.use(express.json())
app.set("view engine", 'ejs')

app.get('/inventory', async (req, res) => {
    try {
        const invent = await Inventory.find()
        res.send(invent)
    } catch (err) {
        res.send(err.message)
    }
})

app.post('/inventory/post', async (req, res) => {
    try {
        let newIn = new Inventory({
            type: req.body.type,
            item: req.body.item,
            quantity: req.body.quantity,
        })
        const newInvent = await newIn.save();
        res.status(201).send(`${newInvent.quantity} ${newInvent.item} added to the inventory`)
    } catch (err) {
        res.send(err.message)
    }
})

app.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find()
        res.send(orders)
    } catch (err) {

    }
})

app.post('/orders/post', async (req, res) => {
    try {
        let ordernew = new Order({
            cus_id: req.body.cus,
            invent_id: req.body.invent,
            item: req.body.item,
            quantity: req.body.quantity
        })
        const newOrder = await ordernew.save()
        await Inventory.updateOne({ "item": req.body.item }, { $inc: { "quantity": - (req.body.quantity) } })
        const left = await Inventory.findOne({ "item": req.body.item })
        res.status(201).send(`New order is ${newOrder.item} = ${newOrder.quantity}. ${newOrder.item} left in inventory: ${left.quantity}`)
    } catch (err) {
        res.send(err.message)
    }
})

app.get('/customer', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users)
    } catch (error) {
        res.send(error.message)
    }
})

app.post('/customer/post', async (req, res) => {
    try {
        const newuser = new User({
            name: req.body.name,
            email: req.body.email
        })
        const newUser = await newuser.save()
        res.status(201).send(`New customer with the name: ${newUser.name} & Email: ${newUser.email} is added`)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


app.listen(5000, () => {
    console.log('Server running on port 5000')
})