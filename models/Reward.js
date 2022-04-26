const mongoose = require('mongoose')

const rewardSchema = new mongoose.Schema({
    img:{
        type: String,
        required: true
    },
    title: String,
    text: String
},{
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model('Reward', rewardSchema)