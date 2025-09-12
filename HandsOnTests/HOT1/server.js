import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import debug from 'debug';
const debugServer = debug('app:server');
import { mpgCalcRouter } from './routes/api/mpg.js';
import { temperatureRouter } from './routes/api/temperature.js';
import { incomeTaxCalcRouter } from './routes/api/income-tax.js';
import { interestRouter } from './routes/api/interest.js';

const PORT = process.env.PORT || 5010;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/mpg', mpgCalcRouter);
app.use('/api/temperature', temperatureRouter);
app.use('/api/income-tax', incomeTaxCalcRouter);
app.use('/api/interest', interestRouter);

app.listen(PORT, () => {
  debugServer(`Server is running on http://localhost:${PORT}`);
});

app.get('/api', (req, res) => {
  res.send('Hello World from the back end route!');
});