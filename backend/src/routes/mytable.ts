import { Router, Request, Response } from 'express';
import { pool } from '../config/db.js';

const router = Router();

router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM mytable');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch records' });
  }
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { name, temp1, temp2, temp3, temp4 } = req.body;

  if (!name || temp1 === undefined || temp2 === undefined || temp3 === undefined || temp4 === undefined) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    const result = await pool.query(
      'INSERT INTO mytable (name, temp1, temp2, temp3, temp4) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, temp1, temp2, temp3, temp4]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add record' });
  }
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid ID format' });
    return;
  }

  try {
    const result = await pool.query('DELETE FROM mytable WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Record not found' });
      return;
    }
    res.status(200).json({ message: 'Record deleted', record: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete record' });
  }
});

export default router;
