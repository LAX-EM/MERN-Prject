import React, { useState } from "react";
import { createBudget } from "../services/api";
import { useNavigate } from "react-router-dom";
import BudgetSideBar from "../Components/BudgetSideBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateBudget = () => {
  const [formData, setFormData] = useState({
    amount: "",
    category: "Select a category",
    notes: "",
    startDate: "",
    responsiblePerson:"",
    phone:""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const categories = [
    "Administrative",
    "Financial",
    "Research & Development",
    "Sales and Distribution",
    "IT and Software",
    "Entertainment and Hospitality",
  ];

  const validateForm = () => {
    const newErrors = {};
    const today = new Date().toISOString().split("T")[0];

    if (!formData.amount) newErrors.amount = "Amount is required";
    if (!formData.notes) newErrors.notes = "Notes are required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";

    if (formData.startDate && formData.startDate >= today) {
      newErrors.startDate = "Start date must be before today";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.phone.length !== 10) {
          toast.error("Phone number must be exactly 10 digits.");
          return;
        }
    if (!validateForm()) return;

    try {
      await createBudget(formData);
      toast.success("Budget created successfully!");

      setFormData({
        amount: "",
        category: "Select a category",
        notes: "",
        startDate: "",
        responsiblePerson:"",
        phone:""
      });

    
    } catch (error) {
      console.error("Error creating budget:", error);
      toast.error("Failed to create budget.");
    }
  };

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
    
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-gradient-to-r from-[#434570] to-[#232439] h-screen w-full">
      <BudgetSideBar />
      <div className="flex-1 bg-gradient-to-r from-[#434570] to-[#232439] min-h-screen py-10 px-6">
        <div className="max-w-md w-full p-6 bg-gray-900 text-white shadow-md rounded-lg mx-auto">
          <div className="flex justify-center mb-4">
            <h2 className="text-2xl font-bold">Create Budget</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Amount
              </label>
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select a category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.notes && <p className="text-red-500 text-sm">{errors.notes}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]} // Prevent selecting today or future dates
                className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                type="text"
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
              Create Budget
            </button>
          </form>
        </div>
      </div>\
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

export default CreateBudget;

