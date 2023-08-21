import express from 'express'
import { addProduct, allProducts, deleteProduct, updateProduct } from '../controller/products.js';

const router = express.Router();

router.get('/product/all', allProducts);
router.post('/product/add', addProduct);
router.put('/product/update/:id', updateProduct);
router.delete('/product/delete/:id', deleteProduct);


export default router