export const AsyncArray = {
  mapCallback(array, fn, callback) {
    const results = [];
    let completed = 0;

    if (array.length === 0) {
      return callback([]);
    }

    array.forEach((item, index) => {
      setTimeout(() => {
        results[index] = fn(item);
        completed++;

        if (completed === array.length) {
          callback(results);
        }
      }, 0);
    });
  }
};