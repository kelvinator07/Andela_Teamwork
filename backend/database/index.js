import knex from 'knex';
// import userRoutes from './routes/api/user';


const postgres = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'k0l0',
    database: 'teamwork',
  },
});

// postgres.select('*').from('users').then((data) => {
//   console.log(data);
// });

export default postgres;
