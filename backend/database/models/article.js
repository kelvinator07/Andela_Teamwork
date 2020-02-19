'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    authorId: DataTypes.INTEGER,
    category: DataTypes.STRING,
    share: DataTypes.STRING
  }, {});
  Article.associate = function(models) {
    // associations can be defined here
    Article.hasMany(models.Comment, {
      foreignKey: 'postId',
      as: 'comments',
      onDelete: 'CASCADE',
    });

    Article.belongsTo(models.User, {
      foreignKey: 'authorId',
      as: 'author',
      onDelete: 'CASCADE',
    });
  };
  return Article;
};