 const mongoose = require('mongoose')

 const testSchema = new mongoose.Schema({
    roleId:{
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Role"
    },
    tests: [{}],
    opened:{
        type: Date
    },
    closed:{
        type: Date
    },
    title: String
 },{
     timestapms: true,
     version_key: false
 });

 module.exports = mongoose.model('Test', testSchema)