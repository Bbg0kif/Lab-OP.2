export const AsyncArray = {
  mapCallback(array, fn, callback) {
    const results = [];
    let completed = 0;
    const timeouts = [];

    if (array.length === 0) return callback(null, []);

    array.forEach((item, index) => {
      const id = setTimeout(() => {
        try {
          results[index] = fn(item);
          completed++;
          if (completed === array.length) callback(null, results);
        } catch (err) {
          timeouts.forEach(clearTimeout);
          callback(err);
        }
      }, 0);
      timeouts.push(id);
    });
  },

  mapPromise(array, fn, { signal } = {}) {
    return new Promise((resolve, reject) => {
      const timeouts = [];

      const cleanup = () => {
        timeouts.forEach(clearTimeout);
        signal?.removeEventListener('abort', onAbort);
      };

      const onAbort = () => {
        cleanup();
        reject(new Error('AbortError'));
      };

      if (signal?.aborted) return onAbort();
      signal?.addEventListener('abort', onAbort);

      const results = [];
      let completed = 0;

      if (array.length === 0) {
        cleanup();
        return resolve([]);
      }

      array.forEach((item, index) => {
        const id = setTimeout(() => {
          if (signal?.aborted) return;
          try {
            results[index] = fn(item);
            completed++;
            if (completed === array.length) {
              cleanup();
              resolve(results);
            }
          } catch (err) {
            cleanup();
            reject(err);
          }
        }, 100);
        timeouts.push(id);
      });
    });
  }
};