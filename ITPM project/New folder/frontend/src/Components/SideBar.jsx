import React, { useState } from 'react';

const SideBar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`flex ${isActive ? 'ml-0' : 'ml-[225px]'} transition-all`}>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-[225px] h-full bg-[#070c21] p-5 transition-all ${
          isActive ? 'left-[-225px]' : 'left-0'
        }`}
      >
        <div className="profile text-center mb-8">
          <img
            className="w-[100px] h-[100px] rounded-full mx-auto"
            src="src/Assests/logo.webp"
            alt="profile_picture"
          />
          <h3 className="text-white mt-4">Fintech</h3>
          <p className="text-[#c0f0fd] text-sm">Finance Application</p>
          <p className="text-[#c0f0fd] text-sm">Management Categories</p>
        </div>
        <ul>
          <li>
            <a
              href="#"
              className="block py-3 px-7 text-white text-lg border-b border-[#10558d] hover:bg-white hover:text-[#0c7db1]"
            >
              <span className="icon inline-block w-7 text-[#dee4ec]">
                <i className="fas fa-home"></i>
              </span>
              <span className="item">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-3 px-7 text-white text-lg border-b border-[#10558d] hover:bg-white hover:text-[#0c7db1]"
            >
              <span className="icon inline-block w-7 text-[#dee4ec]">
                <i className="fas fa-home"></i>
              </span>
              <span className="item text-center"><a href='/Dashboard-Expenses'>Expenses</a></span>
            </a>
          </li>
          <li>
            <a
              href="/income_dashboard"
              className="block py-3 px-7 text-white text-lg border-b border-[#10558d] hover:bg-white hover:text-[#0c7db1]"
            >
              <span className="icon inline-block w-7 text-[#dee4ec]">
                <i className="fas fa-home"></i>
              </span>
              <span className="item text-center">Income </span>
            </a>
          </li>
          <li>
            <a
              href="/BudgetHome"
              className="block py-3 px-7 text-white text-lg border-b border-[#10558d] hover:bg-white hover:text-[#0c7db1]"
            >
              <span className="icon inline-block w-7 text-[#dee4ec]">
                <i className="fas fa-home"></i>
              </span>
              <span className="item text-center">Budget</span>
            </a>
          </li>
          <li>
            <a
              href="/unlock"
              className="block py-3 px-7 text-white text-lg border-b border-[#41494f] hover:bg-white hover:text-[#0c7db1]"
            >
              <span className="icon inline-block w-7 text-[#dee4ec]">
                <i className="fas fa-home"></i>
              </span>
              <span className="item text-center">Fintech AI</span>
            </a>
          </li>
         
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navbar */}
        <div className="flex items-center justify-between bg-[#070c21] p-5">
          {/* Toggle Button */}
          <button
            onClick={toggleSidebar}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '30px',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 10
            }}
          >
            ☰ {/* Simple hamburger button using Unicode */}
          </button>
        </div>

        {/* Content */}
        
      </div>
    </div>
  );
};

export default SideBar;
