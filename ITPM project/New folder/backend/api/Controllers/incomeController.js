import Income from '../Models/incomeModel.js';

// Get all income entries
export const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find().sort({ date: -1 });
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single income entry by ID
export const getIncomeById = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    if (!income) return res.status(404).json({ message: 'Income not found' });
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Creat dfdfdf dannama
export const createIncome = async (req, res) => {
  try {
    const { incomeSource, description, incomeCategory, incomeType, amount,date,phone } = req.body;

    // Validate required fields
    if (!incomeSource || !description || !incomeCategory || !incomeType || !amount) {
      return res.status(400).json({ message: 'All fields are required' });
    }

  

    const newIncome = new Income({
      incomeSource,
      description,
      incomeCategory,
      incomeType,
      amount,
      date,
      phone
    });

    const savedIncome = await newIncome.save();
    res.status(201).json(savedIncome);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an income entry
export const updateIncome = async (req, res) => {
  try {
    const { incomeSource, description, incomeCategory, incomeType, amount,phone} = req.body;


// Validate required fields (description is optional, amount must be a number)
if (!incomeSource || !incomeCategory || !incomeType || amount === undefined) {
  return res.status(400).json({ message: 'Income Source, Income Category, Income Type, and Amount are required' });
}

if (typeof amount !== 'number' || amount <= 0) {
  return res.status(400).json({ message: 'Amount must be a positive number' });
}

    const updatedIncome = await Income.findByIdAndUpdate(
      req.params.id,
      { incomeSource, description, incomeCategory, incomeType, amount ,phone},
      { new: true }
    );

    if (!updatedIncome) return res.status(404).json({ message: 'Income not found' });
    res.json(updatedIncome);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an income entry
export const deleteIncome = async (req, res) => {
  try {
    const deletedIncome = await Income.findByIdAndDelete(req.params.id);
    if (!deletedIncome) return res.status(404).json({ message: 'Income not found' });
    res.json({ message: 'Income deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
