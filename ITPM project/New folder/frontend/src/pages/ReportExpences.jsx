import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Components/Loader';
import ExepenseSidebar from '../Components/ExepenseSidebar';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CSVLink } from 'react-csv';

const ReportExpences = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarActive, setIsSidebarActive] = useState(false);

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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await axios.delete(`http://localhost:5000/api/Expenses/deleteExpenses/${id}`);
        setExpenses(expenses.filter(expense => expense._id !== id));
        toast.success('Expense deleted successfully');
      } catch (error) {
        toast.error('Failed to delete expense');
      }
    }
  };

  const filteredExpenses = expenses.filter(expense =>
    expense.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  const generateReport = () => {
    const doc = new jsPDF();
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `expenses-report-${timestamp}.pdf`;

    const title = "Expenses Report";
    const titleWidth = doc.getTextWidth(title);
    const pageWidth = doc.internal.pageSize.width;
    const titleX = (pageWidth - titleWidth) / 2;
    doc.text(title, titleX, 10);

    doc.autoTable({
      head: [["Name", "Category", "Amount", "Date"]],
      body: filteredExpenses.map(expense => [
        expense.name,
        expense.category,
        expense.amount,
        new Date(expense.date).toLocaleDateString()
      ]),
      theme: "grid",
      headStyles: { fillColor: [0, 0, 0] },
      bodyStyles: { fillColor: [240, 240, 240] },
    });

    doc.save(fileName);
  };

  const csvData = [
    ['Name', 'Category', 'Amount', 'Date'],
    ...filteredExpenses.map(expense => [
      expense.name,
      expense.category,
      expense.amount,
      new Date(expense.date).toLocaleDateString()
    ])
  ];

  return (
    <div className="bg-gradient-to-r from-[#434570] to-[#232439] h-screen w-full flex">
      <ExepenseSidebar isActive={isSidebarActive} toggleSidebar={toggleSidebar} />
      <div className={`container mx-auto p-6 transition-all ${isSidebarActive ? 'ml-[225px]' : 'ml-0'}`}>
        <h2 className="text-3xl font-bold mb-6 text-center text-white">All Expenses</h2>

        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search by name or category"
            className="p-2 rounded-lg shadow-md w-1/2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="mb-6 flex justify-center space-x-4">
          <button onClick={generateReport} className="bg-blue-500 text-white p-2 rounded-lg shadow-md">
            Download PDF Report
          </button>

          <CSVLink data={csvData} filename="expenses-report.csv">
            <button className="bg-green-500 text-white p-2 rounded-lg shadow-md">
              Download CSV Report
            </button>
          </CSVLink>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <Loader />
          ) : (
            <table className="min-w-full bg-gray-800 rounded-lg shadow-md">
              <thead>
                <tr className="text-white bg-blue-900">
                  <th className="py-4 px-8 text-left">Name</th>
                  <th className="py-4 px-8 text-left">Category</th>
                  <th className="py-4 px-8 text-left">Amount</th>
                  <th className="py-4 px-8 text-left">Date</th>
                  <th className="py-4 px-8 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.length > 0 ? (
                  filteredExpenses.map((expense, index) => (
                    <tr key={expense._id} className={`${index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'} hover:bg-gray-500 transition-all duration-300`}>
                      <td className="py-4 px-8 text-white">{expense.name}</td>
                      <td className="py-4 px-8 text-white">{expense.category}</td>
                      <td className="py-4 px-8 text-white">{expense.amount}</td>
                      <td className="py-4 px-8 text-white">{new Date(expense.date).toLocaleDateString()}</td>
                      <td className="py-4 px-8 text-white flex space-x-4">
                        <Link to={`/updateexpenses/${expense._id}`} className="text-yellow-500 hover:text-yellow-300">
                          <FaEdit size={20} />
                        </Link>
                        <button onClick={() => handleDelete(expense._id)} className="text-red-500 hover:text-red-300">
                          <FaTrash size={20} />
                        </button>
                        <Link to={`/single-expence/${expense._id}`}>
                          <button className="text-blue-500 hover:text-blue-300">
                            <FaEye size={20} />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-4 px-8 text-white text-center">
                      No expenses found for the search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportExpences;