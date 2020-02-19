'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    jobrole: DataTypes.STRING,
    department: DataTypes.STRING,
    address: DataTypes.STRING,
    avatarurl: DataTypes.STRING,
    userrole: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Article, {
      foreignKey: 'authorId',
      as: 'articles',
      onDelete: 'CASCADE',
    });

    User.hasMany(models.Comment, {
      foreignKey: 'authorId',
      as: 'comments',
      onDelete: 'CASCADE',
    });

    User.hasMany(models.Gif, {
      foreignKey: 'authorId',
      as: 'gifs',
      onDelete: 'CASCADE',
    });
  };
  return User;
};