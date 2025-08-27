import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

const tableSize = await rl.question("How big do you want the table to be (1-12)?")

//use table size to calculate the amount of rows and columns in table 
// then figure out how to add first number of each row to it self x amount of collumns

rl.close()