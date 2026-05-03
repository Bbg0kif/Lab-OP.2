import { memoize } from '../src/index.js';

const heavyTask = (n) => {
  console.log(`...рахую для ${n}...`);
  return n * 10;
};

console.log("--- Тест LRU ---");
const lruCache = memoize(heavyTask, { maxSize: 2, strategy: 'LRU' });
lruCache(1);
lruCache(2);
lruCache(1);
lruCache(3);

console.log("\n--- Тест Time-Based ---");
const timedCache = memoize(heavyTask, { expireTime: 2000 });
timedCache(10);

setTimeout(() => {
  console.log("Очікування завершено (3 сек)...");
  console.log("Результат:", timedCache(10));
}, 3000);