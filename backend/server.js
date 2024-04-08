import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const port = process.env.PORT || 5000;

connectDB();

const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser middleware - allows us to access request.cookies
app.use(cookieParser());

// routes mapped to files
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => 
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// set __dirname to current directory
const __dirname = path.resolve();
// set '/uploads' folder as static
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// test to see if we're in production
if (process.env.NODE_ENV === 'production') {
    // set static build folder
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    /* any route that is not api will be redirected to index.html 
       in '/frontend/build' static folder */
    app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
} else {
    // if not in production, use react dev server
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));