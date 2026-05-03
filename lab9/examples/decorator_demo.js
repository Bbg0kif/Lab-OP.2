import { log } from '../src/index.js';

const add = (a, b) => a + b;
const decoratedAdd = log('INFO')(add);

const fetchUser = async (id) => {
  return new Promise(res => setTimeout(() => res({ id, name: "Bbg0kif" }), 500));
};
const decoratedFetch = log('DEBUG')(fetchUser);

const failTask = () => {
  throw new Error("Критичний збій системи!");
};
const decoratedFail = log('ERROR')(failTask);

async function runDemo() {
  console.log("Тестування Logging Decorator");

  console.log("\nТест 1: Синхронна функція");
  decoratedAdd(5, 10);

  console.log("\nТест 2: Асинхронна функція (зачекайте 0.5с)");
  await decoratedFetch(1);

  console.log("\nТест 3: Рівень ERROR (логує лише помилки)");
  try {
    decoratedFail();
  } catch (e) {

  }
}

runDemo();