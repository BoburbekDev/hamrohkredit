const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    title: {
        type: String
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Role', roleSchema);