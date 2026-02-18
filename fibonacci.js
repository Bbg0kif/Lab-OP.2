function* fibonacciGenerator() {
  let a = 0;
  let b = 1;

  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
} 
function consumeWithTimeout(iterator, timeoutInSeconds) {
  const endTime = Date.now() + timeoutInSeconds * 1000;

  let count = 0;
  let sum = 0;

  while (Date.now() < endTime) {
    const { value } = iterator.next();

    count++
    sum += value;

    console.log(
      `Value: ${value}, Total: ${sum}, Average: ${(sum / count).toFixed(2)}`
    );
  }
  console.log("Timeout reached.");
}
const fib = fibonacciGenerator();
consumeWithTimeout(fib, 5);