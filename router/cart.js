import express from 'express';
import { addProductToCart } from '../controller/cart.js';

const router = express.Router();

router.post('/cart/add', addProductToCart);

export default router;