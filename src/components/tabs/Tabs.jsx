import React from 'react';
import PropTypes from 'prop-types';
import './tabs.css';

export const Tabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="tabs-wrapper">
      <nav className="tabs-nav">
        {tabs.map((tab, index) => (
          <button
            key={tab.name}
            onClick={() => onTabChange(index)}
            className={`tabs-button ${activeTab === index ? 'tabs-button--active' : ''}`}
          >
            {tab.name}
          </button>
        ))}
      </nav>
      <div className="tabs-content">
        {tabs[activeTab] && tabs[activeTab].content}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
  activeTab: PropTypes.number.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

Tabs.defaultProps = {
    activeTab: 0,
};

export default Tabs;
