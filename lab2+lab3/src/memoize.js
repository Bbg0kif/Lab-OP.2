export function memoize(fn, options = {}) {
  const {
    maxSize = Infinity,
    strategy = 'LRU',
    expireTime = null,
    customPolicy = null
  } = options;

  const cache = new Map();
  const usageCount = new Map();
  const timestamps = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (expireTime && timestamps.has(key)) {
      if (Date.now() - timestamps.get(key) > expireTime) {
        cache.delete(key);
        usageCount.delete(key);
        timestamps.delete(key);
      }
    }

    if (cache.has(key)) {
      if (strategy === 'LRU') {
        const value = cache.get(key);
        cache.delete(key);
        cache.set(key, value);
      }
      usageCount.set(key, (usageCount.get(key) || 0) + 1);
      return cache.get(key);
    }

    const result = fn(...args);

    if (cache.size >= maxSize) {
      if (strategy === 'LFU') {
        let minKey = [...usageCount.entries()].reduce((a, b) => a[1] < b[1] ? a : b)[0];
        cache.delete(minKey);
        usageCount.delete(minKey);
        timestamps.delete(minKey);
      } else {
        cache.delete(cache.keys().next().value);
      }
    }

    cache.set(key, result);
    usageCount.set(key, 1);
    timestamps.set(key, Date.now());
    return result;
  };
}