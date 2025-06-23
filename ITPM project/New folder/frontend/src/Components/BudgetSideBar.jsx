import React, { useState } from 'react';

const BudgetSideBar = () => {
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
            src="https://files.oaiusercontent.com/file-UYg8mfjz5HuxB9YBFknZrv?se=2025-03-21T09%3A20%3A12Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dcb639c4d-a1ef-4866-b029-331b7248b0e8.webp&sig=ia6eWTG7%2Bv0dgXxhQRk574fbMfPtJ21L4eOjaxuIWbU%3D"
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
              <span className="item">
                <a href="/Dashboard">Go Home</a>
              </span>
            </a>
          </li>
          <li>
            <a
              href="/create-budget"
              className="block py-3 px-7 text-white text-lg border-b border-[#10558d] hover:bg-white hover:text-[#0c7db1]"
            >
              <span className="icon inline-block w-7 text-[#dee4ec]">
                <i className="fas fa-home"></i>
              </span>
              <span className="item text-center">Add Budget</span>
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
              <span className="item text-center">All Details</span>
            </a>
          </li>
          <li>
            <a
              href="/BudgetHome"
              className="block py-3 px-7 text-white text-lg border-b border-[#41494f] hover:bg-white hover:text-[#0c7db1]"
            >
              <span className="icon inline-block w-7 text-[#dee4ec]">
                <i className="fas fa-home"></i>
              </span>
              <span className="item text-center">Report</span>
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

export default BudgetSideBar;
