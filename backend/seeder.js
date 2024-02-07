import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config(); // initialize to use Environment Variables

connectDB();     // connect to database

const importData = async () => {
    try {
        // clear database
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // seed database with sample data
        const createdUsers = await User.insertMany(users);

        // products can only be created by the Admin
        const adminUser = createdUsers[0]._id;
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        // insert products into the database
        await Product.insertMany(sampleProducts);
        console.log('Data Imported!');
        process.exit();

    } catch (err) {
        console.log(`${err}`);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();

    } catch (err) {
        console.log(`${err}`);
        process.exit(1);    // kill process
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
};