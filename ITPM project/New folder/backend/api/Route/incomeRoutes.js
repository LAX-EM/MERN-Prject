// api/routes/incomeRoutes.js
import express from 'express';
import {
  getIncomes,
  getIncomeById,
  createIncome,
  updateIncome,
  deleteIncome,
} from '../Controllers/incomeController.js';

const router = express.Router();

router.get('/', getIncomes);
router.get('/:id', getIncomeById);
router.post('/', createIncome);
router.put('/:id', updateIncome);
router.delete('/:id', deleteIncome);

export default router;
