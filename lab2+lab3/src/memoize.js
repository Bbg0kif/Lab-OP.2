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
      if (strategy === 'LRU') {
        const value = cache.get(key);
        cache.delete(key);
        cache.set(key, value);
      }
      return cache.get(key);
    }

    const result = fn(...args);

    if (cache.size >= maxSize) {
      const oldestKey = cache.keys().next().value;
      cache.delete(oldestKey);
    }

    cache.set(key, result);
    return result;
  };
}