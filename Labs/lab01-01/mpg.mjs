import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

const milesDriven = await rl.question('How many miles did you drive?');

const gallonsUsed = await rl.question('How many gallons did you use?')

const mpg = milesDriven / gallonsUsed;
if (gallonsUsed <=0 || isNaN(gallonsUsed) || isNaN(milesDriven) || milesDriven <= 0) {
  console.log("One entry was an invalid entry.");
} else {
console.log(`After driving ${milesDriven} miles and using ${gallonsUsed} gallons your MPG is ${mpg.toFixed(2)}`);
}  
rl.close();