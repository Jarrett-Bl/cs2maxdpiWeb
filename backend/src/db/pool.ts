import pg from 'pg';
import { env } from '../config/env.js';

const { Pool } = pg;

export const pool = new Pool({
  user: env.pgUser,
  host: env.pgHost,
  database: env.pgDatabase,
  password: env.pgPassword,
  port: env.pgPort,
});

