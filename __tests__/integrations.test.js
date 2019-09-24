const request = require('supertest');
const app = require('../app');
const db = require('../db');
const init = require('../db/init');

beforeAll(async () => {
  await init.createTables();
  await init.seedAuthors();
  await init.seedSnippets();
});

describe('snippets', () => {
  afterEach(() => init.seedSnippets());

  describe('GET snippets', () => {
    it('Gets all the snippets when passed no query parameters', async () => {
      const response = await request(app).get('/api/snippets');
      expect(response.body.length).toBe(3);
    });

    it('Gets some snippets when passed query parameters', async () => {
      const response = await request(app)
        .get('/api/snippets')
        .query({ language: 'JavaScript' });
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toMatchObject({
        language: 'JavaScript',
      });
    });
  });
});

afterAll(() => {
  db.end();
});
