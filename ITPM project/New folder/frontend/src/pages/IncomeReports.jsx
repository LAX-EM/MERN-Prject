// IncomeReports.jsx
import React, { useEffect, useState, useRef } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import IncomeSidebar  from "../Components/IncomeSidebar";

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement);

const IncomeReports = () => {
  const [incomes, setIncomes] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = () => {
    fetch(`${API_URL}/incomes`)
      .then((response) => response.json())
      .then((data) => setIncomes(data))
      .catch((error) => console.error("Error fetching incomes:", error));
  };

  // Calculate totals and aggregates
  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

  const aggregatedTypes = incomes.reduce((acc, income) => {
    acc[income.incomeType] = (acc[income.incomeType] || 0) + income.amount;
    return acc;
  }, {});

  const aggregatedCategories = incomes.reduce((acc, income) => {
    acc[income.incomeCategory] = (acc[income.incomeCategory] || 0) + income.amount;
    return acc;
  }, {});

  // Chart Data for the analyzed report
  const pieChartData = {
    labels: Object.keys(aggregatedTypes),
    datasets: [
      {
        data: Object.values(aggregatedTypes),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  const barChartData = {
    labels: Object.keys(aggregatedCategories),
    datasets: [
      {
        label: "Income by Category",
        data: Object.values(aggregatedCategories),
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
        borderWidth: 1,
      },
    ],
  };

  // Function to download the Analyzed Report as a PDF.
  // It captures a hidden container that includes Total Income, Charts, and Income Summary.
  const downloadAnalyzedReportPDF = () => {
    const input = document.getElementById("analyzed-report");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("analyzed-report.pdf");
    });
  };

  // Function to download the Full Details Report as a PDF using autoTable.
  const downloadFullDetailsReportPDF = () => {
    const pdf = new jsPDF();
    const columns = ["Income Source", "Category", "Type", "Amount", "Description", "Date"];
    const rows = incomes.map((income) => [
      income.incomeSource,
      income.incomeCategory,
      income.incomeType,
      `$${income.amount}`,
      income.description,
      new Date(income.date).toLocaleDateString(),
    ]);
    pdf.autoTable({
      head: [columns],
      body: rows,
    });
    pdf.save("full-details-report.pdf");
  };

  // Function to download the Full Details Report as an Excel file using XLSX.
  const downloadFullDetailsReportExcel = () => {
    const worksheetData = incomes.map((income) => ({
      "Income Source": income.incomeSource,
      Category: income.incomeCategory,
      Type: income.incomeType,
      Amount: income.amount,
      Description: income.description,
      Date: new Date(income.date).toLocaleDateString(),
    }));
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Incomes");
    XLSX.writeFile(workbook, "full-details-report.xlsx");
  };

  return (
    <div className="flex justify-center h-screen w-full bg-gradient-to-r from-[#434570] to-[#232439]">
  {/* Sidebar remains on the left */}
  <IncomeSidebar />

  {/* Main content container centered */}
  <div className="flex flex-col items-center justify-center flex-1">
    <h2 className="text-3xl font-bold text-center text-black mb-8">
      Income Reports
    </h2>

    <div className="flex flex-col md:flex-row gap-8">
      {/* Analyzed Report Button */}
      <div
        onClick={downloadAnalyzedReportPDF}
        className="m-4 rounded-lg shadow-xl p-6 cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl bg-slate-400 "
      >
        <h3 className="text-xl font-semibold mb-2 text-black">
          Download Analyzed Report
        </h3>
        <p className="text-black">
          Get a report including Total Income, Charts, and Income Summary.
        </p>
        
      </div>

      {/* Full Details Report Button */}
      <div className="m-4 rounded-lg shadow-xl p-6 cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl bg-slate-400">
        <h3 className="text-xl font-semibold mb-2 text-black">
          Download Full Details Report
        </h3>
        <p className="text-black mb-4">
          Get a full income list report in PDF or Excel format.
        </p>
        <div className="flex gap-4">
          <button
            onClick={downloadFullDetailsReportPDF}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow transition"
          >
            PDF
          </button>
          <button
            onClick={downloadFullDetailsReportExcel}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow transition"
          >
            Excel
          </button>
        </div>
      </div>
    </div>
  </div>

  {/* Hidden container for generating the Analyzed Report */}
  <div
    id="analyzed-report"
    style={{
      position: "absolute",
      top: "-10000px",
      left: "-10000px",
      width: "800px",
    }}
  >
    {/* Total Income Card */}
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        marginBottom: "20px",
        textAlign: "center",
      }}
    >
      <h3 style={{ fontSize: "24px", marginBottom: "10px" }}>Total Income</h3>
      <p style={{ fontSize: "20px", fontWeight: "bold" }}>
        ${totalIncome.toFixed(2)}
      </p>
    </div>

    {/* Charts Section */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        marginBottom: "20px",
      }}
    >
      <div style={{ width: "300px", height: "300px" }}>
        <h4 style={{ textAlign: "center" }}>Income by Type</h4>
        <Pie data={pieChartData} ref={pieChartRef} />
      </div>
      <div style={{ width: "300px", height: "300px" }}>
        <h4 style={{ textAlign: "center" }}>Income by Category</h4>
        <Bar data={barChartData} ref={barChartRef} />
      </div>
    </div>

    {/* Income Summary Card */}
    <div style={{ padding: "20px", border: "1px solid #ccc" }}>
      <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>Income Summary</h3>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h4>Income Types</h4>
          <ul>
            {Object.entries(aggregatedTypes).map(([type, amount]) => (
              <li key={type}>
                {type}: ${amount.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Income Categories</h4>
          <ul>
            {Object.entries(aggregatedCategories).map(([category, amount]) => (
              <li key={category}>
                {category}: ${amount.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default IncomeReports;