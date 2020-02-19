'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
      'Articles',
      [
        {
          title: 'First Article',
          description: 'This is the first ever written article.',
          authorId: 1,
          category: 'technology',
          share: 'Yes',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Second Article',
          description: 'This is the second ever written article.',
          authorId: 2,
          category: 'politics',
          share: 'Yes',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Articles', null, {}),
};