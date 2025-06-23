import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import SideBar from '../../Components/SideBar';

const Ai = () => {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [is, setIs] = useState(false);
  const [error, setError] = useState('');
  const [previousMonthTotal, setPreviousMonthTotal] = useState(0);
  const [previousMonthBudgetTotal, setPreviousMonthBudgetTotal] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // State to control button disabled/enabled

  useEffect(() => {
    // Fetch budget data
    const fetchBudget = async () => {
      setIs(true);
      try {
        const response = await axios.get('http://localhost:5000/api/budgets/');
        setBudget(response.data);
        toast.success('Budget loaded successfully');
      } catch (error) {
        setError('Failed to load budget');
        toast.error('Failed to load budget');
      } finally {
        setIs(false);
      }
    };
    fetchBudget();
  }, []);

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

  // Function to calculate the total for the previous month (expenses)
  const calculatePreviousMonthTotal = (expenses) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    // Filter the expenses that belong to the previous month
    const previousMonthExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() === previousMonth &&
        expenseDate.getFullYear() === previousMonthYear
      );
    });

    // Calculate the total amount for the previous month
    const totalAmount = previousMonthExpenses.reduce((total, expense) => {
      return total + expense.amount;
    }, 0);

    return totalAmount;
  };

  // Function to calculate the total budget for the previous month
  const calculatePreviousMonthBudgetTotal = (budget) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    // Filter the budget that belongs to the previous month
    const previousMonthBudget = budget.filter((budgetItem) => {
      const budgetDate = new Date(budgetItem.startDate); // Ensure startDate is a valid date
      return (
        budgetDate.getMonth() === previousMonth &&
        budgetDate.getFullYear() === previousMonthYear
      );
    });

    // Calculate the total budget amount for the previous month
    const totalBudget = previousMonthBudget.reduce((total, budgetItem) => {
      return total + budgetItem.amount; // Assuming budget has an amount property
    }, 0);

    return totalBudget;
  };

  useEffect(() => {
    if (expenses.length > 0) {
      const totalExpenses = calculatePreviousMonthTotal(expenses);
      setPreviousMonthTotal(totalExpenses);
    }
  }, [expenses]);

  useEffect(() => {
    if (budget.length > 0) {
      const totalBudget = calculatePreviousMonthBudgetTotal(budget);
      setPreviousMonthBudgetTotal(totalBudget);
    }
  }, [budget]);

  // Update the button disabled state based on the comparison of expenses and budget
  useEffect(() => {
    if (previousMonthTotal <= previousMonthBudgetTotal) {
      setIsButtonDisabled(false); // Enable the button
    } else {
      setIsButtonDisabled(true); // Disable the button
    }
  }, [previousMonthTotal, previousMonthBudgetTotal]);

  const formatNumbers = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div>
      <SideBar/>
    <div className="bg-gradient-to-r from-[#434570] to-[#232439] h-screen w-full flex justify-center items-center p-6">
    <div className="text-white max-w-4xl w-full bg-[#2d2f46] p-8 rounded-xl shadow-lg">
      <div className="flex flex-col space-y-8 text-center">
        <h1 className="text-3xl font-bold text-[#f1f1f1]">Upcoming Month Budget Analysis</h1>
        <p className="text-lg text-gray-400">
          View and compare your total expenses against your budget for the previous month.
        </p>
      </div>

      {/* Budget and Expenses Section */}
      <div className="flex justify-center space-x-12 mt-10 text-xl">
        <div className="flex flex-col items-center bg-[#3f4356] p-6 rounded-lg shadow-md w-1/3">
          <h2 className="text-lg text-gray-300">Previous Month's Total Expenses</h2>
          <p className="text-3xl font-semibold text-white">Rs:{formatNumbers(previousMonthTotal.toFixed(2))}</p>
        </div>
        <div className="flex flex-col items-center bg-[#3f4356] p-6 rounded-lg shadow-md w-1/3">
          <h2 className="text-lg text-gray-300">Previous Month's Total Budget</h2>
          <p className="text-3xl font-semibold text-white">Rs:{formatNumbers(previousMonthBudgetTotal.toFixed(2))}</p>
        </div>
      </div>

      {/* Button Section */}
      <div className="flex justify-center mt-12">
        <Link to="/ai">
          <button
            className={`px-8 py-3 text-lg font-semibold text-white rounded-md transition-all duration-300 ease-in-out 
              ${isButtonDisabled ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg'}`}
            disabled={isButtonDisabled}
          >
            {isButtonDisabled ? 'Locked (Expenses Exceed Budget)' : 'Congrats! Check next month'}
          </button>
        </Link>
      </div>

      {/* Tooltip Description */}
      <div className="mt-6 text-center text-sm text-gray-400">
        <p>
          The button will only be enabled if your expenses are within your budget for the previous month.
        </p>
      </div>
    </div>
  </div>
  </div>
  );
};

export default Ai;
