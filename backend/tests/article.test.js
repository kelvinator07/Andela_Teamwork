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

describe('GET /articles', () => {
  it('articles return status code 200', (done) => {
    request(server)
      .get('/api/v1/articles')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((error, response) => {
        // console.log('response ', response.body);
      });
    done();
  });
});

describe('POST /articles', () => {
  it('create article and return status code 200', (done) => {
    const article = {
      title: 'Test Article',
      description: 'This is a test article',
      authorid: userId,
      category: 'Test Category',
      share: false,
    };
    request(server)
      .post('/api/v1/articles')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(article)
      .expect(200)
      .end((error, response) => {
        // console.log('response ', response.body);
      });
    done();
  });
});

describe('GET /articles/:id', () => {
  it('Get one article and return status code 200', (done) => {
    const articleId = 12;
    request(server)
      .get(`/api/v1/articles/${articleId}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect(200);
    done();
  });
});

describe('PUT /articles/:id', () => {
  it('Edit article and return status code 200', (done) => {
    const articleId = 11;
    const article = {
      title: 'Edit Test Article',
      description: 'This is an Edited test article',
      authorid: userId,
      category: 'Edited Test Category',
      share: false,
    };
    request(server)
      .put(`/api/v1/articles/${articleId}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(article)
      .expect(200)
      .end((error, response) => {
        // console.log('response ', response.body);
      });
    done();
  });
});

describe('DELETE /articles/:id', () => {
  it.skip('Delete one article and return status code 200', (done) => {
    const articleId = 9;
    request(server)
      .delete(`/api/v1/articles/${articleId}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((error, response) => {
        // console.log('response ', response.body);
      });
    done();
  });
});

describe('POST /articles/:id/comment', () => {
  it('Post comment on article and return status code 200', (done) => {
    const articleId = 11;

    const comment = {
      description: 'Test comment coming through',
      postid: articleId,
      authorid: userId,
    };
    request(server)
      .post(`/api/v1/articles/${articleId}/comment`)
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
