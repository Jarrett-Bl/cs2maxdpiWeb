import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 3000,
  pgUser: process.env.PGUSER ?? '',
  pgHost: process.env.PGHOST ?? '',
  pgDatabase: process.env.PGNAME ?? '',
  pgPassword: process.env.PGPASS ?? '',
  pgPort: Number(process.env.PGPORT) || 5432,
};

