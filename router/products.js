import express from 'express'
import { addProduct } from '../controller/products.js';

const router = express.Router();

router.route('/product/add').post(addProduct);

export default router