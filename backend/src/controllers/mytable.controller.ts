import { Request, Response } from 'express';
import {
  getAllMyTable,
  createMyTableRecord,
  deleteMyTableRecord,
} from '../services/mytable.service.js';

export async function getMyTable(_req: Request, res: Response) {
  try {
    const records = await getAllMyTable();
    res.status(200).json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch records' });
  }
}

export async function createMyTable(req: Request, res: Response) {
  const { name, temp1, temp2, temp3, temp4 } = req.body;

  if (
    !name ||
    temp1 === undefined ||
    temp2 === undefined ||
    temp3 === undefined ||
    temp4 === undefined
  ) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    const created = await createMyTableRecord({
      name,
      temp1,
      temp2,
      temp3,
      temp4,
    });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add record' });
  }
}

export async function deleteMyTable(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid ID format' });
    return;
  }

  try {
    const result = await deleteMyTableRecord(id);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Record not found' });
      return;
    }

    res.status(200).json({ message: 'Record deleted', record: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete record' });
  }
}

