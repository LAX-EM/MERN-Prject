import Budget from "../Models/Budget.js";

// Create a new budget
const createBudget = async (budgetData) => {
  const budget = new Budget(budgetData);
  return await budget.save();
};

// Get all budgets
const getAllBudgets = async () => {
  return await Budget.find();
};

// Get a budget by ID
const getBudgetById = async (id) => {
  return await Budget.findById(id);
};

// Update a budget by ID
const updateBudget = async (id, updateData) => {
  return await Budget.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete a budget by ID
const deleteBudget = async (id) => {
  return await Budget.findByIdAndDelete(id);
};

// Export as an object (Default Export)
const budgetService = {
  createBudget,
  getAllBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
};

export default budgetService;
