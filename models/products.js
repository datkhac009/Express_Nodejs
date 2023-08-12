import mongoose, { mongo } from "mongoose";

const products = mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productImage: {
        name: String,
        data: Buffer,
    },
    productDescription: {
        type: String,
        required: true
    },
    productQuantity: {
        type: Number,
        required: true,
        default: 0
    },
    productCategory: {
        type: String,
        required: true
    },
    productStatus: {
        type: String,
        required: true,
        default: "online"
    },
    productDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    productSeller: {
        type: String,
        required: true
    },
    productSold: {
        type: Number,
        required: true,
        default: 0  
    },
    productRating: {
        type: Number,
        required: true,
        default: 0
    },
    productReview: {
        type: Number,
        required: false
    }
});

const productsModel = mongoose.model("products", products);
export default productsModel;