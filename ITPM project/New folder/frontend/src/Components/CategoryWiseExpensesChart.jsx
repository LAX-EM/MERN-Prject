import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";

const CategoryWiseExpensesChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCategoryExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/Expenses/getCategoryWise"); 
        const formattedData = response.data.map((item) => ({
          name: item._id,
          value: item.totalAmount,
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching category-wise expenses:", error);
      }
    };

    fetchCategoryExpenses();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0", "#FF4560"]; // Customize colors

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-black text-xl font-bold mb-4">Category Wise Expenses</h2>
      <PieChart width={400} height={400}>
        <Pie data={data} cx="50%" cy="50%" outerRadius={120} fill="#8884d8" dataKey="value">
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default CategoryWiseExpensesChart;
