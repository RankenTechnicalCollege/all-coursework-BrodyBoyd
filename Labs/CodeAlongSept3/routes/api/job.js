import express from 'express';

const router = express.Router();

import debug from 'debug';
const debugJob = debug('app:job');

let jobs = [
  { id: '101', customerName: 'John Doe', address: '123 Main St.', description: 'weekly lawn mowing', status: 'pending' },
  { id: '102', customerName: 'Jane Doe', address: '912 West St.', description: 'bi-monthly lawn mowing', status: 'never started' }
]

router.get('/', (req,res) =>{
  debugJob('Fetching all jobs');
  res.status(200).json(jobs);
});

export { router as jobRouter };