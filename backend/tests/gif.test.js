import request from 'supertest';
import server from '../server';


let token = null;
let userId = null;

before((done) => {
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
    .end((error, response) => {
      if (error) return done(error);
      token = response.body.data.token;
      userId = response.body.data.userId;
      done();
    });
});

describe('GET /gifs', () => {
  it('gifs return status code 200', (done) => {
    request(server)
      .get('/api/v1/gifs')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((error, response) => {
        console.log('response ', response.body);
      });
    done();
  });
});

describe('POST /gifs', () => {
  it('create gif and return status code 200', (done) => {
    const gif = {
      title: 'Test gif',
      authorid: userId,
      imageurl: 'Test image url',
      share: false,
    };
    request(server)
      .post('/api/v1/gifs')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(gif)
      .expect(200)
      .end((error, response) => {
        console.log('response ', response.body);
      });
    done();
  });
});

describe('GET /gifs/:id', () => {
  it('Get one gif and return status code 200', (done) => {
    const gifId = 12;
    request(server)
      .get(`/api/v1/gifs/${gifId}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect(200);
    done();
  });
});

describe('DELETE /gifs/:id', () => {
  it('Delete one article and return status code 200', (done) => {
    const gifId = 9;
    request(server)
      .delete(`/api/v1/gifs/${gifId}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((error, response) => {
        console.log('response ', response.body);
      });
    done();
  });
});

describe('POST /gifs/:id/comment', () => {
  it('Post comment on gif and return status code 200', (done) => {
    const gifId = 11;

    const comment = {
      description: 'Test comment coming through',
      postid: gifId,
      authorid: userId,
    };
    request(server)
      .post(`/api/v1/gifs/${gifId}/comment`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(comment)
      .expect(200)
      .end((error, response) => {
        // console.log('response ', response.body);
      });
    done();
  });
});
