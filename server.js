import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/CategoryRoute.js';
import productRoutes from './routes/ProductRoutes.js';
import cors from 'cors';

// Configurations
dotenv.config();
colors.setTheme({});

// Database configuration
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);

// REST API
app.get('/', (req, res) => {
    res.send("<h1>Welcome to E-commerce App</h1>");
});

// Server listening
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.DEV_MODE || 'development'} mode on port ${PORT}`.bgCyan.white);
});
