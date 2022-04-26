const mongoose = require('mongoose')

const branchSchema = new mongoose.Schema({
    img:{
        type: String,
        required: true
    },
    name: String,
    location: String,
    arentr: String,
    phone: String,
    employeeCount: {
        type: Number,
        default: 0
    },
    releasedCount: {
        type: Number,
        default: 0
    }
},{
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model('Branch', branchSchema)