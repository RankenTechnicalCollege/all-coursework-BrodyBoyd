import express from 'express';
const router = express.Router();

import debug from 'debug';
const debugCalc = debug('app:income-tax:calc');

function requireKey(keyName) {
  return (req, res, next) => {
    if (!req.body[keyName]) {
      return res.status(400).json({ error: `Missing required field: ${keyName}` });
    }
    next();
  }
}

router.use(express.urlencoded({ extended: false }));

router.post('/calc', requireKey('income'), requireKey('mode'), (req, res) => {
const income = parseFloat(req.body.income);
if (isNaN(income) || income < 0) {
    return res.status(400).json({ error: 'Invalid income value' });
  }
if (!['Single', 'Married'].includes(req.body.mode)) {
    return res.status(400).json({ error: 'Invalid mode. Use "Single" or "Married"' });
}
let taxOwed = 0;
if (req.body.mode === 'Single') {
  if (income <= 11925) {
    taxOwed = income * 0.10;
  }
  else if (income <= 48475 && income > 11925) {
    taxOwed = 1192.50 + ((income - 11925) * 0.12);
  }
  else if (income <= 103350 && income > 48475) {
    taxOwed = 5817 + ((income - 48475) * 0.22);
  }
  else if (income <= 197300 && income > 103350) {
    taxOwed = 22737 + ((income - 103350) * 0.24);
  }
  else if (income <= 250525 && income > 197300) {
    taxOwed = 47352 + ((income - 197300) * 0.32);
  }
  else if (income <= 626350 && income > 250525) {
    taxOwed = 80168 + ((income - 250525) * 0.35);
  }
  else if (income > 626350) {
    taxOwed = 219222.5 + ((income - 626350) * 0.37);
  }
}
else if (req.body.mode === 'Married') {
  if (income <= 23850) {
    taxOwed = income * 0.10;
  }
  else if (income <= 96950 && income > 23850) { 
    taxOwed = 2385 + ((income - 23850) * 0.12);
  }
  else if (income <= 206700 && income > 96950) {
    taxOwed = 11634 + ((income - 96950) * 0.22);
  }
  else if (income <= 394600 && income > 206700) {
    taxOwed = 45474 + ((income - 206700) * 0.24);
  }
  else if (income <= 501050 && income > 394600) {
    taxOwed = 94704 + ((income - 394600) * 0.32);
  }
  else if (income <= 751600 && income > 501050) {
    taxOwed = 160336 + ((income - 501050) * 0.35);
  }
  else if (income > 751600) {
    taxOwed = 263060 + ((income - 751600) * 0.37);
  }
}

  debugCalc(`Calculated Income Tax Owed: ${Math.ceil(taxOwed)}`); 
  return res.status(200).json({ taxOwed: Math.ceil(taxOwed) });
});


export { router as incomeTaxCalcRouter };