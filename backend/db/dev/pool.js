import { Pool } from 'pg';

import dotenv from 'dotenv';

dotenv.config();

const databaseConfig = { connectionString: process.env.NEW_DATABASE_URL };
console.log('databaseConfig ', databaseConfig);
const pool = new Pool(databaseConfig);

export default pool;