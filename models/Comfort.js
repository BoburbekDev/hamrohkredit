const mongoose = require('mongoose')

const comfortSchema = new mongoose.Schema({
    img:{
        type: String,
        required: true
    },
    text: String
},{
    version_key: false,
    timestamps: true
})
module.exports = mongoose.model('Comfort', comfortSchema)