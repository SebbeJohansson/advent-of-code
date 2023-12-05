/* Start here */
import * as fs from 'fs';
let data: string = fs.readFileSync('input', 'utf8');

class Map {
  name: string;
  destinationRangeStart: number;
  sourceRangeStart: number;
  sourceRangeEnd: number;

  constructor(rowType: string, rowValues: string[]) {
    this.name = rowType;
    const [destination, source, range] = rowValues.map(number => parseInt(number));
    this.destinationRangeStart = destination;
    this.sourceRangeStart = source;
    this.sourceRangeEnd = source + range;
  }

  public isInMapRange(input: number) {
    return input >= this.sourceRangeStart && input < this.sourceRangeEnd;
  }
}

const lines = data.split('\n\n');
const seedsLine = lines.shift() ?? '';
const seeds: number[] = seedsLine.split(':')[1].trim().split(' ').map(number => parseInt(number));
const seedPairs: number[][] = seeds.reduce((result: number[][], value, index, array) => {
  if (index % 2 === 0)
    result.push(seeds.slice(index, index + 2));
  return result;
}, []);
const rows = lines.map(line => line.split('\n'));
const mapGroups: Map[][] = [];
rows.forEach((row, rowIndex) => {
  const [rowType, ...rowValues] = row;
  /* Initalize row group */
  mapGroups.push([]);
  /* Go through each value and add map to group */
  rowValues.forEach((values) => {
    const map = new Map(rowType, values.split(' '));
    // console.log(rowIndex);
    mapGroups[rowIndex].push(map);
  });
});

/* Get all locations */
const locations: number[] = [];
seedPairs.forEach(([startOfSeedRange, seedRangeLength]) => {
  // const seedLocationsInRange: number[] = [];
  // console.log(startOfSeedRange, seedRangeLength);
  for (let seed = startOfSeedRange; seed <= startOfSeedRange + seedRangeLength; seed++) {
    // console.log('seed:', seed);
    let output = seed;

    /* Loop through each map type. */
    for (let i = 0; i < mapGroups.length; i++) {
      const mapGroup = mapGroups[i];

      /* Loop through each value in map. */
      for (let j = 0; j < mapGroup.length; j++) {
        const map = mapGroup[j];
        if (map.isInMapRange(output)) {
          output = output + map.destinationRangeStart - map.sourceRangeStart;

          /* Leave the for-loop because seed is not equal to output. */
          if (seed !== output) {
            // console.log('seed:', seed);
            // console.log('output:', output);
            break;
          }
        }
      }
    }
    // seedLocationsInRange.push(output);
    locations.push(output);
  }
  // console.log('seed locations in range:', seedLocationsInRange);
});
console.log(locations);

// const locations = seeds.map((seed) => {
//   let output = seed;

//   /* Loop through each map type. */
//   for (let i = 0; i < mapGroups.length; i++) {
//     const mapGroup = mapGroups[i];

//     /* Loop through each value in map. */
//     for (let j = 0; j < mapGroup.length; j++) {
//       const map = mapGroup[j];
//       if (map.isInMapRange(output)) {
//         output = output + map.destinationRangeStart - map.sourceRangeStart;

//         /* Leave the for-loop because seed is not equal to output. */
//         if (seed !== output) {
//           console.log('seed:', seed);
//           console.log('output:', output);
//           break;
//         }
//       }
//     }
//   }
//   return output;
// });

const lowestLocationNumber = Math.min(...locations);
console.log('Lowest location number:', lowestLocationNumber);
