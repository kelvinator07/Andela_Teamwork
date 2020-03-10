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
          '400': {
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
            name: 'firstname',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'lastname',
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
            name: 'jobrole',
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
          {
            name: 'avatarurl',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'userrole',
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
          '401': {
            description: 'Unauthorized Access',
            headers: {},
          },
          '400': {
            description: 'Bad Request Data',
            headers: {},
          },
        },
      },
    },
    '/feed': {
      get: {
        description: 'Feeds To Get All Articles n Gifs',
        summary: 'feed',
        tags: ['Feeds'],
        operationId: 'feed',
        deprecated: false,
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
        ],
        responses: {
          '200': {
            description: 'Successful',
            headers: {},
          },
          '401': {
            description: 'Unauthorized Access',
            headers: {},
          },
          '400': {
            description: 'Bad Request Data',
            headers: {},
          },
        },
      },
    },
    '/articles': {
      post: {
        description: 'Get All Articles For Admin/Employee',
        summary: 'Articles',
        tags: ['Articles'],
        operationId: 'Articles',
        deprecated: false,
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
        ],
        responses: {
          '200': {
            description: 'Successful',
            headers: {},
          },
          '401': {
            description: 'Unauthorized Access',
            headers: {},
          },
          '400': {
            description: 'Bad Request Data',
            headers: {},
          },
        },
      },
    },
  },
};
