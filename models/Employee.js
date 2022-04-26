const mongoose = require('mongoose')
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isBoolean: {
        type: Boolean, 
        default: false 
    },
    password: {
        type: String,
        required: true
    },
    roleId: {
        type: mongoose.Schema.ObjectId,
        ref: "Role",
        required: true
    },
    branchId: {
        type: mongoose.Schema.ObjectId,
        ref: "Branch",
        required: true
    },
    comment: {
        type: String,
        default: ""
    },
    releasedTime :{
        type: Date
    },
    img: String
},{
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model('Employee', employeeSchema)