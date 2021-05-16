const mongoose = require('mongoose');


// model for each city in db

const citySchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    userid: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('city', citySchema);