export class BaseHttpClient {
  async request(url, options = {}) {
    console.log(`[BaseClient] Надсилання запиту на: ${url}`);
    return {
      status: 200,
      data: { message: "Success" },
      headers: { 'content-type': 'application/json' }
    };
  }
}