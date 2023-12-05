/* Start here */
import * as fs from 'fs';
let data: string = fs.readFileSync('input', 'utf8');

class Map {
  name: string;
  destinationRangeStart: number;
  destinationRangeEnd: number;
  sourceRangeStart: number;
  sourceRangeEnd: number;

  constructor(rowType: string, rowValues: string[]) {
    this.name = rowType;
    const [destination, source, range] = rowValues.map(number => parseInt(number));
    this.destinationRangeStart = destination;
    this.destinationRangeEnd = destination + range;
    this.sourceRangeStart = source;
    this.sourceRangeEnd = source + range;
  }

  public isInMapRange(input: number) {
    return input >= this.sourceRangeStart && input < this.sourceRangeEnd;
  }

  public isInDestinationRange(input: number) {
    return input >= this.destinationRangeStart && input < this.destinationRangeEnd;
  }
}

class seedsRange {
  start: number;
  end: number;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }

  public isInSeedRange(input: number) {
    return input >= this.start && input <= this.end;
  }
}

function sortMapsByDestinationStart(maps: Map[]): Map[] {
  return maps.sort((a, b) => a.destinationRangeStart - b.destinationRangeStart);
}

const lines = data.split('\n\n');
const seedsLine = lines.shift() ?? '';
const seeds: number[] = seedsLine.split(':')[1].trim().split(' ').map(number => parseInt(number)).filter(number => !isNaN(number));
const seedPairs/* : seedsRange[][] */ = seeds.reduce((result: number[][], value, index, array) => {
  if (index % 2 === 0)
    result.push(seeds.slice(index, index + 2));
  return result;
}, []).map((seedPair) => {
  const [startOfSeedRange, lengthOfSeedRange] = seedPair;
  return new seedsRange(startOfSeedRange, startOfSeedRange + lengthOfSeedRange);
});
console.log(seedPairs);
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

// console.log(mapGroups);
const reversedMapGroups = mapGroups.reverse();

/*
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
*/

const humidityToLocationMaps = reversedMapGroups[0];
const temperatureToHumidityMaps = reversedMapGroups[1];
const lightToTemperatureMaps = reversedMapGroups[2];
const waterToLightMaps = reversedMapGroups[3];
const fertilizerToWaterMaps = reversedMapGroups[4];
const soilToFertilizerMaps = reversedMapGroups[5];
const seedToSoilMaps = reversedMapGroups[6];

sortMapsByDestinationStart(humidityToLocationMaps).forEach((map) => {
  console.log(map);
  for (let i = 0; i < temperatureToHumidityMaps.length; i++) {
    const temperatureToHumidityMap = temperatureToHumidityMaps[i];
    console.log('temperatureToHumidityMap', temperatureToHumidityMap);
    if (temperatureToHumidityMap.isInDestinationRange(map.destinationRangeStart)) {
      console.log(temperatureToHumidityMap);
      for (let j = 0; j < lightToTemperatureMaps.length; j++) {
        const lightToTemperatureMap = lightToTemperatureMaps[j];
        if (lightToTemperatureMap.isInDestinationRange(temperatureToHumidityMap.destinationRangeStart)) {
          console.log(lightToTemperatureMap);
          for (let k = 0; k < waterToLightMaps.length; k++) {
            const waterToLightMap = waterToLightMaps[k];
            if (waterToLightMap.isInDestinationRange(lightToTemperatureMap.destinationRangeStart)) {
              console.log(waterToLightMap);
              for (let l = 0; l < fertilizerToWaterMaps.length; l++) {
                const fertilizerToWaterMap = fertilizerToWaterMaps[l];
                if (fertilizerToWaterMap.isInDestinationRange(waterToLightMap.destinationRangeStart)) {
                  console.log(fertilizerToWaterMap);
                  for (let m = 0; m < soilToFertilizerMaps.length; m++) {
                    const soilToFertilizerMap = soilToFertilizerMaps[m];
                    if (soilToFertilizerMap.isInDestinationRange(fertilizerToWaterMap.destinationRangeStart)) {
                      console.log(soilToFertilizerMap);
                      for (let n = 0; n < seedToSoilMaps.length; n++) {
                        const seedToSoilMap = seedToSoilMaps[n];
                        if (seedToSoilMap.isInDestinationRange(soilToFertilizerMap.destinationRangeStart)) {
                          console.log(seedToSoilMap);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
});

// for (let i = 0; i < reversedMapGroups.length; i++) {
//   const mapGroup = reversedMapGroups[i];

//   // console.log(mapGroup);

//   // /* Loop through each value in map. */
//   for (let j = 0; j < mapGroup.length; j++) {
//     const map = mapGroup[j];
//     console.log(map);
//     // if (map.isInMapRange(output)) {
//     //   output = output + map.destinationRangeStart - map.sourceRangeStart;

//     //   /* Leave the for-loop because seed is not equal to output. */
//     //   if (seed !== output) {
//     //     // console.log('seed:', seed);
//     //     // console.log('output:', output);
//     //     break;
//     //   }
//     // }
//   }
// }

/* Get all locations */
const locations: number[] = [];
// seedPairs.forEach(([startOfSeedRange, seedRangeLength]) => {
//   // const seedLocationsInRange: number[] = [];
//   // console.log(startOfSeedRange, seedRangeLength);
//   for (let seed = startOfSeedRange; seed <= startOfSeedRange + seedRangeLength; seed++) {
//     // console.log('seed:', seed);
//     let output = seed;

//     /* Loop through each map type. */
//     for (let i = 0; i < mapGroups.length; i++) {
//       const mapGroup = mapGroups[i];

//       /* Loop through each value in map. */
//       for (let j = 0; j < mapGroup.length; j++) {
//         const map = mapGroup[j];
//         if (map.isInMapRange(output)) {
//           output = output + map.destinationRangeStart - map.sourceRangeStart;

//           /* Leave the for-loop because seed is not equal to output. */
//           if (seed !== output) {
//             // console.log('seed:', seed);
//             // console.log('output:', output);
//             break;
//           }
//         }
//       }
//     }
//     // seedLocationsInRange.push(output);
//     locations.push(output);
//   }
//   // console.log('seed locations in range:', seedLocationsInRange);
// });
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
