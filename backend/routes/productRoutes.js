import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({}); // find all products
    res.json(products);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id); // find 1 product

    if (product) {
        return res.json(product);
    }
    // handles error if no product is found
    res.status(404).json({ message: 'Product not found' });
}));

export default router;