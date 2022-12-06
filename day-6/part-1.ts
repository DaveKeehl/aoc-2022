const text = await Deno.readTextFile('./input.txt');

const SIZE = 4;

for (let i = 0; i < text.length; i++) {
  const chars = new Set();

  for (let j = i; j < i + SIZE; j++) {
    chars.add(text[j]);
  }

  if (chars.size === SIZE) {
    console.log(i + SIZE);
    break;
  }
}
