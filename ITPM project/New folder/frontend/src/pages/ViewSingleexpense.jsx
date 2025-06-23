import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExepenseSidebar from '../Components/ExepenseSidebar';

const ViewSingleexpense = () => {
  const { id } = useParams(); 
  const [expense, setExpense] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/Expenses/getsingleExpenses/${id}`);
        setExpense(response.data);
      } catch (error) {
        console.error('Error fetching expense:', error);
        toast.error('Failed to fetch expense details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpense();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!expense) {
    return <div>No data available for this expense.</div>;
  }

  const formatNumbers = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="bg-gradient-to-r from-[#434570] to-[#232439] h-[1000px] w-full">
      <ExepenseSidebar/>
      
      <div className="container mx-auto p-6 flex justify-center items-center h-screen">
  <div className="w-full max-w-4xl bg-gradient-to-r from-purple-200 to-blue-2900 p-8 rounded-lg shadow-2xl">
    <h2 className="text-4xl font-extrabold text-center text-white mb-6">Expense Details</h2>
    
    <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="mb-4">
        <strong className="text-xl font-semibold text-gray-800">Name:</strong> <span className="text-gray-700">{expense.name}</span>
      </div>
      <div className="mb-4">
        <strong className="text-xl font-semibold text-gray-800">Description:</strong> <span className="text-gray-700">{expense.description}</span>
      </div>
      <div className="mb-4">
        <strong className="text-xl font-semibold text-gray-800">Category:</strong> <span className="text-gray-700">{expense.category}</span>
      </div>
      <div className="mb-4">
        <strong className="text-xl font-semibold text-gray-800">Amount:</strong> <span className="text-gray-700">Rs:{formatNumbers(expense.amount)}</span>
      </div>
      <div className="mb-4">
        <strong className="text-xl font-semibold text-gray-800">Date:</strong> <span className="text-gray-700">{new Date(expense.date).toLocaleDateString()}</span>
      </div>
      <div className="mb-4">
        <strong className="text-xl font-semibold text-gray-800">Responsible Person:</strong> <span className="text-gray-700">{expense.responsiblePerson}</span>
      </div>
      <div className="mb-4">
        <strong className="text-xl font-semibold text-gray-800">Phone:</strong> <span className="text-gray-700">{expense.phone}</span>
      </div>
      <div className="mb-4">
        <strong className="text-xl font-semibold text-gray-800">Notes:</strong> <span className="text-gray-700">{expense.notes}</span>
      </div>
    </div>
  </div>
</div>

      <ToastContainer position="top-center" autoClose={5000} hideProgressBar closeButton={false} />
    </div>
  );
};

export default ViewSingleexpense;
