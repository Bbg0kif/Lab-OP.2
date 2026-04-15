export const AsyncArray = {
  mapCallback(array, fn, callback) {
    const results = [];
    let completed = 0;

    if (array.length === 0) return callback([]);

    array.forEach((item, index) => {
      setTimeout(() => {
        results[index] = fn(item);
        completed++;

        if (completed === array.length) {
          callback(results);
        }
      }, 0);
    });
  },
  
  mapPromise(array, fn, { signal } = {}) {
    return new Promise((resolve, reject) => {
      if (signal?.aborted) {
        return reject(new Error('Operation aborted by user'));
      }

      const results = [];
      let completed = 0;

      if (array.length === 0) return resolve([]);

      array.forEach((item, index) => {
        setTimeout(() => {
          if (signal?.aborted) {
            return reject(new Error('Operation aborted by user'));
          }

          results[index] = fn(item);
          completed++;

          if (completed === array.length) {
            resolve(results);
          }
        }, 100);
      });

      signal?.addEventListener('abort', () => {
        reject(new Error('Operation aborted by user'));
      });
    });
  }
};