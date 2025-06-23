import React, { useEffect, useState, useRef } from "react";
import { FaTrash, FaSave, FaEdit, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Filler,
} from "chart.js";
import IncomeSidebar from "../Components/IncomeSidebar";

// Register chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Filler
);

// Set all chart text to white
ChartJS.defaults.color = '#fff';
ChartJS.defaults.plugins.legend.labels.color = '#fff';
ChartJS.defaults.plugins.title.color = '#fff';
ChartJS.defaults.plugins.tooltip.titleColor = '#fff';
ChartJS.defaults.plugins.tooltip.bodyColor = '#fff';
ChartJS.defaults.scales.category.ticks.color = '#fff';
ChartJS.defaults.scales.linear.ticks.color = '#fff';

const IncomeDashboard = () => {
  const [incomes, setIncomes] = useState([]);
  const [editedIncome, setEditedIncome] = useState({});
  const [editingRow, setEditingRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const navigate = useNavigate();

  // Refs for charts
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = () => {
    fetch(`${API_URL}/incomes`)
      .then((response) => response.json())
      .then((data) => {
        setIncomes(data);
        setEditedIncome(
          data.reduce((acc, income) => {
            acc[income._id] = { ...income };
            return acc;
          }, {})
        );
      })
      .catch((error) => console.error("Error fetching incomes:", error));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this income entry?")) {
      try {
        await fetch(`${API_URL}/incomes/${id}`, { method: "DELETE" });
        setIncomes((prev) => prev.filter((income) => income._id !== id));
      } catch (err) {
        console.error("Error deleting income:", err.message);
      }
    }
  };

  const handleEditClick = (id) => setEditingRow(id);

  const handleEditChange = (id, field, value) => {
    const newValue = field === "amount" ? parseFloat(value) : value;
    setEditedIncome((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: newValue },
    }));
  };

  const handleUpdate = async (id) => {
    const { _id, date, ...payload } = editedIncome[id];
    try {
      const response = await fetch(`${API_URL}/incomes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Failed to update income");
      const updatedIncome = await response.json();
      setIncomes((prev) =>
        prev.map((income) => (income._id === id ? updatedIncome : income))
      );
      setEditingRow(null);
    } catch (err) {
      console.error("Error updating income:", err.message);
    }
  };

  // Function to download table and charts as PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    const columns = ['Income Source','Category','Type','Amount','Description','Date'];
    const rows = incomes.map(i=>[
      i.incomeSource, i.incomeCategory, i.incomeType, `$${i.amount}`, i.description, new Date(i.date).toLocaleDateString()
    ]);
    doc.autoTable({ head:[columns], body:rows });
    if(pieChartRef.current){ doc.addPage(); doc.setFontSize(16);
      doc.text("Total Income by Type", doc.internal.pageSize.getWidth()/2,20,{align:"center"});
      doc.addImage(pieChartRef.current.toBase64Image(),'PNG',30,30, doc.internal.pageSize.getWidth()-30,150);
    }
    if(barChartRef.current){ doc.addPage(); doc.setFontSize(16);
      doc.text("Income by Category", doc.internal.pageSize.getWidth()/2,20,{align:"center"});
      doc.addImage(barChartRef.current.toBase64Image(),'PNG',15,30, doc.internal.pageSize.getWidth()-30,100);
    }
    doc.save('income-report.pdf');
  };

  // Filter incomes
  const filtered = incomes.filter(i=>
    Object.values(i).some(val=>
      (['string','number'].includes(typeof val)) && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pie chart data by type
  const byType = filtered.reduce((a,i)=>{a[i.incomeType]=(a[i.incomeType]||0)+i.amount;return a;},{ });
  const pieChartData = { labels:Object.keys(byType), datasets:[{ data:Object.values(byType), backgroundColor:['#FF6384','#36A2EB','#FFCE56','#4BC0C0','#9966FF'] }] };

  // Bar chart data by category
  const byCat = filtered.reduce((a,i)=>{a[i.incomeCategory]=(a[i.incomeCategory]||0)+i.amount;return a;},{ });
  const barChartData = { labels:Object.keys(byCat), datasets:[{ label:'Income by Category', data:Object.values(byCat), backgroundColor:'#36A2EB', borderColor:'#36A2EB', borderWidth:1 }] };

  // Line chart data by source
  const bySource = filtered.reduce((a,i)=>{a[i.incomeSource]=(a[i.incomeSource]||0)+i.amount;return a;},{ });
  const lineChartData = { labels:Object.keys(bySource), datasets:[{ label:'Income by Source', data:Object.values(bySource), fill:false, tension:0.1 }] };

  // New: Monthly income trend
  const byMonth = filtered.reduce((a,i)=>{
    const key = new Date(i.date).toLocaleDateString(undefined,{month:'short',year:'numeric'});
    a[key]=(a[key]||0)+i.amount;
    return a;
  },{});
  const monthlyChartData = {
    labels: Object.keys(byMonth).sort((a,b)=> new Date(a) - new Date(b)),
    datasets: [{ label:'Monthly Income Trend', data:Object.keys(byMonth).sort((a,b)=> new Date(a)-new Date(b)).map(m=>byMonth[m]), fill:false, tension:0.1 }]
  };

  const totalIncome = filtered.reduce((sum,i)=>sum+i.amount,0);
  const formatNum = x=>x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");

  return (
    <div className="flex h-screen w-full bg-gradient-to-r from-[#434570] to-[#232439]">
      <IncomeSidebar />
      <div className="flex-1 overflow-auto p-6">
        <h2 className="text-4xl font-bold mb-4 text-center text-white">Income Dashboard</h2>
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          <div className="relative w-full max-w-lg mx-auto">
            <input
              type="text" placeholder="Search incomes by type or category..."
              value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        </div>
        <div className="max-w-md mx-auto shadow-lg rounded-xl p-6 mb-8">
          <h3 className="text-2xl font-bold text-center text-white">Total Income</h3>
          <p className="text-center text-3xl text-green-500 font-semibold mt-4">Rs:{formatNum(totalIncome.toFixed(2))}</p>
        </div>
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <div className="w-[30%] min-w-[300px] shadow-lg rounded-xl p-6 mb-8 bg-slate-600">
            <h3 className="text-xl font-bold text-center mb-2 text-black">Total Income by Type</h3>
            <Pie data={pieChartData} ref={pieChartRef} />
          </div>
          <div className="w-[48%] min-w-[300px] shadow-lg rounded-xl p-6 mb-8 bg-slate-600">
            <h3 className="text-xl font-bold text-center mb-2 text-black">Total Income by Category</h3>
            <Bar data={barChartData} ref={barChartRef} />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <div className="max-w-md mx-auto shadow-lg rounded-xl p-6 mb-8 bg-slate-600">
              <h3 className="text-2xl font-bold text-center mb-4">Income by Source</h3>
              <Line data={lineChartData} />
            </div>
            <div className="max-w-md mx-auto shadow-lg rounded-xl p-6 mb-8 bg-slate-600">
              <h3 className="text-2xl font-bold text-center mb-4">Monthly Income Trend</h3>
              <Line data={monthlyChartData} />
            </div>
        </div>

        <div className="max-w-full mx-auto shadow-lg bg-slate-600 rounded-xl p-6 mb-8 mt-6">
          <h3 className="text-2xl font-bold text-center text-black mb-4">Income Summary</h3>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="md:w-1/3">
              <h4 className="text-xl font-semibold mb-2">Income Types</h4>
              <ul>{Object.entries(byType).map(([t,a])=>(<li key={t} className="py-1 border-b"><span className="font-bold">{t}</span>: ${a.toFixed(2)}</li>))}</ul>
            </div>
            <div className="md:w-1/3">
              <h4 className="text-xl font-semibold mb-2">Income Categories</h4>
              <ul>{Object.entries(byCat).map(([c,a])=>(<li key={c} className="py-1 border-b"><span className="font-bold">{c}</span>: ${a.toFixed(2)}</li>))}</ul>
            </div>
            <div className="md:w-1/3">
              <h4 className="text-xl font-semibold mb-2">Income Sources</h4>
              <ul>{Object.entries(bySource).map(([s,a])=>(<li key={s} className="py-1 border-b"><span className="font-bold">{s}</span>: ${a.toFixed(2)}</li>))}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeDashboard;
