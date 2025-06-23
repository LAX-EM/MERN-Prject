import budgetService from '../services/budgetService.js';

// Create a new budget
const createBudget = async (req, res) => {
  try {
    const budget = await budgetService.createBudget(req.body);
    res.status(201).json(budget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all budgets
const getAllBudgets = async (req, res) => {
  try {
    const budgets = await budgetService.getAllBudgets();
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a budget by ID
const getBudgetById = async (req, res) => {
  try {
    const budget = await budgetService.getBudgetById(req.params.id);
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a budget by ID
const updateBudget = async (req, res) => {
  try {
    const budget = await budgetService.updateBudget(req.params.id, req.body);
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    res.status(200).json(budget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a budget by ID
const deleteBudget = async (req, res) => {
  try {
    const budget = await budgetService.deleteBudget(req.params.id);
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {createBudget,getAllBudgets,getBudgetById,updateBudget,deleteBudget,};
