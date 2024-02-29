import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @accesss Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}); // find all products
    res.json(products);
});

// @desc    Fetch a product
// @route   GET /api/products/:id
// @accesss Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id); // find 1 product

    if (product) {
        return res.json(product);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    };
});

// @desc    Create product
// @route   POST /api/products
// @accesss Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    });
});

export { getProducts, getProductById };