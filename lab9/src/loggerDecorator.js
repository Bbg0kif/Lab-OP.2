export const log = (level = 'INFO') => (originalFunc) => {
  return function (...args) {
    const timestamp = new Date().toISOString();
    const funcName = originalFunc.name || 'anonymous';

    const writeLog = (result, error = null) => {

      if (level === 'ERROR' && !error) return;

      const logEntry = {
        timestamp,
        level,
        function: funcName,
        arguments: args,
        result: error ? undefined : result,
        error: error ? error.message : undefined
      };

      console.log(`[LOG][${level}] ${JSON.stringify(logEntry, null, 2)}`);
    };

    try {
      const result = originalFunc.apply(this, args);

      if (result instanceof Promise) {
        return result
          .then(value => {
            writeLog(value);
            return value;
          })
          .catch(err => {
            writeLog(null, err);
            throw err;
          });
      }

      writeLog(result);
      return result;
    } catch (err) {
      writeLog(null, err);
      throw err;
    }
  };
};