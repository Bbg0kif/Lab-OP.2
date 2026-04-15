import { StreamProcessor } from '../src/index.js';

async function runDemo() {
  console.log("Початок тестування Task 6 (Streams)...");

  const dataStream = StreamProcessor.largeDataGenerator(50);

  const transformer = (item) => {
    return {
      ...item,
      value: Math.round(item.value)
    };
  };

  try {
    const results = await StreamProcessor.processStream(dataStream, transformer);

    console.log("Обробка завершена!");
    console.log(`Всього елементів: ${results.count}`);
    console.log(`Середнє значення: ${results.average.toFixed(2)}`);
  } catch (error) {
    console.error("Сталася помилка під час обробки потоку:", error);
  }
}

runDemo();