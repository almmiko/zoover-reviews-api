// const supertest = require('supertest');
// const config = require('config');
// const { createApp } = require('../server');
//
// let server;
// let request;
//
// beforeAll(async (done) => {
//   const app = createApp();
//   server = app.listen(config.PORT, done);
//   request = supertest(server);
// });
//
// afterAll((done) => {
//   server.close(done);
//   console.info('Server closed');
// });
//
// describe('Test API', () => {
//   test('should return 200 response for reviews stats (/v1/reviews/stats)', async () => {
//     const response = await request.get('/v1/reviews/stats');
//
//     console.log(response.body);
//
//     expect(response.status).toEqual(200);
//   });
// });
//
