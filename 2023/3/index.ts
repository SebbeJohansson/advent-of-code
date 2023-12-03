import * as fs from 'fs';

console.log('third day of advent of code 2023!');

let data: string = fs.readFileSync('input', 'utf8');

const lines = data.split('\n');
const symbolIndexLines = lines.map((line) => {
  const symbolIndexes: Number[] = [];
  line.split('').forEach((character, index) => {
    const characterAsNumber = parseInt(character);
    if (isNaN(characterAsNumber) && character !== '.') {
      symbolIndexes.push(index);
    }
  });
  return symbolIndexes;
});

function checkIfCharacterHasSymbolNextToItOnLine(lineSymbolIndexes: Number[], characterIndex: number) {
  const characterIsNextToSymbol = lineSymbolIndexes.includes(characterIndex - 1)
    || lineSymbolIndexes.includes(characterIndex)
    || lineSymbolIndexes.includes(characterIndex + 1);
  return characterIsNextToSymbol;
}

let sumOfPartNumbers = 0;

lines.forEach((line, lineIndex) => {
  let partNumber = '';
  let isNextToSymbol = false;

  const symbolIndexesPreviousLine = symbolIndexLines[lineIndex - 1];
  const hasSymbolInPreviousLine = symbolIndexesPreviousLine?.length > 0;
  const symbolIndexesCurrentLine = symbolIndexLines[lineIndex];
  const hasSymbolInCurrentLine = symbolIndexesCurrentLine.length > 0;
  const symbolIndexesNextLine = symbolIndexLines[lineIndex + 1];
  const hasSymbolInNextLine = symbolIndexesNextLine?.length > 0;

  line.split('').forEach((character, characterIndex) => {
    const characterAsNumber = parseInt(character);
    if (isNaN(characterAsNumber)) {
      if (partNumber.length > 0) {
        const partNumberAsNumber = parseInt(partNumber);
        if (!isNaN(partNumberAsNumber) && isNextToSymbol) {
          sumOfPartNumbers += partNumberAsNumber;
        }
        isNextToSymbol = false;
        partNumber = '';
      }
    }
    else if (!isNextToSymbol) {
      partNumber += character;

      if (hasSymbolInPreviousLine) {
        if (checkIfCharacterHasSymbolNextToItOnLine(symbolIndexesPreviousLine, characterIndex)) {
          isNextToSymbol = true;
        }
      }
      if (hasSymbolInCurrentLine) {
        if (checkIfCharacterHasSymbolNextToItOnLine(symbolIndexesCurrentLine, characterIndex)) {
          isNextToSymbol = true;
        }
      }
      if (hasSymbolInNextLine) {
        if (checkIfCharacterHasSymbolNextToItOnLine(symbolIndexesNextLine, characterIndex)) {
          isNextToSymbol = true;
        }
      }
    }
  });
  if (partNumber.length > 0) {
    const partNumberAsNumber = parseInt(partNumber);
    if (!isNaN(partNumberAsNumber) && isNextToSymbol) {
      sumOfPartNumbers += partNumberAsNumber;
    }
    isNextToSymbol = false;
    partNumber = '';
  }
});

console.log('Sum of part numbers:', sumOfPartNumbers);
