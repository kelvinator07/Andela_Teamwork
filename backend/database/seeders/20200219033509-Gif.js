'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
      'Gifs',
      [
        {
          authorId: 1,
          title: 'This is the first a Gif',
          imageurl: 'http://gifurl',
          share: 'Yes',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: 2,
          title: 'This is the second Gif',
          imageurl: 'http://gifurl',
          share: 'Yes',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Gifs', null, {}),
};