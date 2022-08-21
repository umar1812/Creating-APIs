const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/webtechapi")
    .then(console.log("Connected to the database"))
    .catch = (err) => {
        console.log(`Database error ${err.message}`)
    }