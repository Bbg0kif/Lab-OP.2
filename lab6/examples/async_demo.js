import { AsyncArray } from '../src/index.js';

const data = [1, 2, 3, 4, 5];
const double = (x) => x * 2;

console.log("Тестування оновленого Async Array");

AsyncArray.mapCallback(data, double, (err, result) => {
  if (err) {
    console.error("Callback Error:", err.message);
    return;
  }
  console.log("Callback Result (error-first):", result);
});

async function runPromiseDemo() {
  try {
    const result = await AsyncArray.mapPromise(data, double);
    console.log("Promise Result:", result);
  } catch (error) {
    console.error("Promise Error:", error.message);
  }
}

async function runAbortDemo() {
  const controller = new AbortController();
  const { signal } = controller;

  try {
    console.log("Запуск операції, яка буде скасована через 50мс...");
    const promise = AsyncArray.mapPromise(data, double, { signal });
    
    setTimeout(() => controller.abort(), 50);
    
    await promise;
  } catch (error) {
    console.log("Скасовано успішно. Результат очищення:", error.message);
  }
}

runPromiseDemo();
runAbortDemo();