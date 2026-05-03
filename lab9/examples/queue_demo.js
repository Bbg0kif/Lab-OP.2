import { PriorityQueue } from '../src/index.js';

const pq = new PriorityQueue();

console.log("Тестування Priority Queue");
pq.enqueue("Завдання: Легке", 10);
pq.enqueue("Завдання: Важке", 100);
pq.enqueue("Завдання: Середнє", 50);

console.log("Peek highest (має бути Важке):", pq.peek('highest'));
console.log("Peek oldest (має бути Легке):", pq.peek('oldest'));

console.log("Видаляємо за пріоритетом:", pq.dequeue('highest'));
console.log("Новий Peek highest (має бути Середнє):", pq.peek('highest'));

console.log("Видаляємо найновіше:", pq.dequeue('newest'));
console.log("Залишилося в черзі:", pq.peek('oldest'));