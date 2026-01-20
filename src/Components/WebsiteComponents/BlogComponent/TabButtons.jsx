import React, { useState } from "react";
import './TabButtons.css'

const TabButtons = ({ categories, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(null); // Set the first tab as active by default

  const handleTabClick = (categories) => {
    setActiveTab(categories.category_name);
    onTabChange(categories.category_name); // Notify parent about the tab change
  };

  return (
    <ul className="nav nav-tabs CustomNavTab gap-2 mt-3 d-flex flex-wrap justify-content-center">
      {categories.map((tab, index) => (
        <li className="nav-item" key={index}>
          <button
            className={`nav-link CustomTabBtn ${activeTab === tab ? "active" : ""}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab?.category_name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TabButtons;
