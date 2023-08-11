import expressAsyncHandler from "express-async-handler";
import productsModel from "../models/products.js";
import { v4 as uuidv4 } from 'uuid';

export const addProduct = expressAsyncHandler(async (req, res) => {
    const { 
        name, 
        price, 
        description, 
        image, 
        category, 
        seller, 
        rating, 
        quantity,
        sold,
        review,
        status
    } = req.body;

    const findProduct = await productsModel.findOne({ productName: name });

    const product = await productsModel.create({
        productId: uuidv4(),
        productName: name, 
        productPrice: price, 
        productSeller: seller,
        productDescription: description, 
        productImage: image, 
        productCategory: category,
        productRating: rating,
        productQuantity: quantity,
        productSold: sold,
        productReview: review,
        productStatus: status,
    });

    await product.save();

    console.log(2);
    console.log('new product: ', product);
    res.status(202).json(product);

})

export const allProducts = async (req, res) => {
    
}