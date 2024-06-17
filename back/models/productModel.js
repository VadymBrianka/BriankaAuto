import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type:Number,
        required: true,
        trim: true
    },
    mileage: {
        type:Number,
        required: true,
        trim: true
    },
    engineCapacity: {
        type:Number,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
                return !isNaN(parseFloat(v)) && isFinite(v);
            },
            message: 'Engine capacity must be a valid number.'
        }
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        trim: true,
        required: true,
    },
    image: {
        type:String,
        required: true,
    },
    cloudinaryPublicId: {
        type:String,
        required: true
    } 
}, {
    timestamps: true //important
})

const Product = mongoose.model('Product', productSchema)

export default Product;