'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
      'Users',
      [
        {
          firstname: 'Jane',
          lastname: 'Doe',
          email: 'janedoe@example.com',
          password: 'password',
          gender: 'female',
          jobrole: 'Fashion Designer',
          department: 'Technology',
          address: '1, Kamal street ',
          avatarurl: 'http://imageurl',
          userrole: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstname: 'John',
          lastname: 'Doe',
          email: 'jondoe@example.com',
          password: 'password',
          gender: 'male',
          jobrole: 'Software Engineer',
          department: 'Technology',
          address: '2, Kamal street ',
          avatarurl: 'http://imageurl',
          userrole: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};