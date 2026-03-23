import { pool } from '../db/pool.js';

export interface MyTableRecord {
  id: number;
  name: string;
  temp1: number;
  temp2: number;
  temp3: number;
  temp4: number;
}

export async function getAllMyTable(): Promise<MyTableRecord[]> {
  const result = await pool.query('SELECT * FROM mytable');
  return result.rows;
}

export async function createMyTableRecord(
  input: Omit<MyTableRecord, 'id'>,
): Promise<MyTableRecord> {
  const { name, temp1, temp2, temp3, temp4 } = input;

  const result = await pool.query(
    'INSERT INTO mytable (name, temp1, temp2, temp3, temp4) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [name, temp1, temp2, temp3, temp4],
  );

  return result.rows[0];
}

export async function deleteMyTableRecord(id: number) {
  const result = await pool.query(
    'DELETE FROM mytable WHERE id = $1 RETURNING *',
    [id],
  );
  return result;
}

