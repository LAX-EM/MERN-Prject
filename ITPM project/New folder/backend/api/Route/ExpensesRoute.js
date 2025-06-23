import express from 'express';
import { addExpense, updateExpense, deleteExpense, getAllExpenses, getMonthlyExpensesTotal, getCategoryWiseExpenses, getExpenseById } from '../Controllers/expensesControler.js';

const router = express.Router();

router.post('/createExpenses', addExpense);
router.put('/expensesUpddate/:id', updateExpense);
router.delete('/deleteExpenses/:id', deleteExpense);
router.get('/getAllExpens', getAllExpenses);
router.get('/getMonthlyExe', getMonthlyExpensesTotal);
router.get('/getCategoryWise', getCategoryWiseExpenses);
router.get('/getsingleExpenses/:id', getExpenseById);

export default router;
