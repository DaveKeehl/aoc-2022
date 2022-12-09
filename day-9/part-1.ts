const text = await Deno.readTextFile('./input.txt');
const sample = `
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`.trim();

const input = sample;

type Position = [number, number];
type Direction = 'L' | 'R' | 'U' | 'D';

const headPos: Position = [0, 0];
let tailPos: Position = [0, 0];

const headPositions: Position[] = [[headPos[0], headPos[1]]];
const tailPositions: Position[] = [[tailPos[0], tailPos[1]]];

const updatePosition = (direction: Direction, pos: Position) => {
  if (direction === 'R') {
    pos[0] += 1;
  } else if (direction === 'L') {
    pos[0] -= 1;
  } else if (direction === 'U') {
    pos[1] += 1;
  } else if (direction === 'D') {
    pos[1] -= 1;
  }
};

const getNewTailPosition = ({
  direction,
  prevHeadPos,
  newHeadPos,
  oldTailPos
}: {
  direction: Direction;
  prevHeadPos: Position;
  newHeadPos: Position;
  oldTailPos: Position;
}): Position => {
  const xDiff = newHeadPos[0] - oldTailPos[0];
  const yDiff = newHeadPos[1] - oldTailPos[1];

  const isHeadPerpendicular =
    (newHeadPos[0] !== oldTailPos[0] && newHeadPos[1] === oldTailPos[1]) ||
    (newHeadPos[0] === oldTailPos[0] && newHeadPos[1] !== oldTailPos[1]);

  if (Math.abs(xDiff) <= 1 && Math.abs(yDiff) <= 1) return oldTailPos;
  if (!isHeadPerpendicular) return prevHeadPos;

  const newTailPos: Position = [oldTailPos[0], oldTailPos[1]];
  updatePosition(direction, newTailPos);

  return newTailPos;
};

const motions = input.split('\n');

for (const motion of motions) {
  const direction = motion.split(' ')[0] as Direction;
  const steps = +motion.split(' ')[1];

  for (let i = 0; i < steps; i++) {
    updatePosition(direction, headPos);
    headPositions.push([...headPos]);

    tailPos = getNewTailPosition({
      direction,
      prevHeadPos: headPositions[headPositions.length - 2],
      newHeadPos: headPos,
      oldTailPos: tailPos
    });
    tailPositions.push(tailPos);
  }
}

const uniqueTailPositions = tailPositions.reduce((arr, pos) => {
  const posInArr = arr.find((el) => el[0] === pos[0] && el[1] === pos[1]);
  if (posInArr === undefined) return [...arr, pos];
  return arr;
}, [] as Position[]);

console.log({ tailPos, uniqueTailPositions: uniqueTailPositions.length });
