import React from 'react';
import SideBar from '../Components/SideBar';
import { motion } from "framer-motion";






const Welcome = () => {
  return (
    <div>
      <SideBar />
      <div className="bg-gradient-to-r from-[#434570] to-[#232439] h-[1000px] w-full ">
      
      
      <motion.h1 
        className="text-center text-4xl text-white font-extrabold mb-8"
        style={{ fontFamily: 'Times New Roman' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome To <span className="text-black mt-[300px]">FinTech</span> Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl ml-[250px] mr-[100px] mt-[100px]">
        {/* Budget Management */}
        <motion.div 
          className="p-6 rounded-2xl bg-white bg-opacity-20 backdrop-blur-lg shadow-lg text-white text-center transition-transform transform hover:scale-105"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-xl font-bold mb-2">💰 Budget Management</h2>
          <p className="text-sm">Track and optimize your spending efficiently.</p>
        </motion.div>

        {/* Income Management */}
        <motion.div 
          className="p-6 rounded-2xl bg-white bg-opacity-20 backdrop-blur-lg shadow-lg text-white text-center transition-transform transform hover:scale-105"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-xl font-bold mb-2">📈 Income Management</h2>
          <p className="text-sm">Monitor and grow your income streams.</p>
        </motion.div>

        {/* Expense Management */}
        <motion.div 
          className="p-6 rounded-2xl bg-white bg-opacity-20 backdrop-blur-lg shadow-lg text-white text-center transition-transform transform hover:scale-105"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-xl font-bold mb-2">📝 Expense Management</h2>
          <p className="text-sm">Categorize and control your expenses effectively.</p>
        </motion.div>

        {/* AI Budget Prediction */}
        <motion.div 
          className="p-6 rounded-2xl bg-white bg-opacity-20 backdrop-blur-lg shadow-lg text-white text-center transition-transform transform hover:scale-105 col-span-1 md:col-span-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-xl font-bold mb-2">🤖 AI Budget Prediction</h2>
          <p className="text-sm">Leverage AI to predict and plan your financial future.</p>
        </motion.div>
      </div>
    </div>
    </div>




  );
};

export default Welcome;
