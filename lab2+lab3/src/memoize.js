export function memoize(fn, options = {}) {
  const {
    maxSize = Infinity,
    strategy = 'LRU',
    expireTime = null,
    customPolicy = null
  } = options;

}