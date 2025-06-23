import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBudgetById, updateBudget } from "../services/api";
import SideBar from "../Components/SideBar";
import BudgetSideBar from "../Components/BudgetSideBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateBudget = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    notes: "",
    startDate: "",
    responsiblePerson:"",
    phone:""
  });

  const [errors, setErrors] = useState({});

  const categories = [
    "Administrative",
    "Financial",
    "Research & Development",
    "Sales and Distribution",
    "IT and Software",
    "Entertainment and Hospitality",
  ];

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const budget = await getBudgetById(id);
        setFormData({
          amount: budget.amount,
          category: budget.category,
          notes: budget.notes,
          startDate: budget.startDate.split("T")[0],
          responsiblePerson:budget.responsiblePerson,
          phone:budget.phone
          
        });
      } catch (error) {
        console.error("Error fetching budget:", error);
        alert("Failed to fetch budget.");
      }
    };
    fetchBudget();
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.amount) newErrors.amount = "Amount is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await updateBudget(id, formData);
      toast.success("Budget updated successfully!");
      // navigate("/BudgetHome");
    } catch (error) {
      console.error("Error updating budget:", error);
      toast.error("Failed to update budget.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-gradient-to-r from-[#434570] to-[#232439] h-screen w-full">
      <BudgetSideBar />
      <div className="bg-gradient-to-r from-[#434570] to-[#232439] min-h-screen w-full flex flex-col justify-start items-center py-10">
        <div className="max-w-md w-full p-6 bg-black shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-white"><center>Update Budget</center></h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white bg-gray-800"
              />
              {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white bg-gray-800"
              >
                <option value="">Select a category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white bg-gray-800"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white bg-gray-800"
              />
              {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Responsible Person
              </label>
              <input
                type="text"
                name="responsiblePerson"
                value={formData.responsiblePerson}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.responsiblePerson && <p className="text-red-500 text-sm">{errors.responsiblePerson}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Phone Number
              </label>
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Update Budget
            </button>
          </form>
        </div>
      </div>
       <ToastContainer 
              position="top-center" 
              autoClose={5000} 
              hideProgressBar
              closeButton={false}
              toastClassName="custom-toast"  
            />
    </div>
  );
};

export default UpdateBudget;
