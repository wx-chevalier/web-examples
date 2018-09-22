// block for `time` ms, then return the number of loops we could run in that time:
export async function expensive(time: number) {
  let start = Date.now(),
    count = 0;
  while (Date.now() - start < time) count++;
  return count;
}
