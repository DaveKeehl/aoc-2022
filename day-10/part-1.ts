const text = await Deno.readTextFile('./input.txt');
// const sample = await Deno.readTextFile('./sample.txt');

const input = text;

const commands = input.split('\n');

type Operation = 'noop' | 'addx';

let cycle = 0;
let registerValue = 1;
const signalStrengths: number[] = [];

const measureSignalStrength = () => {
  if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
    signalStrengths.push(cycle * registerValue);
  }
};

for (const command of commands) {
  const operation = command.split(' ')[0] as Operation;

  if (operation === 'noop') {
    cycle++;
    measureSignalStrength();
    continue;
  }

  if (operation === 'addx') {
    cycle++;
    measureSignalStrength();
    cycle++;
    measureSignalStrength();

    const value = +command.split(' ')[1];
    registerValue += value;
  }
}

const signalStrengthsSum = signalStrengths.reduce((acc, cur) => acc + cur);
console.log({ signalStrengths, signalStrengthsSum });
