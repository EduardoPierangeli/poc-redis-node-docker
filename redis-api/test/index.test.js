const request = require('supertest');
const redisMock = require('redis-mock');
const app = require('../index');

var mockClient = redisMock.createClient();

jest.mock('../redisClient', async () => {
    return mockClient;
  });

describe('Teste Dummy', () => {
    test('Verificar se true é igual a true', () => {
      expect(true).toBe(true);
    });
  });
  