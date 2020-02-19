'use strict';
module.exports = (sequelize, DataTypes) => {
  const Gif = sequelize.define('Gif', {
    authorId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    imageurl: DataTypes.STRING,
    share: DataTypes.STRING
  }, {});
  Gif.associate = function(models) {
    // associations can be defined here
    Gif.hasMany(models.Comment, {
      foreignKey: 'postId',
      as: 'comments',
      onDelete: 'CASCADE',
    });

    Gif.belongsTo(models.User, {
      foreignKey: 'authorId',
      as: 'author',
      onDelete: 'CASCADE',
    });
  };
  return Gif;
};