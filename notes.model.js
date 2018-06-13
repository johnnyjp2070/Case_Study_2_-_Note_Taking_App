let mongoose = require('mongoose')
var Schema = mongoose.Schema

var todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Object
    },
    updatedAt: {
        type: Object
    } 
})
module.exports = mongoose.model('todo', todoSchema)