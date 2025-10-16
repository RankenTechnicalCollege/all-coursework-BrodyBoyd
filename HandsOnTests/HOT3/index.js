import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import debug from 'debug'; 
const debugServer = debug('app:server');
import { productsRouter } from './routes/api/products.js';

const app = express();
const PORT = process.env.PORT || 2023;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('HOT3/dist'));
app.use('/api/products', productsRouter);


app.listen(PORT, () => {
  debugServer(`Server is running on http://localhost:${PORT}`);
});