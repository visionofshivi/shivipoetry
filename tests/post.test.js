const request = require('supertest');
const {app} = require('../src/router');
const {postOne, setupDatabase} = require('./fixtures/db');

describe('Post', () => {
  beforeEach(setupDatabase);

  test('Should serve the posts according to page no', async () => {
    const res = await request(app).post('/posts').send({pageNo: 1}).expect(200);
    expect(res.body.length).toBe(3);
  });

  test('Should serve the posts if page no is not exists', async () => {
    const res = await request(app).post('/posts').send({pageNo: 9}).expect(200);
    expect(res.body.length).toBe(0);
  });

  test('Should serve the pagination of posts', async () => {
    const res = await request(app).get('/posts/pagination').expect(200);
    expect(res.body).toMatchObject({pages: 1});
  });
});

describe('Static page', () => {
  test('Should serve the static page', () => {
    request(app).get('/post/css/style.css').expect(200);
  });

  test('Should not serve the static page if page not exists', () => {
    request(app).get('/post/notExists.html').expect(400);
  });
});
