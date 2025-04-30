import React, { useState } from "react";
import './TabButtons.css'

const TabButtons = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(null); // Set the first tab as active by default

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab); // Notify parent about the tab change
  };

  return (
    <ul className="nav nav-tabs CustomNavTab gap-2 mt-3 d-flex flex-wrap justify-content-center">
      {tabs.map((tab, index) => (
        <li className="nav-item" key={index}>
          <button
            className={`nav-link CustomTabBtn ${activeTab === tab ? "active" : ""}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TabButtons;
