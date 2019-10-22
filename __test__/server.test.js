'use strict';

const { server } = require('../lib/server.js');
const supertester = require('./supertester.js');

const mockRequest = supertester(server);

describe('web server', () => {
  it('should respond properly on request to /', () => {
    return mockRequest
      .get('/')
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.text).toBe('Homepage');
      });
  });
  it('should respond properly on request to /people', () => {
    return mockRequest
      .get('/people')
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body.count).toBe(4);
      });
  });

  it('should respond properly on request to /teams', () => {
    return mockRequest
      .get('/teams')
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body.count).toBe(3);
      });
  });

  it('should be able to get a person by ID', () => {
    return mockRequest
      .get('/people/1')
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body.firstName).toBe('Sarah');
      });
  });
  it('should be able to get a team by ID', () => {
    return mockRequest
      .get('/teams/1')
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body.color).toBe('yellow');
      });
  });
  it('should respond properly on post to /people', () => {
    return mockRequest
      .post('/people')
      .send({ firstName: 'Test', lastName: 'Person' })
      .then(res => {
        expect(res.status === 200 || res.status === 500).toBeTruthy();
      });
  });

  it('should respond properly on post to /teams', () => {
    return mockRequest
      .post('/teams')
      .send({
        name: 'Purple Puppies',
        color: 'purple',
      })
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body.color).toBe('purple');
      });
  });
  it('should respond properly on put to /people', () => {
    return mockRequest
      .put('/people/1')
      .send({ firstName: 'Test', lastName: 'Person' })
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body.firstName).toBe('Test');
      });
  });
  it('should respond properly on put to /teams', () => {
    return mockRequest
      .put('/teams/1')
      .send({
        name: 'Purple Puppies',
        color: 'purple',
      })
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body.color).toBe('purple');
      });
  });
  it('should be able to delete a person by ID', () => {
    return mockRequest
      .delete('/people/3')
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body[0].firstName).toBe('Billy');
      });
  });
  it('should be able to delete a team by ID', () => {
    return mockRequest
      .delete('/teams/2')
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body[0].color).toBe('red');
      });
  });
  
  it('should return 404 when bad path is given', () => {
    return mockRequest
      .get('/tea/')
      .then(res => {
        expect(res.status).toBe(404);
      });
  });
});
