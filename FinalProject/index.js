import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import debug from 'debug';
import cors from 'cors'
const debugServer = debug('app:Server');
import { userRouter } from './routes/api/user.js';
import { BugRouter } from './routes/api/bug.js';
import { auth } from "./auth.js"; 
import { toNodeHandler } from "better-auth/node";


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:8080","http://localhost:3000", "https://issuetracker-service-627308096057.us-central1.run.app/"],
    credentials: true
}));
app.use(express.static('frontend/dist'));
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use('/api/user', userRouter);
app.use('/api/bug', BugRouter)
const port = process.env.PORT || 8080;

app.listen(port, () => {
  debugServer(`Server is now running on http://localhost:${port}`)
})

app.get('/api', (req, res) => {
  res.send('Hello World from the back end route!')
});

