export function memoize(fn, options = {}) {
  const {
    maxSize = Infinity,
    strategy = 'LRU',
    expireTime = null,
    customPolicy = null
  } = options;

  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}