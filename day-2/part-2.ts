const text = await Deno.readTextFile('./input.txt');

type SHAPE = 'ROCK' | 'PAPER' | 'SCISSORS';
type OUTCOME = 'LOST' | 'DRAW' | 'WON';
interface DECISION {
  shape1: SHAPE;
  shape2: SHAPE;
  wins: SHAPE;
}

const CODES: Record<string, SHAPE> = {
  A: 'ROCK',
  B: 'PAPER',
  C: 'SCISSORS',
  X: 'ROCK',
  Y: 'PAPER',
  Z: 'SCISSORS'
};

const SHAPE_PTS: Record<SHAPE, number> = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3
};

const OUTCOME_PTS: Record<OUTCOME, number> = {
  LOST: 0,
  DRAW: 3,
  WON: 6
};

const DECISIONS: DECISION[] = [
  {
    shape1: 'ROCK',
    shape2: 'PAPER',
    wins: 'PAPER'
  },
  {
    shape1: 'ROCK',
    shape2: 'SCISSORS',
    wins: 'ROCK'
  },
  {
    shape1: 'PAPER',
    shape2: 'ROCK',
    wins: 'PAPER'
  },
  {
    shape1: 'PAPER',
    shape2: 'SCISSORS',
    wins: 'SCISSORS'
  },
  {
    shape1: 'SCISSORS',
    shape2: 'ROCK',
    wins: 'ROCK'
  },
  {
    shape1: 'SCISSORS',
    shape2: 'PAPER',
    wins: 'SCISSORS'
  }
];

const NEEDED_OUTCOME: Record<string, OUTCOME> = {
  X: 'LOST',
  Y: 'DRAW',
  Z: 'WON'
};

const totalScore = text.split('\n').reduce((points, game) => {
  const [p1, outcomeCode] = game.split(' ');

  const shape1 = CODES[p1];
  const neededOutcome = NEEDED_OUTCOME[outcomeCode];

  if (neededOutcome === 'DRAW') {
    return points + SHAPE_PTS[shape1] + OUTCOME_PTS.DRAW;
  }

  if (neededOutcome === 'WON') {
    const shape2 = DECISIONS.find(
      (decision) => decision.shape1 === shape1 && decision.shape1 !== decision.wins
    )?.shape2;
    if (shape2) return points + SHAPE_PTS[shape2] + OUTCOME_PTS.WON;
  }

  if (neededOutcome === 'LOST') {
    const shape2 = DECISIONS.find(
      (decision) => decision.shape1 === shape1 && decision.shape1 === decision.wins
    )?.shape2;
    if (shape2) return points + SHAPE_PTS[shape2] + OUTCOME_PTS.LOST;
  }

  return points;
}, 0);

console.log(totalScore);
