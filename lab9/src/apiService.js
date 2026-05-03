export class ApiService {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  async fetchData() {
    return this.httpClient.request('https://api.example.com/data');
  }
}