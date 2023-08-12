import express from 'express'
import { addProduct, allProducts, deleteProduct, updateProduct } from '../controller/products.js';

const router = express.Router();

router.post('/product/add', addProduct);
router.post('/product/update/:id', updateProduct);
router.delete('/product/delete/:id', deleteProduct);

router.get('/product/all', allProducts);

export default router