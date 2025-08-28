import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

const tableSize = await rl.question("How big do you want the table to be (1-12)?")

//use table size to calculate the amount of rows and columns in table 
// then figure out how to add first number of each row to it self x amount of collumns
if (tableSize > 12 || tableSize <1 || tableSize == NaN)
{
  console.log('Please enter a valid whole number between 1 and 12')
}
else{
for (let i=1; i <= tableSize; i++){
  let tableLine = "";
  for (let j=1; j <= tableSize;j++){
    let result = i * j
    
    tableLine += result.toString().padStart(3,"   ") + " ";
  }
  console.log(`${tableLine}`)
}
}

rl.close()