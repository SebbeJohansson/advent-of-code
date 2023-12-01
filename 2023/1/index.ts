import * as fs from 'fs';

console.log('first day of advent of code 2023!');

let numberMap: { [key: string]: number } = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};
let spelledNumbersRegex = new RegExp(Object.keys(numberMap).join('|'), 'gi');

let data: string = fs.readFileSync('input', 'utf8');
let numbersAsStrings: string[] = data.split('\n').map((line) => {
  const lineWithMatchedSpelledNumbers = line.replaceAll(spelledNumbersRegex, (match: string) => {
    return `${numberMap[match]}${match.slice(0, 1)}${match.slice(-1)}`;
  }).replaceAll(spelledNumbersRegex, (match: string) => {
    return `${numberMap[match]}${match.slice(0, 1)}${match.slice(-1)}`;
  });
  const lineWithoutLeftOverCharacters = lineWithMatchedSpelledNumbers.replace(/\D/g, '');
  return lineWithoutLeftOverCharacters;
});

let processedNumbers: number[] = numbersAsStrings.map((number) => {
  return parseInt(number[0] + number[number.length - 1]);
});

let total: number = processedNumbers.reduce((a, b) => a + b, 0);
console.log(total);
