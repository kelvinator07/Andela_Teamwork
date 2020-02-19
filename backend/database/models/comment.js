'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    description: DataTypes.TEXT,
    authorId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User, {
      foreignKey: 'authorId',
      as: 'author'
    });

    Comment.belongsTo(models.Article, {
      foreignKey: 'postId',
      as: 'post'
    });
  };
  return Comment;
};