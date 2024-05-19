import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import routineRoutes from './routes/routineRoutes';
import { errorHandler } from './utils/customError';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/routines', routineRoutes);

app.use(errorHandler);

export default app;
