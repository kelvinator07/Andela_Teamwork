import 'dotenv/config';

module.exports = {
  development: {
    url: process.env.NEW_DATABASE_URL,
    dialect: 'postgres',
  },
  test: {
    url: process.env.NEW_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.NEW_DATABASE_URL,
    dialect: 'postgres',
  },
};