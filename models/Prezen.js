const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    img:{
        type: String,
        required: true
    },
    title: String
},{
    version_key: false,
    timestamps: true
})

module.exports = mongoose.model('Prezentation', articleSchema)