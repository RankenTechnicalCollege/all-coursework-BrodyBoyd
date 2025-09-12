import express from 'express';
const router = express.Router();

import debug from 'debug';
const debugCalc = debug('app:mpg:calc');

function requireKey(keyName) {
  return (req, res, next) => {
    if (!req.body[keyName]) {
      return res.status(400).json({ error: `Missing required field: ${keyName}` });
    }
    next();
  }
}

router.use(express.urlencoded({ extended: false }));

router.post('/calc', requireKey('milesDriven'), requireKey('gallonsUsed'), (req, res) => {
  const milesDriven = parseFloat(req.body.milesDriven);
  const gallonsUsed = parseFloat(req.body.gallonsUsed);
  if (isNaN(milesDriven) || isNaN(gallonsUsed) || gallonsUsed <= 0 || milesDriven <= 0) {
    return res.status(400).json({ error: 'Invalid input values' });
  }
  else {
    const mpg = milesDriven / gallonsUsed;
    debugCalc(`Calculated MPG: ${mpg.toFixed(2)}`);
    return res.status(200).json({ mpg: mpg.toFixed(2) });
  }
});

export { router as mpgCalcRouter };