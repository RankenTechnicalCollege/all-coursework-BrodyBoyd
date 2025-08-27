import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

const filingStatus = await rl.question("are you filing Single (1) or Married filing jointly (2)?")

const taxableIncome = await rl.question("what is your taxable income?")
let taxedIncome = parseFloat(taxableIncome)

let taxes = 0;

if (filingStatus == 1) {
  if (taxedIncome <= 11925) {
    taxes = taxedIncome * .1
    console.log(`Your income is $${Math.ceil(taxedIncome)} and your taxes paid are $${Math.ceil(taxes)}`)
  }
  else if (taxedIncome > 11925 && taxedIncome <= 48475){
    taxes = taxedIncome * .12
    console.log(`Your income is $${Math.ceil(taxedIncome)} and your taxes paid are $${Math.ceil(taxes)}`)
  }
  else if (taxedIncome > 48475 && taxedIncome <= 103350){
    taxes = taxedIncome * .22
    console.log(`Your income is $${Math.ceil(taxedIncome)} and your taxes paid are $${Math.ceil(taxes)}`)
  }
  else if (taxedIncome > 103350 && taxedIncome <= 197300){
    taxes = taxedIncome * .24
    console.log(`Your income is $${Math.ceil(taxedIncome)} and your taxes paid are $${Math.ceil(taxes)}`)
  }
  else if (taxedIncome > 197300 && taxedIncome <= 250525){
    taxes = taxedIncome * .32
    console.log(`Your income is $${Math.ceil(taxedIncome)} and your taxes paid are $${Math.ceil(taxes)}`)
  }
  else if (taxedIncome > 250525 && taxedIncome <= 626350){
    taxes = taxedIncome * .35
    console.log(`Your income is $${Math.ceil(taxedIncome)} and your taxes paid are $${Math.ceil(taxes)}`)
  }
  else if (taxedIncome > 626350){
    taxes = taxedIncome * .37
    console.log(`Your income is $${Math.ceil(taxedIncome)} and your taxes paid are $${Math.ceil(taxes)}`)
  }
  else if (taxedIncome == NaN || taxedIncome <= 0 )
  {
    console.log("Invalid amount of money entered")
  }
}
else if (filingStatus == 2) {
  if (taxedIncome <= 23850) {
    taxes = taxedIncome * .1
    console.log(`Your income is $${Math.ceil(taxedIncome)} and your taxes paid are $${Math.ceil(taxes)}`)
  }
  else if (taxedIncome > 23850 && taxedIncome <= 96950){
    taxes = taxedIncome * .12
    console.log(`Your income is $${Math.ceil(taxedIncome)} and your taxes paid are $${Math.ceil(taxes)}`)
  }
  else if (taxedIncome > 96950 && taxedIncome <= 206700){
    taxes = taxedIncome * .22
    console.log(`Your income is $${Math.ceil(taxedIncome)} and your taxes paid are $${Math.ceil(taxes)}`)
  }
  else if (taxedIncome > 206700 && taxedIncome <= 394600){
    taxes = taxedIncome * .24
    console.log(`Your income is $${Math.ceil(taxedIncome)} and your taxes paid are $${Math.ceil(taxes)}`)
  }
  else if (taxedIncome > 394600 && taxedIncome <= 501050){
    taxes = taxedIncome * .32
    console.log(`Your income is $${Math.ceil(taxedIncome)} and your taxes paid are $${Math.ceil(taxes)}`)
  }
  else if (taxedIncome > 501050 && taxedIncome <= 751600){
    taxes = taxedIncome * .35
    console.log(`Your income is $${Math.ceil(taxedIncome)} and your taxes paid are $${Math.ceil(taxes)}`)
  }
  else if (taxedIncome > 751600){
    taxes = taxedIncome * .37
    console.log(`Your income is $${Math.ceil(taxedIncome)} and your taxes paid are $${Math.ceil(taxes)}`)
  }
  else if (taxedIncome == NaN || taxedIncome <= 0 )
  {
    console.log("Invalid amount of money entered")
  }
}

rl.close();