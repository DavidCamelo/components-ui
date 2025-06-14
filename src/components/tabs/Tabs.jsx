import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './tabs.css';

export const Tabs = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <div className="storybook-tabs-wrapper">
            <nav className="storybook-tabs-nav">
                {tabs.map((tab, index) => (
                    <button
                      key={tab.name}
                      onClick={() => setActiveTab(index)}
                      className={`storybook-tabs-button ${activeTab === index ? 'storybook-tabs-button--active' : ''}`}
                    >
                        {tab.name}
                    </button>
                ))}
            </nav>
            <div className="storybook-tabs-content">
                {tabs[activeTab] && tabs[activeTab].content}
            </div>
        </div>
    );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired
  })).isRequired
};

export default Tabs;
