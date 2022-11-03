import mongoose from 'mongoose'

const Schema = mongoose.Schema
const CategorySchema = new Schema({
    name: {
        type: String,
        require: true
    },
},
    { timestaps: true }
)

export const Category = mongoose.model('category', CategorySchema)