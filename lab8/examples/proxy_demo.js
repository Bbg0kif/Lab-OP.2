import { 
  BaseHttpClient, 
  AuthProxy, 
  ApiKeyStrategy, 
  JwtStrategy, 
  ApiService 
} from '../src/index.js';

async function runDemo() {
  console.log("Запуск перевірки Auth Proxy\n");

  const baseClient = new BaseHttpClient();

  console.log("Сценарій 1: Авторизація через API Key");
  const apiKeyAuth = new ApiKeyStrategy("secret-api-key-123");
  const proxyWithApiKey = new AuthProxy(baseClient, apiKeyAuth);
  const serviceWithApiKey = new ApiService(proxyWithApiKey);
  
  const res1 = await serviceWithApiKey.fetchData();
  console.log("Результат:", res1.data, "\n");

  console.log("Сценарій 2: Авторизація через JWT");
  const jwtAuth = new JwtStrategy("eyJhbGciOiJIUzI1Ni...");
  const proxyWithJwt = new AuthProxy(baseClient, jwtAuth);
  const serviceWithJwt = new ApiService(proxyWithJwt);
  
  const res2 = await serviceWithJwt.fetchData();
  console.log("Результат:", res2.data, "\n");

  console.log("Сценарій 3: Робота БЕЗ авторизації (прямий клієнт)");
  const publicService = new ApiService(baseClient); 
  const res3 = await publicService.fetchData();
  console.log("Результат:", res3.data);
}

runDemo();