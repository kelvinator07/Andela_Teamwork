module.exports = {
  swagger: '2.0',
  info: {
    version: '1.0',
    title: 'Teamwork API Docs',
    description: 'Teamwork API documentation',
    contact: {},
  },
  host: process.env.BASE_url,
  basePath: '/api/v1',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/auth/signin': {
      post: {
        description: 'Signin For Admin/Employee',
        summary: 'signin',
        tags: ['Users'],
        operationId: 'SigninUser',
        deprecated: false,
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'email',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'password',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          }
        ],
        responses: {
          '200': {
            description: 'Signin Successful',
            headers: {},
          },
          '401': {
            description: 'Unauthorized Access',
            headers: {},
          },
          '422': {
            description: 'Bad Request Data',
            headers: {},
          },
        },
      },
    },
    '/auth/create-user': {
      post: {
        description: 'Admin add an employee',
        summary: 'Create Employee',
        tags: ['Users'],
        operationId: 'AdminCreateUser',
        deprecated: false,
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description: 'User Authorization token',
          },
          {
            name: 'firstName',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'lastName',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'password',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'email',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'department',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'jobRole',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'gender',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'address',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
        ],
        responses: {
          '201': {
            description: 'User created successfully',
            headers: {},
          },
        },
      },
    },
  },
};
