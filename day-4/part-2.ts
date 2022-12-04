const text = await Deno.readTextFile('./input.txt');

const totalRangeOverlaps = text.split('\n').reduce((total, pair) => {
  const [elf1, elf2] = pair.split(',').map((elf) => elf.split('-').map((num) => +num));

  const overlap = Math.max(0, Math.min(elf1[1], elf2[1]) - Math.max(elf1[0], elf2[0]) + 1);

  if (overlap > 0) return total + 1;

  return total;
}, 0);

console.log(totalRangeOverlaps);
