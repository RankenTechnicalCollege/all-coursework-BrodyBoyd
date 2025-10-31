import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import debug from 'debug'; 
import cors from 'cors'
const debugServer = debug('app:server');
import { productsRouter } from './routes/api/products.js';
import { userRouter } from './routes/api/users.js'
import { auth } from "./auth.js"; 
import { toNodeHandler } from "better-auth/node";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:8080","http://localhost:3000", "http://localhost:2023"],
    credentials: true
}));
app.use(express.static('HOT3/dist'));
app.all("/api/auth/*splat", toNodeHandler(auth));
//had to manually put the origin in the headers
app.use('/api/products', productsRouter);
app.use('/api/users', userRouter)
const PORT = process.env.PORT || 2023;



app.listen(PORT, () => {
  debugServer(`Server is running on http://localhost:${PORT}`);
});