const text = await Deno.readTextFile('./input.txt');

const totalFullOverlaps = text.split('\n').reduce((total, pair) => {
  const [elf1, elf2] = pair.split(',').map((elf) => elf.split('-').map((num) => +num));

  const elf1InElf2 = elf1[0] >= elf2[0] && elf1[1] <= elf2[1];
  const elf2InElf1 = elf2[0] >= elf1[0] && elf2[1] <= elf1[1];

  if (elf1InElf2 || elf2InElf1) return total + 1;

  return total;
}, 0);

console.log(totalFullOverlaps);
