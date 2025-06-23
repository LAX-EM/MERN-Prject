import Expense from '../Models/Expenses.js';

const addExpense = async (req, res) => {
  try {
    const { name, description, category, amount, date, responsiblePerson,phone, notes } = req.body;

    if (!name || !category || !amount) {
      return res.status(400).json({ message: 'Name, Category, Amount, and Date are required.' });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than zero.' });
    }

    const expense = new Expense({
      name,
      description,
      category,
      amount,
      date,
      responsiblePerson,
      phone,
      notes
    });

    const savedExpense = await expense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    console.error('Error adding expense:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json(updatedExpense);
  } catch (error) {
    console.error('Error updating expense:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json(expense);
  } catch (error) {
    console.error('Error fetching expense:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};


const getAllExpenses = async (req, res) => {
  try {
    
    const expenses = await Expense.find();

    
    if (!expenses) {
      return res.status(404).json({ message: 'No expenses found' });
    }

    
    res.status(200).json(expenses);
  } catch (error) {
    
    console.error('Error fetching expenses:', error);
    res.status(500).json({ message: 'Server error while fetching expenses' });
  }
};


const getMonthlyExpensesTotal = async (req, res) => {
  try {
    const monthlyTotal = await Expense.aggregate([
      {
        $project: {
          month: { $month: "$date" },  // Extract the month from the date
          year: { $year: "$date" },    // Extract the year from the date
          amount: 1                   // Include the amount field
        }
      },
      {
        $group: {
          _id: { year: "$year", month: "$month" }, // Group by year and month
          totalAmount: { $sum: "$amount" }         // Calculate the total amount for each month
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 } // Sort by year and month
      }
    ]);

    // Return the result as a JSON response
    res.status(200).json(monthlyTotal);
  } catch (err) {
    console.error("Error calculating monthly expenses total:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCategoryWiseExpenses = async (req, res) => {
  try {
    const categoryExpenses = await Expense.aggregate([
      {
        $group: {
          _id: "$category", 
          totalAmount: { $sum: "$amount" }, 
        },
      },
      {
        $sort: { totalAmount: -1 }, 
      },
    ]);

    res.status(200).json(categoryExpenses);
  } catch (err) {
    console.error("Error fetching category-wise expenses:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

export { addExpense, updateExpense, deleteExpense, getAllExpenses,getMonthlyExpensesTotal,getCategoryWiseExpenses,getExpenseById };
