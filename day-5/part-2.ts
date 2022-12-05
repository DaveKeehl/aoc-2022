const text = await Deno.readTextFile('./input.txt');

const [top, bottom] = text.split('\n\n');

const stacks = top
  .split('\n')
  .slice(0, -1)
  .map((row) => row.replace(/\s\s\s\s/g, ' [_]'))
  .map((row) => row.split(' ').map((crate) => crate.slice(1, -1)))
  .reduce(
    (acc, row) => {
      row.forEach((crate, idx) => {
        if (crate !== '_') {
          acc[idx].push(crate);
        }
      });
      return acc;
    },
    [[], [], [], [], [], [], [], [], []] as string[][]
  )
  .map((stack) => stack.reverse())
  .reduce((acc, stack, idx) => {
    return {
      ...acc,
      [idx + 1]: stack
    };
  }, {} as Record<number, string[]>);

const instructions = bottom.split('\n').map((row) => {
  const split = row.split(' ');
  return {
    quantity: +split[1],
    from: +split[3],
    to: +split[5]
  };
});

instructions.forEach(({ quantity, from, to }) => {
  const popped: string[] = [];
  for (let i = 0; i < quantity; i++) {
    const crate = stacks[from].pop();
    if (crate) popped.push(crate);
  }
  stacks[to] = stacks[to].concat(popped.reverse());
});

const msg = Object.values(stacks)
  .map((stack) => stack.at(-1))
  .join('');

console.log({ msg });
