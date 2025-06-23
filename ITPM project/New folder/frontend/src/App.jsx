import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import ExpensesDash from "./pages/ExpensesDash";
import AAddExps from "./pages/AAddExps";
import ExpensesTable from "./pages/ExpensesTable.jsx";
import UpdateExpenses from "./pages/UpdateExpenses.jsx";
import ViewSingleexpense from "./pages/ViewSingleexpense.jsx";
import ReportExpences from "./pages/ReportExpences.jsx";
import BudgetPage from "./pages/BudgetPage.jsx";
import CreateBudget from "./pages/CreateBudget.jsx";
import UpdateBudget from "./pages/UpdateBudget.jsx";
import IncomeList from "./pages/IncomeList.jsx";
import IncomeForm from "./pages/IncomeForm.jsx";
import IncomeReports from "./pages/IncomeReports.jsx";
import IncomeDashboard from "./pages/IncomeDashboard.jsx";


import Ai from "./pages/ai/ai.jsx";
import Ui from "./pages/ai/unlock.jsx";






export default function App() {
  return (
    <BrowserRouter>
   
      <Routes>

{/* Expenses routes............................................................................................................ */}
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/Dashboard" element={<Welcome/>}></Route>
        <Route path="/Dashboard-Expenses" element={<ExpensesDash/>}></Route>
        <Route path="/Add-Expenses" element={<AAddExps/>}></Route>
        <Route path="/Get-all-Expens" element={<ExpensesTable/>}></Route>
        <Route path="/updateexpenses/:id" element={<UpdateExpenses/>}></Route>
        <Route path="/single-expence/:id" element={<ViewSingleexpense/>}></Route>
        <Route path="/reportExpences" element={<ReportExpences/>}></Route>
         
{/* Budget Routes................................................................................................................ */}

        <Route element={<BudgetPage />} path="/BudgetHome" />
        <Route element={<CreateBudget />} path="/create-budget" />
        <Route element={<UpdateBudget />} path="/edit-budget/:id" />


 {/* Income Routes................................................................................................................. */}
        <Route path="/income_list" element={<IncomeList />}></Route>
        <Route path="/income_form" element={<IncomeForm />}></Route>
        <Route path="/income_dashboard" element={<IncomeDashboard />}></Route>
        <Route path="/income_reports" element={<IncomeReports />}></Route>



         {/* Income Routes................................................................................................................. */}

         <Route path="/ai" element={<Ai />}></Route>
         <Route path="/unlock" element={<Ui />}></Route>







        
      </Routes>
 
    </BrowserRouter>
  );
}
