import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    price: {
        type: Schema.Types.String,
        required: true
    },
    image: {
        type: Schema.Types.String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    }
})

const productModel = mongoose.model('product', productSchema)

export default productModel