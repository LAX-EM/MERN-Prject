// IncomeForm.jsx
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import IncomeSidebar from '../Components/IncomeSidebar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const IncomeForm = ({ onIncomeAdded = () => {} }) => {
  const [formData, setFormData] = useState({
    incomeSource: '',
    description: '',
    incomeCategory: '',
    incomeType: '',
    amount: '',
    date:'',
    phone: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === 'amount') && isNaN(value)) {
          toast.error(`${name.charAt(0).toUpperCase() + name.slice(1)} must be a number`);
          return;
        }

        if (name === "phone") {
              if (!/^\d*$/.test(value)) {
                toast.error("Phone number must contain only numbers.");
                return;
              }
            }


    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (formData.phone.length !== 10) {
          toast.error("Phone number must be exactly 10 digits.");
          return;
        }
    setError('');

    // Check if the first four fields are filled
    if (!formData.incomeSource || !formData.incomeType || !formData.incomeCategory || !formData.amount) {
      toast.error('Please fill out all the required fields (Income Source, Income Type, Income Category, Amount)');
      return;
    }

    // Validate amount field to ensure it's a positive number
    if (!formData.amount || isNaN(formData.amount) || formData.amount <= 0) {
      toast.error('Please enter a valid positive number for amount');
      return;
    }

    // Convert amount to number
    const incomeData = { ...formData, amount: Number(formData.amount) };

    try {
      const response = await fetch('http://localhost:5000/api/incomes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(incomeData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to create income');
      }

      const newIncome = await response.json();
      onIncomeAdded(newIncome);
      
      // Display toast message on success
      toast.success("Income successfully added!");

      // Clear the form
      setFormData({
        incomeSource: '',
        description: '',
        incomeCategory: '',
        incomeType: '',
        amount: '',
        date:'',
        phone: '',
      });
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-r from-[#434570] to-[#232439]">
      {/* Sidebar on the left */}
      <IncomeSidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <form onSubmit={handleSubmit} className="p-4 border rounded-xl shadow max-w-md mx-auto bg-slate-400 mt-10">
          <h2 className="text-xl font-bold mb-4">Add New Income</h2>

          <div className="mb-2">
            <label className="block font-medium">Income Source</label>
            <select
              name="incomeSource"
              value={formData.incomeSource}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select income source</option>
              <option value="Product Sales">Product Sales</option>
              <option value="Service Revenue">Service Revenue</option>
              <option value="Investments">Investments</option>
              <option value="Rental Income">Rental Income</option>
              <option value="Royalties">Royalties</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="block font-medium">Income Type</label>
            <select
              name="incomeType"
              value={formData.incomeType}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select type</option>
              <option value="one-time">One-time</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Annually">Annualy</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="block font-medium">Income Category</label>
            <select
              name="incomeCategory"
              value={formData.incomeCategory}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Category</option>
              <option value="salary">Salary</option>
              <option value="freelance">Freelance</option>
              <option value="investment">Investment</option>
              <option value="business">Business</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="block font-medium">Amount</label>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block font-medium">Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block font-medium">Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-2">
            <label className="block font-medium">Description (optional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            ></textarea>
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full rounded hover:bg-blue-600">
            Submit
          </button>
        </form>
        {/* Toast Container for notifications */}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      </div>
    </div>
  );
};

export default IncomeForm;
