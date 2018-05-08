export default function init() {}

export function expensive(time) {
  const start = Date.now();
  let count = 0;
  while (Date.now() - start < time) count += 1;
  return time;
}
