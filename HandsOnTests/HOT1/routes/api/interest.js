import express from 'express';
const router = express.Router();

import debug from 'debug';
const debugCalc = debug('app:interest:calc');

function requireKey(keyName) {
  return (req, res, next) => {
    if (!req.body[keyName]) {
      return res.status(400).json({ error: `Missing required field: ${keyName}` });
    }
    next();
  }
}

router.use(express.urlencoded({ extended: false }));

router.post('/calc', requireKey('principal'), requireKey('interestRate'), requireKey('years'), (req, res) => {
  const principal = parseFloat(req.body.principal);
  const interestRate = parseFloat(req.body.interestRate);
  const years = parseFloat(req.body.years);
  if (isNaN(principal) || isNaN(interestRate) || isNaN(years) || principal <= 0 || interestRate <= 0 || interestRate > 100 || years <= 0 || years > 50) {
    return res.status(400).json({ error: 'Invalid input values' });
  }
  else {
    const finalAmount = principal * ((1 + interestRate / 100 / 12) ** (years * 12));
    debugCalc(`Calculated Final Amount: ${finalAmount.toFixed(2)}`);
    return res.status(200).json({ finalAmount: finalAmount.toFixed(2) });
  }

});


export { router as interestRouter };