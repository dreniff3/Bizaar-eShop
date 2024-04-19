import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import { calcPrices } from '../utils/calcPrices.js';
import { verifyPayPalPayment, checkIfNewTransaction } from '../utils/paypal.js';

// for microservice
import axios from 'axios';

// @desc    Create new order
// @route   POST /api/orders
// @accesss Private
const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod } = req.body;
  
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        // NOTE: here we must assume that the prices from our client are incorrect.
        // We must only trust the price of the item as it exists in
        // our DB. This prevents a user paying whatever they want by hacking our client
        // side code - https://gist.github.com/bushblade/725780e6043eaf59415fbaf6ca7376ff
    
        // get the ordered items from our database
        const itemsFromDB = await Product.find({
            _id: { $in: orderItems.map((x) => x._id) },
        });
  
        // map over the order items and use the price from our items from database
        const dbOrderItems = orderItems.map((itemFromClient) => {
            const matchingItemFromDB = itemsFromDB.find(
            (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
            );
            return {
            ...itemFromClient,
            product: itemFromClient._id,
            price: matchingItemFromDB.price,
            _id: undefined,
            };
        });
  
        // calculate prices
        const { itemsPrice, taxPrice, shippingPrice, totalPrice } = calcPrices(dbOrderItems);
    
        const order = new Order({
            orderItems: dbOrderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });
  
        const createdOrder = await order.save();
  
        res.status(201).json(createdOrder);
    }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @accesss Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @accesss Private
const getOrderById = asyncHandler(async (req, res) => {
    // add 'name' and 'email' to Order
    const order = await Order.findById(req.params.id).populate(
        'user', 
        'name email'
    );

    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @accesss Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    // NOTE: here we need to verify the payment was made to PayPal before marking
    // the order as paid
    const { verified, value } = await verifyPayPalPayment(req.body.id);
    if (!verified) throw new Error('Payment not verified');
  
    // check if this transaction has been used before
    const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
    if (!isNewTransaction) throw new Error('Transaction has been used before');
  
    const order = await Order.findById(req.params.id);
  
    if (order) {
        // check the correct amount was paid
        const paidCorrectAmount = order.totalPrice.toString() === value;
        if (!paidCorrectAmount) throw new Error('Incorrect amount paid');
    
        // if all conditions are valid, set isPaid to true
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };
  
        const updatedOrder = await order.save();

        // send email to user
        try {
            const response = await axios.post('http://localhost:3000/api/sendEmail', {
                userEmail: req.user.email,
                purchaseDetails: 'Your order has been successfully completed.'
            });
            console.log('Email sent: ', response.data);
        } catch (error) {
            console.error('Error sending email: ', error.response.data);
        }
  
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @accesss Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        // capture saved document in variable
        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Get all orders
// @route   GET /api/orders
// @accesss Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const pageSize = 2;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Order.countDocuments();
    // get all orders (using empty object)
    // and populate from User collection using id and name
    const orders = await Order.find({}).populate('user', 'id name')
        .limit(pageSize).skip(pageSize * (page - 1));
    res.status(200).json({
        orders,
        list: 'orderlist',
        page,
        pages: Math.ceil(count / pageSize),
    });
});

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
};