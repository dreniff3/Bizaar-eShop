import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @accesss Public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 2;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword ? {
        name: { 
            $regex: req.query.keyword, 
            $options: 'i', // case insensitive
        }
    } : {};

    // get number of products in database, or products matching keyword
    const count = await Product.countDocuments({...keyword}); 

    // find all products, or products matching keyword
    const products = await Product.find({...keyword})
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    res.json({ 
        products, 
        list: 'productlist',
        page, 
        pages: Math.ceil(count / pageSize) 
    });
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

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @accesss Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({ _id: product._id });
        res.status(200).json({ message: 'Product deleted' });
    } else {
        res.status(404);
        throw new Error('Resourse not found');
    }
});

// @desc    Create a new review
// @route   POST /api/products/:id/reviews
// @accesss Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    
    const product = await Product.findById(req.params.id);

    if (product) {
        // check if user has already reviewed this product
        const alreadyReviewed = product.reviews.find(
            (review) => review.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(404);
            throw new Error('Product already reviewed');
        }

        // create review object
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        // add review to product reviews
        product.reviews.push(review);

        // update number of reviews
        product.numReviews = product.reviews.length;

        // new rating = sum of all reviews divided by number of reviews
        product.rating = product.reviews.reduce(
            (acc, review) => acc + review.rating, 0
            ) / product.numReviews;

        await product.save();
        res.status(201).json({ message: 'Review added' });
    } else {
        res.status(404);
        throw new Error('Resourse not found');
    }
});

export { 
    getProducts, 
    getProductById, 
    createProduct, 
    updateProduct,
    deleteProduct,
    createProductReview,
};