import express from 'express';
const router = express.Router();

import debug from 'debug';
const debugConvert = debug('app:temperature:convert');

function requireKey(keyName) {
  return (req, res, next) => {
    if (!req.body[keyName]) {
      return res.status(400).json({ error: `Missing required field: ${keyName}` });
    }
    next();
  }
}

router.post('/convert', requireKey('mode'), requireKey('temp'), (req, res) => {
  const temp = parseFloat(req.body.temp);

  if (isNaN(temp)) {
    return res.status(400).json({ error: 'Invalid temperature value' });
  }
  if (!['FtoC', 'CtoF'].includes(req.body.mode)) {
    return res.status(400).json({ error: 'Invalid mode. Use "FtoC" or "CtoF"' });
  }
  if (req.body.mode === 'FtoC') {
    const celsius = (temp - 32) * (5 / 9);
    debugConvert(`Converted ${temp}F to ${celsius.toFixed(2)}C`);
    return res.status(200).json({ temperature: celsius.toFixed(2) });
  }
  else if (req.body.mode === 'CtoF') {
    const fahrenheit = (temp * (9 / 5)) + 32;
    debugConvert(`Converted ${temp}C to ${fahrenheit.toFixed(2)}F`);
    return res.status(200).json({ temperature: fahrenheit.toFixed(2)});
  }
  
});

export { router as temperatureRouter }