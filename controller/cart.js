import expressAsyncHandler from "express-async-handler"
import UserProfile from "../models/profile.js";
import Products from "../models/products.js";

export const addProductToCart = expressAsyncHandler(async (req, res) => {
    const { userId, productId, quantity } = req.body;
    console.log('userId, productId, quantity: ', userId, productId, quantity);
    try {
        // TODO: get current user from database
        //lean() là lấy chính xác dữ liệu hiện tại
        //Lấy ID của profile trong database
        const user = await UserProfile.findById(userId).lean();
        console.log("🚀 ~ file: cart.js:13 ~ addProductToCart ~ user:", user)

        if (!user) {
            res.status(400);
            throw new Error("User not found");
        }
        // TODO: get product from database
        //Lấy ID của products trong database
        const product = await Products.findById(productId);

        if (!product) {
            res.status(400);
            throw new Error("Product not found");
        }
        // TODO: get info from product
        //Lấy dữ liệu của product vừa mới thêm được
        const { productName, productPrice, productImage, productCategory } = product;
        // TODO: add product to that user cart
        console.log('user: ', user);
        //? là regex
        //gọi đến user.products.cart push  
        //kiểm tra xem user.products.cart có tồn tại hay không
        //sử dụng phương thức push() để thêm sản phẩm mới vào giỏ hàng của người dùng
        
        user.products.cart.push({
            productId,
            productName,
            productPrice,
            productImage,
            productCategory,
            quantity
        });
        //Lấy array giỏ hàng của ng dùng hiện tại
        const updatedUserCart = user.products.cart;
        //Tìm id của ng dùng hiện tại và update giỏ hàng thành 1 giỏ hàng mới 
        //Có nghĩa là có thể update liên tục product vào cart
        const updatedUserProfile = await UserProfile.findByIdAndUpdate(userId, { $set: { 'products.cart': updatedUserCart } }, { new: true });

        return res.status(200).json({
            id: updatedUserProfile._id,
            email: updatedUserProfile.email,
            products: updatedUserProfile.products
        });

    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

