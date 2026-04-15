export const StreamProcessor = {
  async *largeDataGenerator(count) {
    for (let i = 1; i <= count; i++) {
      await new Promise(resolve => setTimeout(resolve, 10));
      
      yield {
        id: i,
        value: Math.random() * 100,
        timestamp: new Date().toISOString()
      };
    }
  },

  async processStream(stream, transformer) {
    let totalItems = 0;
    let sumValue = 0;

    console.log("Початок обробки потоку");

    for await (const chunk of stream) {
      const processed = transformer(chunk);
      sumValue += processed.value;
      totalItems++;

      if (totalItems % 10 === 0) {
        console.log(`Log: Оброблено ${totalItems} елементів...`);
      }
    }

    return {
      count: totalItems,
      average: sumValue / totalItems
    };
  }
};