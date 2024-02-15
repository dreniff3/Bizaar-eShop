import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @accesss Private
const addOrderItems = asyncHandler(async (req, res) => {
    res.send('add order items');
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @accesss Private
const getMyOrders = asyncHandler(async (req, res) => {
    res.send('get my orders');
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @accesss Private
const getOrderById = asyncHandler(async (req, res) => {
    res.send('get order by ID');
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @accesss Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send('update order to paid');
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @accesss Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send('update order to delivered');
});

// @desc    Get all orders
// @route   GET /api/orders
// @accesss Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    res.send('get all orders');
});

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
};