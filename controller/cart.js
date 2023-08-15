import expressAsyncHandler from "express-async-handler"
import UserProfile from "../models/profile.js";
import Products from "../models/products.js";

export const addProductToCart = expressAsyncHandler(async (req, res) => {
    const { userId, productId, quantity } = req.body;
    console.log('userId, productId, quantity: ', userId, productId, quantity);

    try {

        // TODO: get current user from database
        const user = await UserProfile.findById(userId).lean();

        if (!user) {
            res.status(400);
            throw new Error("User not found");
        }

        // TODO: get product from database
        const product = await Products.findById(productId);

        if (!product) {
            res.status(400);
            throw new Error("Product not found");
        }

        // TODO: get info from product
        const { productName, productPrice, productImage, productCategory } = product;
        
        // ? User is from the last findUserById
        // ? if have user, add product to cart

        // TODO: add product to user cart
        user?.products?.cart.push({
            productId,
            productName,
            productPrice,
            productImage,
            productCategory,
            quantity
        });

        return res.status(200).json(user);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});