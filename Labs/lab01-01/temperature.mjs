import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

const tempType = await rl.question('Is your temp type Celsius (C) or Fahrenheit (F)');
let tempToConvert = await rl.question('What is your temperature?')
const tempAsNumber = parseFloat(tempToConvert)
if (tempType == 'F')
{
  if (isNaN(tempAsNumber) || tempAsNumber <= 0) {
    console.log("Not a valid number, try again");
  }
  else {
    let tempInCel = (tempAsNumber - 32) * (5/9);
    console.log(`Your temp in Celsius is ${tempInCel} degrees`)
  }
}
else if (tempType == 'C') 
{
if (isNaN(tempAsNumber) || tempAsNumber <= 0) {
    console.log("Not a valid number, try again");
  }
  else {
    let tempInFar = (tempAsNumber * (9/5)) + 32;
    console.log(`Your temp in Celsius is ${tempInFar} degrees`)
  }
}
rl.close();