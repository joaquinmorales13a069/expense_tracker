import dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db.js';
import { authRoutes } from './routes/authRoutes.js';
import { incomeRoutes } from './routes/incomeRoutes.js';
import { expenseRoutes } from './routes/expenseRoutes.js';
import { dashboardRoutes } from './routes/dashboardRoutes.js';

//  CREATE EXPRESS APP
const app = express();

// MIDDLEWARE TO HANDLE CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
)

app.use(express.json());

// CONNECT TO DATABASE
connectDB();

// ROUTES
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/income', incomeRoutes)
app.use('/api/v1/expense', expenseRoutes)
app.use('/api/v1/user', dashboardRoutes)

// SERVE UPLOADS FOLDER
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

