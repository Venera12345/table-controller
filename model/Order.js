const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    describe: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'client'
    },
    table:
        {
            type: Schema.Types.ObjectId,
            ref: 'table'
        }
})
module.exports = mongoose.model('order', orderSchema)