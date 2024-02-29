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

    // capture saved document in variable
    const createdProduct = await product.save();
    res.status(201).json(createProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @accesss Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { 
        name, 
        price, 
        description, 
        image, 
        brand, 
        category, 
        countInStock 
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updateProduct = await product.save();
        res.json(updateProduct);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

export { 
    getProducts, 
    getProductById, 
    createProduct, 
    updateProduct 
};