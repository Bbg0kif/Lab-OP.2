import { ReactiveEmitter } from '../src/index.js';

const emitter = new ReactiveEmitter();

console.log("Тестування Reactive Emitter");

emitter.on('ping', (data) => {
  console.log(`Listener 1: Отримано ${data}`);
});

emitter.on('ping', (data) => {
  console.log(`Listener 2: Зараз спробую викликати помилку...`);
  throw new Error("Спровокована помилка в Listener 2");
});

emitter.on('ping', (data) => {
  console.log(`Listener 3: Я все одно працюю, бо є try/catch!`);
});

emitter.on('error', (errInfo) => {
  console.log(`Error Channel: Перехоплено помилку з події "${errInfo.sourceEvent}": ${errInfo.message}`);
});

console.log("\nЗапуск події 'ping'...");
emitter.emit('ping', "Тестові дані");

console.log("\nТестування Unsubscribe та No-listeners");

const unsub = emitter.on('news', (msg) => console.log(`News: ${msg}`));
emitter.emit('news', "Термінова новина!"); 
unsub();
console.log("ℹСпроба відправити 'news' після відписки (має бути варнінг):");
emitter.emit('news', "Цю новину ніхто не побачить");

console.log("\nТест: Помилка без обробника в error-каналі:");
const silentEmitter = new ReactiveEmitter();
silentEmitter.emit('something', "data");
try {
    silentEmitter.on('fail', () => { throw new Error("Silent Crash"); });
    silentEmitter.emit('fail');
} catch (e) {
    console.log("Це повідомлення не має з'явитися, бо помилка оброблена всередині класу.");
}