import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './accordion.css';
import { ChevronDownIcon } from '../../icons';

export const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="storybook-accordion">
      {items.map((item, index) => (
        <div key={index} className="storybook-accordion-item">
          <button
            className="storybook-accordion-header"
            onClick={() => handleClick(index)}
          >
            <span>{item.title}</span>
            <ChevronDownIcon
              className={`storybook-accordion-icon ${
                openIndex === index ? 'open' : ''
              }`}
            />
          </button>
          {openIndex === index && (
            <div className="storybook-accordion-content">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default Accordion;
