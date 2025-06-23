import axios from "axios";

// Create a new budget
export const createBudget = async (budgetData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/budgets/', budgetData);
    return response.data;
  } catch (error) {
    console.error("Error creating budget:", error);
    throw error;
  }
};

// Get all budgets
export const getAllBudgets = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/budgets/');
    return response.data;
  } catch (error) {
    console.error("Error fetching budgets:", error);
    throw error;
  }
};

// Get a budget by ID
export const getBudgetById = async (id) => {
  try {
    const response = await axios.get(`${'http://localhost:5000/api/budgets'}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching budget:", error);
    throw error;
  }
};

// Update a budget by ID
export const updateBudget = async (id, updateData) => {
  try {
    const response = await axios.put(`${'http://localhost:5000/api/budgets'}/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error("Error updating budget:", error);
    throw error;
  }
};

// Delete a budget by ID
export const deleteBudget = async (id) => {
  try {
    const response = await axios.delete(`${'http://localhost:5000/api/budgets'}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting budget:", error);
    throw error;
  }
};

 