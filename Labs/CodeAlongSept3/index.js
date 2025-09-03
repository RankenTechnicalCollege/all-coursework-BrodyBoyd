import express from 'express';
const app = express()
import debug from 'debug';
const debugIndex = debug('app:index');
const port = process.env.PORT || 3000;
import { companyRouter } from './routes/api/company.js';
import { jobRouter } from './routes/api/job.js';




app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static('frontend/dist'))

app.use('/api/companies', companyRouter);
app.use('/api/jobs', jobRouter);



app.listen(port, () => {
  debugIndex(`Example app listening on port http://localhost:${port}`)
})
