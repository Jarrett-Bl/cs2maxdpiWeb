import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGNAME,
  password: process.env.PGPASS,
  port: 5432,
});
