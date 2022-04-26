const mongoose = require('mongoose')

const partnerSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Partner', partnerSchema)