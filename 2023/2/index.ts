import * as fs from 'fs';

console.log('second day of advent of code 2023!');

enum Color {
  red,
  blue,
  green,
  undefined,
}

class Set {
  count: number;
  color: Color;
  constructor(count: number, color: Color) {
    this.count = count;
    this.color = color;
  }
}

class Round {
  sets: Set[];
  constructor(sets: Set[]) {
    this.sets = sets;
  }
}

class Game {
  id: number;
  rounds: Round[];
  constructor(id: number, rounds: Round[]) {
    this.id = id;
    this.rounds = rounds;
  }
}

let data: string = fs.readFileSync('input', 'utf8');

const gameIdExtractor = /Game (?<gameid>\d*): /ig;
const games = data.split('\n').map((line) => {
  let internalGame = new Game(0, []);
  const lineWithoutGameId = line.replace(gameIdExtractor, (match, captureGroup) => {
    internalGame.id = parseInt(captureGroup);
    return '';
  });

  lineWithoutGameId.split('; ').forEach((roundString) => {
    const sets = roundString
      .split(', ').map((setString) => {
        setString = setString.trim();
        const count = parseInt(setString);
        const color = setString.replace(count.toString(), '').trim() as keyof typeof Color;
        const set = new Set(count, Color[color]);
        return set;
      });
    internalGame.rounds.push(new Round(sets));
  });
  return internalGame;
});

let gamesPossibleSum = 0;
let gamesTotalPower = 0;
games.forEach((game) => {
  let gameImpossible = false;
  let highestCountOfRed = 0;
  let highestCountOfGreen = 0;
  let highestCountOfBlue = 0;
  game.rounds.forEach((round) => {
    round.sets.forEach((set) => {
      if (Color[set.color] === 'red') {
        if (set.count > 12) {
          gameImpossible = true;
        }
        if (set.count > highestCountOfRed) {
          highestCountOfRed = set.count;
        }
      }
      else if (Color[set.color] === 'green') {
        if (set.count > 13) {
          gameImpossible = true;
        }
        if (set.count > highestCountOfGreen) {
          highestCountOfGreen = set.count;
        }
      }
      else if (Color[set.color] === 'blue') {
        if (set.count > 14) {
          gameImpossible = true;
        }
        if (set.count > highestCountOfBlue) {
          highestCountOfBlue = set.count;
        }
      }
    });
  });
  gamesTotalPower += highestCountOfRed * highestCountOfGreen * highestCountOfBlue;
  if (!gameImpossible) {
    gamesPossibleSum += game.id;
  }
});
console.log(gamesPossibleSum);
console.log(gamesTotalPower);
// console.log(games);
