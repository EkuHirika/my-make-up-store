//initializes the Express application and middleware.

import express, { Request, Response } from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET','POST', 'PUT', 'DELETE'],
}));

app.use(express.json());

app.use('/products', productRoutes);


export default app