const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    table:
        {
            type: Schema.Types.ObjectId,
            ref: 'table'
        },
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'order'
        }
    ]
})
module.exports = mongoose.model('client', clientSchema)