'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
      'Comments',
      [
        {
          description: 'This is the first comment',
          authorId: 1,
          postId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: 'This is the second comment',
          authorId: 1,
          postId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: 'This is the first comment',
          authorId: 2,
          postId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: 'This is the second comment',
          authorId: 2,
          postId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Comments', null, {}),
};