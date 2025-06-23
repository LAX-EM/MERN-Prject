import React from 'react';
import ExepenseSidebar from '../Components/ExepenseSidebar';
import MonthlyExpensesChart from '../Components/MonthlyExpensesChart';
import CategoryWiseExpensesChart from '../Components/CategoryWiseExpensesChart';

const ExpensesDash = () => {
    return (
        <div className="bg-gradient-to-r from-[#434570] to-[#232439] h-screen w-full">
  <ExepenseSidebar />
  <h1 className='font-extrabold text-center text-3xl text-white'>Expenses Dashboard</h1>
  
  <div className="flex justify-center items-center space-x-4 mt-10">
    
    <div className="w-[500px] h-[400px] bg-gray-800 p-3 rounded-lg shadow-lg">
      <MonthlyExpensesChart />
    </div>

    
    <div className="w-[500px] h-[400px] bg-gray-800 p-3 rounded-lg shadow-lg">
      <CategoryWiseExpensesChart />
    </div>
  </div>
</div>


    );
};

export default ExpensesDash;