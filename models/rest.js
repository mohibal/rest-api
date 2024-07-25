const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Schema.Types.Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Schema.Types.Date,
        default: Date.now
    },
    updatedAt: {
        type: Schema.Types.Date,
        default: Date.now
    }
})

module.exports = mongoose.model("User", User);