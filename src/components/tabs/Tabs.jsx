import React from 'react';
import './tabs.css';

const Tabs = ({ tabs, activeTab, onTabClick }) => (
    <div className="flex border-b mb-4">
        {tabs.map(tab => (
            <button
                key={tab.name}
                className={`py-2 px-6 font-semibold rounded-t-lg transition-colors ${activeTab === tab.name ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                onClick={() => onTabClick(tab.name)}
            >
                {tab.label}
            </button>
        ))}
    </div>
);

export default Tabs;
