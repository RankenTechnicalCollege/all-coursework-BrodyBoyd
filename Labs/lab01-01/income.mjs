import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

const filingStatus = await rl.question("are you filing Single (1) or Married filing jointly (2)?")

const taxableIncome = await rl.question("what is your taxable income?")
let taxedIncome = parseFloat(taxableIncome)

let taxes = 0;
if (isNaN(taxableIncome) || taxedIncome <= 0) {
  console.log("Invalid amount of money entered")
} else {
if (filingStatus == 1) {
  if (taxedIncome <= 11600) {
    taxes = taxedIncome * .1
    console.log(`Your income is $${Math.ceil(taxedIncome)} and your taxes paid are $${Math.ceil(taxes)}`)
  }
  else if (taxedIncome > 11600 && taxedIncome <= 47150){
    taxes = 1160 + ((taxedIncome - 11600) *.12)
    console.log(`Your income is $${Math.ceil(taxedIncome)} and your taxes paid are $${Math.ceil(taxes)}`)
  }
  else if (taxedIncome > 47150 && taxedIncome <= 100525){
    taxes = 5426 + ((taxedIncome - 47150) *.22)
    console.log(`Your income is $${Math.ceil(taxedIncome)} and your taxes paid are $${Math.ceil(taxes)}`)
  }
  else if (taxedIncome > 100525 && taxedIncome <= 191950){
    taxes = 17168.5 + ((taxedIncome - 100525) *.24)
    console.log(`Your income is $${Math.ceil(taxedIncome)} and your taxes paid are $${Math.ceil(taxes)}`)
  }
  else if (taxedIncome > 191950 && taxedIncome <= 243725){
    taxes = 39110.5 + ((taxedIncome - 191950) *.32)
    console.log(`Your income is $${Math.ceil(taxedIncome)} and your taxes paid are $${Math.ceil(taxes)}`)
  }
  else if (taxedIncome > 243725 && taxedIncome <= 609350){
    taxes = 55678.5 + ((taxedIncome - 243725) *.35)
    console.log(`Your income is $${Math.ceil(taxedIncome)} and your taxes paid are $${Math.ceil(taxes)}`)
  }
  else if (taxedIncome > 609350){
    taxes = 183647.25 + ((taxedIncome - 609350) *.37)
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
    taxes = 2385 + ((taxedIncome - 23850) *.12)
    console.log(`Your income is $${Math.ceil(taxedIncome)} and your taxes paid are $${Math.ceil(taxes)}`)
  }
  else if (taxedIncome > 96950 && taxedIncome <= 206700){
    taxes = 11157 + ((taxedIncome - 96950) *.22)
    console.log(`Your income is $${Math.ceil(taxedIncome)} and your taxes paid are $${Math.ceil(taxes)}`)
  }
  else if (taxedIncome > 206700 && taxedIncome <= 394600){
    taxes = 35302 + ((taxedIncome - 206700) *.24)
    console.log(`Your income is $${Math.ceil(taxedIncome)} and your taxes paid are $${Math.ceil(taxes)}`)
  }
  else if (taxedIncome > 394600 && taxedIncome <= 501050){
    taxes = 80398 + ((taxedIncome - 394600) *.32)
    console.log(`Your income is $${Math.ceil(taxedIncome)} and your taxes paid are $${Math.ceil(taxes)}`)
  }
  else if (taxedIncome > 501050 && taxedIncome <= 751600){
    taxes = 114462 + ((taxedIncome - 501050) *.35)
    console.log(`Your income is $${Math.ceil(taxedIncome)} and your taxes paid are $${Math.ceil(taxes)}`)
  }
  else if (taxedIncome > 751600){
    taxes = 202154.5 + ((taxedIncome - 751600) *.37)
    console.log(`Your income is $${Math.ceil(taxedIncome)} and your taxes paid are $${Math.ceil(taxes)}`)
  }
  else if (taxedIncome == NaN || taxedIncome <= 0 )
  {
    console.log("Invalid amount of money entered")
  }
}
}

rl.close();