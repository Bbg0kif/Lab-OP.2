export function* fibonacciGenerator() {
  let a = 0n;
  let b = 1n;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}