import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const MonthlyExpensesChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/Expenses/getMonthlyExe"); 
        const formattedData = response.data.map(item => ({
          month: `${item._id.year}-${String(item._id.month).padStart(2, "0")}`, 
          totalAmount: item.totalAmount
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching expenses data:", error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-center mb-4">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalAmount" fill="#4F46E5" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyExpensesChart;
