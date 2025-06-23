import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from "jspdf";
import "jspdf-autotable";
import SideBar from '../../Components/SideBar';


const Ai = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [budgetSuggestion, setBudgetSuggestion] = useState(0);

  // Get the current date
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

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

  // Helper function to calculate total amount for a given month
  const getMonthTotal = (month, year) => {
    return expenses
      .filter(exp => {
        const expenseDate = new Date(exp.date);
        return expenseDate.getMonth() === month && expenseDate.getFullYear() === year;
      })
      .reduce((total, exp) => total + exp.amount, 0);
  };

  // Helper function to calculate the total and count of previous months
  const getPreviousMonthsData = () => {
    let total = 0;
    let monthsCount = 0;

    expenses.forEach((exp) => {
      const expenseDate = new Date(exp.date);
      const expenseMonth = expenseDate.getMonth();
      const expenseYear = expenseDate.getFullYear();

      // Exclude current month from the analysis
      if (expenseYear === currentYear && expenseMonth === currentMonth) return;

      total += exp.amount;
      monthsCount++;
    });

    return { total, monthsCount };
  };

  // Function to suggest a budget based on previous months' average
  const suggestBudget = () => {
    const { total, monthsCount } = getPreviousMonthsData();

    if (monthsCount > 0) {
      // Calculate the average for previous months
      const average = total / monthsCount;
      setBudgetSuggestion(average);
    }
  };

  // Update the budget suggestion when expenses change
  useEffect(() => {
    if (expenses.length > 0) {
      suggestBudget();
    }
  }, [expenses]);

  // Function to group expenses by month and year and calculate total per group
  const groupExpensesByMonth = () => {
    const groupedExpenses = {};

    expenses.forEach((exp) => {
      const expenseDate = new Date(exp.date);
      const monthYearKey = `${expenseDate.getMonth()}-${expenseDate.getFullYear()}`;

      if (!groupedExpenses[monthYearKey]) {
        groupedExpenses[monthYearKey] = 0;
      }

      groupedExpenses[monthYearKey] += exp.amount;
    });

    return groupedExpenses;
  };

  // Get grouped expenses by month and year
  const groupedExpenses = groupExpensesByMonth();



 

  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Set some document properties
    doc.setProperties({
      title: 'Expense Report',
      author: 'Your Company',
    });
  
    // Set title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('Expense Report', 14, 20);
  
    // Line under the title (for separation)
    doc.setLineWidth(0.5);
    doc.line(14, 22, 200, 22); // Drawing line below title
  
    // Add current month total
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.text(`Current Month Total: $${getMonthTotal(currentMonth, currentYear).toFixed(2)}`, 14, 30);
  
    // Add budget suggestion for next month
    doc.text(`Budget Suggestion for Next Month: $${budgetSuggestion.toFixed(2)}`, 14, 40);
  
    // Line separator before the table
    doc.line(14, 45, 200, 45);
  
    // Past month analysis
    const pastMonthsData = Object.keys(groupedExpenses)
      .filter((monthYearKey) => {
        const [month, year] = monthYearKey.split('-');
        return !(parseInt(month) === currentMonth && parseInt(year) === currentYear);
      })
      .map((monthYearKey) => {
        const [month, year] = monthYearKey.split('-');
        const totalAmount = groupedExpenses[monthYearKey];
        return {
          date: new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' }),
          total: `$${totalAmount.toFixed(2)}`
        };
      });
  
    // Add table for past months
    doc.autoTable({
      head: [['Month-Year', 'Total Expense']],
      body: pastMonthsData.map((data) => [data.date, data.total]),
      startY: 50,
      theme: 'grid',  // Grid style for better table appearance
      headStyles: { fillColor: [0, 123, 255], textColor: 255, fontSize: 12, fontStyle: 'bold' },  // Header row style
      bodyStyles: { fontSize: 12, valign: 'middle' },
      alternateRowStyles: { fillColor: [240, 240, 240] },  // Alternating row colors
      margin: { top: 10 },
    });
  
    // Add footer with the page number
    doc.setFontSize(10);
    doc.text(`Page ${doc.internal.getNumberOfPages()}`, 180, 290);
  
    // Save the PDF
    doc.save('expense_report.pdf');
  };
  const formatNumbers = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };


  return (
    <div>
       <SideBar/>
    <div className="bg-gradient-to-r from-[#434570] to-[#232439] h-screen w-full flex justify-center items-center p-4">
      
      <div className="text-white max-w-4xl w-full h-[600px]  bg-[#2d2f46] p-8 rounded-xl shadow-lg">
         <div className='flex gap-8 '>
        <div>
        <h1 className="text-3xl font-semibold text-white text-center mb-6">Next Month's Budget: Rs:</h1>

        </div>
        <div>
        <button
          onClick={generatePDF}
          className=" bg-[#2a2a44] text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-800"
        >
          Download Report
        </button>

        </div>
        </div>
      

        {/* Current month total */}
        <div className="bg-[#2a2a44] p-4 mb-4 rounded-lg shadow-md">
          <h2 className="text-xl font-medium text-white">Current Month Total</h2>
          <p className="text-2xl font-bold text-green-400 mt-2">
            Rs:{formatNumbers(getMonthTotal(currentMonth, currentYear).toFixed(2))}
          </p>
        </div>

        {/* Budget suggestion for the next month */}
        <div className="bg-[#2a2a44] p-4 mb-4 rounded-lg shadow-md">
          <h2 className="text-xl font-medium text-white">Budget Suggestion for Next Month</h2>
          <p className="text-2xl font-bold text-yellow-400 mt-2">
            Rs:{formatNumbers(budgetSuggestion.toFixed(2))}
          </p>
        </div>

        {/* Past month data (grouped by month and year) */}
<div>
  <h2 className="text-xl font-medium text-white mb-4">Past Month's Analysis Total Expense Records</h2>
  <div className="overflow-x-auto scrollbar-none lg:h-[220px]">
    {Object.keys(groupedExpenses)
      .filter((monthYearKey) => {
        // Exclude the current month (currentYear, currentMonth)
        const [month, year] = monthYearKey.split('-');
        return !(parseInt(month) === currentMonth && parseInt(year) === currentYear);
      })
      .sort((a, b) => new Date(b.split('-')[1], b.split('-')[0]) - new Date(a.split('-')[1], a.split('-')[0])) // Sort by month-year in descending order
      .map((monthYearKey) => {
        const [month, year] = monthYearKey.split('-');
        const totalAmount = groupedExpenses[monthYearKey];

        return (
          <div key={monthYearKey} className="bg-[#2a2a44] p-4 mb-4 rounded-lg shadow-md">
            <p className="text-white">
              {new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' })}:
              <span className="font-semibold text-cyan-300"> Rs:{formatNumbers(totalAmount.toFixed(2))}</span>
            </p>
          </div>
        );
      })}
  </div>
</div>


      </div>
    </div>
    </div>
  );
};

export default Ai;
