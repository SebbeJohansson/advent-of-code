/* Start here */
import * as fs from 'fs';
let data: string = fs.readFileSync('input', 'utf8');

const cardIdExtractor = /Card\s*(?<cardid>\d*): /ig;

class Card {
  id: Number;
  constructor(id: Number) {
    this.id = id;
  }
}

const lines = data.split('\n');
let totalWon = 0;
const cards = lines.map((line) => {
  let internalGame = new Card(0);
  const lineWithoutGameId = line.replace(cardIdExtractor, (match, captureGroup) => {
    internalGame.id = parseInt(captureGroup);
    return '';
  });
  let wonPoints = 0;
  const [winningNumbers, selectedNumbers] = lineWithoutGameId.split('|');
  const selectedNumbersArray = selectedNumbers.trim().split(' ').map(number => parseInt(number)).filter(number => !isNaN(number));
  const winningNumbersArray = winningNumbers.trim().split(' ').map(number => parseInt(number)).filter(number => !isNaN(number));
  selectedNumbersArray.forEach((number) => {
    const match = winningNumbersArray.includes(number);
    if (match) {
      if (wonPoints === 0) {
        wonPoints = 1;
      }
      else {
        wonPoints *= 2;
      }
      console.log('number:', number.toString());
    };
  });
  console.log(wonPoints);
  totalWon += wonPoints;
  return internalGame;
});

console.log('Total won:', totalWon);
