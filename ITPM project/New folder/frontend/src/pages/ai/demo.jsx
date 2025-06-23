import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Ai = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [budgetSuggestion, setBudgetSuggestion] = useState(0);

  // Get the current date
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Fetch expenses data from the API
  useEffect(() => {
    const fetchExpenses = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/Expenses/getAllExpens');
        setExpenses(response.data);
        toast.success('Expenses loaded successfully');
      } catch (error) {
        setError('Failed to load expenses');
        toast.error('Failed to load expenses');
      } finally {
        setIsLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  // Helper function to calculate total amount for a given month
  const getMonthTotal = (month, year) => {
    return expenses
      .filter(exp => {
        const expenseDate = new Date(exp.date);
        return expenseDate.getMonth() === month && expenseDate.getFullYear() === year;
      })
      .reduce((total, exp) => total + exp.amount, 0);
  };

  // Helper function to calculate the total and count of previous months
  const getPreviousMonthsData = () => {
    let total = 0;
    let monthsCount = 0;

    expenses.forEach((exp) => {
      const expenseDate = new Date(exp.date);
      const expenseMonth = expenseDate.getMonth();
      const expenseYear = expenseDate.getFullYear();

      // Exclude current month from the analysis
      if (expenseYear === currentYear && expenseMonth === currentMonth) return;

      total += exp.amount;
      monthsCount++;
    });

    return { total, monthsCount };
  };

  // Function to suggest a budget based on previous months' average
  const suggestBudget = () => {
    const { total, monthsCount } = getPreviousMonthsData();

    if (monthsCount > 0) {
      // Calculate the average for previous months
      const average = total / monthsCount;
      setBudgetSuggestion(average);
    }
  };

  // Update the budget suggestion when expenses change
  useEffect(() => {
    if (expenses.length > 0) {
      suggestBudget();
    }
  }, [expenses]);

  return (
    <div className="bg-gradient-to-r from-[#434570] to-[#232439] h-screen w-full flex justify-center items-center p-4">
      <div className="w-full max-w-4xl bg-[#1a1a2e] p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-semibold text-white text-center mb-6">Real-Time Budget Suggestion for the Upcoming Month</h1>

        {/* Current month total */}
        <div className="bg-[#2a2a44] p-4 mb-4 rounded-lg shadow-md">
          <h2 className="text-xl font-medium text-white">Current Month Total</h2>
          <p className="text-2xl font-bold text-green-400 mt-2">
            ${getMonthTotal(currentMonth, currentYear).toFixed(2)}
          </p>
        </div>

        {/* Budget suggestion for the next month */}
        <div className="bg-[#2a2a44] p-4 mb-4 rounded-lg shadow-md">
          <h2 className="text-xl font-medium text-white">Budget Suggestion for Next Month</h2>
          <p className="text-2xl font-bold text-yellow-400 mt-2">
            ${budgetSuggestion.toFixed(2)}
          </p>
        </div>

        {/* Optional: Display past month data (if needed) */}
        <div>
          <h2 className="text-xl font-medium text-white mb-4">Past Month's Analysis Total Expense Records</h2>
          <div className="overflow-x-auto scrollbar-none lg:h-[300px]">
          {expenses
            .filter((exp) => {
              const expenseDate = new Date(exp.date);
              return expenseDate.getFullYear() < currentYear || (expenseDate.getFullYear() === currentYear && expenseDate.getMonth() < currentMonth);
            })
            .map((exp, index) => (
              <div key={index} className="bg-[#2a2a44] p-4 mb-4 rounded-lg shadow-md">
                <p className="text-white">
                  {new Date(exp.date).toLocaleString('default', { month: 'long', year: 'numeric' })}: 
                  <span className="font-semibold text-cyan-300"> ${exp.amount.toFixed(2)}</span>
                </p>
              </div>
            ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Ai;