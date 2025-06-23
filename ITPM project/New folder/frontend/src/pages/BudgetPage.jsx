import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBudgets, deleteBudget } from "../services/api";
import jsPDF from "jspdf";
import "jspdf-autotable";
import BudgetSideBar from "../Components/BudgetSideBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const BudgetPage = () => {
  const [budgets, setBudgets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const data = await getAllBudgets();
        setBudgets(data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };
    fetchBudgets();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this budget?")) {
      try {
        await deleteBudget(id);
        setBudgets(budgets.filter((budget) => budget._id !== id));
        toast.success("Budget deleted successfully!");
      } catch (error) {
        console.error("Error deleting budget:", error);
        alert("Failed to delete budget.");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-budget/${id}`);
  };

  const filteredBudgets = budgets.filter((budget) =>
    budget.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generateReport = () => {
    const doc = new jsPDF();
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `budget-report-${timestamp}.pdf`;
  
    const title = "Budget Report";
    const titleWidth = doc.getTextWidth(title);
    const pageWidth = doc.internal.pageSize.width;
    const titleX = (pageWidth - titleWidth) / 2;
  
    doc.text(title, titleX, 10);
  
    // Use `doc.autoTable`, not `autoTable(doc, {...})`
    doc.autoTable({
      head: [["Amount", "Category", "Notes", "Start Date", "End Date"]],
      body: filteredBudgets.map((budget) => [
        budget.amount,
        budget.category,
        budget.notes,
        new Date(budget.startDate).toLocaleDateString(),
        budget.responsiblePerson,
        budget.phone
      ]),
      theme: "grid",
      headStyles: { fillColor: [0, 0, 0] },
      bodyStyles: { fillColor: [240, 240, 240] },
    });
  
    doc.save(fileName);
  };

  const formatNumbers = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  

  return (
    <div className="bg-gradient-to-r from-[#434570] to-[#232439] h-[1000px] w-full ">

      <BudgetSideBar onGenerateReport={generateReport}/>
      <div className="flex-1 overflow-y-auto p-6 text-white mx-[210px] ml-[210px] mr-[30px]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Budget Page</h1>
          <div className="flex space-x-4">
            <button
              onClick={generateReport}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Generate Report
            </button>
            <button
              onClick={() => navigate("/create-budget")}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Create Budget
            </button>
          </div>
        </div>

        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search by category"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 text-white border border-gray-700  ">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Notes</th>
                <th className="px-4 py-2">Start Date</th>
                <th className="px-4 py-2">Responsible Person</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBudgets.map((budget) => (
                <tr
                  key={budget._id}
                  className="even:bg-gray-700 odd:bg-gray-800 hover:bg-gray-600"
                >
                  <td className="px-4 py-2 border border-gray-600">Rs:{formatNumbers(budget.amount)}</td>
                  <td className="px-4 py-2 border border-gray-600">{budget.category}</td>
                  <td className="px-4 py-2 border border-gray-600">{budget.notes}</td>
                  <td className="px-4 py-2 border border-gray-600">{new Date(budget.startDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border border-gray-600">{budget.responsiblePerson}</td>
                  <td className="px-4 py-2 border border-gray-600">{budget.phone}</td>
                  <td className="px-4 py-2 border border-gray-600">
                    <button onClick={() => handleEdit(budget._id)} className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(budget._id)} className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default BudgetPage;