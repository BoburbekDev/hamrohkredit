const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Employee"
    },
    testId: {
        type: mongoose.Schema.ObjectId,
        ref: "Test",
        required: true
    },
    result: String,
    info: [
        
    ]
},{
    timestamps: true,
})

module.exports = mongoose.model('Result',resultSchema)