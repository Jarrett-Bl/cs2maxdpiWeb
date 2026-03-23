import { Router } from 'express';
import {
  getMyTable,
  createMyTable,
  deleteMyTable,
} from '../controllers/mytable.controller.js';

const router = Router();

router.get('/', getMyTable);
router.post('/', createMyTable);
router.delete('/:id', deleteMyTable);

export default router;
