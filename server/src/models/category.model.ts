import mongoose, { Schema } from 'mongoose'

const categorySchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
        unique: true
    }
})

const categoryModel = mongoose.model('category', categorySchema)

export default categoryModel