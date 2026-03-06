export function consumeWithTimeout(iterator, timeoutInSeconds) {
  const endTime = Date.now() + timeoutInSeconds * 1000;
  let count = 0;
  let sum = 0;

  while (Date.now() < endTime) {
    const { value } = iterator.next();
    count++;
    sum += value;
    console.log(`Value: ${value}, Total: ${sum}, Average: ${sum / count}`);
  }
  console.log("Timeout reached.");
}