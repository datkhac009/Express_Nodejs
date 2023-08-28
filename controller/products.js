/* eslint-disable no-useless-escape */
import expressAsyncHandler from "express-async-handler";
import productsModel from "../models/products.js";
import { v4 as uuidv4 } from 'uuid';

export const addProduct = expressAsyncHandler(async (req, res) => {
    const {  productName,  productPrice,  productDescription,  productImage,  productCategory,  productSeller,  productRating,  productQuantity, productSold, productReview, productStatus } = req.body;

    try {
        const findProduct = await productsModel.findOne({ productName: productName });
        
        if (findProduct) {
            res.status(400);
            throw new Error("Product already exists!");
        }
        
        const createdProduct = {
            productId: uuidv4(),
            productName: productName, 
            productPrice: productPrice, 
            productSeller: productSeller,
            productDescription: productDescription, 
            productImage: productImage, 
            productCategory: productCategory,
            productRating: productRating,
            productQuantity: productQuantity,
            productSold: productSold,
            productReview: productReview,
            productStatus: productStatus,
        };

        const product = await productsModel.create(createdProduct);
        await product.save();

        console.log(2);
        console.log('new product: ', product);
        res.status(202).json(product);
    } catch (error) {
        res.status(400);
        throw new Error(error.message.replace(/\"/g, ""));
    }

})

export const allProducts = async (req, res) => {
    const allProducts = await productsModel.find();

    res.status(200).json(allProducts);
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    await productsModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Product deleted" });
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, image, category, seller, rating, quantity, sold, review, status } = req.body;
    const update = { name, price, description, image, category, seller, rating, quantity, sold, review, status };   
    const product = await productsModel.findByIdAndUpdate(id, update, { new: true });
    res.status(200).json(product);
}