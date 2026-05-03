export class ApiKeyStrategy {
  constructor(key) { this.name = 'API Key'; this.key = key; }
  getAuthHeaders() { return { 'X-API-KEY': this.key }; }
}

export class JwtStrategy {
  constructor(token) { this.name = 'JWT'; this.token = token; }
  getAuthHeaders() { return { 'Authorization': `Bearer ${this.token}` }; }
}