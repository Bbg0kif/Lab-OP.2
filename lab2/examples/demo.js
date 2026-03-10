import { fibonacciGenerator, consumeWithTimeout } from 'fibonacci-library';

const fib = fibonacciGenerator();
consumeWithTimeout(fib, 2);