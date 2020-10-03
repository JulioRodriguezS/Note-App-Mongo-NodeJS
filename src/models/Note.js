const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    createdDate:{
        type: Date,
        default:Date.now
    },
    user:{
        type: String
    }
})

module.exports = mongoose.model('Note', noteSchema)