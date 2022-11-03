import mongoose from 'mongoose'

const Schema = mongoose.Schema
const CarSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    colour: {
        type: String,
        require: true
    },
    model: {
        type: String,
        require: true
    },
    registerationNo: {
        type: String,
        require: true
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: "category",
    }
},
    { timestaps: true }
)

export const Car = mongoose.model('car', CarSchema)