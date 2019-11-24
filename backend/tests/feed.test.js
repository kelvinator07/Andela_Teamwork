import request from 'supertest';
import server from '../server';

describe('GET /api/v1/feed', () => {
  it('feed should return status code 401 UnAuthorized', (done) => {
    request(server)
      .get('/api/v1/feed')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('GET /api/v1/feed', () => {
  let token = null;

  it('Login Successfully For Feed', (done) => {
    const data = {
      email: 'kelnew56789@gmail.com',
      password: 'qwerty12345',
    };
    request(server)
      .post('/api/v1/auth/signin')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, response) => {
        if (err) return done(err);
        token = response.body.data.token;
        done();
      });
  });

  it('feed should return status code 200', (done) => {
    request(server)
      .get('/api/v1/feed')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect(200);
    done();
  });
});
