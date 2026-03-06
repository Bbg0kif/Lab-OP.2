import { fibonacciGenerator, consumeWithTimeout } from '../src/index.js';

const fib = fibonacciGenerator();
consumeWithTimeout(fib, 2);