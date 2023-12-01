import * as fs from 'fs';

console.log('first day of advent of code 2023!');

let data: string = fs.readFileSync('input', 'utf8');
let numbers: number[] = data.split('\n').map(line => Number(line.replace(/\D/g, '')));

console.log('numbers', numbers);

let processedNumbers: number[] = numbers.map((number) => {
  let numberAsString: string = number.toString();
  return parseInt(numberAsString[0] + numberAsString[numberAsString.length - 1]);
});

let total: number = processedNumbers.reduce((a, b) => a + b, 0);
console.log(total);
