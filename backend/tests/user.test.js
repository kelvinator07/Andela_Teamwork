import request from 'supertest';
import server from '../server';

describe('POST /api/v1/auth/signin', () => {
  const data = {
    email: 'kelnew56789@gmail.com',
    password: 'qwerty12345',
  };
  it('signin should return status code 200', (done) => {
    request(server)
      .post('/api/v1/auth/signin')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('POST /api/v1/auth/create-user', () => {
  it.skip('create user should return status code 201', (done) => {
    const user = {
      firstname: 'Mocha',
      lastname: 'Jasmine',
      email: 'Test12345@gmail.com',
      password: 'qwerty12345',
      gender: 'Male',
      jobrole: 'admin',
      department: 'Eng',
      address: '123 mocha',
      avatarurl: 'qwerty',
      userrole: 'admin',
    };
    request(server)
      .post('/api/v1/auth/create-user')
      .send(user)
      .set('Accept', 'application/json')
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});
