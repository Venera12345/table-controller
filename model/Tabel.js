const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tableSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    count_client: {
        type: Number,
        required: true
    },
    amount_execute_order: {
        type: Number,
        required: true
    }
})
module.exports = mongoose.model('table', tableSchema)