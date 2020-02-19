import knex from 'knex';


const postgres = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'k0l0',
    database: 'teamwork',
  },
});

export default postgres;
