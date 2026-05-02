export class AuthProxy {
  constructor(httpClient, strategy) {
    this.httpClient = httpClient;
    this.strategy = strategy;
  }

  async request(url, options = {}) {
    const authHeaders = this.strategy.getAuthHeaders();
    const modifiedOptions = {
      ...options,
      headers: { ...options.headers, ...authHeaders }
    };

    console.log(`[AuthProxy] Ін'єкція заголовків (${this.strategy.name})`);
    return this.httpClient.request(url, modifiedOptions);
  }
}